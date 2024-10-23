interface Task {
  description: string;
  done: boolean;
}

interface StateApplication {
  tasks: Task[];
  taskSelected: Task | null;
}

let initialState: StateApplication = {
  tasks: [
    {
      description: "Tarefa concluída",
      done: true,
    },
    {
      description: "Tarefa pendente 1",
      done: false,
    },
    {
      description: "Tarefa pendente 2",
      done: false,
    },
  ],
  taskSelected: null,
};

const selectTask
 = (
  state: StateApplication,
  tarefa: Task
): StateApplication => {
  return {
    ...state,
    taskSelected: tarefa === state.taskSelected ? null : tarefa,
  };
};

const addTask = (
  state: StateApplication,
  task: Task
): StateApplication => {
  return {
    ...state,
    tasks: [...state.tasks, task],
  };
};

const updateInterface = () => {
  const taskIconSvg = `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
    <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
</svg>
`;
  const ulTask = document.querySelector("app__section-task-list");
  const btnAddTask = document.querySelector<HTMLFormElement>(
    ".app__button--add-task"
  );
  const formAddTask = document.querySelector<HTMLButtonElement>(
    ".app__form-add-task"
  );
  const textarea = document.querySelector<HTMLTextAreaElement>(
    ".app__form-textarea"
  );

  if (!btnAddTask) {
    throw Error(
      "O elemento btnAdicionaTarefa não foi encontrado. Favor rever..."
    );
  }

  btnAddTask.onclick = () => {
    formAddTask?.classList.toggle("hidden");
  };

  formAddTask!.onsubmit = (event) => {
    event.preventDefault();
    const description = textarea!.value;
    initialState = addTask(initialState, {
      description,
      done: false,
    });
    updateInterface();
  };

  if (ulTask) {
    ulTask.innerHTML = "";
  }

  initialState.tasks.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("app__section-task-list-item");

    const svgIcon = document.createElement("svg");
    svgIcon.innerHTML = taskIconSvg;

    const paragraph = document.createElement("p");
    paragraph.classList.add("app__section-task-list-item-description");
    paragraph.textContent = item.description;

    const button = document.createElement("button");
    button.classList.add("app_button-edit");

    const editIcon = document.createElement("img");
    editIcon.setAttribute("src", "/imagens/edit.png");

    button.appendChild(editIcon);

    if (item.done) {
      button.setAttribute("disabled", "true");
      li.classList.add("app__section-task-list-item-complete");
    }

    li.appendChild(svgIcon);
    li.appendChild(paragraph);
    li.appendChild(button);

    li.addEventListener("click", () => {
      initialState = selectTask
      (initialState, item);
      updateInterface();
    });

    document.addEventListener("TarefaFinalizada", () => {
      if(initialState.taskSelected){
        initialState.taskSelected.done = true
        updateInterface()
      }
    })

    ulTask?.appendChild(li);
  });

  
};
