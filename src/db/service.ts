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

export const updateTask = async (
  id: number,
  description: string,
  isComplete: boolean
) => {
  try {
    await db.tasks.update(id, {
      description,
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
