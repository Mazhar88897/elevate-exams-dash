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
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <FileText className="h-8 font-bold w-8" />
          <div>
            <h1 className="text-md font-black">Mock Exam  for Assesment</h1>
            <p className="text-sm text-muted-foreground">Domaine Name</p>
          </div>
        </div>
        <div className="bg-[#5834BD] flex items-center justify-center  py-[0.45rem] text-center font-bold text-xs text-white rounded-mid w-28 hover:bg-purple-700" onClick={() => setCurrentView("next")}>
          <p>Next</p> <ChevronRight className="h-4 w-4 font-black text-white" />
        </div>
      </div>


      <div className="space-y-4 text-sm font-semibold text-slate-800">
        <p>once in the exam it should be ONLY exam questions, flag options, pause option, back/forward for questions  No chapter panel. Once in the exam it should be ONLY exam questions, flag options, pause option, back/forward for questions  No chapter panel. Once in the exam it should be ONLY exam questions, flag options, pause option, back/forward for questions  No chapter panel.</p>
        <p>
          Pocket Prep's subject matter experts developed this content to prepare you for the types of questions you will
          see on the official examination. We aim to cover all testing materials on the AMFTBB MFT Content Outline.
        </p>
        <p className="font-medium text-slate-400">Warning: You will NOT see these exam questions on exam day.</p>
      </div>

      <div className="space-y-4 my-8 ">
        <div className="flex justify-between items-center">
        <Link href="/pages/assesment" className="w-full max-w-xs md:max-w-md rounded-mid hover:cursor-pointer p-3 border border-slate-800 text-center text-slate-800 text-sm font-bold" onClick={()=>{}}>Mock Exam Test - Chapter 1</Link>
          
        </div>
        <div className="flex justify-between items-center">
          <Link href="/pages/assesment" className="w-full max-w-xs md:max-w-md rounded-mid hover:cursor-pointer p-3 border text-center border-slate-800 text-slate-800 text-sm font-bold" onClick={()=>{}}>Mock Exam Test - Chapter 2</Link>
          
        </div>
        <div className="flex justify-between items-center">
          <Link href="/pages/assesment" className="w-full max-w-xs md:max-w-md rounded-mid hover:cursor-pointer p-3 border text-center text-slate-800 text-sm border-slate-800 font-bold" onClick={()=>{}}>Mock Exam Test - Chapter 3</Link>
          
        </div>

        
      </div>


    </div>
  )

  // Next view content
  const renderNextView = () => (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h1 className="text-2xl font-bold mb-4">Next Page</h1>
        <p className="mb-6">This is the content you see after clicking the "Next" button.</p>
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
