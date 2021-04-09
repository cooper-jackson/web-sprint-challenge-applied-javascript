import axios from "axios"

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  let card = document.createElement('div')
  card.className = 'card'

    let headline = document.createElement('div')
    headline.className = 'headline'
    headline.textContent = article.headline
    card.appendChild(headline)

    let author = document.createElement('div')
    author.className = 'author'
    card.appendChild(author)

      let authorPhotoContainer = document.createElement('div')
      authorPhotoContainer.className = 'img-container'
      author.appendChild(authorPhotoContainer)

        let authorPhoto = document.createElement('img')
        authorPhoto.src = article.authorPhoto
        authorPhotoContainer.appendChild(authorPhoto)

      let authorName = document.createElement('span')
      authorName.textContent = article.authorName
      author.appendChild(authorName)

  card.addEventListener('click', function() {
  console.log(headline.textContent)
  })

  return card

}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

  let URL = 'https://lambda-times-api.herokuapp.com/articles'

  axios.get(URL)
    .then(response => {
      let api_data = response.data.articles

      for (const property in api_data) {
        api_data[property].forEach(element => {
          let newCard = Card(element)
          newCard["type"] = property
          document.querySelector(selector).appendChild(newCard)

        });
      }
    })
    .catch(err => {
      console.log(err)
    })

}

export { Card, cardAppender }
