import { teamRouter } from "~/server/api/routers/select";
import { createTRPCRouter } from "~/server/api/trpc";
import { insertRouter } from "./routers/insert";
import { updateRouter } from "./routers/update";
import { deleteRouter } from "./routers/delete";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  select: teamRouter,
  insert: insertRouter,
  update: updateRouter,
  delete: deleteRouter,

});

// export type definition of API
export type AppRouter = typeof appRouter;
