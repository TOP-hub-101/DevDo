import Todo from "./todos";

class Project {
    constructor(name, details, startDate, endDate) {
        this.name = String(name);
        this.details = String(details || '');
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
        this.todos = [];
    }

    addTask(todo) {
        if (todo instanceof Todo) {
            this.todos.push(todo);
        } else {
            throw new Error("Only instances of Todo can be added.");
        }
    }

    getTasks() {
        return this.todos;
    }

    editProject(updates) {
        for (const key in updates) {
            if (this.hasOwnProperty(key)) {
                this[key] = updates[key];
            } else {
                console.log(`Property ${key} does not exist on Project.`);
            }
        }
    }

    deleteTask(todo) {
        const index = this.todos.indexOf(todo);
        if (index > -1) {
            this.todos.splice(index, 1); 
        } else {
            throw new Error("Task not found in project.");
        }
    }
}

export default Project