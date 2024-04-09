"use server";
import { revalidateTag } from "next/cache";

export async function createStoryBook(prevState: any, formData: FormData) {
  try {
    const error: string[] = [];
    const title = formData.get("bookTitle");
    const description = formData.get("bookDescription");
  } catch (err: unknown) {}

  revalidateTag("storybook");
  return {
    message: "Please enter a valid email",
  };
}
