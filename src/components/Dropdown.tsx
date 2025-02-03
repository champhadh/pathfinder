import React from "react";

type Props = {
  selectedAlgorithm: string;
  setSelectedAlgorithm: (value: string) => void;
};

export default function Dropdown({ selectedAlgorithm, setSelectedAlgorithm }: Props) {
  return (
    <select
      className="mb-4 px-4 py-2 border rounded-md text-black bg-white"
      value={selectedAlgorithm}
      onChange={(e) => setSelectedAlgorithm(e.target.value)}
    >
      <option value="">Choose Algorithm</option>
      <option value="BFS">Breadth First Search (BFS)</option>
      <option value="DFS">Depth First Search (DFS)</option>
      <option value="Dijkstra">Dijkstra's Algorithm</option>
      <option value="A*">A* Search</option>
    </select>
  );
}
