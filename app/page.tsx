'use client'

import { useState, useEffect } from 'react'

const messages = [
  '> coming soon is coming soon',
  '> what is time anyway, it will come before GTA 6',
  '> status: slightly better than 404',
]

export default function Home() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (currentLineIndex >= messages.length) {
      setIsTyping(false)
      return
    }

    const currentMessage = messages[currentLineIndex]
    const typingSpeed = 50 // ms per character

    if (currentText.length < currentMessage.length) {
      const timer = setTimeout(() => {
        setCurrentText(currentMessage.slice(0, currentText.length + 1))
      }, typingSpeed)

      return () => clearTimeout(timer)
    } else {
      // Move to next line after a pause
      const timer = setTimeout(() => {
        setDisplayedLines([...displayedLines, currentText])
        setCurrentText('')
        setCurrentLineIndex(currentLineIndex + 1)
      }, 800)

      return () => clearTimeout(timer)
    }
  }, [currentText, currentLineIndex, displayedLines])

  return (
    <main className="container">
      <div className="terminal">
        {displayedLines.map((line, index) => (
          <div key={index} className="line">
            <span className="text">{line}</span>
          </div>
        ))}
        {isTyping && (
          <div className="line">
            <span className="text">{currentText}</span>
            <span className="cursor">_</span>
          </div>
        )}
        {!isTyping && (
          <div className="link">
            <a href="https://x.com/LazyShivam" target="_blank" rel="noopener noreferrer">x.com/LazyShivam</a>
          </div>
        )}
      </div>
    </main>
  )
}
