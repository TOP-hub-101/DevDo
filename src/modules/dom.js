import { formatDistance } from "date-fns"
import { lightFormat } from "date-fns"
import deleteIcon from '../images/trash-can.png'
import deleteTodoIcon from '../images/trash-can-black.png'

const todayDate = lightFormat(new Date(), 'yyyy-MM-dd')

export default function Display() {
    const updateContentDisplay = (parentNode, array) => {
        clearDisplay(parentNode);
        if (array === undefined) return;
        const addTodoBtn = document.createElement('button');
        addTodoBtn.classList.add();
        addTodoBtn.textContent = 'New Tasks +';
        parentNode.appendChild(addTodoBtn);
        generateContentDisplay(parentNode, array);
    };

    const updateProjectDisplay = (parentNode, array) => {
        clearDisplay(parentNode);
        if(array.length === 0) return;
        for (let i = 0; i < array.length; i++){
            const projectListWrapper = document.createElement('div');
            const projectName = document.createElement('div');
            const deleteProject = document.createElement('img');
            projectListWrapper.classList.add();
            projectListWrapper.setAttribute('data-project-index', i);
            projectName.textContent = array[i].projectName;
            projectName.classList.add();
            deleteProject.classList.add();
            deleteProject.setAttribute('width', '25px');
            projectListWrapper.appendChild(projectName);
            projectListWrapper.appendChild(deleteProject);
            parentNode.appendChild(projectListWrapper);
        }
    };

    const generateContentDisplay = (parentNode, array) => {
        if(array.length === 0) {
            const contentPara = document.createElement('p');
            contentPara.textContent = 'No Tasks';
            parentNode.appendChild(contentPara);
        }
        for (let i = 0; i < array.length; i++){
            const card = document.createElement('div');
            const taskName = document.createElement('h4');
            const desc = document.createElement('p');
            const dueDate = document.createElement('p');
            const priority = document.createElement('div');
            const deleteTodo = document.createElement('img');

            card.classList.add();
            card.setAttribute('data-todo-index', i);
            taskName.textContent = array[i].taskName
            dueDate.textContent = `Due ${formatDistance(array[i].dueDate, todayDate, {addSuffix: true})}`;
            desc.textContent = array[i].desc;

            priority.textContent = `${array[i].priority.toUpperCase()} Priority`;
            priority.style.backgroundColor = 
                array[i].priority === 'low'
                    ? 'lightgreen'
                    : array[i].priority === 'medium'
                        ? '#FFB52E'
                        : '#FF0000';
            deleteTodo.src = deleteTodoIcon;
            deleteTodo.setAttribute('width', '30px');
            deleteTodo.classList.add();

            if(!array[i].completed) {
                desc.setAttribute('class', );
            } else {
                desc.setAttribute('class', );
            }

            if(array[i].completed) {
                card.classList.add();
            }

            card.appendChild(taskName);
            card.appendChild(desc);
            card.appendChild(dueDate);
            card.appendChild(priority);
            card.appendChild(priority);
            card.appendChild(deleteTodo);
            parentNode.appendChild(card);
        }
    };

    const clearDisplay = (parentNode) => {
        parentNode.textContent = '';
    };

    const initialize = (projectNode, projectArr) => {
        if (projectArr.length === 0 || projectArr === undefined) return;
        updateProjectDisplay(projectNode, projectArr);
    };

    return {
        updateContentDisplay,
        updateProjectDisplay,
        clearDisplay,
        initialize,
    };
}