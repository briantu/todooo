import Dexie, { Table } from "dexie";

export interface Category {
  id?: number;
  name: string;
  color: string;
}

export interface Task {
  id?: number;
  description: string;
  isComplete: boolean;
  categoryId: number;
}

export interface TaskWithCategory {
  id?: number;
  description: string;
  isComplete: boolean;
  category: Category;
}

export class MySubClassedDexie extends Dexie {
  categories!: Table<Category>;
  tasks!: Table<Task>;

  constructor() {
    super("todoooDb");
    this.version(1).stores({
      categories: "++id, name, color",
      tasks: "++id, description, isComplete, categoryId",
    });
  }
}

export const db = new MySubClassedDexie();
