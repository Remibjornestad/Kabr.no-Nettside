import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  name: string
  url: string
  current?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="bg-steel-50 py-3">
      <div className="container mx-auto px-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              href="/"
              className="text-steel-600 hover:text-steel-800 flex items-center"
              aria-label="Gå til forsiden"
            >
              <Home className="h-4 w-4" />
              <span className="sr-only">Hjem</span>
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={item.url} className="flex items-center">
              <ChevronRight className="h-4 w-4 text-steel-400 mx-2" />
              {item.current ? (
                <span className="text-steel-800 font-medium" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.url} className="text-steel-600 hover:text-steel-800">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
