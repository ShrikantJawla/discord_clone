import { auth } from "@clerk/nextjs";

import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = () => {
  const userId = auth();
  if (!userId.userId) throw new Error("Unauthorized");
  return { userId: userId.userId };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "16MB", maxFileCount: 1 } })
    .middleware(() => {
      return handleAuth();
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // console.log("Inside server image on complete....", metadata, file);
      return { uploadedBy: metadata.userId };
    }),
  messageFile: f(["image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {
      console.log("Inside message file....");
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
