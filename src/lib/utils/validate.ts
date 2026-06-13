import { z } from "zod";
import { MAX_DESCRIPTION_LENGTH, MAX_PROJECT_NAME_LENGTH, MAX_COMMENT_LENGTH } from "./constants";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z.object({
  displayName: z.string().min(2, "Name must be at least 2 characters").max(60),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30)
    .regex(/^[a-z0-9_]+$/, "Only lowercase letters, numbers, and underscores"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phoneNumber: z.string().min(10, "Enter a valid phone number"),
  logoUrl: z.string().url().optional(),
});

export const uploadProjectSchema = z.object({
  projectName: z.string().min(3).max(MAX_PROJECT_NAME_LENGTH),
  description: z.string().min(10).max(MAX_DESCRIPTION_LENGTH),
  category: z.enum(["Engine", "Tire", "Component", "Accessory", "Full Vehicle", "Project", "Other"]),
  price: z.number().min(0).optional(),
  currency: z.string().default("KES"),
  status: z.enum(["available", "featured", "sold"]).default("available"),
  buyableOptions: z.object({
    buyWhole: z.boolean().default(false),
    buyShares: z.object({
      enabled: z.boolean().default(false),
      totalShares: z.number().min(1).optional(),
      pricePerShare: z.number().min(1).optional(),
      availableShares: z.number().min(0).optional(),
    }),
  }),
});

export const commentSchema = z.object({
  text: z.string().min(1).max(MAX_COMMENT_LENGTH),
});

export const editProfileSchema = z.object({
  displayName: z.string().min(2).max(60).optional(),
  bio: z.string().max(300).optional(),
  phoneNumber: z.string().min(10).optional(),
  walletAddress: z.string().optional(),
  socialLinks: z.object({
    instagram: z.string().url().optional().or(z.literal("")),
    twitter: z.string().url().optional().or(z.literal("")),
    facebook: z.string().url().optional().or(z.literal("")),
  }).optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type UploadProjectFormData = z.infer<typeof uploadProjectSchema>;
export type CommentFormData = z.infer<typeof commentSchema>;
export type EditProfileFormData = z.infer<typeof editProfileSchema>;
