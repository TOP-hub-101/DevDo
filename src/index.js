import Todo from './modules/todos.js';
import Project from './modules/projects.js';

const todo1 = new Todo(
    "Finish assignment", 
    "High", 
    "College Project", 
    "Complete the first draft of the report", 
    "Review guidelines before submission", 
    "2025-01-20"
);

console.log("Todo 1:", todo1);

// Test `toggleCompleted`
todo1.toggleCompleted();
console.log("Completed status after toggle:", todo1.completed);

// Test `assignToProject`
todo1.assignToProject("Updated Project");
console.log("Project after reassignment:", todo1.addToProject);

// Test `editTodo`
todo1.editTodo({
    taskName: "Final Assignment Submission",
    priority: "Medium",
    notes: "Don't forget to add the appendix"
});
console.log("Todo after editing:", todo1);

const project1 = new Project(
    "College Work", 
    "Tasks related to college assignments", 
    "2025-01-01", 
    "2025-02-01"
);

console.log("Project 1:", project1);

// Test `addTask`
project1.addTask(todo1);
console.log("Project after adding Todo 1:", project1.getTasks());

// Test `editProject`
project1.editProject({
    name: "Updated College Work",
    details: "Updated description for college work"
});
console.log("Project after editing:", project1);

// Test `deleteTask`
project1.deleteTask(todo1);
console.log("Project after deleting Todo 1:", project1.getTasks());

