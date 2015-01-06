var mongoose = require('mongoose');
//mongoose.connect("localhost/MOOCBOOKDB");

var LessonSchema = mongoose.Schema({
    title : {type : String, required : true},
    description : {type : String, required : true},
    likes : {type : Number, default : 0},
    views : {type : Number, default : 0},
    publishdate : {type : Date, default : Date.now},
    tags : {type: []},
    material : {material: []}
}, {collection : "lessons"});

var Lesson = mongoose.model('Lesson', LessonSchema);
var exports = module.exports = {};

var response = function (message, data) {
    return {
        message : message,
        data : data
    }
}
exports.getLessons = function (callback) {
    'use strict';
    Lesson.find(function (err, lessons) {
        if (err) {
            console.log(err);
            callback(response("het zoeken naar de vragen is mislukt.", {}));
        } else {
            callback(response("het zoeken naar de vragen is gelukt.", lessons));
        }
    });
}

exports.getLesson = function (id, callback) {
    'use strict';
    Lesson.findOne({_id : id}, function (err, lesson) {
        if (err) {
            console.log(err);
            callback(response("het zoeken naar de vraag is mislukt.", {}));
            return;
        }
        callback(response("het zoeken naar de vraag is gelukt.", lesson));
    });
}

exports.postLesson = function (lesson, callback) {
    'use strict';
    console.log(lesson);
    var newLesson = new Lesson();
    newLesson.title = lesson.title;
    newLesson.description = lesson.description;
    newLesson.likes = lesson.likes || 0;
    newLesson.views = lesson.publishdate || 0;
    newLesson.publishdate = lesson.publishdate || new Date();
    newLesson.tags = lesson.tags;
    newLesson.material = lesson.material;
    console.log(newLesson);

    newLesson.save(function (err, lesson) {
        if (err) {
            console.log(err);
            callback(response("Het opslaan van de vraag is mislukt.", err));
        } else {
            callback(response("Het opslaan van de vraag is gelukt.", lesson));
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
