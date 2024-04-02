import { createContext } from "react";
import { ActionType, TaskType } from "./types";

export const TasksContext = createContext<TaskType[]>(null as unknown as TaskType[]);
export const TasksDispatchContext = createContext<(action: ActionType) => void>(null as unknown as (action: ActionType) => void);
