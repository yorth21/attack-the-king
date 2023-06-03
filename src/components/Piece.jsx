import king from "../assets/king.png";
import knight from "../assets/knight.png";

export function Piece({ name, count, pieceSelect, handlePieceSelect }) {
  const classBtnPiece = `btn-piece ${
    pieceSelect === name ? "piece-select" : ""
  }`;

  return (
    <button className={classBtnPiece} onClick={() => handlePieceSelect(name)}>
      <img src={name === "king" ? king : knight} alt={name} />
      <span>{count}</span>
    </button>
  );
}
