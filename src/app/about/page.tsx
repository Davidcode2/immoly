"use server"; 

import AboutIntro from "@/components/about/aboutIntro";
import Descriptions from "@/components/about/descriptions";

export default async function About() {
  return (
    <div className="mx-10 lg:mr-20 lg:ml-40">
      <AboutIntro />
      <Descriptions />
    </div>
  );
}
