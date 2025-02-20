class Project {
    constructor(projectName, details) {
        this.projectName = String(projectName);
        this.details = String(details || '');
        this.todos = [];
    }
}


class Todo {
    constructor(taskName, desc, dueDate, priority, completed = false) {
        this.taskName = String(taskName);
        this.desc = String(desc || '');
        this.dueDate = dueDate ? format(dueDate, 'MMMM d, yyyy') : null;
        this.priority = String(priority).toLowerCase();
        this.completed = completed;
    }

    updateValue(obj) {
        const [taskName, desc, dueDate, priority, completed] = obj;
        if (taskName) this.taskName = taskName;
        if (desc) this.desc = desc;
        if (dueDate) {
            const parsedDate = parseISO(dueDate);
            if (!isNaN(parsedDate)) {
                this.dueDate = parsedDate;
            } else {
                console.log("Invalid due date format.");
            }
        }
        if (priority) this.priority = priority;
        this.completed = completed === 'true';
    }

    toggleStatus() { //extra
        this.completed = this.completed == false ? true : false;
    }

    getFormattedDueDate() { //extra
        return this.dueDate ? format(this.dueDate, 'yyyy-MM-dd') : "No due date";
    }
}

export default function ManageProject() {
    const projects = [];

    const newProject = (projectName, details) => {
        projects.push(new Project(projectName, details));
    };

    const newTodo = (projectIndex, obj) => {
        const [ taskName, desc, dueDate, priority, completed = false ] = obj;
        projects[projectIndex].todos.push(
            new Todo(taskName, desc, dueDate, priority, completed)
        );
    };

    const editTodo = (projectIndex, todoIndex, obj) => {
        projects[projectIndex].todos[todoIndex].updateValue(obj);
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
            projects.push(new Project(projectStorage[i].projectName, projectStorage[i].details));
            for (let j = 0; j < projectStorage[i].todos.length; j++) {
                const { taskName, desc, dueDate, priority, completed } = projectStorage[i].todos[j];
                projects[i].todos.push(
                    new Todo(taskName, desc, dueDate, priority, completed)
                );
            }
        }
    };

    if (localStorage.getItem('projects') === null) {
        newProject('TEST PROJECT', 'Test Project details');
        newTodo(0, {
            taskName: 'TEST TITLE',
            desc: 'Lorem ipsum dolor sit amet',
            dueDate: '2025-02-01',
            priority: 'low',
            completed: false,
        });
        newTodo(0, {
            taskName: 'CHECKED TASKS',
            desc: 'Consectetur adipiscing elit',
            dueDate: '2025-02-12',
            priority: 'medium',
            completed: true,
        });
        newTodo(0, {
            taskName: 'TASKS',
            desc: 'Phasellus feugiat nisi eu turpis',
            dueDate: '2025-01-12',
            priority: 'high',
            completed: false,
        });
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

