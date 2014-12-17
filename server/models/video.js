var mongoose = require('mongoose');
//mongoose.connect("localhost/MOOCBOOKDB");

var VideoSchema = mongoose.Schema({
    title : {type : String, required : true},
    description : {type : String, required : true},
    likes : {type : Number, default : 0},
    views : {type : Number, default : 0},
    publishdate : {type : Date, default : Date.now},
    videoUrl : {type: String}
}, {collection : "videos"});

var Video = mongoose.model('Video', VideoSchema);
var exports = module.exports = {};

var response = function (message, data) {
    return {
        message : message,
        data : data
    }
}
exports.getVideos = function (callback) {
    'use strict';
    Video.find(function (err, videos) {
        if (err) {
            console.log(err);
            callback(response("het zoeken naar de vragen is mislukt.", {}));
        } else {
            callback(response("het zoeken naar de vragen is gelukt.", videos));
        }
    });
}

exports.getVideo = function (id, callback) {
    'use strict';
    Video.findOne({_id : id}, function (err, video) {
        if (err) {
            console.log(err);
            callback(response("het zoeken naar de vraag is mislukt.", {}));
            return;
        }
        callback(response("het zoeken naar de vraag is gelukt.", video));
    });
}

exports.postVideo = function (video, callback) {
    'use strict';
    console.log(video);
    var newVideo = new Video();
    newVideo.title = video.title;
    newVideo.description = video.description;
    newVideo.type = video.type;
    newVideo.likes = video.likes || 0;
    newVideo.views = video.publishdate || 0;
    newVideo.publishdate = video.publishdate || new Date();
    newVideo.imagesrc = video.imagesrc;
    console.log(newVideo);

    newVideo.save(function (err, video) {
        if (err) {
            console.log(err);
            callback(response("Het opslaan van de vraag is mislukt.", err));
        } else {
            callback(response("Het opslaan van de vraag is gelukt.", video));
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
