export const getInitialRandomTile = (max: number = 16) => {
  // Pick two unique random positions
  const firstTile = Math.floor(Math.random() * max);
  let secondTile = Math.floor(Math.random() * max);
  while (secondTile === firstTile) {
    secondTile = Math.floor(Math.random() * max);
  }

  // Both tiles randomly 2 or 4 (90% 2, 10% 4)
  const secondValue = Math.random() < 0.9 ? 2 : 4;

  return {
    [firstTile]: 2,
    [secondTile]: secondValue,
  };
};

export function moveAndMerge(line: number[]): number[] {
  const filtered = line.filter(num => num !== 0);

  for (let i = 0; i < filtered.length - 1; i++) {
    if (filtered[i] === filtered[i + 1]) {
      filtered[i] *= 2;
      filtered[i + 1] = 0;
    }
  }

  const merged = filtered.filter(num => num !== 0);
  while (merged.length < 4) merged.push(0);

  return merged;
}

export function transpose(matrix: number[][]): number[][] {
  return matrix[0].map((_, i) => matrix.map(row => row[i]));
}

export function boardsEqual(a: number[][], b: number[][]): boolean {
  return a.flat().every((val, idx) => val === b.flat()[idx]);
}

export function addRandomTile(board: number[][]): number[][] {
  const emptyCells: [number, number][] = [];
  board.forEach((row, r) =>
    row.forEach((val, c) => {
      if (val === 0) emptyCells.push([r, c]);
    })
  );

  if (emptyCells.length === 0) return board;

  const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const newBoard = board.map(row => [...row]);
  newBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
  return newBoard;
}
