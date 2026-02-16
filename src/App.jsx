import { useState, useEffect } from 'react'
import LetterSelector from './components/LetterSelector'
import PositionSelector from './components/PositionSelector'
import LevelSelector from './components/LevelSelector'
import GameBoard from './components/GameBoard'
import wordsData from './data/words.json'

function App() {
  const [screen, setScreen] = useState('letter') // letter, position, level, game
  const [selectedLetter, setSelectedLetter] = useState(null)
  const [selectedPosition, setSelectedPosition] = useState(null)
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [gameWords, setGameWords] = useState([])

  const handleLetterSelect = (letter) => {
    setSelectedLetter(letter)
    setScreen('position')
  }

  const handleBackFromPosition = () => {
    setSelectedLetter(null)
    setScreen('letter')
  }

  const handlePositionSelect = (position) => {
    setSelectedPosition(position)
    setScreen('level')
  }

  const handleBackFromLevel = () => {
    setSelectedPosition(null)
    setScreen('position')
  }

  const handleLevelSelect = (level) => {
    setSelectedLevel(level)
    
    // Get words for the selected letter and position
    const letterPos = selectedPosition === 'beginning' ? 'beginning' : 
                      selectedPosition === 'middle' ? 'middle' : 'end'
    const availableWords = wordsData.words[selectedLetter]?.[letterPos] || []
    
    // Determine how many pairs based on level
    let pairCount = level === 'easy' ? 4 : level === 'medium' ? 6 : 8
    const selectedWords = availableWords.slice(0, pairCount)
    
    setGameWords(selectedWords)
    setScreen('game')
  }

  const handleGameEnd = () => {
    setScreen('letter')
    setSelectedLetter(null)
    setSelectedPosition(null)
    setSelectedLevel(null)
    setGameWords([])
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>משחק הזכרון בעברית</h1>
      </header>
      
      <main className="app-main">
        {screen === 'letter' && <LetterSelector onSelect={handleLetterSelect} />}
        {screen === 'position' && <PositionSelector letter={selectedLetter} onSelect={handlePositionSelect} onBack={handleBackFromPosition} />}
        {screen === 'level' && <LevelSelector letter={selectedLetter} position={selectedPosition} wordsData={wordsData} onSelect={handleLevelSelect} onBack={handleBackFromLevel} />}
        {screen === 'game' && <GameBoard words={gameWords} onGameEnd={handleGameEnd} />}
      </main>
    </div>
  )
}

export default App
