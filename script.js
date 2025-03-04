document.addEventListener('DOMContentLoaded',()=>{

const upper_card=document.getElementById('upper_card');
const search_btn=document.getElementById('search_btn');
const search_input=document.getElementById('input_text');


search_btn.addEventListener('click',(e)=>{
    const text=search_input.value;
    
    if(text){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`)
        .then(res=>res.json())
        .then(data=>{
            items_show(data.meals);
        })
        .catch(err=>{
            show_not_found();
        });
        
    }
    
    if(!text.length){

        search_input.focus();
        
    }
    
    
});

const items_show=mealsItems=>{
    const items_container=document.getElementById('items_container');
    items_container.innerHTML=``;
    if(mealsItems){
        
        
        mealsItems.forEach(element => {
            const item=document.createElement('div');
            item.className='items';
            let t=element.strInstructions.slice(0,50)+'...';          
            item.innerHTML=`
            <div class="item_image">
                <img src="${element.strMealThumb}" alt="">

            </div>
            <div class="item_title">
             <h6>${element.strMeal.slice(0,10)+'...'}</h6>
             <p class="item_price">${t}</p>
            </div>
            <div class="item_btn">
            <button class='details_btn'>more about</button>
            </div>
            `;         

            items_container.appendChild(item);
            console.log(element);

            item.addEventListener('click',e=>{
                
                    show_itm(element);
                    e.stopPropagation();
                    // console.log(element)
                    window.scrollTo({ top: 0, behavior: "smooth" });
            });
            
            
        });
        
    }
    else{
        show_not_found();
    }

}

const show_not_found=()=>{
    const items_container=document.getElementById('items_container');
    items_container.innerHTML=``;
    const h2=document.createElement('h2');
    h2.id='not_found';
    h2.innerText=`NOT Found`;
    items_container.appendChild(h2);

}

function  show_itm(element){
    
    upper_card.innerHTML='';
    upper_card.classList.add('upper_card');
    
    const div=document.createElement('div');
    div.className='upper_card_under';
    div.innerHTML=`
    <div class='upper_card_under_forDisplay' flex>
    <div class="item_image_uper-card">
    <div class="item_image_uper-card-1" style="--bg-photo:url(${element.strMealThumb})"></div>
    
    </div>
    <div class="upper-item_title">
     <h1>${element.strMeal}</h1>
     <li>Food Id : <span>${element.idMeal}</span></li>
     <li>Food Area : <span>${element.strArea}</span></li>
     <li>Food Category : <span>${element.strCategory}</span></li>
     <p class="item_price">${element.strInstructions.slice(0,250)+"..."}</p>
     <div class="icon-uppercard">
        <a href="${element.strYoutube}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/></svg></a>
     </div>
    </div>
    </div>
    `;  
    upper_card.appendChild(div);

}

document.addEventListener('click', (e) => {
    if(upper_card.classList.contains('upper_card')){
        if ((! e.target.closest('.items')) && (! search_input.contains(e.target)) && (! e.target.closest('.upper_card_under')) ) {
        
            upper_card.innerHTML = ''; 
            upper_card.classList.remove('upper_card');
            e.stopPropagation

        
        
        }
    }
});

});




