import '../styles/Selector.css'

function LevelSelector({ letter, position, wordsData, onSelect, onBack }) {
  // Get available words count
  let availableWords = []
  
  if (position === 'all') {
    // Combine words from all positions (beginning, middle, end)
    const beginning = wordsData.words[letter]?.['beginning'] || []
    const middle = wordsData.words[letter]?.['middle'] || []
    const end = wordsData.words[letter]?.['end'] || []
    availableWords = [...beginning, ...middle, ...end]
  } else {
    // Single position
    const letterPos = position === 'beginning' ? 'beginning' : 
                      position === 'middle' ? 'middle' : 'end'
    availableWords = wordsData.words[letter]?.[letterPos] || []
  }
  
  const wordCount = availableWords.length
  
  const allLevels = [
    { id: 'easy', label: 'קל', description: '4 זוגות', minWords: 4 },
    { id: 'medium', label: 'בינוני', description: '6 זוגות', minWords: 6 },
    { id: 'hard', label: 'קשה', description: '8 זוגות', minWords: 8 }
  ]
  
  // Filter levels based on available words
  const levels = allLevels.filter(level => wordCount >= level.minWords)

  return (
    <div className="selector-screen">
      <h2>בחר רמת קושי</h2>
      <p className="selected-info">אות: {letter} | מיקום: {position === 'all' ? 'כל המיקומים' : position === 'beginning' ? 'תחילה' : position === 'middle' ? 'אמצע' : 'סוף'}</p>
      {levels.length === 0 ? (
        <div className="no-words-message">
          <p>אין מספיק מילים לשילוב זה 😔</p>
          <p>נמצאו רק {wordCount} מילים</p>
        </div>
      ) : (
        <div className="options-grid">
          {levels.map((level) => (
            <button
              key={level.id}
              className="option-btn"
              onClick={() => onSelect(level.id)}
            >
              <div className="option-label">{level.label}</div>
              <div className="option-description">{level.description}</div>
            </button>
          ))}
        </div>
      )}
      {onBack && <button className="back-btn" onClick={onBack}>
        חזור
      </button>}
    </div>
  )
}

export default LevelSelector
