-- CreateTable
CREATE TABLE "Token" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "access_token" TEXT NOT NULL,
    "token_type" TEXT NOT NULL,
    "access_token_token_expired" TEXT NOT NULL
);
