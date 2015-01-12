var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name : {type : String, required : true},
    gender : {type : String, required : true},
    age : {type : Number, required : true},
    profilePicture : {type: String},
    blocks : {type : [] },
    school : {type : String },
    registerDate : {type : Date, default : Date.now},
    favorites : {type : []}
}, {collection : "users"});

var User = mongoose.model('User', UserSchema);
var exports = module.exports = {};

var response = function (message, data) {
    return {
        message : message,
        data : data
    }
}
exports.getUsers = function (callback) {
    'use strict';
    User.find(function (err, users) {
        if (err) {
            console.log(err);
            callback(response("het zoeken naar de vragen is mislukt.", {}));
        } else {
            callback(response("het zoeken naar de vragen is gelukt.", users));
        }
    });
}

exports.getUser = function (id, callback) {
    'use strict';
    User.findOne({_id : id}, function (err, user) {
        if (err) {
            console.log(err);
            callback(response("het zoeken naar de vraag is mislukt.", {}));
            return;
        }
        callback(response("het zoeken naar de vraag is gelukt.", user));
    });
}

exports.postUser = function (user, callback) {
    'use strict';
    console.log(user);
    var newUser = new User();
    newUser.name = user.name;
    newUser.gender = user.gender || 'male';
    newUser.age = user.age;
    newUser.profilePicture = user.profilePicture || 'http://www.lorempixel.com/200/200/people';
    newUser.blocks = user.blocks || [0,1,2,3,4,5];
    newUser.school = user.school || null;
    newUser.registerDate = user.registerDate || new Date();
    newUser.favorites = user.favorites || [];
    console.log(newUser);

    newUser.save(function (err, user) {
        if (err) {
            console.log(err);
            callback(response("Het opslaan van de vraag is mislukt.", err));
        } else {
            callback(response("Het opslaan van de vraag is gelukt.", user));
        }
    });
}

exports.putUserBlock = function (body, callback) {
    'use strict';
    User.findByIdAndUpdate(body._id, {blocks : body.blocks}, function (err, user) {
        if (err) {
            console.log(err);
            callback(response("het zoeken naar de vraag is mislukt.", {}));
            return;
        }
        callback(response("blocks zijn geupdate!", user));
    });
}

exports.putUser = function (body, callback) {
    'use strict';
    console.log('putting user!', body);
    User.findByIdAndUpdate(body._id, {favorites : body.favorites}, function (err, material) {
        if (err) {
            console.log(err);
            callback(response("het zoeken naar de vraag is mislukt.", {}));
        } else {
            callback(response("user is geupdate!", material));
        }

    });
}
