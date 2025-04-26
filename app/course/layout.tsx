"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import {
  Home,
  Users,
  FileText,
  Clock,
  User,
  HelpCircle,
  Bell,
  ClipboardList,
  Menu,
  X,
  FileQuestion,
  CheckSquare,
  BarChart2,
  Bot,
  FileIcon,
  LogOut,
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

interface SidebarProps {
  className?: string
}

export  function Sidebar({ className }: SidebarProps) {
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
    if (label === "Notifications") {
      setNotificationOpen(true)
    } else if (label === "Logout") {
      setLogoutOpen(true)
    }
  }

  // Icon-only sidebar items
  const iconItems = [
    { icon: Home, label: "Home" },
    { icon: Users, label: "Users" },
    { icon: FileText, label: "Documents", hasSeparator: true },
    { icon: Clock, label: "History" },
    { icon: User, label: "Profile" },
    { icon: HelpCircle, label: "Help", hasSeparator: true },
    { icon: Bell, label: "Notifications" },
    { icon: LogOut, label: "Logout" },
  ]

  function getRandomColor(): string {
    const colors = ["yellow", "pink", "purple", "blue", "red", "orange", "green", "brown"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
  // Content sidebar sections
  const servicesSections = [
    {
      title: "Quizes",
      items: [
        { icon: FileQuestion, label: "Quiz by Domain" },
        { icon: CheckSquare, label: "Quiz by randomize" },
      ],
    },
    {
      title: "Services",
      items: [
        { icon: FileText, label: "Flashcards" },
        { icon: BarChart2, label: "Stats" },
        { icon: CheckSquare, label: "Reviews" },
        { icon: CheckSquare, label: "Assessments" },
       
      ],
    },
    {
        title: "",
        items: [
          
          { icon: Bot, label: "AI Chatbot" },
          { icon: FileIcon, label: "Notes" },
    
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
          "fixed inset-y-0 left-0 z-40  flex transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
          className,
        )}
      >
        {/* Icon-only Strip */}
        <div className="w-[60px] bg-white border-r border-gray-200 flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-2">
            <div className="flex items-center h-40">
           
            </div>
          </div>

          {/* Icon Navigation */}
          <nav className="flex-1 flex flex-col items-center py-6">
            {iconItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                {item.hasSeparator && <Separator className="w-8 my-3" />}
                <Link
                  href="#"
                  className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100"
                  onClick={(e) => {
                    e.preventDefault()
                    handleMenuItemClick(item.label)
                  }}
                >
                  <item.icon className="w-5 h-5 icon-bold" strokeWidth={3} />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </div>
            ))}
          </nav>
        </div>

        {/* Content Strip */}
        <div className="w-[240px] bg-white border-r border-gray-200 flex flex-col">
          {/* Logo Text */}
          <div className="flex justify-center text-center items-center py-4">
          <Image src="/logo.svg" alt="Elevate" width={150} height={150} />
          </div>

          {/* Services Navigation */}
          <div className="flex-1 px-4 pb-3 space-y-6 overflow-y-auto">
            {servicesSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className="text-sm font-bold mb-2">{section.title}</h3>
                <div className="space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      href="#"
                      className="flex items-center text-bold px-2 py-2 text-sm rounded-md hover:bg-gray-100"
                      onClick={(e) => {
                        e.preventDefault()
                        handleMenuItemClick(item.label)
                      }}
                    >
                        <div className={`rounded bg-slate-200 p-[1px] mr-3`}>
                            <item.icon strokeWidth={3} className="w-4 font-bold h-4 " />
                        </div>
                      
                      <p className="font-bold text-[#505050]">{item.label}</p>
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
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden" onClick={toggleSidebar} />
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
                    <p className="font-medium">You've studied 3 sets! You've earned set stacker status.</p>
                    <p className="text-sm text-gray-500">5 days ago</p>
                  </div>
                </div>
                <Button variant="link" className="px-0 h-auto text-blue-600">
                  View all achievements
                </Button>
              </div>
            </div>
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



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

     
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 md:ml-[300px]">{children}</main>
          </div>
     
  )
}
