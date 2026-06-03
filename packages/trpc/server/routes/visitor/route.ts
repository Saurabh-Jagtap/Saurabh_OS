import { publicProcedure, router } from "../../trpc";
import { visitorService } from "../../services";

import { identifyVisitorInputSchema } from "@repo/services/visitor/model";

export const visitorRouter = router({
  identify: publicProcedure
    .input(identifyVisitorInputSchema)
    .mutation(async ({ input }) => {
      return visitorService.identify(input.visitorId);
    }),
});