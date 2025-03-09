import {
	boolean,
	integer,
	json,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

export const postsTable = pgTable("posts", {
	id: uuid("id").primaryKey().defaultRandom(),
	title: varchar("title", { length: 200 }).notNull(),
	content: text("content").notNull(),
	authorId: uuid("author_id").notNull(),
	coverImage: varchar("cover_image", { length: 500 }),
	slug: varchar("slug", { length: 200 }).notNull().unique(),
	summary: varchar("summary", { length: 500 }),
	viewCount: integer("view_count").default(0),
	likeCount: integer("like_count").default(0),
	commentCount: integer("comment_count").default(0),
	isCopyright: boolean("is_copyright").default(true),
	isTop: boolean("is_top").default(false),
	topOrder: integer("top_order").default(0),
	customCreatedAt: timestamp("custom_created_at"),
	customUpdatedAt: timestamp("custom_updated_at"),
	categoryIds: json("category_ids").$type<string[]>().default([]),
	tagIds: json("tag_ids").$type<string[]>().default([]),
	relatedPosts: json("related_posts").$type<string[]>().default([]),
	status: varchar("status").notNull().default("draft"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.$onUpdate(() => new Date()),
	deletedAt: timestamp("deleted_at"),
});

export const postSelectSchema = createSelectSchema(postsTable);
export const postInsertSchema = createInsertSchema(postsTable);

export type Post = z.infer<typeof postSelectSchema>;
export type CreatePost = z.infer<typeof postInsertSchema>;

export const tagsTable = pgTable("tags", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar("name", { length: 50 }).notNull().unique(),
	slug: varchar("slug", { length: 50 }).notNull().unique(),
	description: text("description"),
	postCount: integer("post_count").default(0),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.$onUpdate(() => new Date()),
	isDeleted: boolean("is_deleted").default(false),
});
export const tagSelectSchema = createSelectSchema(tagsTable);
export const tagInsertSchema = createInsertSchema(tagsTable);
export type CreateTag = z.infer<typeof tagInsertSchema>;
export type Tag = z.infer<typeof tagSelectSchema>;

export const projectsTable = pgTable("projects", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar("name", { length: 100 }).notNull(),
	slug: varchar("slug", { length: 100 }).notNull().unique(),
	docsUrl: varchar("docs_url", { length: 500 }),
	github: varchar("github", { length: 500 }),
	previewUrl: varchar("preview_url", { length: 500 }),
	videoUrl: varchar("video_url", { length: 500 }),
	summary: text("summary").notNull(),
	previewImage: json("preview_image").$type<string[]>().default([]),
	readme: text("readme"),
	order: integer("order").default(0),
	coverImage: varchar("cover_image", { length: 500 }),
	status: varchar("status").notNull().default("draft"),
	viewCount: integer("view_count").default(0),
	starCount: integer("star_count").default(0),
	techStack: json("tech_stack").$type<string[]>().default([]),
	isDeleted: boolean("is_deleted").default(false),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.$onUpdate(() => new Date()),
});

export const projectSchema = createSelectSchema(projectsTable);
export const projectInsertSchema = createInsertSchema(projectsTable);
export type Project = z.infer<typeof projectSchema>;
export type CreateProject = z.infer<typeof projectInsertSchema>;

export const menusTable = pgTable("menus", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar("name", { length: 50 }).notNull(),
	url: varchar("url", { length: 500 }).notNull(),
	parentId: uuid("parent_id"),
	order: integer("order").default(0),
	icon: varchar("icon", { length: 50 }),
	isVisible: boolean("is_visible").default(true),
	isDeleted: boolean("is_deleted").default(false),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.$onUpdate(() => new Date()),
});
export const menuSelectSchema = createSelectSchema(menusTable);
export const menuInsertSchema = createInsertSchema(menusTable);
export type Menu = z.infer<typeof menuSelectSchema>;
export type NewMenu = z.infer<typeof menuSelectSchema>;

export const pagesTable = pgTable("pages", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar("name", { length: 100 }).notNull(),
	url: varchar("url", { length: 500 }).notNull().unique(),
	slug: varchar("slug", { length: 100 }).notNull().unique(),
	content: text("content"),
	metaTitle: varchar("meta_title", { length: 200 }),
	metaDescription: text("meta_description"),
	order: integer("order").notNull().default(0),
	coverImage: varchar("cover_image", { length: 500 }),
	isPublished: boolean("is_published").default(false),
	publishedAt: timestamp("published_at"),
	isDeleted: boolean("is_deleted").notNull().default(false),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.$onUpdate(() => new Date()),
});
export const pageSelectSchema = createSelectSchema(pagesTable);
export const pageInsertSchema = createInsertSchema(pagesTable);
export type SelectPage = z.infer<typeof pageSelectSchema>;
export type InsertPage = z.infer<typeof pageInsertSchema>;

export const socialLinksTable = pgTable("social_links", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar("name", { length: 50 }).notNull(),
	url: varchar("url", { length: 500 }).notNull(),
	platform: varchar("platform", { length: 50 }),
	order: integer("order").default(0),
	icon: varchar("icon", { length: 50 }),
	isVisible: boolean("is_visible").default(true),
	isDeleted: boolean("is_deleted").default(false),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.$onUpdate(() => new Date()),
});
export const socialLinkSelectSchema = createSelectSchema(socialLinksTable);
export const socialLinkInsertSchema = createInsertSchema(socialLinksTable);
export type SocialLink = z.infer<typeof socialLinkSelectSchema>;
export type NewSocialLink = z.infer<typeof socialLinkSelectSchema>;

export const settingsTable = pgTable("settings", {
	id: uuid("id").primaryKey().defaultRandom(),
	key: varchar("key", { length: 100 }).notNull().unique(),
	value: text("value").notNull(),
	type: varchar("type", { length: 50 }).notNull(),
	description: text("description"),
	group: varchar("group", { length: 50 }),
	isSystem: boolean("is_system").default(false),
	isDeleted: boolean("is_deleted").notNull().default(false),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.$onUpdate(() => new Date()),
});

export const settingSelectSchema = createSelectSchema(settingsTable);
export const settingInsertSchema = createInsertSchema(settingsTable);
export type Setting = z.infer<typeof settingSelectSchema>;
export type NewSetting = z.infer<typeof settingSelectSchema>;
