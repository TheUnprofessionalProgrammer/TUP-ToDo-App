categoryInput = document.getElementById("categoryInput")
deleteCategory = document.getElementsByClassName("delCategory")
categories = document.getElementById("categories")
categoryHeading = document.getElementsByClassName("heading")

taskInput = document.getElementById("taskInput")
deleteTask = document.getElementsByClassName("delTask")
tasks = document.getElementById("tasks")
taskSection = document.getElementById("taskSection")


if (localStorage.getItem('category')) {
    for (let i = 0; i < JSON.parse(localStorage.getItem("category")).length; i++) {
        
        categoryElement = document.createElement("div")
        categoryElement.setAttribute("class", "category")
        categoryElement.innerHTML = '<a href="#' + JSON.parse(localStorage.getItem("category"))[i] + '" class="heading">' + JSON.parse(localStorage.getItem("category"))[i] + '</a><div class="remove"><p class="numTasks">' + JSON.parse(localStorage.getItem(JSON.parse(localStorage.getItem("category"))[i])).length + '</p><button class="delCategory">Remove</button></div>'

        taskSec = document.createElement("div")
        taskSec.setAttribute("id", JSON.parse(localStorage.getItem("category"))[i])
        taskSec.setAttribute("class", "display")
        
        categories.appendChild(categoryElement)
        taskSection.appendChild(taskSec)
        
        if (!localStorage.getItem(taskSection.children[i].getAttribute("id"))) {
            localStorage.setItem(taskSection.children[i].getAttribute("id"), '[]')
        }
        
        for (let j = 0; j < categoryHeading.length; j++) {
            categoryHeading[j].addEventListener("click", () => {
                arr = Array.from(taskSection.children)
                arr.forEach(e => {
                    if (arr[j] == e) {
                        arr[j].classList.remove("display")
                    } else {
                        e.classList.add("display")
                    }
                });
            })
        }

        deleteCategory[i].addEventListener("click", () => {
            deleteCategory[i].parentElement.classList.add("display")
            a = JSON.parse(localStorage.getItem("category"))
            a.splice(i, 1)
            localStorage.setItem("category", JSON.stringify(a))

            if (!taskSection.children[i].classList.contains("display")) {
                taskSection.children[i].classList.add("display")
            }
            localStorage.removeItem(taskSection.children[i].getAttribute("id"))

            window.location.reload()
        })
    }
}


function category() {

    categoryElement = document.createElement("div")
    categoryElement.setAttribute("class", "category")
    categoryElement.innerHTML = '<a href="#' + categoryInput.value + '" class="heading">' + categoryInput.value + '</a><p class="numTasks">0</p><button class="delCategory">Remove</button>'

    taskSec = document.createElement("div")
    taskSec.setAttribute("id", categoryInput.value)
    taskSec.setAttribute("class", "display")

    if (!localStorage.getItem("category")) {
        localStorage.setItem("category", '[]')
    }

    a = JSON.parse(localStorage.getItem("category"))
    if (categoryInput.value != "") {
        a.push(categoryInput.value)
    }
    localStorage.setItem("category", JSON.stringify(a))

    if (categoryInput.value == "") {
        alert("Category should not be empty.")
    }
    else {
        categories.appendChild(categoryElement)
        taskSection.appendChild(taskSec)
        for (let i = 0; i < JSON.parse(localStorage.getItem("category")).length; i++) {
            if (!localStorage.getItem(taskSection.children[i].getAttribute("id"))) {
                localStorage.setItem(taskSection.children[i].getAttribute("id"), '[]')
            }
        }
        window.location.reload()
    }
    categoryInput.value = ""

    for (let i = 0; i < categoryHeading.length; i++) {
        categoryHeading[i].addEventListener("click", () => {
            arr = Array.from(taskSection.children)
            arr.forEach(e => {
                if (arr[i] == e) {
                    arr[i].classList.remove("display")
                } else {
                    e.classList.add("display")
                }
            });
        })
    }
}


function task() {

    taskElement = document.createElement("div")
    taskElement.setAttribute("class", "task")
    taskElement.innerHTML = '<p>' + taskInput.value + '</p><button class="delTask">X</button>'

    if (taskInput.value == "") {
        alert("Task cannot not be blank.")
    }
    else {
        arr = Array.from(taskSection.children)
        if (arr.every(checkclass)) {
            alert("Select a Category")
        }
        else {
            arr.forEach(e => {
                if (!e.classList.contains("display")) {
                    if (!localStorage.getItem(e.getAttribute('id'))) {
                        localStorage.setItem(e.getAttribute('id'), '[]')
                    }
                    a = JSON.parse(localStorage.getItem(e.getAttribute('id')))
                    if (taskInput.value != "") {
                        a.push(taskInput.value)
                    }
                    localStorage.setItem(e.getAttribute('id'), JSON.stringify(a))
                    e.appendChild(taskElement)
                    window.location.reload()

                }
            })
        }

    }
    taskInput.value = ""

    for (let i = 0; i < deleteTask.length; i++) {
        deleteTask[i].addEventListener("click", () => {
            div = deleteTask[i].parentElement
            div.classList.add("display")
            a = JSON.parse(localStorage.getItem("category"))
            a.splice(i, 1)
            localStorage.setItem("category", JSON.stringify(a))
            window.location.reload()
        })
    }
}


function checkclass(e) {
    return e.classList.contains("display")
}


arr = Array.from(taskSection.children)
arr.forEach(e => {

    for (let i = 0; i < JSON.parse(localStorage.getItem(e.getAttribute("id"))).length; i++) {

        taskElement = document.createElement("div")
        taskElement.setAttribute("class", "task")
        taskElement.innerHTML = '<p class="taskHeading">' + JSON.parse(localStorage.getItem(e.getAttribute("id")))[i] + '</p><button class="delTask">X</button>'

        e.appendChild(taskElement)

        e.children[i].children[1].addEventListener("click", () => {
            e.children[i].classList.add("display")
            a = JSON.parse(localStorage.getItem(e.getAttribute("id")))
            a.splice(i, 1)
            localStorage.setItem(e.getAttribute("id"), JSON.stringify(a))
            window.location.reload()
        })

    }
});
