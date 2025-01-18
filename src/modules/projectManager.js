import { format } from 'date-fns';
import Todo from "./todos.js";
import Project from "./projects.js";

const projectManager = {
    defaultProject: null,
    initializeDefaultProject() {
        if (!this.defaultProject){
            this.defaultProject = new Project(
                "Default Project",
                "This is the default project for unassigned tasks.",
                format(new Date(), 'MMMM d, yyyy'), 
                format(new Date(), 'MMMM d, yyyy') 
            );
        }
    },
    assignTodoToProject(todo, project) {
        if (todo.addToProject === null && this.defaultProject) {
            todo.assignToProject(this.defaultProject);  
        } else if (!(todo instanceof Todo) || !(project instanceof Project)) {
            throw new Error("Invalid Todo or Project instance.");
        } else {
            todo.assignToProject(project);  
            project.addTask(todo);  
        }
    }
};

export default projectManager;