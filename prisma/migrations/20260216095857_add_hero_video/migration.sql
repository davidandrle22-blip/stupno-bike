-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Race" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "dateEnd" DATETIME,
    "location" TEXT NOT NULL,
    "uciCategory" TEXT,
    "heroImage" TEXT,
    "heroVideo" TEXT,
    "heroVideoWebm" TEXT,
    "showHeroVideo" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "program" TEXT,
    "parking" TEXT,
    "parkingImage" TEXT,
    "organizer" TEXT,
    "registrationUrl" TEXT,
    "navOrder" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Race" ("createdAt", "date", "dateEnd", "description", "heroImage", "id", "location", "navOrder", "organizer", "parking", "parkingImage", "program", "registrationUrl", "slug", "status", "title", "uciCategory", "updatedAt") SELECT "createdAt", "date", "dateEnd", "description", "heroImage", "id", "location", "navOrder", "organizer", "parking", "parkingImage", "program", "registrationUrl", "slug", "status", "title", "uciCategory", "updatedAt" FROM "Race";
DROP TABLE "Race";
ALTER TABLE "new_Race" RENAME TO "Race";
CREATE UNIQUE INDEX "Race_slug_key" ON "Race"("slug");
CREATE TABLE "new_SiteSettings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'main',
    "seriesName" TEXT NOT NULL DEFAULT 'Mistrovství XC Horských kol STUPNO',
    "logo" TEXT,
    "registrationUrl" TEXT,
    "facebookUrl" TEXT,
    "instagramUrl" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "showUciLogo" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_SiteSettings" ("contactEmail", "contactPhone", "facebookUrl", "id", "instagramUrl", "logo", "registrationUrl", "seriesName", "showUciLogo") SELECT "contactEmail", "contactPhone", "facebookUrl", "id", "instagramUrl", "logo", "registrationUrl", "seriesName", "showUciLogo" FROM "SiteSettings";
DROP TABLE "SiteSettings";
ALTER TABLE "new_SiteSettings" RENAME TO "SiteSettings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
