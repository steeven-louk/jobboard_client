"use client";
import { HeaderComponent } from "@/app/components/headerComponent";
import JobContent from "./component/jobContent";

export default function Jobs() {

  return (
    <div>
      <HeaderComponent pageName="Jobs" />
      <JobContent />
    </div>
  );
}