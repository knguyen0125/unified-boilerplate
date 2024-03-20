import { OpenAPIObject } from '@nestjs/swagger';
import Joi from 'joi';

export const schema = (document: OpenAPIObject) =>
  Joi.object({
    title: Joi.string().default(
      document.info ? document.info.title : 'Swagger documentation',
    ),
    favicon: Joi.string().optional(),
    logo: Joi.object({
      url: Joi.string().optional(),
      backgroundColor: Joi.string().optional(),
      altText: Joi.string().optional(),
      href: Joi.string().optional(),
    }).optional(),
    tagGroups: Joi.array()
      .items(
        Joi.object({
          name: Joi.string(),
          tags: Joi.array().items(Joi.string()),
        }),
      )
      .optional(),
    docName: Joi.string().optional().default('swagger'),
    auth: Joi.object({
      enabled: Joi.boolean().default(false),
      user: Joi.string().optional().default('admin'),
      password: Joi.string().optional().default('admin'),
    }).optional(),
  });

export type RedocOptions = {
  title?: string;
  favicon?: string;
  logo?: {
    url?: string;
    backgroundColor?: string;
    altText?: string;
    href?: string;
  };
  tagGroups?: Array<{ name: string; tags: string[] }>;
  docName?: string;
  auth?: {
    enabled: boolean;
    user?: string;
    password?: string;
  };
};
