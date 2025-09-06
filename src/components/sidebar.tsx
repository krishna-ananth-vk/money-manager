

import { sidebarNavigation } from "@/utils/constants"
import {

  User,
  ChevronRight,
} from "lucide-react"
import { useLocation, Link } from "react-router-dom"


const Sidebar = () => {
  const { pathname } = useLocation()
  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-sidebar border-r border-sidebar-border overflow-y-auto">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-sidebar-primary rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">john@example.com</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-1">
        {sidebarNavigation.map((item) => {
          const isActive = pathname === item.href
          console.log('pathfinder', { pathname, item: item.href });
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon
                  className={`h-5 w-5 transition-colors ${isActive
                    ? "text-sidebar-primary-foreground"
                    : "text-muted-foreground group-hover:text-sidebar-accent-foreground"
                    }`}
                />
                <span>{item.name}</span>
              </div>
              {isActive && (
                <ChevronRight className="h-4 w-4 text-sidebar-primary-foreground" />
              )}
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border bg-sidebar">
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">This Month</span>
            <span className="text-sidebar-foreground font-medium">₹45,230</span>
          </div>
          <div className="w-full bg-sidebar-accent rounded-full h-1.5">
            <div className="bg-sidebar-primary h-1.5 rounded-full" style={{ width: "68%" }}></div>
          </div>
          <p className="text-xs text-muted-foreground">68% of budget used</p>
        </div>
      </div>
    </div>
  )
}


export default Sidebar;