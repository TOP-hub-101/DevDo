//  *****Implementation-1*****

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




//  *****Implementation-2*****

// import Todo from './modules/todos.js';
// import Project from './modules/projects.js';
// import projectManager from './modules/projectManager.js';

// // Create a new Todo
// const todo1 = new Todo(
//     "Complete the report", 
//     "High", 
//     "Write and review the report", 
//     "Final edits before submission", 
//     "2025-02-01"
// );

// // Create a new Project
// const project1 = new Project(
//     "Research Project", 
//     "Project related to research tasks", 
//     "2025-01-15", 
//     "2025-03-01"
// );

// // Assign Todo to Project
// projectManager.assignTodoToProject(todo1, project1);
// console.log(project1.getTasks()); // Should show the Todo added to the project

// // Edit the Todo
// todo1.editTodo({ taskName: "Submit the report", priority: "Medium" });
// console.log(todo1); // Check updated Todo

// // Delete the Todo from the Project
// project1.deleteTask(todo1);
// console.log(project1.getTasks()); // Should be empty now


//  *****Implementation-3*****

import { format } from 'date-fns';
import Todo from './modules/todos.js';
import Project from './modules/projects.js';
import projectManager from './modules/projectManager.js';

// Initialize default project
projectManager.initializeDefaultProject();

// Test - Create a new Todo item
const myTodo = new Todo(
    "Finish Homework", 
    "high", 
    "Complete the math and science homework", 
    "Important notes here", 
    format(new Date(), 'MMMM d, yyyy')  // Set due date to current date
);

// Log the new Todo item to see its properties
console.log("Created Todo:", myTodo);

// Test - Assign Todo to the default project (if it's not already assigned)
projectManager.assignTodoToProject(myTodo, null);  // Passing null for project to trigger default assignment

// Log the Todo after assignment
console.log("Todo after assigning to project:", myTodo);

// Test - Create a new Project
const newProject = new Project(
    "Personal Project", 
    "Work on personal coding side project", 
    format(new Date(), 'MMMM d, yyyy'),
    format(new Date().setMonth(new Date().getMonth() + 1), 'MMMM d, yyyy')  // Set end date to one month from now
);

// Log the new project
console.log("Created Project:", newProject);

// Test - Assign the same Todo to the new project
projectManager.assignTodoToProject(myTodo, newProject);

// Log the Todo after assigning to the new project
console.log("Todo after reassigning to new project:", myTodo);

// Log the tasks in the new project to check if the Todo was added
console.log("Tasks in the new project:", newProject.getTasks());
