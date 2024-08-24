
import { API_URL } from "./confic.js"
import { getJSON } from "./helper.js"
import navView from "./views/navView.js"

export const state = {
recipe : {},
search : {
  quary : '',
  results : []
}
}

export const LoadRecepe = async function(id){ 
  try{
  const data = await getJSON(`${API_URL}${id}`)

    const {recipe} = data.data
     state.recipe = {
      id:recipe.id,
      title:recipe.title,
      publisher:recipe.publisher,
      image:recipe.image_url,
      servings:recipe.servings,
      cookingTime:recipe.cooking_time,
      ingredients: recipe.ingredients
    }
  }catch(err){
    //pass the error to controller to show it
   throw err   
  }
}

export const loadSeachResults = async function(quary){
  try{
    state.search.quary = quary
     const data = await getJSON(`${API_URL}?search=${quary}`)
 
    state.search.results = data.data.recipes.map(rec=>{
      return{
        id:rec.id,
        title:rec.title,
        publisher:rec.publisher,
        image:rec.image_url,
      }
     })
    //  return state.search.results
     navView.getNavItemList(state.search.results)
    
  }catch(err){
    throw err
  }
}