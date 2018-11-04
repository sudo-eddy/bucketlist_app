//Require mongoose package
const mongoose = require('mongoose');

//Define BucketlistSchema with title, description and category
//_id field atomatically generated by Mongoose
const BucketlistSchema = mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: String,
    category: {
      type: String,
      required: true,
      enum: ['High', 'Medium', 'Low']
    }
});

//Convert BucketlistSchema to a model and export it using module.exports
//First argument of mongoose.model is the collection used to store data in MongoDB
const BucketList = module.exports = mongoose.model('BucketList', BucketlistSchema);

//Host database queries inside BucketList model and export as methods
//BucketList.find() returns all the lists and results are passed to callback
module.exports.getAllLists = (callback) => {
  BucketList.find(callback);
}

//.newList.save used to insert the document into MongoDB
module.exports.addList = (newList, callback) => {
  newList.save(callback);
}

//Pass on an id and remove it from DB using BucketList.remove()
module.exports.deleteListById = (id, callback) => {
    let query = {_id: id};
    BucketList.remove(query, callback);
}
