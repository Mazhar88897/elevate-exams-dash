"use client"

import { useState, useEffect } from "react"
import { Home, Users, FileText, Palette, User, HelpCircle, Bell, LogOut, Menu, X, MoreHorizontal } from "lucide-react"
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
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
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

  const menuItems = [
    { icon: Home, label: "Home", link: "/dashboard" },
    { icon: FileText, label: "Add learning", hasSeparator: true, link: "/dashboard" },
    { icon: Palette, label: "Theme", link: "/dashboard" },
    { icon: User, label: "Account", link: "/dashboard/account" },
    { icon: HelpCircle, label: "Help", hasSeparator: true, link: "/dashboard/help" },
    { icon: Bell, label: "Notification" }, // no link
    { icon: LogOut, label: "Logout" }, // no link
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

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
          className,
        )}
      >
        {/* Logo */}
        <div className="flex py-4 items-center justify-center h-16 px-4">
          <Image src="/logo.svg" alt="Logo" width={150} height={100} />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.hasSeparator && <Separator className="my-2" />}
              
              {item.link ? (
                // If item has link -> normal link
                <Link
                  href={item.link}
                  className="flex items-center px-2 py-3 text-sm font-bold rounded-md hover:bg-gray-100"
                >
                  <item.icon className="w-5 font-bold h-5 mr-3" />
                  {item.label}
                </Link>
              ) : (
                // If item has NO link -> behave like a button
                <button
                  onClick={() => handleMenuItemClick(item.label)}
                  className="w-full flex items-center px-2 py-3 text-sm font-bold rounded-md hover:bg-gray-100"
                >
                  <item.icon className="w-5 font-bold h-5 mr-3" />
                  {item.label}
                </button>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Notification Modal */}
      <Dialog open={notificationOpen} onOpenChange={setNotificationOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Notifications</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            <div className="flex items-start gap-3 p-3 rounded-lg border">
              <div className="flex-shrink-0 bg-purple-100 p-2 rounded-lg">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Achievement"
                  width={40}
                  height={40}
                  className="rounded-md"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">You&apos;ve studied 3 sets! You&apos;ve earned set stacker status.</p>
                    <p className="text-sm text-gray-500">5 days ago</p>
                  </div>
                  <MoreHorizontal className="h-5 w-5 text-gray-400" />
                </div>
                <Button variant="link" className="px-0 h-auto text-blue-600">
                  View all achievements
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg border">
              <div className="flex-shrink-0 bg-green-100 p-2 rounded-lg">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="Homework"
                  width={40}
                  height={40}
                  className="rounded-md"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">
                      Double check your Engineering homework with expert-verified solutions.
                    </p>
                    <p className="text-sm text-gray-500">3 weeks ago</p>
                  </div>
                  <MoreHorizontal className="h-5 w-5 text-gray-400" />
                </div>
                <Button variant="link" className="px-0 h-auto text-blue-600">
                  Search for your textbook
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">CompTIA A+ 220-1102 (Core 2)</h3>
                    <p className="text-sm text-gray-500">Flashcard set • 50 terms • by ITUlearning</p>
                  </div>
                  <Image
                    src="/placeholder.svg?height=50&width=50"
                    alt="Flashcard"
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

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
                // Handle logout logic here
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
