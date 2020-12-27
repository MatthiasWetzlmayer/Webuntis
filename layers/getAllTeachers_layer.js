const webuntis_client = require('../webuntis_client')



async function getAllTeachers(req, res, next) {
    var teachers = [];
    var timet = await webuntis_client.getTeachersTimetables()
    timet.forEach(t => {
        t.te.forEach(teacher => {
            teachers.push(teacher)
        })
    })
    res.send(200, teachers.distinct()
        .filter(x => x.longname !== "")
        .map(x => ({
            name: x.name,
            longname: x.longname
        })
        )
    )

}

Array.prototype.distinct = function () {

    var distinct = []
    for (var i = 0; i < this.length; i++) {
        if (!distinct.map(x => x.id).includes(this[i].id)) {
            distinct.push(this[i])
        }
    }
    return distinct;
}

exports.getAllTeachers = getAllTeachers;