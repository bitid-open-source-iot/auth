var log4js = require( "log4js" );
var logger;

var module = function() {
    var pubLogger = {
        init: (settings) => {
            log4js.configure(settings);
            logger = log4js.getLogger("file-appender");
        },

        LogData: (strError, strDebug) => {
            if (__settings.logging) {
                try {
                    if (strError != '') {
                        console.log(strError);
                        logger.error(strError);
                    } else {
                        logger.debug(strDebug);
                    };
                    return;
                } catch(e) {
                    console.log('Error in writeLog');
                };
            };
        }
    };

    return pubLogger
};

exports.module = module;