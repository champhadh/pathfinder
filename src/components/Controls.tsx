import React from "react";

type Props = {
  selectedAlgorithm: string;
  isPathfinding: boolean;
  startSearch: () => void;
};

export default function Controls({ selectedAlgorithm, isPathfinding, startSearch }: Props) {
  return (
    <button
      className="mb-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      onClick={startSearch}
      disabled={isPathfinding || !selectedAlgorithm}
    >
      Start Search
    </button>
  );
}
