import '../styles/Selector.css'

function LetterSelector({ onSelect }) {
  const hebrewLetters = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר', 'ש', 'ת']

  return (
    <div className="selector-screen">
      <h2>בחר אות</h2>
      <div className="letters-grid">
        {hebrewLetters.map((letter) => (
          <button
            key={letter}
            className="letter-btn"
            onClick={() => onSelect(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  )
}

export default LetterSelector
