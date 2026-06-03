import { api } from "~/trpc/server";
import VisitorPage from "./Visitor";
import GuestBook from "./GuestBook";
import ProjectReactions from "./component/ProjectReactions";


export default async function Home() {
  const { status } = await api.health.getHealth.query();
  return (
    <main className="min-h-screen min-w-screen flex justify-center items-center">
      <div>
        <h1 className="text-3xl">Streamyst - Stream in Style</h1>
        <h2>Server Status: {status}</h2>
        <VisitorPage />
        <ProjectReactions projectId="5a774ddf-eb99-4f6c-9910-595c96f3fab3" />
        <GuestBook />
      </div>
    </main>
  );
}
