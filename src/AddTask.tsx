import { useState } from "react";
import { TaskType } from "./types";
import { useTasks, useTasksDispatch } from "./TasksContext";

export default function TaskList() {
    const tasks = useTasks();

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <Task task={task} />
                </li>
            ))}
        </ul>
    );
}

function Task({ task }: { task: TaskType }) {
    const [isEditing, setIsEditing] = useState(false);

    const dispatch = useTasksDispatch();

    function onChangeTask(task: TaskType) {
        dispatch({
            type: "change",
            task: task,
        });
    }

    function onDeleteTask(taskId: number) {
        dispatch({
            type: "delete",
            id: taskId,
        });
    }

    const taskContent = isEditing ? (
        <>
            <input
                value={task.text}
                onChange={(e) => {
                    onChangeTask({
                        ...task,
                        text: e.target.value,
                    });
                }}
            />
            <button onClick={() => setIsEditing(false)}>Save</button>
        </>
    ) : (
        <>
            {task.text}
            <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
    );

    return (
        <label>
            <input
                type="checkbox"
                checked={task.done}
                onChange={(e) => {
                    onChangeTask({
                        ...task,
                        done: e.target.checked,
                    });
                }}
            />
            {taskContent}
            <button onClick={() => onDeleteTask(task.id)}>Delete</button>
        </label>
    );
}
