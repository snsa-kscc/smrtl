import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`media_locales\` (
  	\`alt\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`media_locales_locale_parent_id_unique\` ON \`media_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug_lock\` integer DEFAULT true,
  	\`featured_image_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_featured_image_idx\` ON \`posts\` (\`featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`posts_locales\` (
  	\`title\` text NOT NULL,
  	\`content_content\` text NOT NULL,
  	\`meta_title\` text,
  	\`meta_image_id\` integer,
  	\`meta_description\` text,
  	\`slug\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_meta_meta_image_idx\` ON \`posts_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts_locales\` (\`slug\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_locales_locale_parent_id_unique\` ON \`posts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_case_study\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_case_study_order_idx\` ON \`pages_blocks_hero_case_study\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_case_study_parent_id_idx\` ON \`pages_blocks_hero_case_study\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_case_study_image_idx\` ON \`pages_blocks_hero_case_study\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_order_idx\` ON \`pages_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_parent_id_idx\` ON \`pages_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_path_idx\` ON \`pages_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_locales\` (
  	\`title\` text NOT NULL,
  	\`animation_words\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_hero_locales_locale_parent_id_unique\` ON \`pages_blocks_hero_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_q_and_a_q_and_a_box\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_q_and_a\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_q_and_a_q_and_a_box_order_idx\` ON \`pages_blocks_q_and_a_q_and_a_box\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_q_and_a_q_and_a_box_parent_id_idx\` ON \`pages_blocks_q_and_a_q_and_a_box\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_q_and_a_q_and_a_box_locales\` (
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_q_and_a_q_and_a_box\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_q_and_a_q_and_a_box_locales_locale_parent_id_unique\` ON \`pages_blocks_q_and_a_q_and_a_box_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_q_and_a\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_q_and_a_order_idx\` ON \`pages_blocks_q_and_a\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_q_and_a_parent_id_idx\` ON \`pages_blocks_q_and_a\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_q_and_a_path_idx\` ON \`pages_blocks_q_and_a\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_q_and_a_locales\` (
  	\`title\` text NOT NULL,
  	\`subtitle\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_q_and_a\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_q_and_a_locales_locale_parent_id_unique\` ON \`pages_blocks_q_and_a_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_solutions_industry\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_solutions_industry_order_idx\` ON \`pages_blocks_solutions_industry\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_solutions_industry_parent_id_idx\` ON \`pages_blocks_solutions_industry\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_solutions_industry_image_idx\` ON \`pages_blocks_solutions_industry\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_solutions_industry_locales\` (
  	\`name\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_solutions_industry\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_solutions_industry_locales_locale_parent_id_unique\` ON \`pages_blocks_solutions_industry_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_solutions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_solutions_order_idx\` ON \`pages_blocks_solutions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_solutions_parent_id_idx\` ON \`pages_blocks_solutions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_solutions_path_idx\` ON \`pages_blocks_solutions\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_solutions_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_solutions_locales_locale_parent_id_unique\` ON \`pages_blocks_solutions_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_counter_counter_box\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` numeric NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_counter\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_counter_counter_box_order_idx\` ON \`pages_blocks_counter_counter_box\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_counter_counter_box_parent_id_idx\` ON \`pages_blocks_counter_counter_box\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_counter_counter_box_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_counter_counter_box\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_counter_counter_box_locales_locale_parent_id_unique\` ON \`pages_blocks_counter_counter_box_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_counter\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_counter_order_idx\` ON \`pages_blocks_counter\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_counter_parent_id_idx\` ON \`pages_blocks_counter\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_counter_path_idx\` ON \`pages_blocks_counter\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_features_order_idx\` ON \`pages_blocks_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_features_parent_id_idx\` ON \`pages_blocks_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_features_path_idx\` ON \`pages_blocks_features\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_features_locales\` (
  	\`title\` text NOT NULL,
  	\`subtitle\` text NOT NULL,
  	\`first_line_features\` text NOT NULL,
  	\`second_line_features\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_features_locales_locale_parent_id_unique\` ON \`pages_blocks_features_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_image_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`logo\` integer DEFAULT false,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_hero_order_idx\` ON \`pages_blocks_image_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_hero_parent_id_idx\` ON \`pages_blocks_image_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_hero_path_idx\` ON \`pages_blocks_image_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_hero_image_idx\` ON \`pages_blocks_image_hero\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_image_hero_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_image_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_image_hero_locales_locale_parent_id_unique\` ON \`pages_blocks_image_hero_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_iptv_solutions_i_p_t_v_box\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_iptv_solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_iptv_solutions_i_p_t_v_box_order_idx\` ON \`pages_blocks_iptv_solutions_i_p_t_v_box\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_iptv_solutions_i_p_t_v_box_parent_id_idx\` ON \`pages_blocks_iptv_solutions_i_p_t_v_box\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_iptv_solutions_i_p_t_v_box_image_idx\` ON \`pages_blocks_iptv_solutions_i_p_t_v_box\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_iptv_solutions_i_p_t_v_box_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_iptv_solutions_i_p_t_v_box\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_iptv_solutions_i_p_t_v_box_locales_locale_parent_id_unique\` ON \`pages_blocks_iptv_solutions_i_p_t_v_box_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_iptv_solutions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_iptv_solutions_order_idx\` ON \`pages_blocks_iptv_solutions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_iptv_solutions_parent_id_idx\` ON \`pages_blocks_iptv_solutions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_iptv_solutions_path_idx\` ON \`pages_blocks_iptv_solutions\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_iptv_solutions_locales\` (
  	\`title\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_iptv_solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_iptv_solutions_locales_locale_parent_id_unique\` ON \`pages_blocks_iptv_solutions_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_compatibility_platform\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_compatibility\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_compatibility_platform_order_idx\` ON \`pages_blocks_compatibility_platform\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_compatibility_platform_parent_id_idx\` ON \`pages_blocks_compatibility_platform\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_compatibility_platform_image_idx\` ON \`pages_blocks_compatibility_platform\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_compatibility\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`cta_url\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_compatibility_order_idx\` ON \`pages_blocks_compatibility\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_compatibility_parent_id_idx\` ON \`pages_blocks_compatibility\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_compatibility_path_idx\` ON \`pages_blocks_compatibility\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_compatibility_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`cta_hook\` text NOT NULL,
  	\`cta_label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_compatibility\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_compatibility_locales_locale_parent_id_unique\` ON \`pages_blocks_compatibility_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_brands_brands\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_brands\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_brands_brands_order_idx\` ON \`pages_blocks_brands_brands\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_brands_brands_parent_id_idx\` ON \`pages_blocks_brands_brands\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_brands_brands_image_idx\` ON \`pages_blocks_brands_brands\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_brands\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_brands_order_idx\` ON \`pages_blocks_brands\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_brands_parent_id_idx\` ON \`pages_blocks_brands\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_brands_path_idx\` ON \`pages_blocks_brands\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_brands_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_brands\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_brands_locales_locale_parent_id_unique\` ON \`pages_blocks_brands_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_referals_referals\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`name\` text NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_referals\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_referals_referals_order_idx\` ON \`pages_blocks_referals_referals\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_referals_referals_parent_id_idx\` ON \`pages_blocks_referals_referals\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_referals_referals_image_idx\` ON \`pages_blocks_referals_referals\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_referals_referals_locales\` (
  	\`message\` text NOT NULL,
  	\`role\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_referals_referals\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_referals_referals_locales_locale_parent_id_unique\` ON \`pages_blocks_referals_referals_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_referals\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_referals_order_idx\` ON \`pages_blocks_referals\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_referals_parent_id_idx\` ON \`pages_blocks_referals\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_referals_path_idx\` ON \`pages_blocks_referals\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_referals_locales\` (
  	\`title\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_referals\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_referals_locales_locale_parent_id_unique\` ON \`pages_blocks_referals_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_archive\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`limit\` numeric DEFAULT 6 NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_archive_order_idx\` ON \`pages_blocks_archive\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_archive_parent_id_idx\` ON \`pages_blocks_archive\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_archive_path_idx\` ON \`pages_blocks_archive\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug_lock\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`pages_locales\` (
  	\`title\` text,
  	\`content_content\` text,
  	\`meta_title\` text,
  	\`meta_image_id\` integer,
  	\`meta_description\` text,
  	\`slug\` text NOT NULL,
  	\`title_visible_in_footer\` integer DEFAULT false,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_meta_meta_image_idx\` ON \`pages_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages_locales\` (\`slug\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_locales_locale_parent_id_unique\` ON \`pages_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`posts_id\` integer,
  	\`pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`header_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_nav_items_order_idx\` ON \`header_nav_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_nav_items_parent_id_idx\` ON \`header_nav_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header_nav_items_locales\` (
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_nav_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`header_nav_items_locales_locale_parent_id_unique\` ON \`header_nav_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logotype_id\` integer NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logotype_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`header_logotype_idx\` ON \`header\` (\`logotype_id\`);`)
  await db.run(sql`CREATE TABLE \`header_locales\` (
  	\`cta_label\` text NOT NULL,
  	\`cta_url\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`header_locales_locale_parent_id_unique\` ON \`header_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`email\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`footer_locales\` (
  	\`title\` text NOT NULL,
  	\`contact_title\` text NOT NULL,
  	\`phone\` text NOT NULL,
  	\`address\` text NOT NULL,
  	\`info_title\` text NOT NULL,
  	\`newsletter_title\` text NOT NULL,
  	\`newsletter_button\` text NOT NULL,
  	\`newsletter_disclaimer\` text NOT NULL,
  	\`success_message\` text NOT NULL,
  	\`error_message\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`footer_locales_locale_parent_id_unique\` ON \`footer_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`not_found\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`not_found_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`not_found\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`not_found_locales_locale_parent_id_unique\` ON \`not_found_locales\` (\`_locale\`,\`_parent_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`media_locales\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_case_study\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_q_and_a_q_and_a_box\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_q_and_a_q_and_a_box_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_q_and_a\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_q_and_a_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_solutions_industry\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_solutions_industry_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_solutions\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_solutions_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_counter_counter_box\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_counter_counter_box_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_counter\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_features\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_features_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_image_hero\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_image_hero_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_iptv_solutions_i_p_t_v_box\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_iptv_solutions_i_p_t_v_box_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_iptv_solutions\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_iptv_solutions_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_compatibility_platform\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_compatibility\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_compatibility_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_brands_brands\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_brands\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_brands_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_referals_referals\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_referals_referals_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_referals\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_referals_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_archive\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages_locales\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`header_nav_items\`;`)
  await db.run(sql`DROP TABLE \`header_nav_items_locales\`;`)
  await db.run(sql`DROP TABLE \`header\`;`)
  await db.run(sql`DROP TABLE \`header_locales\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`DROP TABLE \`footer_locales\`;`)
  await db.run(sql`DROP TABLE \`not_found\`;`)
  await db.run(sql`DROP TABLE \`not_found_locales\`;`)
}
