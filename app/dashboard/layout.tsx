// app/dashboard/layout.tsx

import type { ReactNode } from "react"
import  Sidebar from "@/components/dashboardItems/sidebar"

export default function Layout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <main className="md:ml-64  transition-all duration-300">{children}</main>
    </div>
  )
}
