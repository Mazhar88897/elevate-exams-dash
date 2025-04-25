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
interface Flashcard {
  front: string
  back: string
  category: string
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
  // Flashcard data
  const flashcards: Flashcard[] = [
    {
      front: "What is Cybersecurity?",
      back: "The practice of protecting systems, networks, and data from digital attacks",
      category: "IT & Cybersecurity",
    },
    {
      front: "What is a Firewall?",
      back: "A network security device that monitors and filters incoming and outgoing network traffic",
      category: "IT & Cybersecurity",
    },
    {
      front: "What is Encryption?",
      back: "The process of converting information or data into a code to prevent unauthorized access",
      category: "IT & Cybersecurity",
    },
    {
      front: "What is Malware?",
      back: "Software designed to disrupt, damage, or gain unauthorized access to a computer system",
      category: "IT & Cybersecurity",
    },
    {
      front: "What is Phishing?",
      back: "A technique for attempting to acquire sensitive data through a fraudulent solicitation",
      category: "IT & Cybersecurity",
    },
    {
      front: "Flashcard",
      back: "A card containing a small amount of information, used as an aid in memorization",
      category: "IT & Cybersecurity",
    },
    {
      front: "What is a VPN?",
      back: "A Virtual Private Network extends a private network across a public network, enabling users to send and receive data as if their devices were directly connected to the private network",
      category: "IT & Cybersecurity",
    },
    {
      front: "What is a DDoS Attack?",
      back: "A Distributed Denial of Service attack attempts to disrupt normal traffic to a targeted server by overwhelming it with a flood of internet traffic",
      category: "IT & Cybersecurity",
    },
    {
      front: "What is Social Engineering?",
      back: "The psychological manipulation of people into performing actions or divulging confidential information",
      category: "IT & Cybersecurity",
    },
    {
      front: "What is a Zero-day Exploit?",
      back: "An attack that exploits a previously unknown vulnerability in software or hardware",
      category: "IT & Cybersecurity",
    },
  ]

  // State
  const [currentIndex, setCurrentIndex] = useState(5) // Start with the 6th card (index 5) to match the image
  const [flipped, setFlipped] = useState(false)
  const [favorited, setFavorited] = useState(false)
  const [completedCards, setCompletedCards] = useState<boolean[]>(Array(flashcards.length).fill(false))
  const [isChanging, setIsChanging] = useState(false)

  // Current flashcard
  const currentFlashcard = flashcards[currentIndex]
  const totalFlashcards = flashcards.length

  // Calculate progress
  const progress = (completedCards.filter(Boolean).length / totalFlashcards) * 100

  // Handle navigation with animation
  const changeCard = (newIndex: number) => {
    setIsChanging(true)
    setFlipped(false)

    setTimeout(() => {
      setCurrentIndex(newIndex)
      setIsChanging(false)
    }, 300)
  }

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? flashcards.length - 1 : currentIndex - 1
    changeCard(newIndex)
  }

  const handleNext = () => {
    // Mark current card as completed
    const newCompletedCards = [...completedCards]
    newCompletedCards[currentIndex] = true
    setCompletedCards(newCompletedCards)

    const newIndex = currentIndex === flashcards.length - 1 ? 0 : currentIndex + 1
    changeCard(newIndex)
  }

  // Handle shuffle
  const handleShuffle = () => {
    const randomIndex = Math.floor(Math.random() * flashcards.length)
    changeCard(randomIndex)
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 p-4 hidden md:block bg-white">
        <div className="mb-6">
          <h2 className="font-medium text-sm mb-2">
            Cybersecurity is the practice of protecting systems, networks, and data from digital attacks
          </h2>
          <div className="h-0.5 w-12 bg-green-500 mb-4"></div>
        </div>

        {/* Orientation list */}
        <div className="space-y-2">
          {Array(5)
            .fill(0)
            .map((_, idx) => (
              <div key={idx} className="flex items-center gap-2 py-1">
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className="text-sm">Welcome Orientation</span>
                <div
                  className={cn(
                    "ml-auto w-5 h-5 rounded-full border flex items-center justify-center",
                    idx < 4 ? "bg-green-500 border-green-500" : "bg-white border-gray-300",
                  )}
                />
              </div>
            ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Flashcard container */}
        <div className="flex-1 p-6 max-w-3xl mx-auto w-full flex flex-col">
          <div className=" rounded-mid shadow-lg flex-1 flex flex-col bg-white overflow-hidden">
            {/* Card header */}
            <div className="flex justify-center flex-col items-center p-4 border-b">
              <div className="text-sm font-black text-gray-600">
                {currentIndex + 1} / {totalFlashcards}
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-white text-gray-800 border-2 border-gray-400 text-xs font-bold px-3 py-1 rounded-full">
                  {currentFlashcard.category}
                </span>
                {/* <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button> */}
              </div>
            </div>

            {/* Card content with 3D flip */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <div className="w-full h-full min-h-[300px] shadow-xl rounded-xl overflow-hidden">
                    <FlashcardWithFlip
                      front={currentFlashcard.front}
                      back={currentFlashcard.back}
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
            <div className="flex justify-between items-center p-4 border-t">
              <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add note
              </button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={isChanging}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  disabled={isChanging}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShuffle}
                  disabled={isChanging}
                  className="flex items-center gap-1 hover:bg-gray-100 transition-colors"
                >
                  <Shuffle className="h-4 w-4" />
                  <span className="hidden sm:inline">Shuffle</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
