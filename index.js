const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const clearBtn = document.getElementById("clear-btn");
const ulEl = document.getElementById("ul-el");

const status = {
    pending: "⏳",
    completed: "🎉",
};

let tasks = [];

let taskFromStorage = JSON.parse(localStorage.getItem("tasks"));
if (taskFromStorage) {
    tasks = taskFromStorage;

    let html = "";
    for (let taskObj of tasks) {
        html += `
        <li id=${taskObj.id}>
            <span class="check-btn">${
                taskObj.status == "pending" ? status.pending : status.completed
            }</span>
            <span class="li-txt ${taskObj.status == "completed" && "strike"}">${
            taskObj.text
        }</span>
        </li>`;
    }
    ulEl.innerHTML = html;

    const allListEl = ulEl.querySelectorAll("li");
    allListEl.forEach((li) => {
        li.addEventListener("click", taskChecker);
    });
}

inputBtn.addEventListener("click", () => {
    let input = inputEl.value;
    if (input) {
        inputEl.value = "";

        //create task object
        let taskObj = {
            id: uuid.v1(),
            text: input,
            status: "pending",
        };

        tasks.push(taskObj);

        //save to local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));

        //create ui and update ui
        const li = document.createElement("li");
        li.innerHTML = `<span class="check-btn">${status.pending}</span> <span class="li-txt">${input}</span>`;
        li.setAttribute("id", taskObj.id);
        li.addEventListener("click", () => {
            let txt = li.querySelector(".li-txt");
            txt.classList.toggle("strike");
            let icon = li.querySelector(".check-btn");
            if (icon.textContent === status.pending) {
                icon.textContent = status.completed;
                taskObj.status = "completed";
            } else {
                icon.textContent = status.pending;
                taskObj.status = "pending";
            }

            localStorage.setItem("tasks", JSON.stringify(tasks));
        });

        ulEl.appendChild(li);
    }
});

clearBtn.addEventListener("click", () => {
    ulEl.innerHTML = "";
    tasks = [];
    localStorage.clear();
});

function taskChecker(e) {
    let li = e.currentTarget;
    let txt = li.querySelector(".li-txt");
    txt.classList.toggle("strike");
    let icon = li.querySelector(".check-btn");
    let taskObj = tasks.find(({ id }) => id === li.id);
    if (icon.textContent === status.pending) {
        icon.textContent = status.completed;
        taskObj.status = "completed";
    } else {
        icon.textContent = status.pending;
        taskObj.status = "pending";
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}
