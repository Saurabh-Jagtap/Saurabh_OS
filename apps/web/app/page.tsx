import { api } from "~/trpc/server";
import VisitorPage from "./Visitor";
import ProjectReactions from "./component/project/ProjectReactions";

import ProjectSection from "./component/sections/ProjectsSection";
import JourneySection from "./component/sections/JourneySection";
import GuestbookSection from "./component/sections/GuestbookSection";
import Contact from "./component/sections/ContactSection";
import ArchitectureSection from "./component/sections/ArchitectureSection";
import Footer from "./component/layout/Footer";
import SchematicBackground from "./component/background/SchematicBackground";
import HeroSection from "./component/sections/HeroSection";

export default async function Home() {
  const { status } = await api.health.getHealth.query();
  return (
    <main className="min-h-screen min-w-screen">
      <div>
        <SchematicBackground>
          {/* <HeroSection /> */}
          <HeroSection/>
        </SchematicBackground>
        <ArchitectureSection />
        <ProjectSection />
        <JourneySection />
        <GuestbookSection />
        <Contact />
        {/* <h1 className="text-3xl">Streamyst - Stream in Style</h1>
        <h2>Server Status: {status}</h2>
        <VisitorPage />
        <ProjectReactions projectId="5a774ddf-eb99-4f6c-9910-595c96f3fab3" />*/}
        <Footer />
      </div>
    </main>
  );
}
