import 'core-js/stable'
import 'regenerator-runtime/runtime'
import * as modal from './modal.js';
import recipeView from './views/recipeView.js';
import searchVeiw from './views/searchVeiw.js';
import navView from './views/navView.js';
import { async } from 'regenerator-runtime';

// https://forkify-api.herokuapp.com/v2
//0c061f79-aed3-4fed-8e39-c3522e0d9a4d

const countrlerRecipes = async function () {  
  const id = window.location.hash.slice(1)
  if (!id) return
  try {

    recipeView.spinner()
    //Load recepe
    await modal.LoadRecepe(id)
    //render Recipe
    recipeView.render(modal.state.recipe)
  } catch (err) {
    recipeView.renderError()
  }
}

const controlSearchResult = async function(){
  const quary = searchVeiw.getQuary()
  if(!quary) return

  modal.loadSeachResults(quary)
//  const data = modal.loadSeachResults(quary) 
//  navView.getNavItemList(data)

}

// const navSeacrhList = function(){
//   navView.getNavItemList(modal.state.search.results)
// }

//whin change the hash call function again
// ['hashchange','load'].forEach(e => window.addEventListener(e,countrlerRecipes))
// window.addEventListener('hashchange', countrlerRecipes)
// window.addEventListener('load', countrlerRecipes)

//subscribber, every time publisher make an event the subscriber called
const init = function(){
recipeView.addHandlerRender(countrlerRecipes)
searchVeiw.seachHandlerResult(controlSearchResult)

}
init()
