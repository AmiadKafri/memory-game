import { useState, useEffect } from 'react'
import Card from './Card'
import '../styles/GameBoard.css'

function GameBoard({ words, onGameEnd }) {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [startTime, setStartTime] = useState(Date.now())
  const [gameWon, setGameWon] = useState(false)
  const [showingMatch, setShowingMatch] = useState(null)

  // Initialize game
  useEffect(() => {
    initializeGame()
  }, [words])

  // Check for match when two cards are flipped
  useEffect(() => {
    if (flipped.length === 2) {
      setMoves(prev => prev + 1)
      const [first, second] = flipped
      const firstCard = cards[first]
      const secondCard = cards[second]

      if (firstCard.pairId === secondCard.pairId) {
        // Match found - show the pair for 1.5 seconds
        setShowingMatch(firstCard.pairId)
        setTimeout(() => {
          setMatched(prev => [...prev, firstCard.pairId])
          setFlipped([])
          setShowingMatch(null)
        }, 1500)
      } else {
        // No match - flip back after delay
        setTimeout(() => {
          setFlipped([])
        }, 1000)
      }
    }
  }, [flipped, cards])

  // Check for win condition
  useEffect(() => {
    if (matched.length > 0 && matched.length === words.length) {
      setGameWon(true)
    }
  }, [matched, words.length])

  const initializeGame = () => {
    // Create pairs of cards
    const cardPairs = words.flatMap((wordObj, index) => [
      { id: Math.random(), word: wordObj.word, emoji: wordObj.emoji, pairId: index },
      { id: Math.random(), word: wordObj.word, emoji: wordObj.emoji, pairId: index }
    ])

    // Shuffle cards
    const shuffled = cardPairs.sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setGameWon(false)
  }

  const handleCardClick = (index) => {
    if (flipped.includes(index) || matched.includes(cards[index].pairId)) {
      return // Card is already flipped or matched
    }

    if (flipped.length < 2) {
      setFlipped([...flipped, index])
    }
  }

  const handlePlayAgain = () => {
    initializeGame()
  }

  const handleChangeGame = () => {
    onGameEnd()
  }

  const elapsedTime = Math.floor((Date.now() - startTime) / 1000)
  const minutes = Math.floor(elapsedTime / 60)
  const seconds = elapsedTime % 60

  return (
    <div className="game-board">
      <div className="game-stats">
        <div className="stat">
          <span className="stat-label">נסיונות:</span>
          <span className="stat-value">{moves}</span>
        </div>
        <div className="stat">
          <span className="stat-label">זמן:</span>
          <span className="stat-value">{minutes}:{seconds.toString().padStart(2, '0')}</span>
        </div>
        <div className="stat">
          <span className="stat-label">התאמות:</span>
          <span className="stat-value">{matched.length}/{words.length}</span>
        </div>
        <button className="menu-btn" onClick={handleChangeGame} title="חזרה לתפריט הראשי">
          🏠 תפריט ראשי
        </button>
      </div>

      <div className="cards-grid">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            word={card.word}
            emoji={card.emoji}
            isFlipped={flipped.includes(index) || matched.includes(card.pairId) || showingMatch === card.pairId}
            isMatched={matched.includes(card.pairId)}
            isShowingMatch={showingMatch === card.pairId}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>

      {gameWon && (
        <div className="win-overlay">
          <div className="win-modal">
            <h2>כל הכבוד!</h2>
            <p>סיימת את המשחק!</p>
            <p>נסיונות: {moves}</p>
            <p>זמן: {minutes}:{seconds.toString().padStart(2, '0')}</p>
            <div className="modal-buttons">
              <button onClick={handlePlayAgain} className="btn btn-primary">
                שחק שוב
              </button>
              <button onClick={handleChangeGame} className="btn btn-secondary">
                משחק חדש
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GameBoard
