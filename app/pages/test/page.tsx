"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { Flag, AlertTriangle, X,SkipForward, ChevronDown, ChevronRight, CheckCircle2 } from "lucide-react"
import Access from "@/components/dashboardItems/access"
import Link from "next/link"
import { useSupportModal } from "@/components/dashboardItems/support-modal"
import { ChatbotModal } from "@/components/dashboardItems/chat-modal"
// Utility function for class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

// Progress component
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-2 w-full overflow-hidden rounded-full bg-gray-200", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-green-500 transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

// Button component
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "ghost"
    size?: "default" | "sm"
  }
>(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50",
        variant === "default" && "bg-green-500 text-white hover:bg-green-600",
        variant === "ghost" && "bg-transparent hover:bg-gray-100",
        size === "default" && "h-10 px-4 py-2",
        size === "sm" && "h-8 px-3 text-sm",
        className,
      )}
      {...props}
    />
  )
})
Button.displayName = "Button"

// Course data structure
interface Option {
  text: string
  isCorrect: boolean
}

interface Question {
  question: string
  options: string[]
  correctOption: string
  explanation: string
}

interface SubChapter {
  name: string
  questions: Question[]
}

interface Chapter {
  name: string
  subChapters: SubChapter[]
}

interface Course {
  courseName: string
  chapters: Chapter[]
}


function QuizPage() {
  // Course data
  const { openSupportModal } = useSupportModal()
  // Course data - restructured to include sub-chapters
  const course: Course = {
    courseName: "Introduction to TypeScript",
    chapters: [
      {
        name: "Getting Started",
        subChapters: [
          {
            name: "Introduction",
            questions: [
              {
                question: "What is TypeScript?",
                options: ["A programming language", "A database", "A CSS framework", "A text editor"],
                correctOption: "A programming language",
                explanation: "TypeScript is a strongly typed superset of JavaScript that compiles to plain JavaScript.",
              },
              {
                question: "Which extension is used for TypeScript files?",
                options: [".js", ".ts", ".tsx", ".json"],
                correctOption: ".ts",
                explanation: ".ts is the standard file extension for TypeScript files.",
              },
            ],
          },
          {
            name: "Setup",
            questions: [
              {
                question: "What does TypeScript improve over JavaScript?",
                options: ["Speed", "Type safety", "File size", "Performance"],
                correctOption: "Type safety",
                explanation:
                  "TypeScript adds static type checking to JavaScript, improving developer experience and reducing bugs.",
              },
              {
                question: "Which tool compiles TypeScript to JavaScript?",
                options: ["Webpack", "Node", "tsc", "npm"],
                correctOption: "tsc",
                explanation: "The TypeScript compiler (tsc) compiles .ts files into JavaScript.",
              },
              {
                question: "Which of the following is a TypeScript feature?",
                options: ["Dynamic typing", "Loose syntax", "Static typing", "None"],
                correctOption: "Static typing",
                explanation: "Static typing is a key feature of TypeScript.",
              },
            ],
          },
        ],
      },
      {
        name: "Basic Types",
        subChapters: [
          {
            name: "Primitive Types",
            questions: [
              {
                question: "Which is a basic type in TypeScript?",
                options: ["string", "file", "document", "element"],
                correctOption: "string",
                explanation: "TypeScript supports basic types like string, number, and boolean.",
              },
              {
                question: "How do you annotate a number type?",
                options: ["let x: int", "let x: number", "let x: float", "let x: numeric"],
                correctOption: "let x: number",
                explanation: "TypeScript uses 'number' for all numeric values.",
              },
            ],
          },
          {
            name: "Complex Types",
            questions: [
              {
                question: "What does 'any' type represent?",
                options: ["A number", "An unknown type", "A string", "A boolean"],
                correctOption: "An unknown type",
                explanation: "'any' allows any type of value, bypassing type checks.",
              },
              {
                question: "What does 'void' mean in TypeScript?",
                options: ["No return value", "A class type", "An object", "Null"],
                correctOption: "No return value",
                explanation: "Void is typically used for functions that don't return a value.",
              },
              {
                question: "Which keyword defines a constant?",
                options: ["let", "var", "def", "const"],
                correctOption: "const",
                explanation: "Use 'const' to declare constants.",
              },
            ],
          },
        ],
      },
      {
        name: "Functions",
        subChapters: [
          {
            name: "Function Basics",
            questions: [
              {
                question: "How do you define a function with types?",
                options: [
                  "function foo(): number {}",
                  "function foo => number {}",
                  "def foo() number {}",
                  "let foo: number function {}",
                ],
                correctOption: "function foo(): number {}",
                explanation: "This syntax defines the return type of the function.",
              },
              {
                question: "How to specify parameter types?",
                options: [
                  "function add(a, b): number",
                  "function add(a: number, b: number): number",
                  "function add(a number, b number): number",
                  "function add(int a, int b): number",
                ],
                correctOption: "function add(a: number, b: number): number",
                explanation: "You specify parameter types with a colon followed by the type.",
              },
            ],
          },
          {
            name: "Arrow Functions",
            questions: [
              {
                question: "What does '=> number' signify?",
                options: ["Return type", "Parameter", "Function name", "Variable type"],
                correctOption: "Return type",
                explanation: "Arrow functions in TypeScript can also specify return types this way.",
              },
              {
                question: "What is the default return type if not specified?",
                options: ["any", "void", "number", "undefined"],
                correctOption: "any",
                explanation: "If not specified, the function's return type defaults to 'any'.",
              },
              {
                question: "Which syntax defines an arrow function?",
                options: ["function() => {}", "() => {}", "=> function() {}", "fn() -> {}"],
                correctOption: "() => {}",
                explanation: "Arrow functions use the '() => {}' syntax.",
              },
            ],
          },
        ],
      },
      {
        name: "Interfaces and Types",
        subChapters: [
          {
            name: "Interface Basics",
            questions: [
              {
                question: "What is an interface in TypeScript?",
                options: [
                  "A class instance",
                  "A way to describe object structure",
                  "A styling tool",
                  "A type of function",
                ],
                correctOption: "A way to describe object structure",
                explanation: "Interfaces describe the shape of objects.",
              },
              {
                question: "How do you define an interface?",
                options: ["type User = {}", "let User = interface {}", "interface User {}", "User implements {}"],
                correctOption: "interface User {}",
                explanation: "This is the standard way to define an interface.",
              },
            ],
          },
          {
            name: "Advanced Interfaces",
            questions: [
              {
                question: "Can interfaces extend other interfaces?",
                options: ["Yes", "No", "Only classes can", "Only types can"],
                correctOption: "Yes",
                explanation: "Interfaces can extend other interfaces to add properties.",
              },
              {
                question: "Are optional properties allowed in interfaces?",
                options: ["No", "Yes, using '?'", "Only if declared 'maybe'", "Yes, using '='"],
                correctOption: "Yes, using '?'",
                explanation: "Optional properties are denoted with a '?'.",
              },
              {
                question: "Which is correct to describe an object with a name and age?",
                options: [
                  "interface Person { string name; number age; }",
                  "interface Person { name: string; age: number; }",
                  "Person = { string name, number age }",
                  "type Person = class { name: string, age: number }",
                ],
                correctOption: "interface Person { name: string; age: number; }",
                explanation: "This is the correct syntax for defining an interface.",
              },
            ],
          },
        ],
      },
      {
        name: "Advanced Features",
        subChapters: [
          {
            name: "Union Types",
            questions: [
              {
                question: "What is a union type?",
                options: ["A mix of CSS and JS", "Multiple possible types", "A class", "A method"],
                correctOption: "Multiple possible types",
                explanation: "Union types allow a variable to be more than one type using `|`.",
              },
              {
                question: "Which syntax is used for union types?",
                options: [
                  "type A = string and number",
                  "type A = string | number",
                  "type A = [string, number]",
                  "type A = {string, number}",
                ],
                correctOption: "type A = string | number",
                explanation: "The `|` operator is used to create union types.",
              },
            ],
          },
          {
            name: "Special Types",
            questions: [
              {
                question: "What is 'never' type used for?",
                options: ["Always return a value", "Throw or infinite loop", "Optional return", "Null values"],
                correctOption: "Throw or infinite loop",
                explanation: "'never' represents a value that never occurs.",
              },
              {
                question: "What are type aliases?",
                options: [
                  "Alternate interface",
                  "Shortcut to define types",
                  "Another name for variable",
                  "None of the above",
                ],
                correctOption: "Shortcut to define types",
                explanation: "Type aliases give custom names to types.",
              },
              {
                question: "Which keyword defines a type alias?",
                options: ["alias", "define", "type", "interface"],
                correctOption: "type",
                explanation: "Use 'type' keyword to define a type alias.",
              },
            ],
          },
        ],
      },
    ],
  }

  // State
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0)
  const [currentSubChapterIndex, setCurrentSubChapterIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [progress, setProgress] = useState(0)
  const [chapterProgress, setChapterProgress] = useState<number[]>(course.chapters.map(() => 0))
  const [expandedChapters, setExpandedChapters] = useState<boolean[]>(Array(course.chapters.length).fill(false))
  const [completedQuestions, setCompletedQuestions] = useState<boolean[][][]>(
    course.chapters.map((chapter) =>
      chapter.subChapters.map((subChapter) => Array(subChapter.questions.length).fill(false)),
    ),
  )
  const [flaggedQuestions, setFlaggedQuestions] = useState<boolean[][][]>(
    course.chapters.map((chapter) =>
      chapter.subChapters.map((subChapter) => Array(subChapter.questions.length).fill(false)),
    ),
  )

  // Current question data
  const currentChapter = course.chapters[currentChapterIndex]
  const currentSubChapter = currentChapter.subChapters[currentSubChapterIndex]
  const currentQuestion = currentSubChapter.questions[currentQuestionIndex]

  // Calculate total questions
  const totalQuestions = course.chapters.reduce(
    (sum, chapter) => sum + chapter.subChapters.reduce((subSum, subChapter) => subSum + subChapter.questions.length, 0),
    0,
  )

  // Calculate total progress and chapter progress
  useEffect(() => {
    // Calculate overall progress
    const completedCount = completedQuestions.flat(2).filter(Boolean).length
    setProgress((completedCount / totalQuestions) * 100)

    // Calculate progress for each chapter
    const newChapterProgress = course.chapters.map((chapter, chapterIdx) => {
      const totalChapterQuestions = chapter.subChapters.reduce(
        (sum, subChapter) => sum + subChapter.questions.length,
        0,
      )

      const completedChapterQuestions = completedQuestions[chapterIdx].flat().filter(Boolean).length
      return (completedChapterQuestions / totalChapterQuestions) * 100
    })

    setChapterProgress(newChapterProgress)
  }, [completedQuestions, totalQuestions])

  // Toggle chapter expansion
  const toggleChapter = (index: number) => {
    const newExpandedChapters = [...expandedChapters]
    newExpandedChapters[index] = !newExpandedChapters[index]
    setExpandedChapters(newExpandedChapters)
  }

  // Navigate to specific question
  const navigateToQuestion = (chapterIdx: number, subChapterIdx: number, questionIdx: number) => {
    setCurrentChapterIndex(chapterIdx)
    setCurrentSubChapterIndex(subChapterIdx)
    setCurrentQuestionIndex(questionIdx)
    setSelectedOption(null)
    setIsAnswered(false)
  }

  // Handle option selection
  const handleOptionSelect = (option: string) => {
    if (isAnswered) return

    setSelectedOption(option)
    setIsAnswered(true)

    // Mark question as completed
    const newCompletedQuestions = [...completedQuestions]
    newCompletedQuestions[currentChapterIndex][currentSubChapterIndex][currentQuestionIndex] = true
    setCompletedQuestions(newCompletedQuestions)
  }

  // Handle continue button
  const handleContinue = () => {
    setSelectedOption(null)
    setIsAnswered(false)

    // Move to next question, subchapter, or chapter
    if (currentQuestionIndex < currentSubChapter.questions.length - 1) {
      // Next question in current subchapter
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else if (currentSubChapterIndex < currentChapter.subChapters.length - 1) {
      // Next subchapter
      setCurrentSubChapterIndex(currentSubChapterIndex + 1)
      setCurrentQuestionIndex(0)
    } else if (currentChapterIndex < course.chapters.length - 1) {
      // Next chapter
      setCurrentChapterIndex(currentChapterIndex + 1)
      setCurrentSubChapterIndex(0)
      setCurrentQuestionIndex(0)
    }
  }

  // Handle skip button
  const handleSkip = () => {
    setSelectedOption(null)
    setIsAnswered(false)

    // Move to next question, subchapter, or chapter
    if (currentQuestionIndex < currentSubChapter.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else if (currentSubChapterIndex < currentChapter.subChapters.length - 1) {
      setCurrentSubChapterIndex(currentSubChapterIndex + 1)
      setCurrentQuestionIndex(0)
    } else if (currentChapterIndex < course.chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1)
      setCurrentSubChapterIndex(0)
      setCurrentQuestionIndex(0)
    }
  }

  // Handle flag button
  const handleFlag = () => {
    const newFlaggedQuestions = [...flaggedQuestions]
    newFlaggedQuestions[currentChapterIndex][currentSubChapterIndex][currentQuestionIndex] =
      !newFlaggedQuestions[currentChapterIndex][currentSubChapterIndex][currentQuestionIndex]
    setFlaggedQuestions(newFlaggedQuestions)
  }

  // Get question number out of total
  const getQuestionNumber = () => {
    let questionNumber = 1

    for (let i = 0; i < currentChapterIndex; i++) {
      for (let j = 0; j < course.chapters[i].subChapters.length; j++) {
        questionNumber += course.chapters[i].subChapters[j].questions.length
      }
    }

    for (let j = 0; j < currentSubChapterIndex; j++) {
      questionNumber += currentChapter.subChapters[j].questions.length
    }

    questionNumber += currentQuestionIndex
    return questionNumber
  }

  // Calculate subchapter progress
  const getSubChapterProgress = (chapterIdx: number, subChapterIdx: number) => {
    const subChapter = course.chapters[chapterIdx].subChapters[subChapterIdx]
    const completed = completedQuestions[chapterIdx][subChapterIdx].filter(Boolean).length
    return `${completed}/${subChapter.questions.length}`
  }

  // Check if a subchapter is complete
  const isSubChapterComplete = (chapterIdx: number, subChapterIdx: number) => {
    return completedQuestions[chapterIdx][subChapterIdx].every(Boolean)
  }

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <div className="w-64 border-r p-4 hidden md:block">
        <div className="mb-6">
          <h2 className="font-bold mt-5 text-md mb-2">{course.courseName}</h2>
          <Progress value={progress} className="h-1.5 bg-gray-200" />
        </div>

        {/* Chapter list */}

        <div className="flex h-full flex-col justify-between">
        <div className="space-y-2">
          {course.chapters.map((chapter, chapterIdx) => (
            <div key={chapterIdx} className="space-y-1">
              {/* Chapter header */}
              <button
                className="flex items-center justify-between w-full py-2 text-left  rounded-md transition-colors"
                onClick={() => toggleChapter(chapterIdx)}
              >
                <div className="flex items-center gap-2">
                  {expandedChapters[chapterIdx] ? (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="text-sm font-semibold">{chapter.name}</span>
                </div>
                <div
                  className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center",
                    chapterProgress[chapterIdx] === 100 ? "bg-green-500 text-white" : "border border-gray-300",
                  )}
                >
                  {chapterProgress[chapterIdx] === 100 && <CheckCircle2 className="h-3 w-3" />}
                </div>
              </button>

              {/* Chapter progress bar */}
              <div className="mx-2">
                <Progress value={chapterProgress[chapterIdx]} className="h-1 bg-gray-200" />
              </div>

              {/* Subchapters */}
              {expandedChapters[chapterIdx] && (
                <div className="ml-4 mt-1 space-y-1">
                  {chapter.subChapters.map((subChapter, subChapterIdx) => (
                    <div
                      key={subChapterIdx}
                      className={cn(
                        "pl-2  border-gray-200 py-1.5 rounded-md px-2 cursor-pointer",
                        currentChapterIndex === chapterIdx && currentSubChapterIndex === subChapterIdx
                          ? "font-black text-white text-sm"
                          : "",
                      )}
                      onClick={() => navigateToQuestion(chapterIdx, subChapterIdx, 0)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium">{subChapter.name}</span>
                        <span
                          className={cn(
                            "text-xs",
                            isSubChapterComplete(chapterIdx, subChapterIdx)
                              ? "text-green-500 font-semibold"
                              : "text-gray-500",
                          )}
                        >
                          {getSubChapterProgress(chapterIdx, subChapterIdx)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom actions */}
        <div className="mb-24 flex flex-col gap-2 justify-center items-center">
            <div className="text-xm font-bold">Add Notes</div>
          
  <ChatbotModal triggerButtonText="Open Chatbot" title="Customer Support" />
        </div>
       
        </div>
      </div>

      {/* Main content */}        
      <div className="flex-1 m-4 mt-12 flex flex-col">
        {/* Premium banner */}
        <div className="max-w-5xl mx-auto w-full">
       <Access />
       </div>
        {/* Progress bar */}
        <div className="max-w-3xl mx-auto w-full px-4 rounded-mid">
          <Progress value={progress} className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded-mid" />
        </div>

        {/* Question content */}
        <div className="flex-1 p-6 max-w-3xl mx-auto w-full">
          <div className="flex   justify-between items-center mb-4">
            <div className="text-sm font-black text-gray-600 dark:text-gray-300">
              Question <span className="text-green-600">{getQuestionNumber()}</span> of <span className="text-green-600">{totalQuestions}</span> 
            </div>
            <div className="flex ">
              <div className="text-gray-600 dark:text-gray-300 flex items-center " onClick={handleSkip}>
              <SkipForward className="h-3 mr-1 w-3 " strokeWidth={3} />
                <span className="text-sm font-bold">Skip</span>
              </div>
              <div
                
                className={cn(
                  "text-gray-600 dark:text-gray-300 mx-3 flex items-center ",
                  flaggedQuestions[currentChapterIndex][currentQuestionIndex] && "text-yellow-500",
                )}
                onClick={handleFlag}
              >
                <Flag className="h-3 mr-1 w-3" strokeWidth={3} />
                <span className="text-sm font-bold">Flag</span>
              </div>
              
              <Link href="/course/course-details">
              <div
               
                className={cn(
                  " flex items-center gap-1",
                   "hover:text-red-600",
                )}
                onClick={handleFlag}
              >
               
                <span className="text-sm flex items-center justify-center  rounded-mid font-black">Quit            <X className="h-4 w-4 mr-1 " strokeWidth={3} /> </span>
             
      
               
              </div>
              </Link>
            </div>
          </div>

          {/* Question */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">{currentQuestion.question}</h2>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "border rounded-md p-3 cursor-pointer",
                    selectedOption === option &&
                      option === currentQuestion.correctOption &&
                      "bg-green-50 dark:bg-black border-green-200",
                    selectedOption === option && option !== currentQuestion.correctOption && "bg-red-50 dark:bg-black border-red-200",
                    !isAnswered && "hover:border-gray-400",
                  )}
                  onClick={() => handleOptionSelect(option)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "w-5 h-5 rounded-mid text-sm font-semibold border mt-0.5 flex-shrink-0",
                        selectedOption === option && "bg-white",
                      )}
                    />
                    <div className=" text-sm font-semibold">{option}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Explanation */}
            {isAnswered && (
              <div className="mt-4 bg-green-50 dark:bg-black border border-green-200 rounded-md p-4">
                <h3 className="font-semibold text-sm mb-2">Explanation:</h3>
                <p className="font-semibold text-sm ">{currentQuestion.explanation}</p>
              </div>
            )}
          </div>

          {/* Continue button */}
          {isAnswered && (
            <div className="w-32 text-sm text-center p-1 text-slate-800 dark:text-slate-300 border font-black border-gray-300 rounded-mid" onClick={handleContinue}>
              Continue
            </div>
          )}

          {/* Report issue */}
          <div className="mt-8 text-sm text-gray-500 flex items-center gap-1">
            <span className="text-xs text-gray-700 dark:text-slate-300 font-bold">have issue in this question?</span>
            <button onClick={openSupportModal}  className="text-black dark:text-white text-xs font-black flex items-center gap-1">
              report an issue
              <AlertTriangle className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

import { SupportModalProvider } from "@/components/dashboardItems/support-modal"
const page = () => {
  return (
    <SupportModalProvider><QuizPage/></SupportModalProvider>
  )
}

export default page
