import { useEffect, useRef } from "react";

export default function Tasks({ tasks, setTasks, setTaskDurations }) {
  function handleDelete(e) {
    const idNum = parseInt(e.target.getAttribute('data-task-id'));
    const newTasks = tasks.filter((task) => task.id !== idNum);
    // update state (if data on backend - make API request to update data)
    setTasks(newTasks);

    setTaskDurations((prevState) => {
      // delete any taskDurations associated with the task
      const newTaskDurations = prevState.filter(
        (taskDuration) => taskDuration.task !== idNum
      );
      return newTaskDurations;
    });
  }
  return (
    <div id="gantt-grid-container__tasks">
      <div className="gantt-task-row"></div>
      <div className="gantt-task-row"></div>
      <div className="gantt-task-row"></div>

      <style jsx>{`
        #gantt-grid-container__tasks {
          outline: 0.5px solid var(--color-outline);
        }

        .gantt-task-row {
          display: flex;
          outline: 0.5px solid var(--color-outline);
          text-align: center;
          height: var(--cell-height);
          border: none;
        }

        input {
          width: 127px;
          border: none;
          outline: none;
          background: none;
        }

        button {
          line-height: 0px;
          color: var(--color-orange);
          background: none;
          border-radius: 5px;
          border: none;
          transition: all 0.2s ease;
        }

        button:focus {
          outline: none;
          transform: scale(1.3);
        }
      `}</style>
      {tasks &&
        tasks.map((tsk, i) => (
          <div key={`${i}-${tsk?.id}-${tsk.name}`} className="gantt-task-row">
            <input data-task-id={tsk?.id} value={tsk?.name} />
            <button type="button" data-task-id={tsk?.id} onClick={handleDelete} >
              x
            </button>
          </div>
        ))}
    </div>
  );
}
