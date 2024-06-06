let token = localStorage.getItem("token")

/************************************************************************Affichage des works*****************************************************/

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
let works = await reponse.json()

genererWorks(works)

let filters = document.querySelector(".filters")
let optionsAjoutPhoto = document.getElementById("categorieWork")
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
if(category.id != 0) {
    let option = document.createElement("option")
    option.innerText = category.name
    option.value = category.id
    optionsAjoutPhoto.appendChild(option)
}
}


/***************************************************************************Formulaire de login ********************************/


let projets = document.getElementById("projets-button")
let contact = document.getElementById("contact-button")
let login = document.getElementById("login-button")
let lastMenuClicked = projets
document.getElementById("login-page").style.display = 'none';

function displayHome() {
    document.getElementById("introduction").style.display = 'flex';
    document.getElementById("portfolio").style.display = 'block';
    document.getElementById("contact").style.display = 'block';
    document.getElementById("login-page").style.display = 'none';
}

projets.addEventListener("click", function () {
    displayHome()
    document.getElementById("portfolio").scrollIntoView()
    lastMenuClicked.classList.remove("selected-menu")
    projets.classList.add("selected-menu")
    lastMenuClicked = projets
})
contact.addEventListener("click", function () {
    displayHome()
    document.getElementById("contact").scrollIntoView()
    lastMenuClicked.classList.remove("selected-menu")
    contact.classList.add("selected-menu")
    lastMenuClicked = contact

})

login.addEventListener("click", function () {
    if(token) {
        token = null
        localStorage.removeItem("token")
        login.innerText="login"
        filters.style.display = 'flex';
        document.querySelector(".mode-edition").style.display = 'none'
        document.querySelector(".modifier").style.display = 'none'
        document.querySelector('.title-modifier').style.marginBottom = '0px'
    } else {
    document.getElementById("introduction").style.display = 'none';
    document.getElementById("portfolio").style.display = 'none';
    document.getElementById("contact").style.display = 'none';
    document.getElementById("login-page").style.display = 'block';
    lastMenuClicked.classList.remove("selected-menu")
    login.classList.add("selected-menu")
    lastMenuClicked = login
    }
})

const contactForm = document.querySelector('#contact form');
contactForm.addEventListener("submit", (event) => {
    event.preventDefault()
})

let badLogin = document.querySelector(".badLogin")
let email = document.getElementById("email-login")
let password = document.getElementById("password")
const loginForm = document.querySelector('.login-form');

function successLogin(token) {
    localStorage.setItem("token", token)
    badLogin.innerText = ""
    displayHome()
    document.querySelector('.mode-edition').style.display = 'flex'
    document.querySelector('.modifier').style.display = 'block'
    document.querySelector('.title-modifier').style.marginBottom = '110px'
    document.querySelector("body").scrollIntoView()
    lastMenuClicked.classList.remove("selected-menu")
    projets.classList.add("selected-menu")
    lastMenuClicked = projets
    login.innerText="logout"
    filters.style.display = 'none'
}

if(token) {
    successLogin(token)
}

let loginResult
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"email": email.value,"password": password.value})
    })
    loginResult = await reponse.json()
        if(Object.keys(loginResult).length === 2) {
            token = loginResult.token
           successLogin(token)
        } else {
            badLogin.innerText = "Erreur dans l’identifiant ou le mot de passe"
        }
})


/*****************************************************************************************************Modale *************************************/

let modal = document.querySelector(".modal")
let buttonModal = document.querySelector(".modifier")
let close = document.querySelector(".close")
let closeTwo = document.querySelector(".close-two")
let worksModal = document.querySelector(".works-modale")

buttonModal.onclick = function() {
  modal.style.display = "block"
}

close.onclick = function() {
    modal.style.display = "none"
  }

  closeTwo.onclick = function() {
    modal.style.display = "none"
  }

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none"
  }
}

function genererWorksModal() {
for(const work of works) {
    let imageWork = document.createElement("img");
    imageWork.src = work.imageUrl
    imageWork.alt = work.title
    let figure = document.createElement("figure")
    figure.appendChild(imageWork)
    let buttonRemove = document.createElement("div")
    buttonRemove.innerHTML = '<i class="fa-solid fa-xmark"></i>'
     buttonRemove.addEventListener("click", async (event) => {
        reponse = await fetch(`http://localhost:5678/api/works/${work.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` }
        })
        worksModal.innerHTML = ""
        reponse = await fetch("http://localhost:5678/api/works")
        works = await reponse.json()
        genererWorks(works)
        genererWorksModal()
    })
    buttonRemove.classList.add("button-remove")
    figure.appendChild(buttonRemove)
    worksModal.appendChild(figure)
}
}

genererWorksModal()

document.querySelector(".button-ajout-photo").addEventListener("click", (event) => {
    document.querySelector(".ajout-photo").style.display = 'flex'
    document.querySelector(".modal-content").style.display = 'none'
    })

document.querySelector(".retour-modale").addEventListener("click", (event) => {
    document.querySelector(".ajout-photo").style.display = 'none'
    document.querySelector(".modal-content").style.display = 'flex'
})



let titreWork = document.getElementById("titreWork")
let categorieWork = document.getElementById("categorieWork")
let imageWork = document.getElementById("imageWork")
let messageUpload = document.querySelector(".message-upload")
const formWorkUpload = document.querySelector(".upload-form")
formWorkUpload.addEventListener("submit", async (event) => {
    event.preventDefault()
    if((titreWork.value === "") || (categorieWork.value === null) || (imageWork.value === "")) {
messageUpload.innerText = "Tous les champs doivent être remplis"
    } else {
    const formData = new FormData(event.target)
    reponse = await fetch(`http://localhost:5678/api/works`, {
        method: "POST",
        headers: {'Authorization': `Bearer ${token}` },
        body: formData
    })
    }
    let result = await reponse.json()
    messageUpload.innerText = "La photo a bien été envoyée!"
    worksModal.innerHTML = ""
    reponse = await fetch("http://localhost:5678/api/works")
    works = await reponse.json()
    genererWorks(works)
    genererWorksModal()
})
