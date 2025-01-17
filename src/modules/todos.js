class Todo {
    constructor(taskName, priority, addToProject, description, notes, dueDate, completed = false){
        this.taskName = String(taskName);
        this.priority = String(priority).toLowerCase();
        this.addToProject = String(addToProject);
        this.description = String(description || '');
        // this.notes = String(notes || '');
        this.dueDate = new Date(dueDate);
        this.completed = Boolean(completed);
    }
    
    toggleCompleted(){
        this.completed = this.completed? false : true;
    }

    assignToProject(projectName){
        if (typeof projectName !== 'string' || projectName.trim() === ''){
            throw new Error("Project name must be a valid non-empty string.");
        }
        this.addToProject = projectName;
    }

    editTodo(updates){
        for (const key in updates){
            if(this.hasOwnProperty(key)){
                this[key] = updates[key];
            } else {
                console.log(`Property ${key} does not exist on Todo.`);
            }
        }
    }
}


export default Todo;