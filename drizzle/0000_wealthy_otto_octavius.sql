CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_name" varchar(64) NOT NULL,
	"password" varchar(256) NOT NULL
);
