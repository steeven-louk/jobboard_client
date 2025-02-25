"use client"
// import { useEffect } from "react";
import Fonctionnalite from "./components/fonctionnalite";
import Heros from "./components/heros"
// import Navbar from "./components/navbar"
import { RecentJobs } from "./components/recentJobs";
// import { middleware } from "./middleware";
// import middleware from "./middleware"
export default function Home() {
// useEffect(() => {
//   middleware()
// }, [])


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
