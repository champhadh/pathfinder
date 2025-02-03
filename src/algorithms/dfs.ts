import { getNeighbors } from "../utils/helpers";

export const dfs = (
  startIndex: number,
  endIndex: number,
  grid: string[],
  animateSearch: (visitedNodesInOrder: number[], shortestPath: number[]) => void
) => {
  const stack = [[startIndex]];
  const visited = new Set<number>();
  const visitedNodesInOrder: number[] = [];

  while (stack.length > 0) {
    const path = stack.pop()!;
    const node = path[path.length - 1];

    if (visited.has(node)) continue;
    visited.add(node);
    visitedNodesInOrder.push(node);

    if (node === endIndex) {
      animateSearch(visitedNodesInOrder, path);
      return;
    }

    getNeighbors(node).forEach((neighbor) => {
      if (!visited.has(neighbor) && grid[neighbor] !== "wall") {
        stack.push([...path, neighbor]);
      }
    });
  }
};
