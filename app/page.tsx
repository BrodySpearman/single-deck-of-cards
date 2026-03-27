import Image from "next/image";
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center font-sans">
      <main className="flex flex-col">
        <Sidebar />
      </main>
    </div>
  );
}
