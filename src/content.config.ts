import { defineCollection, z } from "astro:content";

const globalCollection = defineCollection({
  type: "data",
  schema: z.any(),
});

const authorsCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      avatar: z.optional(image()),
      content: z.optional(z.string()),
    }),
});

export const collections = {
  global: globalCollection,
  authors: authorsCollection,
};
