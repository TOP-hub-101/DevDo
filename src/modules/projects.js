import { parseISO } from "date-fns";
import Todo from "./todos.js";

class Project {
    constructor(name, details, startDate, endDate) {
        this.name = String(name);
        this.details = String(details || '');
        this.startDate = parseISO(startDate);
        this.endDate = parseISO(endDate);
        this.todos = [];
    }

    addTask(todo) {
        if (todo instanceof Todo) {
            todo.assignToProject(this);
            this.todos.push(todo);
        } else {
            throw new Error("Only instances of Todo can be added.");
        }
    }

    getTasks() {
        return this.todos.map(td => {
            return {
                taskName: td.taskName,
                priority: td.priority,
                description: td.description,
                notes: td.notes,
                dueDate: td.dueDate,
                completed: td.completed,
                addToProject: td.addToProject
            }
        });
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
            todo.assignToProject(null);
        } else {
            throw new Error("Task not found in project.");
        }
    }
}

export default Project;