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
    console.log(err);
  }
};

export const deleteTask = async (id: number) => {
  try {
    await db.tasks.delete(id);
  } catch (err) {
    console.log(err);
  }
};
