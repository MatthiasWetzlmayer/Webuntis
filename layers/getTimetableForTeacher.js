const webuntis_client = require('../webuntis_client')


async function getTimetableForTeacher(req, res, next) {
    var teacherName = req.query.teacher;
    var lessons = []
    try {
        var timet = await webuntis_client.getTimetablesForRange(new Date('10/19/2020'), new Date('10/23/2020'))
        lessons.push(timet  
            .filter(lesson => {
                return lesson.te
                    .filter(teacher => {
                        return teacher.name == teacherName
                    }
                    ).length > 0
            })
        )
        res.send(200, lessons.flat()
            .filter(x => x.cSode !== 'cancelled')
            .map(x => ({
                date: x.date,
                startTime: x.startTime,
                endTime: x.endTime,
                room: x.ro.length > 0 ? x.ro[x.ro.length - 1].longname : "Sprechstunde"
            })))
        return next();
    } catch (err) {
        console.log(err)
        res.send(500, err);
        return next(false);
    }
}

exports.getTimetableForTeacher = getTimetableForTeacher;