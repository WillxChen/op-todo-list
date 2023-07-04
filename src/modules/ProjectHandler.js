import Project from "./Project.js";
import pubSub from "./pubSub.js";
import { createDefaultList } from "./List/ListHandler";
import store from "./store.js";

const createDefaultProject = () => {
  console.log("Creating default project");
  const defaultProject = Project("Default");
  store.setCurrentProject(defaultProject);

  pubSub.publish("projectCreated", defaultProject);
  createDefaultList(defaultProject);
  return defaultProject;
};

export { createDefaultProject };
