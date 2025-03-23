"use client"

import Fonctionnalite from "./components/fonctionnalite";
import Heros from "./components/heros"
import { RecentJobs } from "./components/recentJobs";

export default function Home() {
console.log("next ayth",process.env.NEXTAUTH_URL)
console.log(process.env.NEXT_PUBLIC_API_URL)
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
