import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const updateRouter = createTRPCRouter({
  updateScore: publicProcedure.input(z.object({
    teamName: z.string(),
    totalFish: z.number(),
    totalWeight: z.number()
  })).mutation(async ({ ctx, input }) => {

    await ctx.db.team.update({
      where: {
        teamName: input.teamName,
      },
      data: {
        totalFish: input.totalFish,
        totalWeight: input.totalWeight,
      }
    });
  }),
});