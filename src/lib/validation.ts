import { z } from 'zod';

// Single attachment: base64-encoded file content + metadata.
export const attachmentSchema = z.object({
  filename:    z.string().min(1).max(200),
  content:     z.string().min(1), // base64 (no data: prefix)
  contentType: z.string().max(120).optional(),
});

export const contactSchema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters').max(100).trim(),
  email:   z.string().email('Please enter a valid email address').max(254).trim().toLowerCase(),
  company: z.string().max(100).trim().optional(),
  topic:   z.string().max(100).optional(),
  budget:  z.string().max(50).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000).trim(),
  // Up to 5 attachments; total size is enforced server-side.
  attachments: z.array(attachmentSchema).max(5).optional(),
  // Honeypot field — must be empty
  website: z.string().max(0, 'Bot detected').optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
