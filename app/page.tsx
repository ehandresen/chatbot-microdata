import { textSplitter } from "./lib/textSplitter";

async function HomePage() {
  await textSplitter();

  return (
    <div
      className="h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/microdata-background.png')" }}
    >
      <div className="flex items-center justify-center h-full text-white text-3xl font-bold"></div>
    </div>
  );
}

export default HomePage;
