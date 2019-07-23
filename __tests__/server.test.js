const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Protege = require('../models/proteges.model');
const Item = require('../models/items.model');

describe("testing items", () => {
  beforeAll(async() => {
    const mongoDB = "mongodb://127.0.0.1/proteges-tracker-test-database";
    mongoose.connect(mongoDB, { useNewUrlParser: true });
  })
  afterAll(async() => {
    await mongoose.connection.close()
  })
  describe('testing that items is working', () => {
    const newProtege = new Protege({
      protegename:  "SreevidhyaV",
      protegeemail: "sree.vidhya@myob.com",
      expenditure:  0,
      balance:  1000
    })
    console.log(newProtege)
    newProtege.save()
      .then((document) => {
        const newItem = new Item({
          protege_id: document._id,
          description:  "Bookstest",
          expenditure:  10.45
        })
        console.log(newItem)
      })

    test('check that "/" send back api is working', async () => {
      const response = await request(app).get('/items')
      console.log(response.text)
    })
  })
})
