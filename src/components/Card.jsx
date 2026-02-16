import '../styles/Card.css'

function Card({ word, emoji, isFlipped, isMatched, onClick, isShowingMatch }) {
  return (
    <div
      className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''} ${isShowingMatch ? 'showing-match' : ''}`}
      onClick={onClick}
    >
      <div className="card-inner">
        <div className="card-front">?</div>
        <div className="card-back">
          {isMatched ? (
            <div className="card-success">✓</div>
          ) : (
            <div className="card-content">
              <div className="card-emoji">{emoji}</div>
              <div className="card-word">{word}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
