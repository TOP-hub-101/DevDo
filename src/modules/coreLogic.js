import { parseISO, format} from 'date-fns';

class Project {
    constructor(projectName) {
        this.projectName = String(projectName);
        this.todos = [];
    }
}


class Todo {
    constructor(taskName, desc, dueDate, priority, completed = false) {
        this.taskName = String(taskName);
        this.desc = String(desc || '');
        this.dueDate = dueDate ? new Date(dueDate) : null; //.toISOString().split("T")[0]; or 
        //? format(dueDate, 'yyyy-MM-dd') : null;
        this.priority = priority;
        this.completed = completed;
    }

    updateValue(array) {
        const [taskName, desc, dueDate, priority, completed] = array;
        this.taskName = taskName;
        this.desc = desc;
        // if (dueDate) {
        //     const parsedDate = parseISO(dueDate);
        //     if (!isNaN(parsedDate)) {
        //         this.dueDate = parsedDate;
        //     } else {
        //         console.log("Invalid due date format.");
        //     }
        // }
        this.dueDate = Date(dueDate);
        this.priority = priority;
        this.completed = completed === 'true';
    }

    // toggleStatus() { //extra
    //     this.completed = this.completed == false ? true : false;
    // }

    // getFormattedDueDate() { //extra
    //     return this.dueDate ? format(this.dueDate, 'yyyy-MM-dd') : "No due date";
    // }
}

export default function ManageProject() {
    const projects = [];

    const newProject = (projectName) => {
        projects.push(new Project(projectName));
    };

    const newTodo = (projectIndex, array) => {
        const [ taskName, desc, dueDate, priority, completed = false ] = array;
        projects[projectIndex].todos.push(
            new Todo(taskName, desc, dueDate, priority, completed)
        );
    };

    const editTodo = (projectIndex, todoIndex, array) => {
        projects[projectIndex].todos[todoIndex].updateValue(array);
    };

    const getProjectList = () => {
        const projectList = [];
        projects.forEach((project) => {
            projectList.push(project);
        });
        return projectList;
    };

    const getProjectTodos = (projectIndex) => {
        const projectTodoList = [];
        if (projects[projectIndex] !== undefined) {
            projects[projectIndex].todos.forEach((list) => {
                projectTodoList.push(list);
            });
        }

        return projectTodoList;
    };

    const deleteProject = (projectIndex) => {
        projects.splice(projectIndex, 1);
    };

    const deleteTodos = (projectIndex, todoIndex) => {
        projects[projectIndex].todos.splice(todoIndex, 1);
    };

    const updateStorage = () => {
        localStorage.setItem('projects', JSON.stringify(projects));
    };

    const getLocalStorage = () => {
        const projectStorage = JSON.parse(localStorage.getItem('projects'));

        for (let i = 0; i < projectStorage.length; i++) {
            projects.push(new Project(projectStorage[i].projectName));
            for (let j = 0; j < projectStorage[i].todos.length; j++) {
                let { taskName, desc, dueDate, priority, completed } = projectStorage[i].todos[j];

                dueDate = dueDate ? new Date(dueDate) : null;

                projects[i].todos.push(
                    new Todo(taskName, desc, dueDate, priority, completed)
                );
            }
        }
    };

    if (localStorage.getItem('projects') === null) {
        newProject('Routines');
        newTodo(0, [
            'Weekly Review',
            'Do a weekly review of my tasks and goals',
            '2025-02-01',
            'medium',
            false,
        ]);
        newTodo(0, [
            'Personal Routines',
            'eg., review maths formulae flashcards, grade English paper, etc',
            '2025-02-12',
            'low',
            true,
        ]);
        updateStorage();
    } else {
        getLocalStorage();
    }

    return {
        newProject,
        newTodo,
        editTodo,
        getProjectList,
        getProjectTodos,
        deleteProject,
        deleteTodos,
        updateStorage,
        getLocalStorage,
    };
}

