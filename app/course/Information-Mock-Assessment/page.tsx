"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, ArrowLeft } from "lucide-react"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
export default function MockAssessmentPage() {
  // State to track which view is currently showing
  const [currentView, setCurrentView] = useState("main")
  // State to track which result is being viewed (if any)
  const [resultId, setResultId] = useState<string | null>(null)

  // Function to handle viewing a result
  const handleViewResult = (id: string) => {
    setResultId(id)
    setCurrentView("result")
  }

  // Function to go back to main view
  const handleBack = () => {
    setCurrentView("main")
    setResultId(null)
  }

  // Main view content
  const renderMainView = () => (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="">
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <FileText className="h-8 font-bold w-8" />
          <div>
            <h1 className="text-md font-black">Information of Mock Assessment</h1>
            <p className="text-sm text-muted-foreground">Domaine Name</p>
          </div>
        </div>
        < Link href="/pages/Mock-Exam-Assesment" className="bg-[#5834BD] flex items-center justify-center  py-[0.45rem] text-center font-bold text-xs text-white rounded-mid w-28 hover:bg-purple-700" >
          <p>Next</p> <ChevronRight className="h-4 w-4 font-black text-white" />
        </Link>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center">
        < Link href="/course/Information-Mock-Assessment/assesment" className="w-full border-slate-800 max-w-xs md:max-w-md rounded-mid hover:cursor-pointer p-3 border text-center text-slate-800 text-sm font-bold" onClick={()=>{}}>length of exam - 140</Link>
        {/* <Link href="/course/result" className="text-right hover:text-[#5834BD]" >
            <span className="text-sm font-medium">View result</span>
          </Link> */}
        </div>

        <div className="flex justify-between items-center">
        < Link href="/course/Information-Mock-Assessment/assesment" className="w-full border-slate-800 max-w-xs md:max-w-md rounded-mid hover:cursor-pointer p-3 border text-center text-slate-800 text-sm font-bold" onClick={()=>{}}>length of exam - 140</Link>
          {/* <Link href="/course/result" className="text-right hover:text-[#5834BD]" >
            <span className="text-sm font-medium">View result</span>
          </Link> */}
        </div>

        <div className="flex justify-between items-center">
        < Link href="/course/Information-Mock-Assessment/assesment" className="w-full border-slate-800 max-w-xs md:max-w-md rounded-mid hover:cursor-pointer p-3 border text-center text-slate-800 text-sm font-bold" onClick={()=>{}}>length of exam - 140</Link>
        {/* <Link href="/course/result" className="text-right hover:text-[#5834BD]" >
            <span className="text-sm font-medium">View result</span>
          </Link> */}
        </div>
      </div>

      <div className="space-y-4 text-sm font-semibold text-slate-800">
        <p>Our mock exam imitates both the time limit and question count of the AMFTBB MFT exam.</p>
        <p>
          Pocketubject matter experts developed this content to prepare you for the types of questions you will
          see on the official examination. We aim to cover all testing materials on the AMFTBB MFT Content Outline.
        </p>
        <p className="font-medium text-slate-400">Warning: You will NOT see these exam questions on exam day.</p>
      </div>
      </div>
    </div>
  )

  // Next view content
  const renderNextView = () => (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h1 className="text-2xl font-bold mb-4">Next Page</h1>
        <p className="mb-6">This is the content you see after clicking the Next button.</p>
        <Button onClick={handleBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Mock Assessment
        </Button>
      </div>
    </div>
  )

  // Result view content
  const renderResultView = () => {
    const isRecent = resultId === "recent"

    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <h1 className="text-2xl font-bold mb-4">{isRecent ? "Recent Results (03)" : `Result Page ${resultId}`}</h1>
          <p className="mb-6">
            This displays the {isRecent ? "recent" : ""} results for mock assessment {resultId}.
          </p>
          <Button onClick={handleBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Mock Assessment
          </Button>
        </div>
      </div>
    )
  }

  // Render the appropriate view based on current state
  return (
    <>
      {currentView === "main" && renderMainView()}
      {currentView === "next" && renderNextView()}
      {currentView === "result" && renderResultView()}
    </>
  )
}
