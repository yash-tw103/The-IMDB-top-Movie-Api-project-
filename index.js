
const movie = document.querySelector(".movie");

async function getmovies(){
    const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '76ef88f2fcmsh7778afc7d20e9f1p19cddajsnc13b2233c21e',
		'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();

    result.map((item)=>{
        console.log(item);
        const image = item.image;
        const title= item.title;
        const description= item.description;
        const director = item.director;
        const rating = item.rating;
        const trailer = item.trailer;

        const changediv = `
        <div class="card p-2 mx-auto my-4" style="width: 18rem; background-color: black; color: white;">
  <img src="${image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${rating}</p>
    <p class="card-text">${director}</p>
    <p class="card-text">${description}</p>
    
    <button target="blank" class="btn btn-primary addtocart">Add to Favourites</button>
  </div>
</div>
        `

        movie.innerHTML += changediv;


 //Saving the data fetched as favourites when button is clicked in local storage
        
let movies = []
let addtocart = document.getElementsByClassName("addtocart");

for(let i=0 ; i<addtocart.length ; i++){
    addtocart[i].addEventListener("click",function(e){
        console.log(i+1, e.target.parentElement.parentElement.children);
        if(typeof(Storage) !== 'undefined'){
            let item = {
                id : i+1,
                title : e.target.parentElement.children[0].textContent,
                rating : e.target.parentElement.children[1].textContent,
                director : e.target.parentElement.children[2].textContent,
                description : e.target.parentElement.children[3].textContent,
                img : e.target.parentElement.parentElement.children[0].src,
                no : 1
            }
            if(JSON.parse(localStorage.getItem('movies')) === null){
                movies.push(item);
                localStorage.setItem("movies" ,JSON.stringify(movies) );
                window.location.reload();
                e.preventDefault()
            }else{
                const localmovies = JSON.parse(localStorage.getItem("movies"));

                localmovies.map((data)=>{
                    if(item.id == data.id){
                        item.no = data.no +1;
                    }else{
                        movies.push(data);
                    }
                });
                movies.push(item);
                localStorage.setItem('movies',JSON.stringify(movies));
                window.location.reload();
                e.preventDefault();
            }
        }else{
            alert("Local Storage Is Not Working on Your Browser");
        }

    })

    let contentcontainer = document.getElementById("content");
    let contentdiv = ``;

    if(JSON.parse(localStorage.getItem('movies'))=== null){
     contentdiv += `No Favourites Found
     `   
    }else{
        JSON.parse(localStorage.getItem('movies')).map(data=>{
            contentdiv += `
            <div class="card p-2 mx-auto my-4" style="width: 25rem; background-color: black; color: white;">
  <img src="${data.img}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${data.title}</h5>
    <p class="card-text">${data.rating}</p>
    <p class="card-text">${data.director}</p>
    <p class="card-text">${data.description}</p>
    
    <button target="blank" class="btn btn-primary addtocart" onClick="Delete(this)">Remove From Favourites</button>
  </div>
</div>
            
            `
        })
    }

    contentcontainer.innerHTML = contentdiv;

}



const Delete=(e)=>{
    let movies=[];
    JSON.parse(localStorage.getItem('movies')).map(data=>{
        if(data.name != e.parentElement.parentElement.children[1].textContent){
            movies.push(data);
        }
    });
    localStorage.setItem('movies' , JSON.stringify(movies));

    window.location.reload();
    e.preventDefault();
}
    })
} catch (error) {
	console.error(error);
}
}
getmovies();


const searchFun3 = ()=>{
  const filter = document.getElementById('user').value.toUpperCase();

  const cards = document.getElementsByClassName("card");

  for(let i=0; i<cards.length ; i++){
      let divd = cards[i].getElementsByTagName('h5')[0];
      if(divd){
          let textvalue = divd.textContent || divd.innerHTML;

          if(textvalue.toUpperCase().indexOf(filter) >-1){
              cards[i].style.display="";
          }else{
              cards[i].style.display="none";
          }
  }
}
}




//functon sidebar
function openNav() {
    document.getElementById("mySidenav").style.width = "700px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

