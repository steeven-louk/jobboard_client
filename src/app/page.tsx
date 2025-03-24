"use client"

import Fonctionnalite from "./components/fonctionnalite";
import Heros from "./components/heros"
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
