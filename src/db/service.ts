import { db } from "./db";

export const createTask = async (
  description: string,
  categoryId: number,
  isComplete: boolean
) => {
  await db.tasks.add({
    description,
    categoryId,
    isComplete,
  });
};

export const updateTask = async (
  id: number,
  description: string,
  isComplete: boolean
) => {
  await db.tasks.update(id, {
    description,
    isComplete,
  });
};

export const deleteTask = async (id: number) => {
  await db.tasks.delete(id);
};

export const createCategory = async (name: string, color: string) => {
  await db.categories.add({
    name,
    color,
  });
};

export const updateCategory = async (
  id: number,
  name: string,
  color: string
) => {
  await db.categories.update(id, {
    name,
    color,
  });
};

export const deleteCategory = async (id: number) => {
  await db.categories.delete(id);
};
