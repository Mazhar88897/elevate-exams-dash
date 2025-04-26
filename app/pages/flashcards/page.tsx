"use client"

import * as React from "react"
import { useState } from "react"
import { Star, X, ArrowLeft, ArrowRight, Shuffle, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Utility function for class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

// CSS styles for 3D flip effect
const styles = {
  perspective: {
    perspective: "1000px",
  },
  cardContainer: {
    transformStyle: "preserve-3d" as const,
    transition: "transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },
  cardFace: {
    backfaceVisibility: "hidden" as const,
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  cardBack: {
    transform: "rotateY(180deg)",
  },
  flipped: {
    transform: "rotateY(180deg)",
  },
}

// Progress component
const Progress = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: number }>(
  ({ className, value, ...props }, ref) => (
    <div ref={ref} className={cn("relative h-1 w-full overflow-hidden bg-gray-200", className)} {...props}>
      <div className="h-full bg-green-500 transition-all" style={{ width: `${value}%` }} />
    </div>
  ),
)
Progress.displayName = "Progress"

// Button component
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "ghost" | "outline"
    size?: "default" | "sm"
  }
>(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50",
        variant === "default" && "bg-gray-900 text-white hover:bg-gray-800",
        variant === "ghost" && "bg-transparent hover:bg-gray-100",
        variant === "outline" && "border border-gray-300 bg-transparent hover:bg-gray-100",
        size === "default" && "h-10 px-4 py-2",
        size === "sm" && "h-8 px-3 text-sm",
        className,
      )}
      {...props}
    />
  )
})
Button.displayName = "Button"

// Flashcard data structure
type Flashcard = {
  question: string
  answer: string
}

type Chapter = {
  chapterName: string
  flashcards: Flashcard[]
}

type Course = {
  courseName: string
  chapters: Chapter[]
}

// Flashcard component with 3D flip effect
const FlashcardWithFlip = ({
  front,
  back,
  flipped,
  onFlip,
  onFavorite,
  favorited,
}: {
  front: string
  back: string
  flipped: boolean
  onFlip: () => void
  onFavorite: () => void
  favorited: boolean
}) => {
  return (
    <div className="w-full h-full cursor-pointer" onClick={onFlip} style={styles.perspective}>
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          ...styles.cardContainer,
          ...(flipped ? styles.flipped : {}),
        }}
      >
        {/* Front of card */}
        <div
          className="absolute w-full h-full bg-white rounded-lg flex flex-col items-center justify-center p-8"
          style={styles.cardFace}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              onFavorite()
            }}
            className="absolute top-4 right-4 text-gray-300 hover:text-yellow-400 z-10"
          >
            <Star className={cn("h-5 w-5", favorited && "fill-yellow-400 text-yellow-400")} />
          </button>
          <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-lg opacity-80" />
          <div className="relative z-10">
            <div className="text-3xl font-medium text-center text-gray-800">{front}</div>
            <div className="mt-4 text-sm text-center text-gray-500">Click to flip</div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute w-full h-full bg-white rounded-lg flex flex-col items-center justify-center p-8"
          style={{ ...styles.cardFace, ...styles.cardBack }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              onFavorite()
            }}
            className="absolute top-4 right-4 text-gray-300 hover:text-yellow-400 z-10"
          >
            <Star className={cn("h-5 w-5", favorited && "fill-yellow-400 text-yellow-400")} />
          </button>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg opacity-80" />
          <div className="relative z-10">
            <div className="text-xl font-medium text-center text-gray-800">{back}</div>
            <div className="mt-4 text-sm text-center text-gray-500">Click to flip back</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FlashcardPage() {
  // Course data
  const myCourse: Course = {
    courseName: "Introduction to TypeScript",
    chapters: [
      {
        chapterName: "Getting Started",
        flashcards: [
          { question: "What is TypeScript?", answer: "A typed superset of JavaScript." },
          { question: "Who developed TypeScript?", answer: "Microsoft." },
          { question: "What is the file extension for TypeScript files?", answer: ".ts" },
          { question: "How do you install TypeScript?", answer: "Using npm: `npm install -g typescript`" },
          { question: "How to compile a TypeScript file?", answer: "`tsc filename.ts`" },
        ],
      },
      {
        chapterName: "Basic Types",
        flashcards: [
          { question: "Name some basic types in TypeScript.", answer: "string, number, boolean, null, undefined." },
          { question: "What type is used for dynamic content?", answer: "`any` type." },
          { question: "What does `unknown` type represent?", answer: "A type-safe counterpart of `any`." },
          { question: "How to define an array of numbers?", answer: "`number[]` or `Array<number>`" },
          {
            question: "Can you assign `undefined` to a number type?",
            answer: "Not unless using `| undefined` union type.",
          },
        ],
      },
      {
        chapterName: "Functions",
        flashcards: [
          { question: "How do you specify a return type?", answer: "After the parameter list, like `(): string`." },
          { question: "What is a default parameter?", answer: "A parameter with a default value." },
          {
            question: "What is the syntax for a function with optional parameters?",
            answer: "Use `?`, like `name?: string`.",
          },
          { question: "Can functions be typed separately?", answer: "Yes, using function types." },
          { question: "What does `void` mean as a return type?", answer: "The function doesn't return anything." },
        ],
      },
      {
        chapterName: "Interfaces and Types",
        flashcards: [
          { question: "What is an interface used for?", answer: "To define object shapes/contracts." },
          { question: "How do you extend an interface?", answer: "Using `extends` keyword." },
          { question: "Can interfaces have optional properties?", answer: "Yes, with `?` syntax." },
          {
            question: "What's the difference between type and interface?",
            answer: "Types can use unions, interfaces can't.",
          },
          { question: "Can types be extended?", answer: "Yes, with intersections like `&`." },

        ],

      },

      {
        chapterName: "Advanced Features",
        flashcards: [
          { question: "What are generics?", answer: "Tools for writing reusable code with types." },
          { question: "What does `readonly` do?", answer: "Prevents modification of a property." },
          { question: "What is type assertion?", answer: "Forcibly treating a value as a specific type." },
          { question: "What is a tuple?", answer: "An array with fixed number of elements and types." },
          { question: "What is the `never` type?", answer: "Represents values that never occur." },
        ],
      },
    ],
  }

  // State
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [favorited, setFavorited] = useState(false)
  const [isChanging, setIsChanging] = useState(false)
  const [completedCards, setCompletedCards] = useState<boolean[][]>(
    myCourse.chapters.map((chapter) => Array(chapter.flashcards.length).fill(false)),
  )

  // Current flashcard
  const currentChapter = myCourse.chapters[currentChapterIndex]
  const currentFlashcard = currentChapter.flashcards[currentCardIndex]

  // Calculate total flashcards
  const totalFlashcards = myCourse.chapters.reduce((sum, chapter) => sum + chapter.flashcards.length, 0)

  // Calculate current flashcard number (across all chapters)
  const getCurrentCardNumber = () => {
    let cardNumber = 1
    for (let i = 0; i < currentChapterIndex; i++) {
      cardNumber += myCourse.chapters[i].flashcards.length
    }
    cardNumber += currentCardIndex
    return cardNumber
  }

  // Calculate progress
  const calculateProgress = () => {
    // Overall progress
    const totalCompleted = completedCards.flat().filter(Boolean).length
    const overallProgress = (totalCompleted / totalFlashcards) * 100

    // Chapter progress
    const chapterProgress = myCourse.chapters.map((chapter, idx) => {
      const completed = completedCards[idx].filter(Boolean).length
      const total = chapter.flashcards.length
      return (completed / total) * 100
    })

    return { overall: overallProgress, chapters: chapterProgress }
  }

  const progress = calculateProgress()

  // Handle navigation with animation
  const changeCard = (chapterIdx: number, cardIdx: number) => {
    setIsChanging(true)
    setFlipped(false)

    setTimeout(() => {
      setCurrentChapterIndex(chapterIdx)
      setCurrentCardIndex(cardIdx)
      setIsChanging(false)
    }, 300)
  }

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      // Previous card in same chapter
      changeCard(currentChapterIndex, currentCardIndex - 1)
    } else if (currentChapterIndex > 0) {
      // Last card of previous chapter
      const prevChapterIndex = currentChapterIndex - 1
      const prevChapterLastCardIndex = myCourse.chapters[prevChapterIndex].flashcards.length - 1
      changeCard(prevChapterIndex, prevChapterLastCardIndex)
    } else {
      // Wrap to last card of last chapter
      const lastChapterIndex = myCourse.chapters.length - 1
      const lastCardIndex = myCourse.chapters[lastChapterIndex].flashcards.length - 1
      changeCard(lastChapterIndex, lastCardIndex)
    }
  }

  const handleNext = () => {
    // Mark current card as completed
    const newCompletedCards = [...completedCards]
    newCompletedCards[currentChapterIndex][currentCardIndex] = true
    setCompletedCards(newCompletedCards)

    if (currentCardIndex < currentChapter.flashcards.length - 1) {
      // Next card in same chapter
      changeCard(currentChapterIndex, currentCardIndex + 1)
    } else if (currentChapterIndex < myCourse.chapters.length - 1) {
      // First card of next chapter
      changeCard(currentChapterIndex + 1, 0)
    } else {
      // Wrap to first card of first chapter
      changeCard(0, 0)
    }
  }

  // Handle shuffle
  const handleShuffle = () => {
    const randomChapterIndex = Math.floor(Math.random() * myCourse.chapters.length)
    const randomCardIndex = Math.floor(Math.random() * myCourse.chapters[randomChapterIndex].flashcards.length)
    changeCard(randomChapterIndex, randomCardIndex)
  }

  // Handle card flip
  const handleCardFlip = () => {
    setFlipped(!flipped)
  }

  // Handle favorite toggle
  const handleFavorite = () => {
    setFavorited(!favorited)
  }

  // Handle close
  const handleClose = () => {
    // In a real app, this would navigate away or close the modal
    console.log("Close clicked")
  }

  // Handle chapter selection
  const handleChapterSelect = (chapterIndex: number) => {
    changeCard(chapterIndex, 0)
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-[18rem] border-r mt-5 p-4 hidden md:block bg-white">
        <div className="mb-6">
          <h2 className="font-black text-slate-800 text-md mb-2">{myCourse.courseName}</h2>
       
          <Progress value={progress.overall} className="h-1.5 mt-4 rounded-full mb-4" />
        </div>

        {/* Chapters list */}
        <div className="space-y-2">
          {myCourse.chapters.map((chapter, chapterIdx) => (
            <div key={chapterIdx} className="space-y-1">
              <div
                className="flex items-center gap-2 py-1 cursor-pointer hover:bg-gray-50 rounded px-1"
                onClick={() => handleChapterSelect(chapterIdx)}
              >
                <ChevronRight className="h-4 w-4 font-black text-slate-800 " />
                <span className="text-sm font-bold text-slate-800 d">{chapter.chapterName}</span>
                <div
                 className={cn(
                  "ml-auto w-5 h-5 rounded-full  border-4  flex items-center justify-center",
                  progress.chapters[chapterIdx] === 100
                    ? "bg-green-500 border-green-500"
                    : progress.chapters[chapterIdx] > 0
                      ? "bg-white border-green-500"
                      : "bg-white border-gray-300"
                )}
                
                />
              </div>
              {/* Chapter progress bar */}
              <div className="ml-6 mr-2 rounded-full">
                <Progress value={progress.chapters[chapterIdx]} className="h-1 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        <div>
          + add notes
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Flashcard container */}
        <div className="flex-1 p-6 max-w-3xl mx-auto w-full flex flex-col">
          <div className=" rounded-lg  flex-1 flex flex-col bg-white overflow-hidden">
            {/* Card header */}
            <div className="flex justify-center flex-col items-center p-4 ">
              <div className="text-sm font-black text-gray-600">
              {getCurrentCardNumber()} / {totalFlashcards}
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-white text-gray-800 border-2 border-gray-400 text-xs font-bold px-3 py-1 rounded-full">
                {currentChapter.chapterName}
                </span>
                {/* <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button> */}
              </div>
            </div>
            {/* <div className="flex justify-between items-center p-4 border-b">
              <div className="text-sm text-gray-600">
              
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                
                </span>
                <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div> */}

            {/* Card content with 3D flip */}
            <div className="flex-1 flex flex-col font-black text-slate-800  items-center justify-center p-8 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentChapterIndex}-${currentCardIndex}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <div className="w-full h-full min-h-[300px] font-semibold text-slate-800  shadow-xl rounded-xl overflow-hidden">
                    <FlashcardWithFlip
                      front={currentFlashcard.question}
                      back={currentFlashcard.answer}
                      flipped={flipped}
                      onFlip={handleCardFlip}
                      onFavorite={handleFavorite}
                      favorited={favorited}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Card footer */}
            <div className="flex items-center justify-between p-4 ">
  {/* Left spacer */}
  <div className="w-20" />

  {/* Centered arrow buttons */}
  <div className="flex space-x-2">
    <div
      onClick={handlePrevious}
      className="w-16 h-9 border border-slate-400 rounded-full bg-white hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center"
    >
      <ArrowLeft className="w-6 h-5 font-bold" />
    </div>

    <div
      onClick={handleNext}
      className="w-16 h-9 border border-slate-400 rounded-full bg-white hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center"
    >
      <ArrowRight className="w-6 h-5 font-bold" />
    </div>
  </div>

  {/* Right-aligned Shuffle */}
  <div className="flex gap-2">
    <Button
      variant="ghost"
      size="sm"
      onClick={handleShuffle}
      disabled={isChanging}
      className="flex items-center gap-1 hover:bg-gray-100 transition-colors"
    >
      <Shuffle className="h-4 w-4" />
      <span className="hidden sm:inline text-sm font-bold">Shuffle</span>
    </Button>
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  )
}
