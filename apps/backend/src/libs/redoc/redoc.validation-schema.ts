import { z } from 'zod';
import { OpenAPIObject } from '@nestjs/swagger';

export const schema = (document: OpenAPIObject) =>
  z.object({
    title: z
      .string()
      .optional()
      .default(document.info ? document.info.title : 'Swagger documentation'),
    favicon: z.string().optional(),
    logo: z
      .object({
        url: z.string().optional(),
        backgroundColor: z.string().optional(),
        altText: z.string().optional(),
        href: z.string().optional(),
      })
      .optional(),
    tagGroups: z
      .array(
        z.object({
          name: z.string(),
          tags: z.array(z.string()),
        }),
      )
      .optional(),
    docName: z.string().optional().default('swagger'),
    auth: z
      .object({
        enabled: z.boolean().default(false),
        user: z.string().optional().default('admin'),
        password: z.string().optional().default('admin'),
      })
      .optional(),
  });

export type RedocOptions = z.infer<ReturnType<typeof schema>>;
