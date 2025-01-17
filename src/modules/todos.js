class Todo {
    constructor(taskName, priority, addToProject, description, notes, dueDate, completed = false){
        this.taskName = taskName;
        this.priority = priority;
        this.addToProject = addToProject;
        this.description = description;
        this.notes = notes;
        this.dueDate = dueDate;
        this.completed = completed;
    }
    // method implementation in further steps
}


export default Todo;