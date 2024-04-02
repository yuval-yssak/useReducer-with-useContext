export type TaskType = { id: number; text: string; done: boolean };

export type ActionType = { type: "change"; task: TaskType } | { type: "delete"; id: number } | { type: "add"; id: number; text: string };
