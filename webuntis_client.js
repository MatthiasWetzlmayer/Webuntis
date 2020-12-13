const TEACHER_EXPRESSION_TIME = 1000 * 60 * 60 * 24 * 365;
let teachers = [];
let teacherExp = 0;


const TIME_TABLES_EXPRESSION_TIME = 1000 * 60 * 60 * 6;
let timetables = [];
let timetablesExp = 0;


const WebUntisLib = require('webuntis');


const untis = new WebUntisLib.WebUntisAnonymousAuth(
    'HTBLA-Grieskirchen',
    'arche.webuntis.com'
);

async function getTeachersTimetables() {
    if (teachers.length > 0 && new Date().getTime() < teacherExp) {
        return teachers;
    }

    var timet = await getTimetablesForRange(new Date('10/19/2020'), new Date('10/23/2020'), false)
    teachers = timet.flat();
    teacherExp = new Date().getTime() + TEACHER_EXPRESSION_TIME;
    return timet.flat();
}

async function getTimetablesForRange(from, to, save=true) {
    if (timetables.length > 0 && new Date().getTime() < timetablesExp && save) {
        return timetables;
    }
    var localTT = [];
    await untis.login();
    var classes = await untis.getClasses();
    for(var x of classes){
        var timet = await untis.getTimetableForRange(from, to, x.id, WebUntisLib.TYPES.CLASS)
        localTT.push(timet);
    }
    if(save){
        timetablesExp = new Date().getTime() + TIME_TABLES_EXPRESSION_TIME;
        timetables = localTT.flat()
        return timetables;
    }else{
        return localTT.flat();
    }
}

exports.getTimetablesForRange = getTimetablesForRange;
exports.getTeachersTimetables = getTeachersTimetables;