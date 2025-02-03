const GRID_SIZE = 20;

export const getNeighbors = (index: number) => {
  const neighbors = [];
  const row = Math.floor(index / GRID_SIZE);
  const col = index % GRID_SIZE;

  if (row > 0) neighbors.push(index - GRID_SIZE);
  if (row < GRID_SIZE - 1) neighbors.push(index + GRID_SIZE);
  if (col > 0) neighbors.push(index - 1);
  if (col < GRID_SIZE - 1) neighbors.push(index + 1);

  return neighbors;
};
