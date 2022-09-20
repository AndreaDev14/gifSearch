const form = document.querySelector('#form');
const trending = document.querySelector('#trending');
const random = document.querySelector('#random');


// giphy terms
const key = 'mQj1Rsw9h4K2nnlPiA9NyBSUi9YS6wQS';


window.onload = () => {
    form.addEventListener('submit', validationForm);
}

window.addEventListener('DOMContentLoaded', () => {
    trendingDisplay();
    randomDisplay()


});


function validationForm(e) {
    e.preventDefault();
    const term = document.querySelector('#valueGif').value;

   //show error
   if (term === '') {
    displayAlert('Error! Please enter a search term before pressing submit')
   
    return;
   }

   searchGif(term)



    
}

function searchGif(term) {



    const searchURL = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${term}&limit=20&offset=1&rating=g`;

    fetch(searchURL)
    .then(res => res.json())
    .then(dataInfo => {
        
   
        let searchInfo = dataInfo.data;
      
            ShowSearchHTML(searchInfo, term);

    })
    .catch(err => console.log(err));


}

function ShowSearchHTML(searchInfo,term) {
    refreshHTML();
    const titleRandom = document.querySelector('#random_title');
    titleRandom.textContent = term;
    searchInfo.forEach(element => {
        const {title, images:{fixed_width:{url}}} = element;

        random.innerHTML += `
        <div class="trending_card card">
                    <img src="${url}}" alt="${title}" class="img_size">
                </div>
        
        `

        
    });
    
}



function  displayAlert(message) {
    const searchWrap = document.querySelector('.search_wrap');
    const error = document.querySelector('.error');

    if(!error) {
        const alert = document.createElement('p');


        alert.classList.add('error');
        alert.classList.add('animate__animated', 'animate__shakeX');
        alert.textContent = message;
    
        searchWrap.append(alert);

        setTimeout(() => {
            alert.remove();
        }, 3000);
    }


}

function trendingDisplay() {
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${key}&limit=4&offset=2&rating=g`;

    fetch(url)
        .then(res => res.json())
        .then(info => {

         let trendingData = info.data;

         showTrendingHTML(trendingData)
         

        })
        .catch(err => console.log(err));

}


function showTrendingHTML(trendingData) {
    trendingData.forEach(imgData => {
        
        const { title, images:{fixed_width:{url}}} = imgData
      

        const stringTitle = String(title);
        const positionTitle = stringTitle.search('GIF');
        const newTitle = stringTitle.substring(0,positionTitle);
       

    

        const img = document.createElement('img')
        img.src = url;
        img.classList.add('img_size');

        const btn = document.createElement('a');
        btn.classList.add('btn');
        btn.textContent = 'View More';
        btn.classList.add('btn');

        btn.onclick = () => {
            viewMoreGifs(newTitle);
        }
       
    
        

        const trending_div = document.createElement('div');
        trending_div.classList.add('trending_card');
        trending_div.classList.add('card')
        trending_div.append(img);
        trending_div.append(btn);

        trending.append(trending_div);

       
       
    });

   
    
}


function viewMoreGifs(newTitle) {

    const urlMoreGifs =`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${newTitle}&limit=20&rating=g`;

    fetch(urlMoreGifs)
        .then(res => res.json())
        .then(info => {
            let showMore = info.data;
        showMoreGifHTML(showMore,newTitle)
         

        })
        .catch(err => console.log(err));
}


function showMoreGifHTML(showMore,newTitle) {
   
    refreshHTML();
    const titleRandom = document.querySelector('#random_title');
    titleRandom.innerHTML = newTitle;
   

    showMore.forEach(moreData => {
       const {title, images:{fixed_width:{url}}} = moreData;
       
       random.innerHTML += `
        <div class="random_card card">
              
                    <img src="${url}}" alt="${title}" class="img_random">
                   
                </div>
        
        `
        
   })
}


function randomDisplay() {
    const urlRandom = `https://api.giphy.com/v1/gifs/trending?api_key=${key}&limit=20&offset=8&rating=g`;


    fetch(urlRandom)
        .then(res => res.json())
        .then(info => {

         let randomData = info.data;

         showRandomHTML(randomData)
         

        })
        .catch(err => console.log(err));

}


function showRandomHTML(randomData) {
    randomData.forEach(randomData => {
        const {title, images:{fixed_width:{url}}} = randomData;
        
        random.innerHTML += `
         <div class="random_card card">
               
                     <img src="${url}}" alt="${title}" class="img_random">
                    
                 </div>
         
         `
         
    })
   
};


function refreshHTML() {
    while (random.firstChild) {
        random.removeChild(random.firstChild);
    }
}
