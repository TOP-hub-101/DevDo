import Todo from "./todos.js";
import Project from "./projects.js";

const projectManager = {
    assignTodoToProject(todo, project) {
        if (!(todo instanceof Todo) || !(project instanceof Project)) {
            throw new Error("Invalid Todo or Project instance.");
        }
        todo.assignToProject(project);
        project.addTask(todo);
    }
};

export default projectManager;