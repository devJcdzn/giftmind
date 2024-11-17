"use server";

import s3 from "@/utils/cloudflare";
import { db } from "@/utils/db";

export const uploadToR2 = async (file: File, key: string): Promise<string> => {
  const buffer = await file.arrayBuffer();

  await s3
    .upload({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
      Key: key,
      Body: Buffer.from(buffer),
      ContentType: file.type,
    })
    .promise();

  return `${process.env.CLOUDLFARE_R2_PUBLIC_ENDPONT}/${key}`;
};

export const createPage = async (data: FormData) => {
  const images: Array<{ file: File | null; description: string }> = [];

  for (const [key, value] of data.entries()) {
    const match = key.match(/^images\[(\d+)]\[(file|description)]$/);

    if (match) {
      const index = parseInt(match[1], 10);
      const field = match[2];

      if (!images[index]) images[index] = { file: null, description: "" };
      if (field === "file" && value instanceof File) {
        images[index].file = value;
      } else if (field === "description") {
        images[index].description = value.toString();
      }
    }
  }

  const rawData = {
    name: data.get("name")?.toString() || "",
    message: data.get("message")?.toString() || "",
    plan: data.get("plan")?.toString() || "",
    images: images.filter((image) => image.file),
    color: data.get("color")?.toString() || "",
    icon: data.get("icon")?.toString() || "",
  };

  try {
    const uploadedImages = await Promise.all(
      rawData.images.map(async (image, index) => {
        const key = `pages/${rawData.name.replace(
          /\s+/g,
          "-"
        )}-${index}-${Date.now()}`;
        const url = await uploadToR2(image.file!, key);
        return {
          url,
          description: image.description,
        };
      })
    );

    const page = await db.page.create({
      data: {
        name: rawData.name,
        message: rawData.message,
        color: rawData.color,
        icon: rawData.icon,
        images: {
          createMany: {
            data: uploadedImages,
          },
        },
        selectedPlan: rawData.plan,
      },
    });

    return page;
  } catch (err) {
    console.log(err);
    throw new Error("Error to create page.");
  }
};
