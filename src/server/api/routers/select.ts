import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const teamRouter = createTRPCRouter({
  getTeam: publicProcedure.query(({ ctx }) => {
    return ctx.db.team.findMany();
  }),
  selectTeam: publicProcedure
    .input(z.object({ teamName: z.string() }))
    .query(async ({ ctx, input }) => {
      const findTeam = await ctx.db.team.findFirst({
        where: {
          teamName: input.teamName
        }
      });
      return findTeam;
    }),
  getCatches: publicProcedure.query(({ ctx }) => {
    return ctx.db.catches.findMany({
      orderBy: {
        weight: "desc"
      }
    });
  }),
  selectCatches:  publicProcedure
  .input(z.object({ teamName: z.string() }))
  .query(async ({ ctx, input }) => {
    const findTeam = await ctx.db.catches.findMany({
      where: {
        teamName: input.teamName
      }
    });
    return findTeam;
  }),
  getBatches: publicProcedure.query(({ ctx }) => {
    return ctx.db.batches.findMany({
      orderBy: {
        weight: "desc"
      }
    });
  }),
  selectBatches:  publicProcedure
  .input(z.object({ teamName: z.string() }))
  .query(async ({ ctx, input }) => {
    const findTeam = await ctx.db.batches.findMany({
      where: {
        teamName: input.teamName
      }
    });
    return findTeam;
  }),
});
