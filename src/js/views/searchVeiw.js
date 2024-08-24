
class SearchView {
     #parentEL = document.querySelector('.search')
     getQuary(){
        const inputField = this.#parentEL.querySelector('.search__field').value
        this.#clearInput()
        return inputField
     }

     #clearInput(){
     this.#parentEL.querySelector('.search__field').value = ''
     }

     seachHandlerResult(handler){
        this.#parentEL.addEventListener('submit',function(e){
        e.preventDefault()
        handler()
        })
     }
}
export default new SearchView