import Fonctionnalite from "./components/fonctionnalite";
import Heros from "./components/heros"
import Navbar from "./components/navbar"

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Heros/>
      <main>
        <Fonctionnalite/>
      </main>
    </div>
  );
}
