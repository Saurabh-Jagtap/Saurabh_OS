import { router } from "./trpc";

import { healthRouter } from "./routes/health/route";
import { authRouter } from "./routes/auth/route";
import { visitorRouter } from "./routes/visitor/route";

export const serverRouter = router({
  health: healthRouter,
  auth: authRouter,
  visitor: visitorRouter,
});

export { createContext } from "./context";
export type ServerRouter = typeof serverRouter;
