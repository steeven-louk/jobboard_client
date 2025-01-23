import Fonctionnalite from "./components/fonctionnalite";
import Heros from "./components/heros"
// import Navbar from "./components/navbar"
import { RecentJobs } from "./components/recentJobs";

export default function Home() {


  return (
    <div>
      <Heros/>
      <main>
        <Fonctionnalite/>
        <RecentJobs/>
      </main>
    </div>
  );
}
