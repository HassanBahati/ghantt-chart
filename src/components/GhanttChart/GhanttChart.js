import { client } from "@/utils/fetchWrapper";
import { useState, useEffect } from "react";
import AddTaskDuration from "./AddTaskDuration";
import AddTask from "./AddTask";
import Grid from "./Grid";
import Settings from "./Settings";
import Tasks from "./Tasks";
import TimeRange from "./TimeRange";
import TimeTable from "./TimeTable";
import { flattenTaskDurations } from "@/utils";

export default function GanttChart() {
  const [tasks, setTasks] = useState(null);
  const [taskDurations, setTaskDurations] = useState(null);
  const [timeRange, setTimeRange] = useState({
    fromSelectMonth: 0,
    fromSelectYear: "2023",
    toSelectMonth: 1,
    toSelectYear: "2024",
  });

  async function FetchData(params) {
    await fetch(`${process.env.NEXT_PUBLIC_API}`)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data?.data);
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors that occurred during the request
      });
  }

  useEffect(() => {
    // client("data.json").then(
    //   (data) => {
    //       setTasks(data?.tasks);
    //        setTaskDurations(data?.taskDurations);
    //   },
    //   (error) => {
    //     console.error("Error: ", error);
    //   }
    // );
    FetchData();
  }, []);

  useEffect(() => {
    if (tasks) {
      setTaskDurations(flattenTaskDurations(tasks));
    }
  }, [tasks]);

  return (
    <div id="gantt-container">
      <style jsx>{`
        #gantt-container {
          --color-text: #272a2e;
          --color-primary-dark: #0195e4;
          --color-primary-light: #9ddcff;
          --color-secondary: #4be35a;
          --color-tertiary: #f7f7f7;
          --color-orange: #ef5350;
          --color-outline: #e9eaeb;
          --border-radius: 5px;
          --cell-height: 40px;
          padding: 1rem;
        }
      `}</style>

      <Grid>
        <Tasks
          tasks={tasks}
          setTasks={setTasks}
          setTaskDurations={setTaskDurations}
        />
        <TimeTable
          timeRange={timeRange}
          tasks={tasks}
          taskDurations={taskDurations}
          setTaskDurations={setTaskDurations}
        />
      </Grid>
      <Settings>
        <AddTask setTasks={setTasks} tasks={tasks} />
        <AddTaskDuration tasks={tasks} setTaskDurations={setTaskDurations} />
        <TimeRange timeRange={timeRange} setTimeRange={setTimeRange} />
      </Settings>
    </div>
  );
}
