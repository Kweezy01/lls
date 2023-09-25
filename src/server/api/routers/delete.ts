import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const deleteRouter = createTRPCRouter({
   deleteTeam: publicProcedure.input(z.object({
      teamName: z.string(),
   })).mutation(async ({ ctx, input }) => {

      await ctx.db.catches.deleteMany({
         where: {
            teamName: input.teamName,
         }
      })

      await ctx.db.batches.deleteMany({
         where: {
            teamName: input.teamName,
         }
      })
      
      await ctx.db.team.delete({
         where: {
            teamName: input.teamName,
         },
      })
   }),
});
