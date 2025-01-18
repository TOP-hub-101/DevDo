import { format, parseISO } from 'date-fns';

class Todo {
    constructor(taskName, priority, description, notes, dueDate, completed = false){
        this.taskName = String(taskName);
        this.priority = String(priority).toLowerCase();
        this.description = String(description || '');
        this.notes = String(notes || '');
        this.dueDate = dueDate ? format(dueDate, 'MMMM d, yyyy') : null;
        this.completed = Boolean(completed);
        this.addToProject = null;
    }
    
    toggleCompleted(){
        this.completed = this.completed? false : true;
    }

    assignToProject(projectInstance){
        if (projectInstance === null) {
            this.addToProject = null; // Allow resetting the project
            return;
        }      

        if (typeof projectInstance !== "object" || !projectInstance.name) {
            throw new Error("Invalid project instance.");
        }
        this.addToProject = projectInstance; 
    }

    editTodo(updates){
        for (const key in updates){
            if(this.hasOwnProperty(key)){
                if (key === 'dueDate') {
                    const parsedDate = parseISO(updates[key]);
                    if (isNaN(parsedDate)){
                        console.log("Invalid due date format.");
                        continue;
                    }
                    this.dueDate = parsedDate;
                } else {
                    this[key] = updates[key];
                }
            } else {
                console.log(`Property ${key} does not exist on Todo.`);
            }
        }
    }

    getFormattedDueDate() {
        return this.dueDate ? format(this.dueDate, 'yyyy-MM-dd') : "No due date";
    }
}


export default Todo;