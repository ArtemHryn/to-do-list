export function addToDOM(markup, element) {
  element.insertAdjacentHTML("beforeend", markup);
}

export function getParentElement(element) {
  const task = element.closest("[data-id]");
  const id = Number(task.dataset.id);
  return {task , id};
}

export function filterTasks(tasks, id) {
  return tasks.filter((task) => task.id !== id);
}

export function rewriteLocalStorage(tasks, id) {
 return tasks.map((task) => {
    if (task.id === id) {
      task.isChecked = !task.isChecked;
      return task;
    }
    return task;
  });
}
