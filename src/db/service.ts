import { db } from "./db";

export const createTask = async (
  description: string,
  categoryId: number,
  isComplete: boolean
) => {
  try {
    const id = await db.tasks.add({
      description,
      categoryId,
      isComplete,
    });
    return id;
  } catch (err) {
    return null;
  }
};
