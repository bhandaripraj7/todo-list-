const list = <HTMLUListElement>document.querySelector('#todolist')
const input = <HTMLInputElement>document.querySelector('#newtodo')

input.addEventListener('keypress',Event => {
if (Event.key === "Enter") {
    Event.preventDefault()
    const text = input.value.trim()
    if (text !== '') {
        const list_item = document.createElement('li')
        list_item.setAttribute('class','list-group-items')
        list_item.innerHTML = text
        list.append(list_item)
        input.value = ''
    }
}
});