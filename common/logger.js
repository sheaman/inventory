var winston = require('winston');

module.exports = function (module) {
    var transports;

    // allow logging level override via env
    var loggingLevel;

    var appRoot = process.env.PWD + '/';
    var filename = module.filename.replace(appRoot, '');

    // in production, log to the console (following docker best practices)
    if (process.env.NODE_ENV === 'production') {
        loggingLevel = process.env.LOGGING_LEVEL || 'info';
        transports = [
            new winston.transports.Console({
                level: loggingLevel,
                handleExceptions: true,
                maxsize: 5242880,
                json: true,
                stringify: true,
                colorize: false,
                label: filename
            })
        ];

        // in test, log only to file, leaving stdout free for unit test status messages
    } else if (process.env.NODE_ENV === 'qa') {
        loggingLevel = process.env.LOGGING_LEVEL || 'debug';
        transports = [
            new (winston.transports.File)({
                level: loggingLevel,
                handleExceptions: false,
                maxsize: 5242880,
                json: false,
                colorize: false,
                filename: 'test.log',
                label: filename
            })
        ];

        // otherwise log colorized output to the console
    } else {
        loggingLevel = process.env.LOGGING_LEVEL || 'debug';
        transports = [
            new winston.transports.Console({
                level: loggingLevel,
                handleExceptions: true,
                maxsize: 5242880,
                json: false,
                colorize: true,
                label: filename
            })
        ];
    }

    return (new winston.Logger({
        transports: transports,
        exitOnError: false
    }));
};

