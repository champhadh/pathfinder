import { getNeighbors } from "../utils/helpers";

export const dfs = (
  startIndex: number,
  endIndex: number,
  grid: string[],
  animatePath: (path: number[]) => void
) => {
  const stack = [[startIndex]];
  const visited = new Set<number>();

  while (stack.length > 0) {
    const path = stack.pop()!;
    const node = path[path.length - 1];

    if (visited.has(node)) continue;
    visited.add(node);

    if (node === endIndex) {
      animatePath(path);
      return;
    }

    getNeighbors(node).forEach((neighbor) => {
      if (!visited.has(neighbor) && grid[neighbor] !== "wall") {
        stack.push([...path, neighbor]);
      }
    });
  }
};
