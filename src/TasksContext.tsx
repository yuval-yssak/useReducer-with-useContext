import { PropsWithChildren, createContext, useReducer } from "react";
import { ActionType, TaskType } from "./types";

const initialTasks: TaskType[] = [
    { id: 0, text: "Philosopher's Path", done: true },
    { id: 1, text: "Visit the temple", done: false },
    { id: 2, text: "Drink matcha", done: false },
];

export const TasksContext = createContext(initialTasks);
export const TasksDispatchContext = createContext<(action: ActionType) => void>(() => {});

function tasksReducer(tasks: TaskType[], action: ActionType) {
    switch (action.type) {
        case "add": {
            return [
                ...tasks,
                {
                    id: action.id,
                    text: action.text,
                    done: false,
                },
            ];
        }
        case "change": {
            return tasks.map((t) => {
                if (t.id === action.task.id) {
                    return action.task;
                } else {
                    return t;
                }
            });
        }
        case "delete": {
            return tasks.filter((t) => t.id !== action.id);
        }
    }
}

export function TasksProvider({ children }: PropsWithChildren) {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

    return (
        <TasksContext.Provider value={tasks}>
            <TasksDispatchContext.Provider value={dispatch}>{children}</TasksDispatchContext.Provider>
        </TasksContext.Provider>
    );
}
