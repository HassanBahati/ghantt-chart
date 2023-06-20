function flattenTaskDurations(tasks) {
  const taskDurations = [];
  let taskId = 1;

  tasks.forEach((task) => {
    const startDate = new Date(task.start_date);
    const dueDate = new Date(task.due_date);

    const taskDuration = {
      id: taskId,
      start: task?.start,
      end: task?.end,
      task: task.id,
    };
    

    taskDurations.push(taskDuration);
    taskId++;
  });

  return taskDurations;
}

export { flattenTaskDurations };
