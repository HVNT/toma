var app,
    dir,
    express,
    io,
    port,
    server,
    _ref,
    _ref1,
    ignorePaths,
    fs;

express = require('express');

fs = require('fs');

dir = "" + __dirname + "/.tmp";

port = (_ref = (_ref1 = process.env.PORT) != null ? _ref1 : process.argv.splice(2)[0]) != null ? _ref : 8000;

app = express();

server = require('http').createServer(app);

app.configure(function() {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.errorHandler());
    app.use(express["static"](dir));
    app.use(app.router);
});

app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    next();
});

ignorePaths = [
    '/account', '/account*',
    '/login', '/login*',
    '/interact', '/interact*'
];

app.get(ignorePaths, function (req, res) {
    fs.readFile("" + dir + "/index.html", function (err, data) {
        res.writeHead(200);
        res.end(data);
    });
});

module.exports = server;

module.exports.use = function() {
    return app.use.apply(app, arguments);
};
