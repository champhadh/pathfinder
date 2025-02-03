import { getNeighbors } from "../utils/helpers";

export const dijkstra = (
  startIndex: number,
  endIndex: number,
  grid: string[],
  animatePath: (path: number[]) => void
) => {
  const distances: Record<number, number> = {};
  const prev: Record<number, number | null> = {};
  const queue: [number, number][][] = [[[startIndex, 0]]];

  for (let i = 0; i < grid.length; i++) {
    distances[i] = Infinity;
    prev[i] = null;
  }

  distances[startIndex] = 0;

  while (queue.length > 0) {
    queue.sort((a, b) => a[0][1] - b[0][1]); // Sort by lowest distance
    const path = queue.shift()!;
    const [node, distance] = path[path.length - 1];

    if (node === endIndex) {
      animatePath(path.map((p) => p[0]));
      return;
    }

    getNeighbors(node).forEach((neighbor) => {
      if (grid[neighbor] !== "wall") {
        const newDistance = distance + 1; // All edges have equal weight

        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          prev[neighbor] = node;
          queue.push([...path, [neighbor, newDistance]]);
        }
      }
    });
  }
};
