import { z } from 'zod';

export const contactSchema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters').max(100).trim(),
  email:   z.string().email('Please enter a valid email address').max(254).trim().toLowerCase(),
  company: z.string().max(100).trim().optional(),
  topic:   z.string().max(100).optional(),
  budget:  z.string().max(50).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000).trim(),
  // Honeypot field — must be empty
  website: z.string().max(0, 'Bot detected').optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
