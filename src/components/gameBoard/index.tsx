import Header from "@/src/layout/header";
import { board, tileClasses } from "@/src/lib/constant";
import { addRandomTile, boardsEqual, getInitialRandomTile, moveAndMerge, transpose } from "@/src/service";
import { useEffect, useMemo, useState } from "react";



const GameBoard = () => {
  const [tiles, setTiles] = useState<number[][]>(board);
  const [score,setScore] = useState<number>(0)
  const [bestScore,setBestScore] = useState<number>(0)

  useEffect(() => {
    // Get initial two random tiles as flat indices
    if(typeof window !== "undefined"){
      localStorage.setItem("score","0")
      const best = Number(localStorage.getItem("bestScore")) || 0
      setBestScore(best)
        }
    const initialTiles = getInitialRandomTile();
 
    // Flatten board, set initial tiles
    const updatedTiles = tiles.flat().map((tile, i) => initialTiles[i] ?? 0);

    // Reshape back to 2D
    const newBoard: number[][] = [];
    for (let i = 0; i < 4; i++) {
      newBoard.push(updatedTiles.slice(i * 4, i * 4 + 4));
    }

    setTiles(newBoard);
  }, []);


  const move = (direction: string) => {
  let newBoard = [...tiles.map(row => [...row])];

  switch (direction) {
    case "ArrowLeft":
      newBoard = newBoard.map(row => moveAndMerge(row));
      break;
    case "ArrowRight":
      newBoard = newBoard.map(row => moveAndMerge([...row].reverse()).reverse());
      break;
    case "ArrowUp":
      newBoard = transpose(newBoard).map(row => moveAndMerge(row));
      newBoard = transpose(newBoard);
      break;
    case "ArrowDown":
      newBoard = transpose(newBoard).map(row => moveAndMerge([...row].reverse()).reverse());
      newBoard = transpose(newBoard);
      break;
  }

  if (!boardsEqual(tiles, newBoard)) {
    const boardWithNewTile = addRandomTile(newBoard);
    setTiles(boardWithNewTile);
  }
 if (typeof window !== "undefined") {
    const storedScore = Number(localStorage.getItem("score")) || 0;
    const newBest = Number(localStorage.getItem("bestScore") || storedScore)
    setScore(storedScore);
    setBestScore(newBest)
  }

};

useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.preventDefault();
      move(e.key);
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => window.removeEventListener("keydown", handleKeyDown);
}, [tiles]);


const newGame = ()=>{
  setTiles(board)
  setScore(0)
  if(typeof window !== "undefined"){
    localStorage.setItem("score","0")
  }
   const initialTiles = getInitialRandomTile();
 
    // Flatten board, set initial tiles
    const updatedTiles = tiles.flat().map((tile, i) => initialTiles[i] ?? 0);

    // Reshape back to 2D
    const newBoard: number[][] = [];
    for (let i = 0; i < 4; i++) {
      newBoard.push(updatedTiles.slice(i * 4, i * 4 + 4));
    }

    setTiles(newBoard);
}


  return (
   <div className="flex flex-col h-screen bg-[#faf8ef]">
  {/* Header */}
  <Header score={score} bestScore={bestScore} newGame={newGame} />

  {/* Game Board */}
  <main className="flex-1 flex justify-center items-center">
    <div
      className="bg-[#bbada0] p-4 sm:p-6 rounded-lg grid grid-cols-4 gap-3 sm:gap-4 w-[90vw] max-w-[400px]"
    >
      {tiles.map((row, rIndex) =>
        row.map((tileValue, cIndex) => (
          <div
            key={`${rIndex}-${cIndex}`}
            className={`flex items-center justify-center text-xl sm:text-2xl font-bold rounded-lg ${tileClasses[tileValue]} transition-all duration-200`}
            style={{ aspectRatio: "1 / 1" }}
          >
            {tileValue !== 0 ? tileValue : null}
          </div>
        ))
      )}
    </div>
  </main>
</div>

  );
};

export default GameBoard;
