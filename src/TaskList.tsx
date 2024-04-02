import { useState } from "react";
import { TaskType } from "./types";
import { useTasks, useTasksDispatch } from "./TasksContext";

export default function TaskList() {
    const tasks = useTasks();
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

    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
                </li>
            ))}
        </ul>
    );
}

function Task({ task, onChange, onDelete }: { task: TaskType; onChange: (task: TaskType) => void; onDelete: (taskId: number) => void }) {
    const [isEditing, setIsEditing] = useState(false);
    let taskContent;
    if (isEditing) {
        taskContent = (
            <>
                <input
                    value={task.text}
                    onChange={(e) => {
                        onChange({
                            ...task,
                            text: e.target.value,
                        });
                    }}
                />
                <button onClick={() => setIsEditing(false)}>Save</button>
            </>
        );
    } else {
        taskContent = (
            <>
                {task.text}
                <button onClick={() => setIsEditing(true)}>Edit</button>
            </>
        );
    }
    return (
        <label>
            <input
                type="checkbox"
                checked={task.done}
                onChange={(e) => {
                    onChange({
                        ...task,
                        done: e.target.checked,
                    });
                }}
            />
            {taskContent}
            <button onClick={() => onDelete(task.id)}>Delete</button>
        </label>
    );
}
