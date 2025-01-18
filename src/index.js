// import Todo from './modules/todos.js';
// import Project from './modules/projects.js';
// import projectManager from './modules/projectManager.js';

// const todo1 = new Todo(
//     "Finish assignment", 
//     "High",  
//     "Complete the first draft of the report", 
//     "Review guidelines before submission", 
//     "2025-01-20"
// );

// console.log("Todo 1 (Initial):", todo1);

// const project1 = new Project(
//     "College Work",
//     "Tasks related to college assignments",
//     "2025-01-01",
//     "2025-02-01"
// )

// console.log("Project 1 (Initial):", project1);

// projectManager.assignTodoToProject(todo1, project1);

// console.log("Project 1 after adding Todo 1:", project1.getTasks());
// console.log("Todo 1 after being assigned to Project 1:", todo1.addToProject);

// project1.editProject({
//     name: "Updated College Work",
//     details: "Updated details for college assignments"
// });
// console.log("Project 1 after editing:", project1);

// todo1.editTodo({
//     taskName: "Final Assignment Submission",
//     priority: "Medium",
//     notes: "Ensure appendix is included"
// });
// console.log("Todo 1 after editing:", todo1);

// project1.deleteTask(todo1);
// console.log("Project 1 after deleting Todo 1:", project1.getTasks());
// console.log("Todo 1 after being removed from Project 1:", todo1.addToProject);

import Todo from './modules/todos.js';
import Project from './modules/projects.js';
import projectManager from './modules/projectManager.js';

// Create a new Todo
const todo1 = new Todo(
    "Complete the report", 
    "High", 
    "Write and review the report", 
    "Final edits before submission", 
    "2025-02-01"
);

// Create a new Project
const project1 = new Project(
    "Research Project", 
    "Project related to research tasks", 
    "2025-01-15", 
    "2025-03-01"
);

// Assign Todo to Project
projectManager.assignTodoToProject(todo1, project1);
console.log(project1.getTasks()); // Should show the Todo added to the project

// Edit the Todo
todo1.editTodo({ taskName: "Submit the report", priority: "Medium" });
console.log(todo1); // Check updated Todo

// Delete the Todo from the Project
project1.deleteTask(todo1);
console.log(project1.getTasks()); // Should be empty now
