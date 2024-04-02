import { useState } from "react";
import { useTasksDispatch } from "./TasksContext";

let nextId = 3;

export default function AddTask() {
    const dispatch = useTasksDispatch();

    function onAddTask(text: string) {
        dispatch({
            type: "add",
            id: nextId++,
            text: text,
        });
    }
    const [text, setText] = useState("");
    return (
        <>
            <input placeholder="Add task" value={text} onChange={(e) => setText(e.target.value)} />
            <button
                onClick={() => {
                    setText("");
                    onAddTask(text);
                }}
            >
                Add
            </button>
        </>
    );
}
