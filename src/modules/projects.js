import Todo from "./todos";

class Project {
    constructor(name, details, startDate, endDate) {
        this.name = name;
        this.details = details;
        this.startDate = startDate;
        this.endDate = endDate;
        this.todos = [];
    }

    addTask(todo){
        if (todo instanceof Todo){
            this.todos.push(todo);
        } else {
            throw new Error("Only instances of Todo can be added.");
        }
    }

    getTasks() {
        return this.todos;
    }
}