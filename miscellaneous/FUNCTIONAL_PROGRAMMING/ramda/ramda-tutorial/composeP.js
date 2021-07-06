const R = require('ramda')

/**
 * @R.composeP [Deprecated since v0.26.0] composition from right-to-left <<< of functions that returns a Promise instance
 * @R.pipeP    [Deprecated since v0.26.0] composition from left-to-right >>> of functions that returns a Promise instance
 */

const l = R.bind(console.log, console)

const database = {
  users: {
    Jane: {
      name: 'Jane',
      followers: ['Bob', 'Twit']
    }
  }
}

const lookupUser = username => Promise.resolve(database.users[username])
const lookupUserFollowers = user => Promise.resolve(user.followers)

lookupUserFollowersThen: lookupUser('Jane').then(lookupUserFollowers).then(l)
lookupUserFollowersComposeP: R.composeP(lookupUserFollowers, lookupUser)('Jane').then(l)
lookupUserFollowersPipeP: R.pipeP(lookupUser, lookupUserFollowers)('Jane').then(l)

ligthCompositionOfReturningPromiseFunctions: R.composeP(
  value => Promise.resolve(R.multiply(value, value)),
  value => Promise.resolve(R.add(value, value))
)(1).then(l)

const articles = {
  1: { title: 'first post', author: 10 },
  2: { title: 'second post', author: 12 },
  3: { title: 'last post', author: 10 },
}

const authors = {
  10: { name: 'Jane', id: 10 },
  20: { name: 'Jame', id: 20 }
}

const getArticleByItsId = id => Promise.resolve(articles[id])
const getAuthorByItsId = id => Promise.resolve(authors[id])
const getAuthorArticles = authorId => Promise.resolve(Object.values(articles).filter(article => article.author === authorId))

articlesWithoutComposeP: getArticleByItsId(1)
  .then(article => getAuthorByItsId(article.author))
  .then(author => getAuthorArticles(author.id))
  .then(l)

articlesWithComposeP: notCorrect: R.composeP(
  getArticleByItsId,
  getAuthorArticles,
)(1).then(l)
