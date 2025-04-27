"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, LucideArrowRight } from "lucide-react"
import { useWindowSize } from "@/hooks/use-window-size"
import CalendarSchedule from "@/components/dashboardItems/calender"
import Access from "@/components/dashboardItems/access"
import Link from "next/link"
interface Course {
    id: number;
    title: string;
    category: string;
    badge: string;
    progress: number;
    total: number;
  }
// Course data

const inProgressCourses = [
  {
    id: 1, 
    title: "Learn Python Intermediate with elevate exams",
    category: "IT & CYBERSECURITY",
    badge: "A",
    progress: 65,
    total: 85,
  },
  {
    id: 2,
    title: "Advanced JavaScript Frameworks",
    category: "IT & CYBERSECURITY",
    badge: "A",
    progress: 42,
    total: 60,
  },
  {
    id: 3,
    title: "Cloud Computing Fundamentals",
    category: "IT & CYBERSECURITY",
    badge: "A",
    progress: 28,
    total: 50,
  },
  {
    id: 4,
    title: "Data Structures and Algorithms",
    category: "IT & CYBERSECURITY",
    badge: "A",
    progress: 75,
    total: 90,
  },
  {
    id: 5,
    title: "Machine Learning Basics",
    category: "IT & CYBERSECURITY",
    badge: "A",
    progress: 15,
    total: 40,
  },
  {
    id: 6,
    title: "Web Security Essentials",
    category: "IT & CYBERSECURITY",
    badge: "A",
    progress: 50,
    total: 70,
  },
]

const popularCourses = [
  {
    id: 1,
    title: "Python for Data Science",
    category: "IT & CYBERSECURITY",
    badge: "A",
    progress: 0,
    total: 75,
  },
  {
    id: 2,
    title: "Full Stack Web Development",
    category: "IT & CYBERSECURITY",
    badge: "A",
    progress: 0,
    total: 90,
  },
  {
    id: 3,
    title: "Cybersecurity Fundamentals",
    category: "IT & CYBERSECURITY",
    badge: "A",
    progress: 0,
    total: 65,
  },
  {
    id: 4,
    title: "DevOps and CI/CD Pipelines",
    category: "IT & CYBERSECURITY",
    badge: "A",
    progress: 0,
    total: 80,
  },
  {
    id: 5,
    title: "Mobile App Development",
    category: "IT & CYBERSECURITY",
    badge: "A",
    progress: 0,
    total: 70,
  },
]

export default function Dashboard() {
  // State for tracking visible cards
  const [inProgressIndex, setInProgressIndex] = useState(0)
  const [popularIndex, setPopularIndex] = useState(0)
  const windowSize = useWindowSize()
  const [visibleCards, setVisibleCards] = useState(4)

  // Update visible cards count based on window size
  useEffect(() => {
    if (windowSize.width) {
      if (windowSize.width >= 1024) {
        setVisibleCards(4) // lg screens
      } else if (windowSize.width >= 640) {
        setVisibleCards(2) // sm screens
      } else {
        setVisibleCards(1) // xs screens
      }
    }
  }, [windowSize.width])

  // Navigation handlers for in-progress courses
  const handleInProgressPrev = () => {
    if (inProgressIndex > 0) {
      setInProgressIndex(inProgressIndex - 1)
    }
  }

  const handleInProgressNext = () => {
    if (inProgressIndex < inProgressCourses.length - visibleCards) {
      setInProgressIndex(inProgressIndex + 1)
    }
  }

  // Navigation handlers for popular courses
  const handlePopularPrev = () => {
    if (popularIndex > 0) {
      setPopularIndex(popularIndex - 1)
    }
  }

  const handlePopularNext = () => {
    if (popularIndex < popularCourses.length - visibleCards) {
      setPopularIndex(popularIndex + 1)
    }
  }

  // Check if buttons should be disabled
  const isInProgressPrevDisabled = inProgressIndex === 0
  const isInProgressNextDisabled = inProgressIndex >= inProgressCourses.length - visibleCards
  const isPopularPrevDisabled = popularIndex === 0
  const isPopularNextDisabled = popularIndex >= popularCourses.length - visibleCards

  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between  p-4 md:p-6">
        <h1 className="text-lg  px-10  md:px-2  font-bold">Welcome Back, John Doe</h1>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white">J</div>
          <span className="hidden md:inline text-sm text-gray-600">John Drew</span>
        </div>
      </header>

      <main className="px-4 md:px-6 pb-8 max-w-7xl mx-auto">
        {/* Unlock Access Banner */}
        <Access />

        {/* Courses in Progress */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Courses in progress</h2>
            <div className="flex gap-2">
              <button
                className={`h-8 w-8 rounded-full border flex items-center justify-center ${
                  isInProgressPrevDisabled
                    ? "text-gray-300 border-gray-200 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
                onClick={handleInProgressPrev}
                disabled={isInProgressPrevDisabled}
                aria-label="Previous courses"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                className={`h-8 w-8 rounded-full border flex items-center justify-center ${
                  isInProgressNextDisabled
                    ? "text-gray-300 border-gray-200 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
                onClick={handleInProgressNext}
                disabled={isInProgressNextDisabled}
                aria-label="Next courses"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {inProgressCourses.slice(inProgressIndex, inProgressIndex + visibleCards).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* Popular Courses */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Popular Courses</h2>
            <div className="flex gap-2">
              <button
                className={`h-8 w-8 rounded-full border flex items-center justify-center ${
                  isPopularPrevDisabled
                    ? "text-gray-300 border-gray-200 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
                onClick={handlePopularPrev}
                disabled={isPopularPrevDisabled}
                aria-label="Previous popular courses"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                className={`h-8 w-8 rounded-full border flex items-center justify-center ${
                  isPopularNextDisabled
                    ? "text-gray-300 border-gray-200 cursor-not-allowed"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
                onClick={handlePopularNext}
                disabled={isPopularNextDisabled}
                aria-label="Next popular courses"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularCourses.slice(popularIndex, popularIndex + visibleCards).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
        <section>
        <div className="flex flex-col  justify-between mb-4">
        <h2 className="text-lg font-bold mb-6">Popular Courses</h2>
        <CalendarSchedule />
        </div>
        </section>
      </main>
    </div>
  )
}

type CourseCardProps = {
    course: Course;
  };

function CourseCard({ course }: CourseCardProps) {
  const progressPercentage = (course.progress / course.total) * 100

  return (
    <Card className="overflow-hidden ">
      <CardHeader className="p-3 pb-0">
        <div className="flex items-center justify-between">
          <div className="bg-[#E4E3FF]   text-xs px-3 py-1 rounded-[30px] text-black font-bold">{course.category}</div>
          <div className="bg-red-500 text-white h-6 w-6 rounded-full flex items-center justify-center text-xs">
            {course.badge}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <h3 className="font-semibold text-sm mb-2">{course.title}</h3>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
          <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between items-center text-xs text-gray-500">
        <span>
          <span className="font-bold ">{course.progress}{" "}</span>/{course.total}
        </span>
        <Link href="/course/course-details" className="flex font-bold bg-white text-black border-2 px-1 py-[0.1rem] rounded-mid items-center gap-1">
          Continue
          <div className="border-2 border-black rounded-full p-[0.1rem]"><LucideArrowRight className="h-2 w-2" strokeWidth={3} /></div>
          
        </Link>
      </CardFooter>
    </Card>
  )
}
