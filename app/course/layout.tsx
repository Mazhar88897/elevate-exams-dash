"use client"
import Link from "next/link"
import type React from "react"

import { useState, useEffect } from "react"
import {
  Home,
  Users,
  FileText,
  User,
  HelpCircle,
  Bell,
  Menu,
  X,
  FileQuestion,
  CheckSquare,
  BarChart2,
  Bot,
  FileIcon,
  LogOut,
  MonitorPlay,
  BookText,
  HomeIcon,
  MoreHorizontal
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import Image from "next/image"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card, CardContent } from "@/components/ui/card"
import { NotificationModal } from "@/components/shared/notification-modal"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }

    // Initial check
    checkScreenSize()

    // Add event listener
    window.addEventListener("resize", checkScreenSize)

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const handleMenuItemClick = (label: string) => {
    if (label === "Notification") {
      setNotificationOpen(true)
    } else if (label === "Logout") {
      setLogoutOpen(true)
    }
  }

  // Icon-only sidebar items
  const iconItems = [
    { icon: Home, label: "Home", link: "/dashboard" },
    { icon: Users, label: "My learning", link: "/dashboard" },
    { icon: FileText, label: "Add Courses", hasSeparator: true, link: "/dashboard" },
    { component: ThemeToggle, label: "Theme" },
    { icon: User, label: "Account", link: "/dashboard/account" },
    { icon: HelpCircle, label: "Help", hasSeparator: true, link: "/dashboard/help" },
    { icon: Bell, label: "Notification" },
    { icon: LogOut, label: "Logout" },
  ]

  function getRandomColor(): string {
    const colors = ["yellow", "pink", "purple", "blue", "red", "orange", "green", "brown"]
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
  }
  // Content sidebar sections
  const servicesSections = [
    {
      title: "Home",
      items: [
        { icon: HomeIcon, label: "Home", link: "/course/course-details" },
     
      ],
    },
    {
      title: "Quiz",
      items: [
        { icon: FileQuestion, label: "Quiz", link: "/pages/test" },
     
      ],
    },
    {
      title: "Services",
      items: [
        { icon: FileText, label: "Flashcards", link: "/pages/flashcards" },
        { icon: BarChart2, label: "Stats", link: "/course/result" },
        { icon: CheckSquare, label: "Assessments", link: "/course/Information-Mock-Assessment" },
      ],
    },
    {
      title: "Features",
      items: [
        { icon: Bot, label: "AI Chatbot", link: "" },
        { icon: BookText, label: "Notes", link: "/course/notes" },
        { icon: MonitorPlay, label: "Tutorial", link: "/course/tutorial" },
      ],
    },
  ]

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="fixed bg-transparent top-[17px] left-4 z-50 md:hidden"
      >
        {isOpen ? <X className="" size={24} /> : <Menu size={24} />}
      </Button>

      {/* Sidebar Container */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
          className,
        )}
      >
        {/* Icon-only Strip */}
        <div className="w-[60px] bg-background border-r border-border flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-2">
            <div className="flex items-center h-40"></div>
          </div>

          {/* Icon Navigation */}
          <nav className="flex-1 flex flex-col items-center py-6">
            {iconItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                {item.hasSeparator && <Separator className="w-8 my-3" />}
                {item.component ? (
                  <div className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-accent">
                    <item.component />
                  </div>
                ) : (
                  <Link
                    href={item.link || "#"}
                    className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-accent"
                    onClick={(e) => {
                      if (!item.link) {
                        e.preventDefault()
                        handleMenuItemClick(item.label)
                      }
                    }}
                  >
                    <item.icon className="w-5 h-5 icon-bold" strokeWidth={3} />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Content Strip */}
        <div className="w-[240px] bg-background border-r border-border flex flex-col">
          {/* Logo */}
          <div className="flex items-center h-16 px-4">
            <div className="flex items-center h-40"></div>
          </div>

          {/* Services Navigation */}
          <div className="flex-1 px-4 pb-3 space-y-6 overflow-y-auto">
            {servicesSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className="text-sm font-bold text-foreground mb-2">{section.title}</h3>
                <div className="space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      href={item.link || "#"}
                      className="flex items-center text-bold px-2 py-2 text-sm rounded-md hover:bg-accent"
                      onClick={(e) => {
                        if (!item.link) {
                          e.preventDefault()
                          handleMenuItemClick(item.label)
                        }
                      }}
                    >
                      <div className="rounded bg-muted p-[1px] mr-3">
                        <item.icon strokeWidth={3} className="w-4 font-bold h-4" />
                      </div>
                      <p className="font-bold text-foreground">{item.label}</p>
                    </Link>
                  ))}
                </div>
                {sectionIndex < servicesSections.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={toggleSidebar} />
      )}

      {/* Notification Modal */}
      <NotificationModal open={notificationOpen} onOpenChange={setNotificationOpen} />

      {/* Logout Confirmation Modal */}
      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>Are you sure you want to log out of your account?</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between sm:space-x-2">
            <Button variant="outline" onClick={() => setLogoutOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setLogoutOpen(false)
                console.log("User logged out")
              }}
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
import { SupportModalProvider } from "@/components/dashboardItems/support-modal"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 md:ml-[300px]">
          <SupportModalProvider>{children}</SupportModalProvider>
        </main>
      </div>
    </ThemeProvider>
  )
}
