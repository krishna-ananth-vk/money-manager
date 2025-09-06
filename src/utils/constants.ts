
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Home,
  Calendar,
  BarChart3,
  Settings,
  User,
} from "lucide-react"

const sidebarNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Income", href: "/income", icon: TrendingUp },
  { name: "Expenses", href: "/expenses", icon: TrendingDown },
  { name: "EMI", href: "/emi", icon: CreditCard },
  { name: "Utils", href: "/utils", icon: Home },
  { name: "Planner", href: "/planner", icon: Calendar },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "User Details", href: "/user-details", icon: User },
]



export { sidebarNavigation }