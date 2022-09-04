import { Notify } from "notiflix/build/notiflix-notify-aio";
import "./css/styles.css";
import refs from "./refs";
import {
  addToFirebaseStorage,
  createTask,
  getTaskFromFirebaseStorage,
  addToLocalStorage,
  removeFromFirebase,
} from "./services";
import { renderTask } from "./markup";
import {
  addToDOM,
  getParentElement,
  filterTasks,
  rewriteLocalStorage,
} from "./helpers";

refs.form.addEventListener("submit", onAddTask);
refs.list.addEventListener("click", onTaskChange);

startTasks();

function onAddTask(e) {
  e.preventDefault();
  const inputVal = e.currentTarget.elements.message.value.trim();
  if (!inputVal) {
    Notify.info("Enter a task");
    return;
  }
  const data = createTask(inputVal);
  addToFirebaseStorage(data);
  addToDOM(renderTask([data]), refs.list);
  refs.form.reset();
}

async function startTasks() {
  const tasks = await getTaskFromFirebaseStorage();
  if (!tasks) {
    return;
  }
  addToDOM(renderTask(tasks), refs.list);
}

async function onTaskChange(e) {
  if (e.target.tagName === "BUTTON") {
    const { task, id } = getParentElement(e.target);
    removeFromFirebase(id).then(task.remove());
  }
  if (e.target.tagName === "P") {
    const { task, id } = getParentElement(e.target);
    const data = await getTaskFromFirebaseStorage(id);
    data.isChecked = task.classList.toggle("checked");
    addToFirebaseStorage(data);
  }
}
