import Image from "next/image";
import Sidebar from "./components/sidebar/sidebar";
import PlayTable from "./components/play-table/play-table";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center font-sans">
      <main className="flex flex-col">
        <Sidebar />
        <PlayTable />
      </main>
    </div>
  );
}
