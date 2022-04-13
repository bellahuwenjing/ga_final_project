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
let movies = [
    { id: 'tt8097030', title: 'Turning Red' },
    { id: 'tt0120762', title: 'Mulan' },
    { id: 'tt0441773', title: 'Kung Fu Panda' },
    { id: 'tt1302011', title: 'Kung Fu Panda 2' },
    { id: 'tt2267968', title: 'Kung Fu Panda 3' },
    { id: 'tt7488208', title: 'Over the Moon' },
    { id: 'tt6324278', title: 'Abominable' },
    { id: 'tt5562070', title: 'Wish Dragon' }
]
let chineseAnimes = [
    { id: 'tt10912430', title: 'The Legend of Luo Xiaohei' },
    { id: 'tt6450154', title: 'Calabash Brothers' },

]
let chineseMovies = [
    {
        id: "tt1920885",
        title: "Big Fish & Begonia"
    },
    { id: 'tt10734928', title: 'The Legend of Hei' },

    { id: 'tt9288776', title: 'White Snake' },
    { id: 'tt4644382', title: 'Monkey King: Hero Is Back' },
    { id: 'tt7146054', title: 'The Guardian' },
    { id: 'tt4788934', title: 'The Guardian Brothers' },
    { id: 'tt0354770', title: "Prince Nezha's Triumph Against Dragon King" },
    { id: 'tt6903084', title: 'Toys & Pets' },
    { id: 'tt16345484', title: 'I Am What I Am' },
    { id: 'tt11941418', title: 'The Monkey King 3D: Uproar in Heaven' }
]


function handleData(data) {
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
function handleData2(data) {
    const title = data.Title;
    const posterImage = data.Poster;

    // let html = ""
    const html = `
    <h2>${title}</h2>
    <img src="${posterImage}">
    `
    allDiv.innerHTML += html

}

function getMovieData(searchTerm) {
    console.log(searchTerm)
    outputDiv.innerHTML = "<p>Loading...</p>"
    const queryString = `?apikey=${apiKey}&i=${searchTerm}&plot=${plot}`;
    // const queryString = `?apikey=${apiKey}&t=${searchTerm}&plot=${plot}`;
    const endpoint = url + queryString;
    fetch(endpoint).then(waitForJSON).then(handleData2)
}


const form = document.querySelector("form")
function onFormSubmit(event) {
    event.preventDefault()
    const input = document.querySelector("input")
    const title = input.value
    getMovieData(title)
    console.log(title)
}
form.addEventListener("submit", onFormSubmit) //enter in the last input in the form

const button = document.querySelector("#show")
function showAll() {
    movies.forEach(movie => {
        getMovieData(movie.id)
    })
}
button.addEventListener("click", showAll)