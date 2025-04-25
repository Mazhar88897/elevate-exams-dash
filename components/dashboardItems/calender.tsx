"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Paperclip, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface Event {
  id: number
  day: number
  title: string
  description?: string
  time: string
  color: string
  hasAttachment?: boolean
}

export default function CalendarSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 2, 1)) // March 2023 (0-indexed months)
  const currentMonth = currentDate.toLocaleString("default", { month: "long" })
  const currentYear = currentDate.getFullYear().toString()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [newEventTitle, setNewEventTitle] = useState("")
  const [newEventDescription, setNewEventDescription] = useState("")

  // Sample data for the calendar - now using state so we can add to it
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      day: 4,
      title: "Development planning",
      time: "5:20 PM",
      color: "bg-emerald-500",
    },
    {
      id: 2,
      day: 12,
      title: "Design new UI and check slides",
      description: "design@company.com",
      time: "3:30 PM",
      color: "bg-orange-500",
      hasAttachment: true,
    },
    {
      id: 3,
      day: 25,
      title: "Weekly catch-up",
      description: "team@yourcompany.com",
      time: "2:15 PM",
      color: "bg-sky-500",
    },
  ])

  // Calendar data for March 2023
  const calendarDays = generateCalendarDays(currentDate)

  const highlightedDays = [8, 9]

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() - 1)
    setCurrentDate(newDate)
  }

  const handleNextMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + 1)
    setCurrentDate(newDate)
  }

  const handleDayClick = (day: number) => {
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
    // Only allow clicking on days in the current month
    if (day >= 1 && day <= lastDayOfMonth) {
      setSelectedDay(day)
      setIsModalOpen(true)
    }
  }

  const handleSubmitEvent = () => {
    if (selectedDay && newEventTitle.trim()) {
      // Create a new event
      const newEvent: Event = {
        id: events.length + 1,
        day: selectedDay,
        title: newEventTitle,
        description: newEventDescription || undefined,
        time: getCurrentTime(),
        color: getRandomColor(),
      }

      // Add the new event to the events array
      setEvents([...events, newEvent])

      // Reset form and close modal
      setNewEventTitle("")
      setNewEventDescription("")
      setIsModalOpen(false)
    }
  }

  // Helper function to get current time in format like "3:30 PM"
  const getCurrentTime = () => {
    const now = new Date()
    let hours = now.getHours()
    const minutes = now.getMinutes()
    const ampm = hours >= 12 ? "PM" : "AM"

    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'

    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`
  }

  // Helper function to get a random color for new events
  const getRandomColor = () => {
    const colors = ["bg-emerald-500", "bg-orange-500", "bg-sky-500", "bg-purple-500", "bg-pink-500"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  function generateCalendarDays(date: Date) {
    const year = date.getFullYear()
    const month = date.getMonth()

    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)

    // Day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay()

    // Total days in the month
    const daysInMonth = lastDay.getDate()

    // Previous month's last day
    const prevMonthLastDay = new Date(year, month, 0).getDate()

    const calendarArray = []
    let week = []

    // Add days from previous month
    for (let i = 0; i < firstDayOfWeek; i++) {
      week.push(prevMonthLastDay - firstDayOfWeek + i + 1)
    }

    // Add days from current month
    for (let day = 1; day <= daysInMonth; day++) {
      if (week.length === 7) {
        calendarArray.push(week)
        week = []
      }
      week.push(day)
    }

    // Add days from next month
    let nextMonthDay = 1
    while (week.length < 7) {
      week.push(nextMonthDay++)
    }
    calendarArray.push(week)

    // Add one more week if we have less than 6 weeks
    if (calendarArray.length < 6) {
      week = []
      for (let i = 0; i < 7; i++) {
        week.push(nextMonthDay++)
      }
      calendarArray.push(week)
    }

    return calendarArray
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 max-w-full w-full mx-auto">
      <div className="p-4 px-5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-medium text-gray-800"></h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button onClick={handlePrevMonth} className="p-1 rounded-full hover:bg-gray-100">
                <ChevronLeft className="h-4 w-4 text-gray-500" />
              </button>
              <span className="text-sm text-gray-600">{currentMonth}</span>
              <button onClick={handleNextMonth} className="p-1 rounded-full hover:bg-gray-100">
                <ChevronRight className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            <span className="text-sm text-gray-600">{currentYear}</span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="mb-6">
          <div className="grid grid-cols-7 mb-2 gap-x-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-xs font-medium py-1 bg-gray-100 text-gray-600">
                {day}
              </div>
            ))}
          </div>

          {calendarDays.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-x-1">
              {week.map((day, dayIndex) => {
                const isCurrentMonth =
                  day >= 1 && day <= new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
                const hasEvent = events.some((event) => event.day === day)
                const isHighlighted = hasEvent && isCurrentMonth

                return (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={cn(
                      "h-8 flex items-center justify-center text-xs border-t cursor-pointer hover:bg-gray-50",
                      isCurrentMonth ? "text-gray-700" : "text-gray-300",
                      isHighlighted && "bg-emerald-500 text-white hover:bg-emerald-600",
                      hasEvent && !isHighlighted && "font-medium",
                    )}
                    onClick={() => handleDayClick(day)}
                  >
                    {day}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* Events Section */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 mb-3">EVENTS</h3>
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs",
                      event.color,
                    )}
                  >
                    {event.day}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-800">{event.title}</p>
                    {event.description && <p className="text-xs text-gray-500">{event.description}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{event.time}</span>
                  {event.hasAttachment && (
                    <div className="w-5 h-5 rounded flex items-center justify-center bg-gray-100">
                      <Paperclip className="h-2.5 w-2.5 text-gray-500" />
                    </div>
                  )}
                  <div className="w-5 h-5 rounded flex items-center justify-center bg-orange-500 text-white">
                    <Plus className="h-2.5 w-2.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Add Event for {currentMonth} {selectedDay}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">
                Event Title
              </label>
              <Input
                id="title"
                placeholder="Enter event title"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                placeholder="Enter event description"
                value={newEventDescription}
                onChange={(e) => setNewEventDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitEvent}>Add Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
