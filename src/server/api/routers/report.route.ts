// eslint-disable-next-line @typescript-eslint/no-unsafe-return
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const reportRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.reporting.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  getAdmin: publicProcedure.query(({ ctx }) => {
    return ctx.db.reporting.findMany({});
  }),

  // [...] for creating a form user reporting
  create: protectedProcedure
    .input(z.object({ title: z.string().min(3).max(20).nonempty() }))
    .input(z.object({ type: z.string().min(3).max(20).nonempty() }))
    .input(z.object({ status_report: z.string().default("progress") }))
    .input(z.object({ description: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.reporting.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
        },
      });
    }),

  updateReview: publicProcedure
    .input(z.object({ id: z.number() }))
    .input(z.object({ status_report: z.literal("review") }))
    .input(z.object({ updatedAt: z.date() }))
    .mutation(({ ctx, input }) => {
      const result = ctx.db.reporting.update({
        where: {
          id: input.id,
        },
        data: {
          status_report: input.status_report,
          updatedAt: input.updatedAt,
        },
      });
      return result;
    }),

  completeReview: publicProcedure
    .input(z.object({ id: z.number() }))
    .input(z.object({ status_report: z.literal("complete") }))
    .input(z.object({ updatedAt: z.date() }))
    .mutation(({ ctx, input }) => {
      const result = ctx.db.reporting.update({
        where: {
          id: input.id,
        },
        data: {
          status_report: input.status_report,
          updatedAt: input.updatedAt,
        },
      });
      return result;
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const deleteReport = await ctx.db.reporting.delete({
        where: {
          id: input.id,
        },
      });
      return {
        status: 201,
        message: "Report deleted",
        result: deleteReport,
      };
    }),
});
