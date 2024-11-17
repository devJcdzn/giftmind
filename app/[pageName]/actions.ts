"use server";

import { db } from "@/utils/db";

export async function getPageFromDatabase(name: string) {
  try {
    const page = await db.page.findUnique({
      where: {
        name,
      },
      include: {
        images: true,
      },
    });

    console.log(page);

    return page;
  } catch (err) {
    console.log(err);
  }
}
