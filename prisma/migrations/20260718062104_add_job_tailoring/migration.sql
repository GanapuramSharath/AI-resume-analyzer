-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "extractedText" TEXT;

-- CreateTable
CREATE TABLE "ResumeTailoring" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "result" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResumeTailoring_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResumeTailoring" ADD CONSTRAINT "ResumeTailoring_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
