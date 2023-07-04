import Project from "./Project";
import pubSub from "./pubSub.js";
import store from "./store.js";
import { createDefaultProject } from "./ProjectHandler";

function storageAvailable() {
  try {
    var storage = window["localStorage"],
      x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

const __stringifyJSON = (obj) => {
  return JSON.stringify(obj);
};

const retrieveItem = (key) => {
  const storedString = localStorage.getItem(key);
  return JSON.parse(storedString);
};

/*
  Data Structure
   localStorage = {
    projects: [
      {projectTitle, id, lists: [
        { title, id, tasks: [] }
      ]}, 
      {projectTitle, id, lists...}],
    ]},
*/

//  Project retrieval - Getters

const getStoredProjects = () => {
  const storedString = localStorage.getItem("projects");
  const storedProjects = JSON.parse(storedString);
  return storedProjects;
};

const checkForProjects = () => {
  // Uncomment to wipe storage
  // localStorage.removeItem("projects");
  if (!("projects" in localStorage)) {
    console.log("Initialize projects array in storage");
    localStorage.setItem("projects", JSON.stringify([]));
    createDefaultProject();
    return;
  }
  // Reconstruct the current project and set currentProject in storage
  store.setCurrentProject(reconstructCurrentProject());
};

const reconstructCurrentProject = () => {
  const storedProjects = getStoredProjects();
  const currProjIndex = retrieveCurrProjIdx();
  const currentProj = storedProjects[currProjIndex];

  const reconstructedProject = Project(currentProj.title, currentProj.id);
  pubSub.publish("projectReconstructed", reconstructedProject);

  __reconstructLists(reconstructedProject, currentProj.lists);

  return reconstructedProject;
};
// Initialize subscriptions after reconstruction

const __reconstructLists = (project, lists) => {
  lists.map((list) => {
    const reconstructedList = project.createList(list.title, list.id);
    pubSub.publish("listReconstructed", reconstructedList);

    __reconstructTasks(reconstructedList, list.tasks);
  });
};

const __reconstructTasks = (list, tasks) => {
  tasks.forEach((task) => {
    list.createTask(task.title, task.id);
    const updatedTask = list.updateTask(task.id, task);
    pubSub.publish("taskReconstructed", { list, task: updatedTask });
  });
};

// Init reconstruction
// store.setProjects(reconstructProjects());

// Listen for new creations to be put into storage

//  Project Storage - Setter

pubSub.subscribe("projectCreated", storeProject);
pubSub.subscribe("listCreated", storeList);
pubSub.subscribe("taskCreated", storeTask);
pubSub.subscribe("taskUpdated", storeUpdatedTask);
pubSub.subscribe("taskDeleted", deleteStoredTask);
pubSub.subscribe("currentProjectSet", storeCurrentProject);

function storeProject(project) {
  const updatedProjects = retrieveItem("projects");
  updatedProjects.push({
    title: project.getTitle(),
    id: project.getId(),
    lists: [],
  });

  localStorage.setItem("projects", JSON.stringify(updatedProjects));
}

function storeList(list) {
  const updatedProjects = retrieveItem("projects");
  const index = retrieveCurrProjIdx();
  console.log(updatedProjects[index]);
  updatedProjects[index].lists.push({
    title: list.getTitle(),
    id: list.getId(),
    tasks: [],
  });

  localStorage.setItem("projects", JSON.stringify(updatedProjects));
}

function storeTask(data) {
  const { list, task } = data;
  const updatedProjects = retrieveItem("projects");
  const storedList = retrieveStoredListByIdx(updatedProjects, list.getId());
  storedList.tasks.push(task);

  localStorage.setItem("projects", JSON.stringify(updatedProjects));
}

function storeUpdatedTask(data) {
  const { list, task } = data;
  const updatedProjects = retrieveItem("projects");
  const storedList = retrieveStoredListByIdx(updatedProjects, list.getId());
  const storedTasks = storedList.tasks;
  const taskIndex = retrieveTaskIndex(storedTasks, task.id);
  storedTasks[taskIndex] = { ...storedTasks[taskIndex], ...task };

  localStorage.setItem("projects", JSON.stringify(updatedProjects));
}

function deleteStoredTask(data) {
  const { list, task } = data;
  const updatedProjects = retrieveItem("projects");
  const storedList = retrieveStoredListByIdx(updatedProjects, list.getId());
  const storedTasks = storedList.tasks;
  const taskIndex = retrieveTaskIndex(storedTasks, task.id);
  storedTasks.splice(taskIndex, 1);

  localStorage.setItem("projects", JSON.stringify(updatedProjects));
}

function storeCurrentProject(data) {
  localStorage.setItem("currentProject", JSON.stringify(data));
}

const retrieveStoredListByIdx = (updatedProjects, listId) => {
  const projIndex = retrieveCurrProjIdx();
  const listIndex = retrieveListIndex(listId);
  const storedProject = updatedProjects[projIndex];
  const storedList = storedProject.lists[listIndex];
  return storedList;
};

const retrieveCurrProjIdx = () => {
  const projectsInStorage = retrieveItem("projects");
  const currentProject = retrieveItem("currentProject");
  const index = projectsInStorage.findIndex(
    (project) => project.id === currentProject.id
  );
  return index;
};

const retrieveListIndex = (id) => {
  const projectsInStorage = retrieveItem("projects");
  const currProjIndex = retrieveCurrProjIdx();
  const lists = projectsInStorage[currProjIndex].lists;
  const index = lists.findIndex((list) => list.id === id);
  return index;
};

const retrieveList = (id) => {
  const updatedProjects = retrieveItem("projects");
  const projIndex = retrieveCurrProjIdx();
  const listIndex = retrieveListIndex(id);
  const project = updatedProjects[projIndex];
  const list = project.lists[listIndex];
  return list;
};

const retrieveTaskIndex = (array, taskId) => {
  return array.findIndex((task) => task.id === taskId);
};

/*    


  We need to now reconstruct the objects via their factory functions
  Also, figure out how to extrapolate and store data within the simple data structure of localStorage


  Init - 
    Check if localStorage contains a project.
      If no project is found, then create the default project

      If localStorage contains a project...
        Import the project array.
        Reconstruct the Projects
  
        Reconstruct the Lists within the Project
        const storedLists = storedProjects.map(project => {
            return project.lists;
        })
        const storedTasks = storeLists.map(list => {
          return list.tasks
        })

        const storedTasks = storedLists.map(list => list.getTasks);
        const reconstructLists = storedProjects.forEach(storedProject => {
          return storedProjects.map(project => project.)
            reconstructedProjects.map(Project => Project.createList(title, id))
        });


        
*/

export { retrieveItem, checkForProjects, reconstructCurrentProject };
