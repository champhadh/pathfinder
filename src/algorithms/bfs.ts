import { getNeighbors } from "../utils/helpers";

export const bfs = (startIndex: number, endIndex: number, grid: string[], animatePath: (path: number[]) => void) => {
  const queue = [[startIndex]];
  const visited = new Set<number>();

  while (queue.length > 0) {
    const path = queue.shift()!;
    const node = path[path.length - 1];

    if (visited.has(node)) continue;
    visited.add(node);

    if (node === endIndex) {
      animatePath(path);
      return;
    }

    getNeighbors(node).forEach((neighbor) => {
      if (!visited.has(neighbor) && grid[neighbor] !== "wall") {
        queue.push([...path, neighbor]);
      }
    });
  }
};
