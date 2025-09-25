
import { Header } from "./header"
import Sidebar from "./sidebar"
import { Outlet } from "react-router-dom"



export function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 ml-64 min-h-[calc(100vh-4rem)] bg-background">
          <div className="max-w-7xl mx-auto"><Outlet /></div>
        </main>
      </div>
    </div>
  )
}
