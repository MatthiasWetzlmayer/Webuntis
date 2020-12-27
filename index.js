var restify = require('restify');
var server = restify.createServer();

var layers = require('./layers/layer_exports')
server.use(restify.plugins.queryParser());
server.get(
    '/teacher',
    layers.getAllTeachers
)

server.get(
    '/timetable',
    layers.getTimetableForTeacher
)

server.listen(8080)
//var server = restify.createServer();