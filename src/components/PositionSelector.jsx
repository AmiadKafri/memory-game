import '../styles/Selector.css'

function PositionSelector({ letter, onSelect, onBack }) {
  const positions = [
    { id: 'beginning', label: 'תחילת המילה', description: '(האות בתחילה)' },
    { id: 'middle', label: 'אמצע המילה', description: '(האות באמצע)' },
    { id: 'end', label: 'סוף המילה', description: '(האות בסוף)' },
    { id: 'all', label: 'כל המיקומים', description: '(תחילה, אמצע וסוף)' }
  ]

  return (
    <div className="selector-screen">
      <h2>בחר מיקום לאות {letter}</h2>
      <div className="options-grid">
        {positions.map((position) => (
          <button
            key={position.id}
            className="option-btn"
            onClick={() => onSelect(position.id)}
          >
            <div className="option-label">{position.label}</div>
            <div className="option-description">{position.description}</div>
          </button>
        ))}
      </div>
      {onBack && <button className="back-btn" onClick={onBack}>
        חזור
      </button>}
    </div>
  )
}

export default PositionSelector
