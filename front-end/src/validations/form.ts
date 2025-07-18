import z from "zod";

export const formSchema = z.object({
  idea: z
    .string()
    .min(10, {
      message: 'Website idea must be at least 10 characters long.',
    })
    .max(200, {
      message: 'Website idea must not be longer than 200 characters.',
    }),
});

export type FormData = z.infer<typeof formSchema>;