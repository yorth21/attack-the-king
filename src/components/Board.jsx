import king from "../assets/king.png";
import knight from "../assets/knight.png";

export function Board({ handleSelectSquare, horsePositions, kingPosition }) {
  const chessBoard = [];
  let squareColor = true;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      squareColor = !squareColor;
      const square = {
        x: col + 1,
        y: 8 - row,
        isBorder: row === 0 || row === 7 || col === 0 || col === 7,
        color: squareColor,
      };
      chessBoard.push(square);
    }
    squareColor = !squareColor;
  }

  return (
    <div className="chess-board">
      {chessBoard.map((square, index) => (
        <button
          key={index}
          className={`square ${square.color ? "square-light" : "square-dark"}`}
          onClick={() => handleSelectSquare(square)}
        >
          {horsePositions.map((position, horseIndex) =>
            position.x === square.x && position.y === square.y ? (
              <span
                className="icon"
                key={horseIndex}
                role="img"
                aria-label="horse"
              >
                <img src={knight} alt="Horse" />
              </span>
            ) : null
          )}
          {kingPosition.x === square.x && kingPosition.y === square.y ? (
            <span className="icon" role="img" aria-label="king">
              <img src={king} alt="King" />
            </span>
          ) : null}
        </button>
      ))}
    </div>
  );
}
