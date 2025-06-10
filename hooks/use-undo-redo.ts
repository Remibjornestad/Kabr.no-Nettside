"use client"

import { useState, useCallback, useRef } from "react"

interface UndoRedoState<T> {
  past: T[]
  present: T
  future: T[]
}

export function useUndoRedo<T>(initialState: T) {
  const [state, setState] = useState<UndoRedoState<T>>({
    past: [],
    present: initialState,
    future: [],
  })

  const canUndo = state.past.length > 0
  const canRedo = state.future.length > 0

  const undo = useCallback(() => {
    if (!canUndo) return

    setState((currentState) => {
      const previous = currentState.past[currentState.past.length - 1]
      const newPast = currentState.past.slice(0, currentState.past.length - 1)

      return {
        past: newPast,
        present: previous,
        future: [currentState.present, ...currentState.future],
      }
    })
  }, [canUndo])

  const redo = useCallback(() => {
    if (!canRedo) return

    setState((currentState) => {
      const next = currentState.future[0]
      const newFuture = currentState.future.slice(1)

      return {
        past: [...currentState.past, currentState.present],
        present: next,
        future: newFuture,
      }
    })
  }, [canRedo])

  const set = useCallback((newPresent: T) => {
    setState((currentState) => ({
      past: [...currentState.past, currentState.present],
      present: newPresent,
      future: [],
    }))
  }, [])

  const reset = useCallback((newPresent: T) => {
    setState({
      past: [],
      present: newPresent,
      future: [],
    })
  }, [])

  // Keyboard shortcuts
  const keyboardShortcutsRef = useRef<(e: KeyboardEvent) => void>()

  keyboardShortcutsRef.current = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "z" && !e.shiftKey) {
          e.preventDefault()
          undo()
        } else if (e.key === "y" || (e.key === "z" && e.shiftKey)) {
          e.preventDefault()
          redo()
        }
      }
    },
    [undo, redo],
  )

  // Set up keyboard listeners
  useState(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keyboardShortcutsRef.current?.(e)
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  })

  return {
    state: state.present,
    set,
    reset,
    undo,
    redo,
    canUndo,
    canRedo,
    history: {
      past: state.past,
      future: state.future,
    },
  }
}
