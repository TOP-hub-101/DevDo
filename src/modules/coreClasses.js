let projectsList = []
import { updateLocalVariables } from "./localStorage";

class Project {
    constructor(name, details, id) {
        this.name = String(name);
        this.details = String(details || '');
        this.todos = [];
        this.id = id;
    }

    updateVariables(obj) {
        if (obj.name !== undefined) {
            this.name = obj.name;
        }
        if (obj.details !== undefined) {
            this.details = obj.details;
        }
    }    
}

function addProject(obj, id){
    const currProject = new Project(obj.name, obj.details, id);
    projectsList.push(currProject);
    updateLocalVariables('projectsList', projectsList);
}

function getProjectIndex(id){
    for(let i = 0; i < myProjects.length; i++){
        if(projectsList[i].id == id){
            return i;
        }
    }
    return null;
}

function removeProject(id){
    const index = getProjectIndex(id);
    projectsList.splice(index, 1);
    updateLocalVariables('projectsList', projectsList);
}

function modifyProject(obj, id){
    const index = getProjectIndex(id);
    const project = projectsList[index];
    project.updateProject(obj);
    updateLocalVariables('projectsList', projectsList);
}


function getTodoList(id){
    const index = getProjectIndex(id);
    const todoList = projectsList[index].todos;
    return todoList;
}

function updateProjectList(newList){
    for(let project of newList){
        const newProject = new Project(project.name, project.details, project.id);
        for(let todo of project.todos){
            const newTodo = new Todo(todo.taskName, todo.desc, todo.dueDate, todo.priority,todo.notes, todo.id)
            newProject.todos.push(newTodo);
        }
        newProject.push(newList);
    }
}


class Todo {
    constructor(taskName, desc, dueDate, priority, notes, id){
        this.taskName = String(taskName);
        this.desc = String(desc || '');
        this.dueDate = dueDate ? format(dueDate, 'MMMM d, yyyy') : null;
        this.priority = String(priority).toLowerCase();
        this.notes = String(notes || '');
        this.id = id;
        this.completed = false;
    }
    
    toggleStatus(){
        this.completed = this.completed? false : true;
    }

    updateVariables(obj) {
        if (obj.taskName) this.taskName = obj.taskName;
        if (obj.desc) this.desc = obj.desc;
        if (obj.dueDate) {
            const parsedDate = parseISO(obj.dueDate);
            if (!isNaN(parsedDate)) {
                this.dueDate = parsedDate;
            } else {
                console.log("Invalid due date format.");
            }
        }
        if (obj.priority) this.priority = obj.priority;
        if (obj.notes) this.notes = obj.notes;
    }
    

    getFormattedDueDate() {
        return this.dueDate ? format(this.dueDate, 'yyyy-MM-dd') : "No due date";
    }
}

function addTodo(obj, projectId, id){
    const index = getProjectIndex(projectId);
    const newTodo = new Todo(obj.taskName, obj.desc, obj.dueDate, obj.priority, obj.dueDate, id);
    projectsList[index].todos.push(newTodo);
    updateLocalVariables('projectsList', projectsList);
}

function removeTodo(projectId, todoId){
    const projectIndex = getProjectIndex(projectId);
    const todoIndex = getTodoIndex(todoId);
    projectsList[projectIndex].todos[todoIndex].splice(todoIndex, 1);
    updateLocalVariables('projectsList', projectsList);
}

function getTodoIndex(todoId, index){
    const todos = projectsList[index].todos;
    for (let i = 0; i < tasks.length; i++){
        if (todos[i].id == todoId){
            return i;
        }
    }
    return null;
}

function modifyTodo(obj, projectId, todoId){
    const projectIndex = getProjectIndex(projectId);
    const todoIndex = getTodoIndex(todoId);
    projectsList[projectIndex].todos[todoIndex].updateVariables(obj);
    updateLocalVariables('projectsList', projectsList);
}

function toggleAndGetStatus(projectId, todoId){
    const projectIndex = getProjectIndex(projectId);
    const todoIndex = getTodoIndex(todoId);
    projectsList[projectIndex].todos[todoIndex].toggleStatus();
    updateLocalVariables('projectsList', projectsList);
    return projectsList[projectIndex].todos[todoIndex].completed;
}

export { addTodo, addProject, removeTodo, removeProject, modifyProject, modifyTodo, getTodoList, toggleAndGetStatus, updateProjectList }