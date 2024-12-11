import { z } from 'zod'

export const schema = {
  name: z.string().max(20, 'Name is too long'),
  ticker: z.string().max(8, 'Ticker is too long'),
  picture: z
    .union([
      z.instanceof(File, { message: 'Image is required' }),
      z.string().optional(), // Allow the existing image URL for editing mode
    ])
    .refine((value) => value instanceof File || typeof value === 'string', {
      message: 'Image is required',
    }),
}

export type FieldName = keyof typeof schema
