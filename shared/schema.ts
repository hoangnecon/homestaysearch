import { pgTable, text, serial, integer, boolean, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const homestays = pgTable("homestays", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  area: text("area").notNull(), // Mỹ Khê, Hải Châu, An Thượng, etc.
  price: integer("price").notNull(), // Price in VND
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  imageUrl: text("image_url").notNull(),
  amenities: text("amenities").array().notNull(),
  tags: text("tags").array().notNull(),
  isAvailable: boolean("is_available").notNull().default(true),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertHomestaySchema = createInsertSchema(homestays).omit({
  id: true,
});

export const searchSchema = z.object({
  query: z.string().min(1, "Vui lòng nhập mô tả tìm kiếm"),
  area: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertHomestay = z.infer<typeof insertHomestaySchema>;
export type Homestay = typeof homestays.$inferSelect;
export type SearchQuery = z.infer<typeof searchSchema>;
