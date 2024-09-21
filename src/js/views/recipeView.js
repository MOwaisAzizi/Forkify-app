// libray change 0.3,3,5...1/3,7/2
import { Fraction } from 'fractional';
import { mark } from 'regenerator-runtime';
import icons from 'url:../../img/icons.svg'

class Recepeview {
 #parentEl = document.querySelector('.recipe')
//  #bookmarkEL = document.querySelector('.bookmarks__list')
 #data
 #ErrorMessage = 'Sorry we could not find that racipe. Plaese try again!'
 #Message = ''

 render(data){
    this.#data = data
    const markup = this.#generatorMarkup()
    this.#clear();
    this.#parentEl.insertAdjacentHTML('afterbegin',markup)
    document.querySelector('.bookmark').addEventListener('click',function(){
     const marks = document.querySelector('.bookmarks__list')
     const mark = document.querySelector('.message-mark')
     mark.innerHTML = ''
     let marksData = ''
    marksData += `<ul class="results">
     <li class="preview">
     <a class="preview__link
         "href="#${data.id}">
       <figure class="preview__fig">
         <img src="${data.image}" alt="Test" />
       </figure>
       <div class="preview__data">
         <h4 class="preview__title">${data.title}</h4>
         <p class="preview__publisher">${data.publisher}</p>
       </div>
     </a>
   </li>
   </ul>`
     marks.insertAdjacentHTML('afterbegin',marksData )
    })
 }


 #clear(){
    this.#parentEl.innerHTML = ''
}

 spinner(){
    const markup = `
    <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
    `
    this.#clear()
    this.#parentEl.insertAdjacentHTML('afterbegin',markup)
  }

  renderError(message = this.#ErrorMessage){
    const markup  = `
    <div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>
    `
    this.#clear()
    this.#parentEl.insertAdjacentHTML('afterbegin',markup)
  }

  renderMessage(message = this.#Message){
    const markup  = `
    <div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>
    `
    this.#clear()
    this.#parentEl.insertAdjacentHTML('afterbegin',markup)
  }

  //publisher , for every change in recpeview the control component call
addHandlerRender(handler){
  window.addEventListener('hashchange', handler)
  window.addEventListener('load', handler)
}

 #generatorMarkup(){
    return `
    <figure class="recipe__fig">
          <img src="${this.#data.image}" alt="${this.#data.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this.#data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${this.#data.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this.#data.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="bookmark">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this.#data.ingredients.map(ing=>this.#ingredientsGernerator(ing)).join('')
        }
      

            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">0.5</div>
              <div class="recipe__description">
                <span class="recipe__unit">cup</span>
                ricotta cheese
              </div>
            </li>
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${this.#data.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this.#data.sourcUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    `
 }
 #ingredientsGernerator(ing){

    return `
    <li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${ing.quantity ? new Fraction(ing.quantity).toString() : ''}</div>
    <div class="recipe__description">
      <span class="recipe__unit">${ing.unit}</span>
      ${ing.description}
    </div>
  </li>
    `
}
}
export default new Recepeview()

