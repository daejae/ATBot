-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createAtNewYork" DATETIME NOT NULL,
    "ticker" TEXT NOT NULL,
    "orderQuantity" INTEGER NOT NULL,
    "diffRate" REAL NOT NULL,
    "price" REAL NOT NULL
);
INSERT INTO "new_order" ("createAtNewYork", "diffRate", "id", "orderQuantity", "price", "ticker") SELECT "createAtNewYork", "diffRate", "id", "orderQuantity", "price", "ticker" FROM "order";
DROP TABLE "order";
ALTER TABLE "new_order" RENAME TO "order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
