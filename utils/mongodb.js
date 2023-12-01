const mongodb = require('mongodb');

const connection_url = 'mongodb://addictedAdmin:kAvzSbLJKp4vnF38@5.183.171.168:27017/?authMechanism=SCRAM-SHA-256'

module.exports.LoadCollection = function(collectionName, database) {
    return new Promise( async (resolve, reject) => {
        const client = await mongodb.MongoClient.connect(connection_url, {
            useNewUrlParser: true
        });
        if (database != null) {
            const db = client.db(database);
            const collection = db.collection(collectionName);
            resolve(collection);
            return;
        }
  
        const db = client.db('addicted');
        const collection = db.collection(collectionName);
        resolve(collection);
    });
  }

module.exports.GetLuaTimestamp = function(timestamp) {
    var a = new Date(timestamp * 1000);
    var year = a.getFullYear();
    var month = a.getMonth()
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var hour = a.getHours() > 12 ? a.getHours() - 12 : (a.getHours() < 10 ? "0" + a.getHours() : a.getHours());
    var min  = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
    var time = date + '/' + month + '/' + year + ' ' + hour + ':' + min;
    return time;
}