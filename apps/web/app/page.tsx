import ProjectSection from "./component/sections/ProjectsSection";
import JourneySection from "./component/sections/JourneySection";
import GuestbookSection from "./component/sections/GuestbookSection";
import ContactSection from "./component/sections/ContactSection";

import Footer from "./component/layout/Footer";
import SchematicBackground from "./component/background/SchematicBackground";
import HeroSection from "./component/sections/HeroSection";
import ArchitectureTree from "./component/architecture/ArchitectureTree";
import VisitorInitializer from "./Visitor";


export default async function Home() {
  return (
    <main className="min-h-screen">
      <VisitorInitializer />

      <div>

        <SchematicBackground>
          <HeroSection />
          <ArchitectureTree />
          <ProjectSection />
          <JourneySection />
          <GuestbookSection />
          <ContactSection />
        </SchematicBackground>

        <Footer />
      </div>
      
    </main>
  );
}
