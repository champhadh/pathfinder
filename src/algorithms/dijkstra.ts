import { getNeighbors } from "../utils/helpers";

export const dijkstra = (
  startIndex: number,
  endIndex: number,
  grid: string[],
  animateSearch: (visitedNodesInOrder: number[], shortestPath: number[]) => void
) => {
  const distances: Record<number, number> = {};
  const prev: Record<number, number | null> = {};
  const queue: [number, number][][] = [[[startIndex, 0]]];
  const visitedNodesInOrder: number[] = [];

  for (let i = 0; i < grid.length; i++) {
    distances[i] = Infinity;
    prev[i] = null;
  }

  distances[startIndex] = 0;

  while (queue.length > 0) {
    queue.sort((a, b) => a[0][1] - b[0][1]);
    const path = queue.shift()!;
    const [node, distance] = path[path.length - 1];

    if (visitedNodesInOrder.includes(node)) continue;
    visitedNodesInOrder.push(node);

    if (node === endIndex) {
      animateSearch(visitedNodesInOrder, path.map((p) => p[0]));
      return;
    }

    getNeighbors(node).forEach((neighbor) => {
      if (grid[neighbor] !== "wall") {
        const newDistance = distance + 1;
        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          prev[neighbor] = node;
          queue.push([...path, [neighbor, newDistance]]);
        }
      }
    });
  }
};
