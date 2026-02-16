import '../styles/Selector.css'

function LevelSelector({ letter, position, onSelect, onBack }) {
  const levels = [
    { id: 'easy', label: 'קל', description: '4 זוגות' },
    { id: 'medium', label: 'בינוני', description: '6 זוגות' },
    { id: 'hard', label: 'קשה', description: '8 זוגות' }
  ]

  return (
    <div className="selector-screen">
      <h2>בחר רמת קושי</h2>
      <p className="selected-info">אות: {letter} | מיקום: {position}</p>
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
      {onBack && <button className="back-btn" onClick={onBack}>
        חזור
      </button>}
    </div>
  )
}

export default LevelSelector
