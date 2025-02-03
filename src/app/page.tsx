import Grid from "@/components/Grid";


export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <button className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-700">
        Test Button
      </button>
    </div>
  );
}



export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Pathfinding Visualizer</h1>
      <Grid />
    </div>
  );
}
