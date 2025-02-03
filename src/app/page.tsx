import Grid from "../components/Grid";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-black">Hady's Pathfinder</h1> {/* Changed to black */}
      <Grid />
    </main>
  );
}
