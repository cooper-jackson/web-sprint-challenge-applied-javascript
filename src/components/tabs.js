import axios from "axios"

const Tabs = (topics) => {
  // TASK 3
  // ---------------------
  // Implement this function which takes an array of strings ("topics") as its only argument.
  // As an example, if the topics passed are ['javascript', 'bootstrap', 'technology']
  // then the function returns the markup below.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  //
  // <div class="topics">
  //   <div class="tab">javascript</div>
  //   <div class="tab">bootstrap</div>
  //   <div class="tab">technology</div>
  // </div>
  //

  let topicsElement = document.createElement('div')
  topicsElement.className = 'topics'

  topics.forEach(element => {
    let tab = document.createElement('div')
    tab.className = 'tab'
    tab.textContent = element
    tab['type'] = element
    if(element === 'node.js') {
      tab['type'] = 'node'
    }

    tab.addEventListener("click", () => {
      let cards = document.querySelector('.cards-container').querySelectorAll('.card')
      const cardsArray = []
      for (let i = 0; i < cards.length; i++) {
        const self = cards[i]
        cardsArray.push(self)
      }

      for(let i = 0; i < cardsArray.length; i++){
        if(cardsArray[i].type != tab.type && cards[i].style.display != 'none') {
          // document.querySelector('.cards-container').removeChild(cards[i])
          cards[i].style.display = 'none'
        } else {
          cards[i].style.display = 'block'
        }
      }
    })

    topicsElement.appendChild(tab)
  });

  return topicsElement

}

const tabsAppender = (selector) => {
  // TASK 4
  // ---------------------
  // Implement this function which takes a css selector as its only argument.
  // It should obtain topics from this endpoint: `https://lambda-times-api.herokuapp.com/topics`
  // Find the array of topics inside the response, and create the tabs using the Tabs component.
  // Append the tabs to the element in the DOM that matches the selector passed to the function.
  //

  let URL = `https://lambda-times-api.herokuapp.com/topics`

  axios.get(URL)
    .then(response => {
      document.querySelector(selector).appendChild(Tabs(response.data.topics))      
    })

    .catch(err => {
      console.log(err)
    })

}

export { Tabs, tabsAppender }
