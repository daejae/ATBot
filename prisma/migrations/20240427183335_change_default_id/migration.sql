-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Token" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "access_token" TEXT NOT NULL,
    "token_type" TEXT NOT NULL,
    "access_token_token_expired" DATETIME NOT NULL
);
INSERT INTO "new_Token" ("access_token", "access_token_token_expired", "id", "token_type", "updatedAt") SELECT "access_token", "access_token_token_expired", "id", "token_type", "updatedAt" FROM "Token";
DROP TABLE "Token";
ALTER TABLE "new_Token" RENAME TO "Token";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
