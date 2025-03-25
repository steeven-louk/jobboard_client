"use client";
import { HeaderComponent } from "@/app/components/headerComponent";

import { Suspense } from "react";
import JobContent from "./component/jobContent";


export default function Jobs() {


  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <HeaderComponent pageName="Jobs" />
      <JobContent />
    </Suspense>
  );
}



