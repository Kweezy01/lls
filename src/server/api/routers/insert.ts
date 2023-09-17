import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const insertRouter = createTRPCRouter({
   
   createTeam: publicProcedure.input(z.object({
      teamName: z.string(),
      angler1: z.string(),
      angler2: z.string(),
   })).mutation(async ({ ctx, input }) => {
      const recordedGames = 0
      const totalFish = 0
      const totalWeight = 0

      await ctx.db.team.create({
         data: {
            teamName: input.teamName,
            angler1: input.angler1,
            angler2: input.angler2,
            totalFish: totalFish,
            totalWeight: totalWeight,
            recordedGames: recordedGames,
         }
      })
   }),

   insertCatch: publicProcedure.input(z.object({
      teamName: z.string(),
      catcher: z.string(),
      weight: z.number(),
   })).mutation(async ({ ctx, input }) => {
      await ctx.db.catches.create({
         data: {
            teamName: input.teamName,
            catcher: input.catcher,
            weight: input.weight,
         }
      })
   }),

   insertBatch: publicProcedure.input(z.object({
      teamName: z.string(),
      totalFish: z.number(),
      weight: z.number(),
   })).mutation(async ({ ctx, input }) => {
      await ctx.db.batches.create({
         data: {
            teamName: input.teamName,
            totalFish: input.totalFish,
            weight: input.weight,
         }
      })
   }),

});