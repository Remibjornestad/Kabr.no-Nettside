"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Edit, Plus, Trash2 } from "lucide-react"
import type { ActivityLogEntry } from "@/lib/supabase/types"

export default function ActivityLog() {
  const [activities, setActivities] = useState<ActivityLogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    loadActivities()
  }, [])

  const loadActivities = async () => {
    try {
      const { data, error } = await supabase
        .from("cms_activity_log")
        .select(`
          *,
          user_email:user_id(email)
        `)
        .order("created_at", { ascending: false })
        .limit(50)

      if (error) {
        console.error("Error loading activities:", error)
        return
      }

      const formattedActivities = data.map((activity: any) => ({
        ...activity,
        user_email: activity.user_email?.email || "Ukjent bruker",
      }))

      setActivities(formattedActivities)
    } catch (error) {
      console.error("Error in loadActivities:", error)
    } finally {
      setLoading(false)
    }
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case "create":
        return <Plus className="h-4 w-4" />
      case "update":
        return <Edit className="h-4 w-4" />
      case "delete":
        return <Trash2 className="h-4 w-4" />
      default:
        return <Edit className="h-4 w-4" />
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "create":
        return "bg-green-100 text-green-800"
      case "update":
        return "bg-blue-100 text-blue-800"
      case "delete":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60)
      return `${diffInMinutes} min siden`
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} timer siden`
    } else {
      return date.toLocaleDateString("no-NO", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    }
  }

  const getSectionDisplayName = (section: string) => {
    const sectionNames: Record<string, string> = {
      home: "Hjemside",
      offer: "Vårt tilbud",
      about: "Om oss",
      contact: "Kontakt",
    }
    return sectionNames[section] || section
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Aktivitetslogg</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Aktivitetslogg</h3>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Ingen aktivitet ennå</p>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`p-1 rounded-full ${getActionColor(activity.action)}`}>
                  {getActionIcon(activity.action)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {getSectionDisplayName(activity.section)}
                    </Badge>
                    <span className="text-xs text-gray-500">{formatDate(activity.created_at)}</span>
                  </div>
                  <p className="text-sm text-gray-900 mb-1">
                    {activity.description || `${activity.action} i ${getSectionDisplayName(activity.section)}`}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <User className="h-3 w-3" />
                    <span>{activity.user_email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
