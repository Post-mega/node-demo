const Mongodb = require('mongodb')
const MongoClient = Mongodb.MongoClient
const ObjectId = Mongodb.ObjectId
const mongoUrl = 'mongodb://localhost:27017'

export default class MongoControl {
  constructor(dbName, tableName) {
    this.dbName = dbName
    this.tableName = tableName
  }
  init(callback) {
    MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => (
      err ? callback(err) : callback(null, client.db(this.dbName).collection(this.tableName), client)
    ))
  }
  // initial = () => MongoClient.connect(mongoUrl, {useNewUrlParser : true})
  // add = (data) => {
  //   this.initial().then(async (db) => {
  //     const collection = db.collection(this.tableName);
  //     let res = await collection.insertOne(data);
  //     console.log(res)
  //     db.close()
  //     return res
  //   })
  // }
  insert(docs, callback) {
    this.init((err, collection, client) => {
      if (err) {
        return callback(err)
      }
      collection.insert(docs, (err, res) => {
        callback(err, res)
        client.close()
      })
    })
  }
  find(findQuery, callback) {
    this.init((err, collection, client) => {
      if (err) {
        return callback(err)
      }
      collection.find(findQuery).toArray((error, res) => {
        callback(error, res)
        client.close()
      })
    })
  }
}

// exports.MongoControl = MongoControl