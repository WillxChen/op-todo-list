import TaskManager from "./modules/TaskManager.js";
import UiManager from "./modules/UIHandler.js";
import Project from "./modules/Project.js";

const currentProject = Project();
const listStorage = currentProject.getLists();

const UI = UiManager;
UI.init();

// const ListUpdater = (() => {
//   const lists = document.querySelector(".lists");

//   const update = () => {
//     lists.innerHTML = "";
//     listStorage.forEach((list) => {
//       lists.innerHTML += `<li>${list.getTitle()}</li>`;
//     });
//   };
//   return { update };
// })();

// const ListRenderer = (() => {
//   const listContainer = document.querySelector(".list-container");

//   // Create list

//   // Pass in array of elements to be rendered in the list container
//   const render = (listArray) => {
//     listArray.forEach((list) => {});
//   };

//   render(listStorage);
// })();

const TaskCreator = (() => {})();

/* Now I want to link it to the UI
  Form Input to create a new List
  new List will contain an input to create a new Task
*/

/* Updating Task
  Form input in List
  Submit a new Task to listStorage[x].createTask(taskDetails);

*/
