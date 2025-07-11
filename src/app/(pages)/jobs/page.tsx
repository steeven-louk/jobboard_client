"use client";
import { HeaderComponent } from "@/app/components/headerComponent";
import JobContent from "./component/jobContent";
import { Suspense } from "react";

export default function Jobs() {

  return (
    <Suspense>
      <HeaderComponent pageName="Offres d'emploi" />
      <JobContent />
    </Suspense>
  );
}