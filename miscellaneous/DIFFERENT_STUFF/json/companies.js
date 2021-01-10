const companies = `[
  {
    "name": "Big Corporation",
    "numberOfEmployees": 10000,
    "ceo": "Mary",
    "rating": 3.6
  },
  {
    "name": "Small Startup",
    "numberOfEmployees": 200,
    "ceo": null,
    "rating": 4.4
  }
]`

const jsonObject = JSON.parse(companies)
const jsonString = JSON.stringify(jsonObject)
console.log({ jsonObject, jsonString })
