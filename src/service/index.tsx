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
