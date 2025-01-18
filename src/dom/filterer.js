import { isToday, isFuture, parseISO } from "date-fns";

function filterAll(projects) {
    return projects.filter((project) => project.todos.length > 0);
}

function filterTodays(projects) {
    return projects.filter((project) =>
        project.todos.length > 0 && project.todos.some((task) => isToday(parseISO(task.dueDate)))
    );
}

function filterUpcoming(projects) {
    return projects.filter((project) =>
        project.tasks.length > 0 && project.tasks.some((task) => isFuture(parseISO(task.dueDate)))
    );
}

export { filterAll, filterTodays, filterUpcoming };