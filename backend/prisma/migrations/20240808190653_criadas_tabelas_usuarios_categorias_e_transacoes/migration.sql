-- CreateEnum
CREATE TYPE "TipoTransacao" AS ENUM ('GASTO', 'GANHO');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transacoes" (
    "id" SERIAL NOT NULL,
    "tipo" "TipoTransacao" NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoriaId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "transacoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "categorias" ADD CONSTRAINT "categorias_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transacoes" ADD CONSTRAINT "transacoes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transacoes" ADD CONSTRAINT "transacoes_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
