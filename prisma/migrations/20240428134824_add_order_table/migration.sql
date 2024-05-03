-- CreateTable
CREATE TABLE "order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createAtNewYork" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "exchangeCode" TEXT NOT NULL,
    "orderPrice" REAL NOT NULL,
    "orderQuantity" INTEGER NOT NULL,
    "diffRate" REAL NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Token" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "updatedAt" DATETIME NOT NULL,
    "access_token" TEXT NOT NULL,
    "token_type" TEXT NOT NULL,
    "access_token_token_expired" DATETIME NOT NULL
);
INSERT INTO "new_Token" ("access_token", "access_token_token_expired", "id", "token_type", "updatedAt") SELECT "access_token", "access_token_token_expired", "id", "token_type", "updatedAt" FROM "Token";
DROP TABLE "Token";
ALTER TABLE "new_Token" RENAME TO "Token";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
