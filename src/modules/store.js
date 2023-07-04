import pubSub from "./pubSub";

const store = (() => {
  const projects = [];
  let currentProject = null;
  // Populate projects with a list of all the project names within storage + add any newly created projects

  const getCurrentProject = () => currentProject;

  function addProject(project) {
    if (currentProject === null) {
      setCurrentProject(project);
    }
    projects.push(project);
    return projects;
  }

  const setCurrentProject = (project) => {
    console.log("Setting current project: " + project.getTitle());
    currentProject = project;
    pubSub.publish("currentProjectSet", {
      title: project.getTitle(),
      id: project.getId(),
    });
    return currentProject;
  };
  return { getCurrentProject, setCurrentProject };
})();

export default store;
