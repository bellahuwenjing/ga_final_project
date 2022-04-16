// Base URL
const url = "http://www.omdbapi.com/";
// Required Parameters
// - apikey
const apiKey = "620a6446";

// Optional Parameters
// - t (Movie Title)
// - plot ("full")
// - r ("json")
// const title = "Jaws";
// const title = "The Matrix";
const plot = "full";

// const queryString = `?apikey=${apiKey}&t=${title}&plot=${plot}`;
// const endpoint = url + queryString;
// console.log(endpoint); // right click to see 

const outputDiv = document.querySelector("#output")

function waitForJSON(res) {
    return res.json()
}


function handleUserSearch(data) {
    const rating = data.imdbRating
    // const rating2 = data.Ratings[1].Value //Rotten Tomatoes rating may not be available
    const id = data.imdbID;
    const country = data.Country
    const title = data.Title;
    const plot = data.Plot;
    const posterImage = data.Poster;
    const type = data.Type
    const year = data.Year
    const rated = data.Rated
    const runtime = data.Runtime
    const genre = data.Genre

    const html = `
    <h2>${title}</h2>
    <p>Type: ${type} &nbsp&nbsp&nbsp Year: ${year}  &nbsp&nbsp&nbsp Rated: ${rated} &nbsp&nbsp&nbsp Runtime: ${runtime}</p>
    <p>Genre: ${genre} &nbsp&nbsp&nbsp&nbsp Rating: ${rating} &nbsp&nbsp&nbsp Country: ${country}</p>
    <p></p>
    <img src="${posterImage}">
    <p>${plot}</p>
    `
    outputDiv.innerHTML = html

    // data base needed to store 
    // movies.push({
    //     id: id,
    //     title: title,
    // })
    // console.log(movies)
}

const allDiv = document.querySelector("#all")
function display(data) {
    // console.log(count)
    const title = data.Title;
    const posterImage = data.Poster;
    const plot = data.Plot
    // let html = ""
    const html = `
    <div class="col-md-2">
        <div id="accordion">
        <div class="card"> 
            <img src="${posterImage}" width="150" height="100" alt="movie poster" class="img-fluid rounded-lg">
            <div class="card-header" id="headingOne">
                <h6 class="mb-0">
                    <button class="btn btn-link  collapsed" data-toggle="collapse"
                        data-target="#collapse${count}" aria-expanded="true" aria-controls="collapse${count}">
                        ${title}
                    </button>
                </h6>
            </div>
            <div id="collapse${count}" class="collapse" aria-labelledby="headingOne"
                data-parent="#accordion">
                <div class="card-body">
                    ${plot}
                </div>
            </div>
        </div>            
    </div>
    `;
    increaseCount();
    allDiv.innerHTML += html
}
let count = 0
function increaseCount() {
    count++
}
function getMovieData(searchTerm, displayFormat) {
    let queryString = ""
    outputDiv.innerHTML = "<p>Loading...</p>"
    if (searchTerm.length == 9 && searchTerm.includes("tt")) {
        queryString = `?apikey=${apiKey}&i=${searchTerm}&plot=${plot}`;
    } else {
        queryString = `?apikey=${apiKey}&t=${searchTerm}&plot=${plot}`;
    }
    const endpoint = url + queryString;
    if (displayFormat === 3) {
        fetch(endpoint).then(waitForJSON).then(display)
    }
    if (displayFormat === 11) {
        fetch(endpoint).then(waitForJSON).then(handleUserSearch)
    }

    // fetch(endpoint).then(waitForJSON).then((count) => { count++ }).then(display)
    // fetch(endpoint).then(waitForJSON).then(increaseCount).then(display)
    // fetch(endpoint).then(waitForJSON).then(() => {
    //     increaseCount
    //     display
    // })

}


const form = document.querySelector("form")
function onFormSubmit(event) {
    event.preventDefault()
    const input = document.querySelector("input")
    const title = input.value
    getMovieData(title, 11)
    console.log(title)
}
form.addEventListener("submit", onFormSubmit) //enter in the last input in the form

const button_en = document.querySelector("#show_en")
// function showAll() {
//     console.log("clicked")
//     englishMovies.forEach(movie => {
//         getMovieData(movie.id)
//     })
// }
// button_en.addEventListener("click", showAll)

function showAll(list) {
    list.forEach(movie => {
        getMovieData(movie.id, 3)
    })
}
// button_en.addEventListener("click", showAll(englishMovies)) // DOESN'T WORK!!!
button_en.addEventListener("click", event => {
    allDiv.innerHTML = ""
    showAll(englishMovies)
})

const button_ch = document.querySelector("#show_ch")
button_ch.addEventListener("click", () => {
    allDiv.innerHTML = ""
    showAll(chineseMovies)
})

