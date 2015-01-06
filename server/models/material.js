var mongoose = require('mongoose');
mongoose.connect("localhost/MOOCBOOKDB");

var materialTypes = ['pdf', 'image', 'youtube', 'opdracht', 'word', 'voorbeeld'];

var MaterialSchema = mongoose.Schema({
    title : {type : String, required : true},
    description : {type : String, required : true},
    author: {type: String, required : true},
    authorName: {type: String, required : true},
    type : {type : String, required : true},
    likes : {type : Number, default : 0},
    views : {type : Number, default : 0},
    publishdate : {type : Date, default : Date.now},
    imagesrc : {type: String},
    original : {type : String}
}, {collection : "materials"});

var Material = mongoose.model('Material', MaterialSchema);
var exports = module.exports = {};

var response = function (message, data) {
    return {
        message : message,
        data : data
    }
}
exports.getMaterials = function (callback) {
    'use strict';
    Material.find(function (err, materials) {
        if (err) {
            console.log(err);
            callback(response("het zoeken naar de vragen is mislukt.", {}));
        } else {
            /* countclones not working:: scope inside scope...
            for(var i = 0; i < materials.length; i++){
              Material.find({'original' : materials[i]._id}, function (err, material) {
                materials[i].countClones = material.length;//console.log(material.length);
              });
            }
            */
            callback(response("het zoeken naar de vragen is gelukt.", materials));
        }
    });
}
exports.getMaterialClones = function (id, callback) {
    Material.find({'original' : id}, function (err, material) {
        if (err) {
            console.log(err);
            callback(response("het zoeken naar de vraag is mislukt.", {}));
            return;
        }
        callback(response("het zoeken naar de vraag is gelukt.", material));
    });
}

exports.getMaterialsByAuthor = function (id, callback) {
    'use strict';
    Material.find({author : id}, function (err, materials) {
        if (err) {
            console.log(err);
            callback(response("het zoeken naar de vragen is mislukt.", {}));
        } else {
            callback(response("het zoeken naar de vragen is gelukt.", materials));
        }
    });
}

exports.getMaterial = function (id, callback) {
    'use strict';
    Material.findOne({_id : id}, function (err, material) {
        if (err) {
            console.log(err);
            callback(response("het zoeken naar de vraag is mislukt.", {}));
            return;
        }
        callback(response("het zoeken naar de vraag is gelukt.", material));
    });
}

exports.postMaterial = function (material, callback) {
    'use strict';
    console.log(material);
    var newMaterial = new Material();
    newMaterial.title = material.title;
    newMaterial.description = material.description;
    newMaterial.type = material.type;
    newMaterial.author = material.author;
    newMaterial.authorName = material.authorName;
    newMaterial.likes = material.likes || 0;
    newMaterial.views = material.publishdate || 0;
    newMaterial.publishdate = material.publishdate || new Date();
    newMaterial.imagesrc = material.imagesrc;
    newMaterial.original = material.original || null;
    console.log(newMaterial);

    newMaterial.save(function (err, material) {
        if (err) {
            console.log(err);
            callback(response("Het opslaan van de vraag is mislukt.", err));
        } else {
            callback(response("Het opslaan van de vraag is gelukt.", material));
        }
    });
}
/*
exports.putMaterialVersion = function (body, callback) {
    'use strict';
    var newMaterialVersion = {};
    newMaterialVersion.title = body.title;
    newMaterialVersion.description = body.description;
    newMaterialVersion.type = body.type;
    newMaterialVersion.author = body.author;
    newMaterialVersion.authorName = body.authorName;
    newMaterialVersion.likes = body.likes || 0;
    newMaterialVersion.views = body.publishdate || 0;
    newMaterialVersion.publishdate = body.publishdate || new Date();
    console.log(newMaterialVersion);
    Material.findByIdAndUpdate(body._id, {$pushAll: {oldVersions:[newMaterialVersion]}}, function (err, material) {
        if (err) {
            console.log(err);
            callback(response("het zoeken naar de vraag is mislukt.", {}));
        } else {
          callback(response("material is geupdate!", material));
        }

    });
}
*/
exports.putMaterial = function (body, callback) {
    'use strict';
    console.log('putting material!', body);
    Material.findByIdAndUpdate(body._id, {description : body.description,title : body.title}, function (err, material) {
        if (err) {
            console.log(err);
            callback(response("het zoeken naar de vraag is mislukt.", {}));
        } else {
          callback(response("material is geupdate!", material));
        }

    });
}
/*
exports.deleteVraag = function (id, callback) {
    console.log("Ik ga dus verwijderen he..");
    Materiaal.remove({_id : id}).exec(function (err) {
        if (err) {
            callback(response("Het verwijderen van de vraag is mislukt.", {}));
        } else {
            callback(response("Het verwijderen van de vraag is gelukt.", {}));
        }
    });
}
exports.putVraag = function (vraag, callback) {
    'use strict';
    var slaVraagOp = function (putVraag) {
        putVraag.save(function (err, putVraag) {
            if (err) {
                callback(response("Er is iets misgegaan tijdens het opslaan van de gegevens.", {}));
            } else {
                callback(response("De vraag is succesvol geupdate.", putVraag));
            }
        });
    },
    updateVraag = function (putVraag) {
        putVraag.vraag = vraag.vraag;
        putVraag.opties = vraag.opties;
        putVraag.antwoord = vraag.antwoord;
        putVraag.lesNummer = vraag.lesNummer;
        slaVraagOp(putVraag);
    },
    getVraagVoorUpdate = function () {
        console.log(vraag._id);
        Vraag.findOne({ _id : vraag._id }, function (err, putVraag) {
            if (err) {
                res.send(response("Er is geen vraag voor een update gevonden.", {}));
            } else {
                console.log(putVraag);
                updateVraag(putVraag);
            }
        });
    }
    getVraagVoorUpdate();
}

// Deze functie moest helaas apart (i.p.v. de bestaande getVragenLes-methode te gebruiken)..
// Vrij lelijk maar deze krijgt een instantie van de quiz zelf mee.. Anders werkt het niet.
// Het kan vast wel anders maar ik weet nog ff niet hoe..
exports.getVragenLesQuiz = function (lesId, callback, quiz) {
    'use strict';
    Materiaal.find({lesNummer : lesId}, function (err, vragen) {
        if (err) {
            console.log(err);
            callback(err, quiz);
        } else {
            callback(vragen, quiz);
        }
    });
}
*/
