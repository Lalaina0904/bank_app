-- CreateEnum
CREATE TYPE "category_type" AS ENUM ('debit', 'credit');

-- CreateEnum
CREATE TYPE "transaction_type" AS ENUM ('debit', 'credit');

-- CreateEnum
CREATE TYPE "transfert_status" AS ENUM ('canceled', 'pending', 'success');

-- CreateTable
CREATE TABLE "user" (
    "user_id" TEXT NOT NULL,
    "username" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_log" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "user_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_token" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "bank_account" (
    "account_number" BIGINT NOT NULL,
    "client_name" TEXT NOT NULL,
    "client_last_name" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "monthly_net_income" DOUBLE PRECISION NOT NULL,
    "is_eligible" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "bank_account_pkey" PRIMARY KEY ("account_number")
);

-- CreateTable
CREATE TABLE "sold" (
    "id_sold" SERIAL NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "account_id" BIGINT NOT NULL,

    CONSTRAINT "sold_pkey" PRIMARY KEY ("id_sold")
);

-- CreateTable
CREATE TABLE "category" (
    "id_category" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,
    "category_type" "category_type" NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id_category")
);

-- CreateTable
CREATE TABLE "transaction" (
    "reference" TEXT NOT NULL,
    "type" "transaction_type" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "account_number" BIGINT NOT NULL,
    "id_category" INTEGER NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("reference")
);

-- CreateTable
CREATE TABLE "transfert" (
    "reference" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "effective_date" TIMESTAMP(3) NOT NULL,
    "registration_date" TIMESTAMP(3) NOT NULL,
    "status" "transfert_status" NOT NULL,
    "account" BIGINT NOT NULL,

    CONSTRAINT "transfert_pkey" PRIMARY KEY ("reference")
);

-- CreateTable
CREATE TABLE "interest_rate" (
    "id_interest_rate" SERIAL NOT NULL,
    "first_7days" DOUBLE PRECISION NOT NULL,
    "after_7days" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "interest_rate_pkey" PRIMARY KEY ("id_interest_rate")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_log_provider_provider_account_id_key" ON "user_log"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "session_session_token_key" ON "session"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_token_key" ON "verification_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_identifier_token_key" ON "verification_token"("identifier", "token");

-- AddForeignKey
ALTER TABLE "user_log" ADD CONSTRAINT "user_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_account" ADD CONSTRAINT "bank_account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sold" ADD CONSTRAINT "sold_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "bank_account"("account_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_account_number_fkey" FOREIGN KEY ("account_number") REFERENCES "bank_account"("account_number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "category"("id_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfert" ADD CONSTRAINT "transfert_account_fkey" FOREIGN KEY ("account") REFERENCES "bank_account"("account_number") ON DELETE RESTRICT ON UPDATE CASCADE;
