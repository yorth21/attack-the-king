import { useState } from "react";
import "./App.css";
import { Board } from "./components/Board";
import { Button } from "./components/Button";
import { Header } from "./components/Header";
import { Piece } from "./components/Piece";
import { buscarCamino } from "./logic/buscarCamino";
import { Info } from "./components/Info";

function App() {
  const [pieceSelect, setPieceSelect] = useState("king");
  const [horsePositions, setHorsePositions] = useState([]);
  const [countHorse, setCountHorse] = useState(4);
  const [kingPosition, setKingPosition] = useState({ x: 0, y: 0 });
  const [countKing, setCountKing] = useState(1);
  const [countMovimientos, setCountMovimientos] = useState(0);
  const [disabledButton, setDisabledButton] = useState(false);
  const [lists, setLists] = useState({ listaAbierta: 0, listaCerrada: 0 });

  const savePositionHorse = (square) => {
    if (kingPosition.x === square.x && kingPosition.y === square.y) {
      console.log("No pongas una ficha encima de otra");
      return;
    }
    const newHorses = [...horsePositions];
    const index = horsePositions.findIndex(
      (horse) => horse.x === square.x && horse.y === square.y
    );
    if (index !== -1) {
      newHorses.splice(index, 1);
    } else {
      if (horsePositions.length < 4) {
        newHorses.push(square);
      }
    }
    setHorsePositions(newHorses);
    setCountHorse(4 - newHorses.length);
  };

  const savePositionKing = (square) => {
    if (
      horsePositions.find(
        (horse) => horse.x === square.x && horse.y === square.y
      )
    ) {
      console.log("No pongas una ficha encima de otra");
      return;
    }
    if (square.isBorder === true) {
      setKingPosition(square);
      setCountKing(0);
    } else {
      console.log("Solo puede estar ubicado en los bordes");
    }
  };

  const handleSelectSquare = (square) => {
    // Validar si es rey o caballo
    if (pieceSelect === "king") {
      savePositionKing(square);
    } else {
      savePositionHorse(square);
    }
  };

  const handlePieceSelect = (piece) => {
    setPieceSelect(piece);
  };

  const moveHorses = (posiciones) => {
    setHorsePositions(posiciones);
  };

  const playGame = () => {
    console.log("play game");
    // Validar que los datos ya esten llenos
    if (
      horsePositions.length === 4 &&
      kingPosition.x !== 0 &&
      kingPosition.y !== 0
    ) {
      setDisabledButton(true);
      console.log("datos llenos");
      const camino = buscarCamino(horsePositions, kingPosition);
      if (!camino) {
        console.log("fichas superpuestas");
        return;
      }
      console.log("camino encontrado");
      const posicionesCaballos = camino.caminoCaballos.map((posiciones) => {
        return posiciones.caballos;
      });
      setLists({
        listaAbierta: camino.listaAbierta,
        listaCerrada: camino.listaCerrada,
      });
      let counter = 0;
      const interval = setInterval(() => {
        moveHorses(posicionesCaballos[counter]);
        setCountMovimientos(counter);
        counter++;
        if (counter === posicionesCaballos.length) {
          clearInterval(interval);
          setDisabledButton(false);
        }
      }, 1500);
    } else {
      console.log("No has llenado los datos");
      return;
    }
  };

  const resetGame = () => {
    setHorsePositions([]);
    setKingPosition({ x: 0, y: 0 });
    setCountMovimientos(0);
    setCountHorse(4);
    setCountKing(1);
    setLists({ listaAbierta: 0, listaCerrada: 0 });
    console.log("reset game");
  };

  return (
    <div className="container">
      <div className="content">
        <Header />
        <div className="btn-pieces">
          <Piece
            name="king"
            count={countKing}
            pieceSelect={pieceSelect}
            handlePieceSelect={handlePieceSelect}
          />
          <Piece
            name="knight"
            count={countHorse}
            pieceSelect={pieceSelect}
            handlePieceSelect={handlePieceSelect}
          />
        </div>
        <Info
          countMovimientos={countMovimientos}
          listaAbierta={lists.listaAbierta}
          listaCerrada={lists.listaCerrada}
        />
        <Board
          handleSelectSquare={handleSelectSquare}
          horsePositions={horsePositions}
          kingPosition={kingPosition}
        />
        <div className="btn-game">
          <Button
            classNameButton="primary"
            handleClickButton={playGame}
            disabledButton={disabledButton}
          >
            Play Game
          </Button>
          <Button
            classNameButton="outline"
            handleClickButton={resetGame}
            disabledButton={disabledButton}
          >
            Reset Game
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
