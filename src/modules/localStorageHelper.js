import pubSub from "./pubsub";

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

// We want to store the Projects, the Lists, and the tasks
// Just focus on projects
// storedProjects object with an array of projects, currentPproject
// every time we switch Projects we call upon the storage object

const __parseJSON = (storedString) => {
  const storedObj = JSON.parse(storedString);
  return storedObj;
};

const __stringifyJSON = (obj) => {
  return JSON.stringify(obj);
};

const retrieveItem = (key) => {
  const storedString = localStorage.getItem(key);
  return __parseJSON(storedString);
};

const updateItem = (key, property, updatedValue) => {
  const item = retrieveItem(key);
  item[property] = updatedValue;
};

// store array of Projects
// get id for each Project

/*
  Data Structure
   localStorage = {
    projects: [
      {title, id, lists: [
        { title, id, tasks: [] }
      ]}, 
      {project, id}],
    ]},
*/

//  Project retrieval - Getters

const getStoredProjects = () => {
  const storedString = localStorage.getItem("projects");
  const storedProjects = JSON.parse(storedString);
  return storedProjects;
};

const reconstructProjects = () => {
  const storedProjects = getStoredProjects();
  const reconstructedProjects = storedProjects.map((storedProject) => {
    const reconstructedProject = Project(project.title, project.id);
    reconstructLists(reconstructedProject, storedProject.lists);
    return reconstructedProject;
  });
  return reconstructedProjects;
};

const reconstructLists = (project, lists) => {
  lists.map((list) => {
    const reconstructedList = project.createList(list.title, list.id);
    pubSub.publish("createdList", reconstructedList);

    reconstructTasks(reconstructedList, list.tasks);
  });
};

const reconstructTasks = (list, tasks) => {
  tasks.forEach((task) => {
    const reconstructedTask = list.createTask(task.title, task.id);
    pubSub.publish("createdTask", { list, task: reconstructedTask });

    reconstructedTask.updateTask(...task);
  });
};

//  Project Storage - Setter

/*    
  const storeProjects = () => {
      We need to somehow convert our complex data into a simple data structure
    localStorage.setItem("projects", )
  }


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
