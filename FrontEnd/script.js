function genererWorks(works) {
    let gallery = document.querySelector(".gallery")
    gallery.innerHTML= ""
    for(let i = 0;i<works.length;++i) {
        let imageWork = document.createElement("img");
        imageWork.src = works[i].imageUrl
        imageWork.alt = works[i].title
        let caption = document.createElement("figcaption")
        caption.innerText = works[i].title
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
let tous = document.createElement("button")
tous.innerText = "Tous"
let lastButtonClicked = tous
tous.classList.add("selected-filter")
tous.addEventListener("click", function () {
    genererWorks(works)
    lastButtonClicked.classList.remove("selected-filter")
    tous.classList.add("selected-filter")
    lastButtonClicked = tous
})
filters.appendChild(tous)
reponse = await fetch("http://localhost:5678/api/categories")
let categories = await reponse.json()
for(let i = 0;i<categories.length;++i) {
    let button = document.createElement("button")
    button.innerText = categories[i].name
    //button.setAttribute("data-id", categories[i].id)
    button.addEventListener("click", function () {
        const worksFiltered = works.filter(function (work) {
            return work.categoryId == categories[i].id
        })
        genererWorks(worksFiltered)
        lastButtonClicked.classList.remove("selected-filter")
        button.classList.add("selected-filter")
        lastButtonClicked = button
    })
    filters.appendChild(button)
}