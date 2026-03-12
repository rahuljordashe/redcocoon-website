import { defineCollection, z } from 'astro:content';

const products = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    code: z.string(),
    price: z.number(),
    currency: z.string().default('LKR'),
    collection: z.string(),
    category: z.enum([
      'cups',
      'plates',
      'bowls',
      'vases',
      'sets',
      'coasters',
      'decor',
      'kitchen',
    ]),
    material: z.string().default('Stoneware Clay'),
    stock: z.number().default(0),
    images: z.array(z.string()),
    featured: z.boolean().default(false),
    madeToOrder: z.boolean().default(false),
    description: z.string().optional(),
  }),
});

export const collections = { products };
