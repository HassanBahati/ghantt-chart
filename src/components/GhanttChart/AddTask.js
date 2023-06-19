import { useEffect, useRef, useState } from "react";
import AddButton from "./AddButton";

export default function AddTask({ setTasks , tasks}) {
  const [task, setTask] = useState("");
  const inputRef = useRef([]);
  const indexRef = useRef(null);
  function onChange(e) {
    setTask(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTask("");
  }

  function onChange(e, i) {
    indexRef.current = i;
    const { value } = e.target;
    const idNum = parseInt(e.target.getAttribute("data-task-id"));

    let newTasks = tasks.filter((task) => task.id !== idNum);
    newTasks.push({ id: idNum, name: value });
    newTasks = newTasks.sort((a, b) => a.id - b.id);
    // update state (if data on backend - make API request to update data)
    setTasks(newTasks);
  }

  // set the indexRef to the index of the last edited input. 
  useEffect(() => {
    if (inputRef.current.length && indexRef.current >= 0) {
      inputRef?.current[indexRef.current]?.focus();
    }
  });

  return (
    <form id="add-task" onSubmit={handleSubmit}>
      <h2>Add Task</h2>
      <input
        value={task}
        onChange={(e, i) => onChange(e, i)}
        placeholder="add task name"
        ref={(el, i) => (inputRef.current[i] = el)}
      />
      <AddButton />
      <style jsx>{`
        #add-task {
          margin-right: 10px;
          margin-bottom: 10px;
          border-radius: 5px;
          box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.05);
        }

        input {
          height: var(--cell-height);
          margin-top: 21px;
          margin-bottom: 21px;
        }
      `}</style>
    </form>
  );
}
