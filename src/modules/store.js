const store = (() => {
  const projects = [];
  const getProjects = () => projects;
  const addProject = (project) => projects.push(project);
  return { getProjects, addProject };
})();

export default store;
