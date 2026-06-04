import { api } from "~/trpc/server";
import VisitorPage from "./Visitor";
import GuestBook from "./GuestBook";
import ProjectReactions from "./component/project/ProjectReactions";
import HeroSection from "./component/sections/HeroSection";
import ProjectSection from "./component/sections/ProjectsSection";
import JourneySection from "./component/sections/JourneySection";
import GuestbookSection from "./component/sections/GuestbookSection";
import Contact from "./component/sections/Contact";
import ArchitectureSection from "./component/sections/ArchitectureSection";


export default async function Home() {
  const { status } = await api.health.getHealth.query();
  return (
    <main className="min-h-screen min-w-screen">
      <div>
        <HeroSection/>
        <ArchitectureSection />
        <ProjectSection/>
        <JourneySection/>
        <GuestbookSection/>
        <Contact />
        {/* <h1 className="text-3xl">Streamyst - Stream in Style</h1>
        <h2>Server Status: {status}</h2>
        <VisitorPage />
        <ProjectReactions projectId="5a774ddf-eb99-4f6c-9910-595c96f3fab3" />
        <GuestBook /> */}
      </div>
    </main>
  );
}
