-- CreateTable
CREATE TABLE "public"."users" (
    "id" UUID NOT NULL DEFAULT auth.uid(),
    "type" TEXT NOT NULL DEFAULT 'creator',
    "email" TEXT,
    "full_name" TEXT,
    "role" TEXT DEFAULT 'creator',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."deals" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT,
    "business_id" UUID DEFAULT gen_random_uuid(),
    "description" TEXT,
    "budget" DECIMAL,
    "media_type" TEXT DEFAULT '',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closing_date" TIMESTAMPTZ(6),

    CONSTRAINT "deals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."applications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "deal_id" UUID DEFAULT gen_random_uuid(),
    "creator_id" UUID DEFAULT gen_random_uuid(),
    "message" TEXT,
    "status" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."deals" ADD CONSTRAINT "deals_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."applications" ADD CONSTRAINT "applications_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."applications" ADD CONSTRAINT "applications_deal_id_fkey" FOREIGN KEY ("deal_id") REFERENCES "public"."deals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
