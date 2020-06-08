const winston = require('winston')

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: './logs/error.log',
            level: 'error'
        }),
        new winston.transports.File({
            filename: './logs/combined.log'
        })
    ]
});

switch (process.env.NODE_ENV) {
    case 'production':
        logger.add(new winston.transports.Console({
            level: 'info'
        }));
        break;
    case 'test':
        logger.add(new winston.transports.Console({
            level: 'error'
        }));
        break;
    case 'development':
        logger.add(new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.splat(),
                winston.format.printf(info => {
                    return `${info.timestamp} ${info.level}: ${info.message}`;
                })
            ),
        }));
}

logger.info('Winston initialized');

module.exports = logger