import { getNeighbors } from "../utils/helpers";

const heuristic = (a: number, b: number, gridSize: number) => {
  const [rowA, colA] = [Math.floor(a / gridSize), a % gridSize];
  const [rowB, colB] = [Math.floor(b / gridSize), b % gridSize];
  return Math.abs(rowA - rowB) + Math.abs(colA - colB);
};

export const aStar = (
  startIndex: number,
  endIndex: number,
  grid: string[],
  animateSearch: (visitedNodesInOrder: number[], shortestPath: number[]) => void
) => {
  const gridSize = Math.sqrt(grid.length);
  const openSet: [number, number][] = [[startIndex, 0]];
  const cameFrom: Record<number, number | null> = {};
  const gScore: Record<number, number> = {};
  const fScore: Record<number, number> = {};
  const visitedNodesInOrder: number[] = [];

  for (let i = 0; i < grid.length; i++) {
    gScore[i] = Infinity;
    fScore[i] = Infinity;
  }

  gScore[startIndex] = 0;
  fScore[startIndex] = heuristic(startIndex, endIndex, gridSize);

  while (openSet.length > 0) {
    openSet.sort((a, b) => fScore[a[0]] - fScore[b[0]]);
    const [current] = openSet.shift()!;
    visitedNodesInOrder.push(current);

    if (current === endIndex) {
      const path = [];
      let temp = current;
      while (temp !== startIndex) {
        path.push(temp);
        temp = cameFrom[temp]!;
      }
      path.push(startIndex);
      animateSearch(visitedNodesInOrder, path.reverse());
      return;
    }

    getNeighbors(current).forEach((neighbor) => {
      if (grid[neighbor] !== "wall") {
        const tentativeGScore = gScore[current] + 1;
        if (tentativeGScore < gScore[neighbor]) {
          cameFrom[neighbor] = current;
          gScore[neighbor] = tentativeGScore;
          fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, endIndex, gridSize);
          openSet.push([neighbor, fScore[neighbor]]);
        }
      }
    });
  }
};
