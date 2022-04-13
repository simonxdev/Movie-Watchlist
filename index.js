const search = document.getElementById("search")
const showlist = document.getElementById("content")
const btn = document.getElementById("btn")
const loader = document.getElementById("loader")
const watchlist = document.getElementById("watchlist")

let searchArray = []
let savedList = []

//Save Movie to LocalStorage
function saveMovie(movie){
            if(localStorage.getItem('movies')){
                savedList = localStorage.getItem('movies');
                savedList = JSON.parse(savedList);
                savedList.push(movie);
                localStorage.setItem('movies', JSON.stringify(savedList));
            } else {
                savedList.push(movie);
                localStorage.setItem('movies', JSON.stringify(savedList));
            }      
}

//Save searched Movies imdbID to Array searchArray
btn.addEventListener("click", function () {
        document.getElementById("content").innerHTML = ""
        loader.classList.remove("hidden")
        setTimeout(() => {
            loader.classList.add = "hidden"
        }, 2000)

        fetch(`https://www.omdbapi.com/?apikey=378360d0&s=${search.value}&r=json&type=movie&plot=full`)

            .then(response => response.json())
            .then(data => {
                searchArray = []
                for (let i = 0; i < data.Search.length; i++) {
                    searchArray.push(data.Search[i].imdbID)
                }
                showData()
            })


    })
//Display all the Movies from the saved Movie Array
const showData = async () => {
    document.getElementById("content").innerHTML = ""
    searchArray.map((item) => {
        fetch(`https://www.omdbapi.com/?apikey=378360d0&i=${item}`)
        .then(res => res.json())
        .then(data => {
            let currentID = data.imdbID
            document.getElementById("content").innerHTML += `
                                                            <div class="movie w-4/5 mx-auto mt-8 flex flex-row">
                                                            <div class="w-1/5 text-center">
                                                                <img class="text-center mx-auto" src=${data.Poster} alt="" width="100%">
                                                            </div>
                                                            <div class="w-4/5 px-5 py-2">
                                                            <div class="w-full flex flex-row"><span class="text-white text-3xl">${data.Title}</span><span class="ml-6"><img width="25px" src="./img/star.svg" class="mt-1"></span><span class="ml-2 text-zinc-500 text-2xl">${data.imdbRating}</span></div>
                                                            <div class="w-full flex flex-row mt-2"><span class="text-zinc-500 text-2xl">${data.Runtime}</span><span class="ml-20 text-zinc-500 text-2xl">${data.Genre}</span><button class="ml-20 text-white text-2xl flex flex-row cursor-pointer" onclick="saveMovie('${currentID}');"><img class="mr-2 mt-1" src="./img/icon.svg"> To Watchlist</button></div>
                                                            <div class="w-full text-zinc-300 text-1xl mt-5">${data.Plot}</div>
                                                            </div>
                                                            </div>
                                                            `
        })
        
    })
}
// Render saved watchlist
function renderWatchlist() {
    let array = localStorage.getItem('movies');
    array = JSON.parse(array);
    document.getElementById("watchlist").innerHTML = ""
    array.map((item) => {
        fetch(`https://www.omdbapi.com/?apikey=378360d0&i=${item}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("watchlist").innerHTML += `
                                                            <div class="movie w-4/5 mx-auto mt-8 flex flex-row">
                                                            <div class="w-1/5 text-center">
                                                                <img class="text-center mx-auto" src=${data.Poster} alt="" width="100%">
                                                            </div>
                                                            <div class="w-4/5 px-5 py-2">
                                                            <div class="w-full flex flex-row"><span class="text-white text-3xl">${data.Title}</span><span class="ml-6"><img width="25px" src="./img/star.svg" class="mt-1"></span><span class="ml-2 text-zinc-500 text-2xl">${data.imdbRating}</span></div>
                                                            <div class="w-full flex flex-row mt-2"><span class="text-zinc-500 text-2xl">${data.Runtime}</span><span class="ml-20 text-zinc-500 text-2xl">${data.Genre}</span><button class="ml-20 text-white text-2xl flex flex-row cursor-pointer" onclick=""><img class="mr-2 mt-1" src="./img/icon.svg"> Delete Movie</button></div>
                                                            <div class="w-full text-zinc-300 text-1xl mt-5">${data.Plot}</div>
                                                            </div>
                                                            </div>
                                                            `
        })
        
    })
}