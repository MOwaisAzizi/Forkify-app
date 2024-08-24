
import icons from 'url:../../img/icons.svg'

class NavView {
    #parentEL = document.querySelector('.search-results')
    #formSubmit = document.querySelector('.search')
    #data
    getNavItemList(data){
      this.#data = data
       const markup = this.#listGenerator()
    this.#parentEL.insertAdjacentHTML('afterbegin',markup)

    }
 
    
   #listGenerator(){

        return `
        ${
         this.#data.map(data=>this.#navListData(data))
        }
   `
   }
   #navListData(data){
    const id = window.location.hash.slice(1);
    
  //   <div class="preview__user-generated">
  //   <svg>
  //   <use href="${icons}#icon-user"></use>
  // </svg>
  //   </div>

     return `
     <ul class="results">
     <li class="preview">
     <a class="preview__link
     ${
      data.id === id ? 'preview__link--active' : ''}"href="#${data.id}">
       <figure class="preview__fig">
         <img src="${data.image}" alt="Test" />
       </figure>
       <div class="preview__data">
         <h4 class="preview__title">${data.title}</h4>
         <p class="preview__publisher">${data.publisher}</p>
 


       </div>
     </a>
   </li>
   </ul>


     `
   }
   navListHandlerResult(handler){
    this.#formSubmit.addEventListener('submit',function(e){
    e.preventDefault()
    handler()
    })
 }
}

export default new NavView