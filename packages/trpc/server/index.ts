import { router } from "./trpc";

import { healthRouter } from "./routes/health/route";
import { authRouter } from "./routes/auth/route";
import { visitorRouter } from "./routes/visitor/route";
import { guestbookRouter } from "./routes/guestbook/route";
import { reactionRouter } from "./routes/reaction/route";
import { projectRouter } from "./routes/project/route";

export const serverRouter = router({
  health: healthRouter,
  auth: authRouter,
  visitor: visitorRouter,
  guestbook: guestbookRouter,
  reaction: reactionRouter,
  project: projectRouter,
});

export { createContext } from "./context";
export type ServerRouter = typeof serverRouter;
