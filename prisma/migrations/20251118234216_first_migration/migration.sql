-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('AWAITING', 'AWAITING_PAYMENT', 'TO_PREPARE', 'IN_PREPARE', 'FINISHED', 'PICKUPED', 'CANCELLED');

-- CreateTable
CREATE TABLE "customer_order" (
    "customer_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,

    CONSTRAINT "customer_order_pkey" PRIMARY KEY ("customer_id","order_id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item" (
    "order_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("order_id","item_id")
);

-- CreateIndex
CREATE INDEX "customer_order_customer_id_idx" ON "customer_order"("customer_id");

-- CreateIndex
CREATE INDEX "customer_order_order_id_idx" ON "customer_order"("order_id");

-- CreateIndex
CREATE INDEX "orders_status_idx" ON "orders"("status");

-- CreateIndex
CREATE INDEX "orders_created_at_idx" ON "orders"("created_at");

-- CreateIndex
CREATE INDEX "order_item_order_id_idx" ON "order_item"("order_id");

-- CreateIndex
CREATE INDEX "order_item_item_id_idx" ON "order_item"("item_id");

-- AddForeignKey
ALTER TABLE "customer_order" ADD CONSTRAINT "customer_order_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
