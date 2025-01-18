import { format } from 'date-fns';
import Todo from "./todos.js";
import Project from "./projects.js";

const createProjectManager = () => {
    let defaultProject = null;

    const initializeDefaultProject = () => {
        if (!defaultProject) {
            defaultProject = new Project(
                "Default Project",
                "This is the default project for unassigned tasks.",
                format(new Date(), 'MMMM d, yyyy'),
                format(new Date(), 'MMMM d, yyyy')
            );
        }
    };

    const assignTodoToProject = (todo, project = null) => {
        if (!(todo instanceof Todo)) {
            throw new Error("Invalid Todo instance.");
        }

        if (!project) {
            if (!defaultProject) {
                initializeDefaultProject();
            }
            project = defaultProject; // Assign to defaultProject
        }

        if (!(project instanceof Project)) {
            throw new Error("Invalid Project instance.");
        }

        todo.assignToProject(project);
        project.addTask(todo);
    };

    const getDefaultProject = () => defaultProject;

    return {
        initializeDefaultProject,
        assignTodoToProject,
        getDefaultProject,
    };
};

export default createProjectManager;
