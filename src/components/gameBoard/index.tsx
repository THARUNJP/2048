import { board, tileClasses } from "@/src/lib/constant";
import { addRandomTile, boardsEqual, getInitialRandomTile, moveAndMerge, transpose } from "@/src/service";
import { useEffect, useState } from "react";



const GameBoard = () => {
  const [tiles, setTiles] = useState<number[][]>(board);

  useEffect(() => {
    // Get initial two random tiles as flat indices
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

  return (
    <div className="flex justify-center items-center pt-30 bg-[#f9f6f2]">
      <div className="bg-[#bbada0] p-4 rounded-lg grid grid-cols-4 gap-4 w-[400px] h-[400px]">
        {tiles.map((row, rIndex) =>
          row.map((tileValue, cIndex) => (
            <div
              key={`${rIndex}-${cIndex}`}
              className={`flex items-center justify-center text-2xl font-bold rounded-lg ${tileClasses[tileValue]}`}
            >
              {tileValue !== 0 ? tileValue : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GameBoard;
