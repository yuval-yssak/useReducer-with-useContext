import { useReducer } from "react";
import { ActionType, TaskType } from "./types";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import { TasksContext, TasksDispatchContext } from "./TasksContext";

export default function TaskApp() {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

    function handleAddTask(text: string) {
        dispatch({
            type: "add",
            id: nextId++,
            text: text,
        });
    }

    function handleChangeTask(task: TaskType) {
        dispatch({
            type: "change",
            task: task,
        });
    }

    function handleDeleteTask(taskId: number) {
        dispatch({
            type: "delete",
            id: taskId,
        });
    }

    return (
        <TasksContext.Provider value={tasks}>
            <TasksDispatchContext.Provider value={dispatch}>
                <h1>Day off in Kyoto</h1>
                <AddTask onAddTask={handleAddTask} />
                <TaskList tasks={tasks} onChangeTask={handleChangeTask} onDeleteTask={handleDeleteTask} />
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    );
}

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

let nextId = 3;
const initialTasks: TaskType[] = [
    { id: 0, text: "Philosopher's Path", done: true },
    { id: 1, text: "Visit the temple", done: false },
    { id: 2, text: "Drink matcha", done: false },
];
