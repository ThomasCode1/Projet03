function genererWorks(works) {
    let gallery = document.querySelector(".gallery")
    gallery.innerHTML= ""
    for(let work of works) {
        let imageWork = document.createElement("img");
        imageWork.src = work.imageUrl
        imageWork.alt = work.title
        let caption = document.createElement("figcaption")
        caption.innerText = work.title
        let figure = document.createElement("figure")
        figure.appendChild(imageWork)
        figure.appendChild(caption)
        gallery.appendChild(figure)
    }
    }

let reponse = await fetch("http://localhost:5678/api/works")
const works = await reponse.json()

genererWorks(works)

let filters = document.querySelector(".filters")
reponse = await fetch("http://localhost:5678/api/categories")
let categories = await reponse.json()
categories.unshift({
    id:0,
    name:"Tous"
})

function onFilterClick(category) {
    const button = this
    const worksFiltered = works.filter(function (work) {
        return (work.categoryId === category.id) || (category.id === 0)
    })
    genererWorks(worksFiltered)
    let buttons = document.querySelectorAll('.filters button')
    for(let buttonFilter of buttons) {
        buttonFilter.classList.remove("selected-filter")
    }
    button.classList.add("selected-filter")
}

for(let category of categories) {
    let button = document.createElement("button")
    button.innerText = category.name
    if(category.id === 0) {
        button.classList.add("selected-filter")
    }
    button.addEventListener("click", onFilterClick.bind(button, category))
    filters.appendChild(button)
}

let projets = document.getElementById("projets-button")
let contact = document.getElementById("contact-button")
let login = document.getElementById("login-button")
let lastMenuClicked = projets
document.getElementById("login-page").style.display = 'none';
projets.addEventListener("click", function () {
    document.getElementById("introduction").style.display = 'flex';
    document.getElementById("portfolio").style.display = 'block';
    document.getElementById("contact").style.display = 'block';
    document.getElementById("login-page").style.display = 'none';
    document.getElementById("portfolio").scrollIntoView()
    lastMenuClicked.classList.remove("selected-menu")
    projets.classList.add("selected-menu")
    lastMenuClicked = projets
})
contact.addEventListener("click", function () {
    document.getElementById("introduction").style.display = 'flex';
    document.getElementById("portfolio").style.display = 'block';
    document.getElementById("contact").style.display = 'block';
    document.getElementById("login-page").style.display = 'none';
    document.getElementById("contact").scrollIntoView()
    lastMenuClicked.classList.remove("selected-menu")
    contact.classList.add("selected-menu")
    lastMenuClicked = contact

})
login.addEventListener("click", function () {
    document.getElementById("introduction").style.display = 'none';
    document.getElementById("portfolio").style.display = 'none';
    document.getElementById("contact").style.display = 'none';
    document.getElementById("login-page").style.display = 'block';
    lastMenuClicked.classList.remove("selected-menu")
    login.classList.add("selected-menu")
    lastMenuClicked = login
})

const loginForm = document.querySelector('.login-form');
form.addEventListener("submit", (event) => {
    event.preventDefault();
});

const contactForm = document.querySelector('#contact form');
form.addEventListener("submit", (event) => {
    event.preventDefault();
});