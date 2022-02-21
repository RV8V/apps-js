require('dotenv').config();

const config = require('12factor-config');

const cfg = config({
    port: {
        env: 'PORT',
        type: 'integer',
        required: true,
        default: 3000,
    },
    redisHost: {
        env: 'REDIS_HOST',
        type: 'string',
        required: true,
        default: '127.0.0.1',
    },
    redisPort: {
        env: 'REDIS_PORT',
        type: 'integer',
        required: true,
        default: 6379
    },
    redisPassword: {
        env: 'REDIS_PASSWORD',
        type: 'string',
        required: false
    },
    redisUser: {
        env: 'REDIS_USER',
        type: 'string',
        required: false
    },
    redisDb: {
        env: 'REDIS_DB',
        type: 'integer',
        required: false,
    },
    secretKey: {
        env: 'SECRET_JWT',
        type: 'string',
        required: true,
        default: 'SECRET_JWT',
    },
    expiresIn: {
        type: 'integer',
        required: true,
        default: 24,         // value indicated in hours
    },
    basePath: {
        type: 'string',
        default: '/api/v1',
    },
    apiDocs: {
        type: 'string',
        default: '/api-docs',
    },
    host: {
        type: 'string',
        default: 'localhost',
    },
    environment: {
        evn: 'ENVIRONMENT',
        type: 'string',
        required: true,
        default: 'local',
    },
    dbServer: {
        env: 'DB_SERVER',
        type     : 'string',
        default  : 'localhost',
        required : true,
    },
    dbPort: {
        env: 'DB_PORT',
        type     : 'integer',
        default  : '3306',
        required : true,
    },
    dbSelect: {
        env: 'DB_SELECT',
        type     : 'string',
        default  : 'medmo',
        required : true,
    },
    dbUsername: {
        env: 'DB_USERNAME',
        type     : 'string',
        default  : 'medmo',
        required : true,
    },
    dbPassword: {
        env: 'DB_PASSWORD',
        type     : 'string',
        default  : 'medmo',
        required : true,
    },
    daticaDbServer: {
        env: 'DATICA_DB_SERVER',
        type     : 'string',
        default  : 'localhost',   // default value will be changed in the future
        required : true,
    },
    daticaDbPort: {
        env: 'DATICA_DB_PORT',
        type     : 'integer',
        default  : '3307',            // default value will be changed in the future
        required : true,
    },
    daticaDbSelect: {
        env: 'DATICA_DB_SELECT',
        type     : 'string',
        default  : 'datica_carete_update',   // default value will be changed in the future
        required : true,
    },
    daticaDbUsername: {
        env: 'DATICA_DB_USERNAME',
        type     : 'string',
        default  : 'medmo', // default value will be changed in the future
        required : true,
    },
    daticaDbPassword: {
        env: 'DATICA_DB_PASSWORD',
        type     : 'string',
        default  : 'password', // default value will be changed in the future
        required : true,
    },
    daticaMigrationDir: {
        env: 'DATICA_DB_MIGRATIONS',
        type     : 'string',
        default  : './migrations',
        required : true,
    },
    daticaSeedsDir: {
        env: 'DATICA_DB_SEEDS',
        type     : 'string',
        default  : './seeds',
        required : true,
    },
    sessionPath: {
        env: 'SESSION_PATH',
        type     : 'string',
        default  : '/',
        required : true,
    },
    sessionHttpOnly: {
        env: 'SESSION_HTTP_ONLY',
        type     : 'boolean',
        default  : 'true',
        required : true,
    },
    sessionMaxAge: {
        env: 'SESSION_MAX_AGE',
        type     : 'integer',
        default  : '1200000',
        required : true,
    },
    sessionSecure: {
        env: 'SESSION_SECURE',
        type     : 'boolean',
        default  : 'false',            // it's temporary. for HTTPS protocol this value should be change to TRUE
        required : true,
    },
    sessionSecret: {
        env: 'SESSION_SECRET',
        type     : 'string',
        default  : '$X*wKVvazSCnqb7fV!FKPr5e@QXM43s&tg!i4#YVcLuHiy5fsjjhvfYPusiLiqR@',
        required : true,
    },
    dbClient: {
        env: 'DATABASE_CLIENT',
        type     : 'string',
        default  : 'mysql2',
        required : true,
    },
    migrationDir: {
        env: 'MIGRATION_DIRECTORY',
        type     : 'string',
        default  : './database/db/knex-migrations',
        required : true,
    },
    seedsDir: {
        env: 'MIGRATION_DIRECTORY',
        type     : 'string',
        default  : './database/db/knex-seeds',
        required : true,
    },
    knexDebug: {
        env: 'KNEX_DEBUG',
        type     : 'boolean',
        default  : 'true',
        required : true,
    },
    sendGridApiKey: {
        env: 'SENDGRID_API_KEY',
        type     : 'string',
        default  : '',
        required : true,
    },
    sendgridSmtpApiKeyId: {
        env: 'SENDGRID_SMTP_API_KEY_ID',
        type: 'string',
        default: '',
        required: true
    },
    sendgridSenderEmail: {
        env: 'SENDGRID_SENDER_EMAIL',
        type: 'string',
        default: 'chris@medmo.com',
        required: true
    },
    fileDestination: {
        env: 'FILE_DESTINATION',
        type: 'string',
        default: 'uploads',
        required: true
    },
    bucketRxAccessKey: {
        env: 'BUCKET_ACCESS_KEY',
        type: 'string',
        default: '',
        required: true
    },
    bucketRxSecurityKey: {
        env: 'BUCKET_SECURITY_KEY',
        type: 'string',
        default: '',
        required: true
    },
    bucketRxsName: {
        env: 'BUCKET_RXS_NAME',
        type: 'string',
        default: '',
        required: true
    },
    bucketNoteAccessKey: {
        env: 'BUCKET_ACCESS_KEY',
        type: 'string',
        default: '',
        required: true
    },
    bucketNoteSecurityKey: {
        env: 'BUCKET_SECURITY_KEY',
        type: 'string',
        default: '',
        required: true
    },
    bucketNotesName: {
        env: 'BUCKET_NOTES_NAME',
        type: 'string',
        default: '',
        required: true
    },
    bucketLogoAccessKey: {
        env: 'BUCKET_ACCESS_KEY',
        type: 'string',
        default: '',
        required: true
    },
    bucketLogoSecurityKey: {
        env: 'BUCKET_SECURITY_KEY',
        type: 'string',
        default: '',
        required: true
    },
    bucketLogosName: {
        env: 'BUCKET_LOGOS_NAME',
        type: 'string',
        default: '',
        required: true
    },
    bucketRegion: {
        env: 'BUCKET_REGION',
        type: 'string',
        default: 'us-east-2',
        required: true
    },
    bucketAcl: {
        env: 'BUCKET_ACL',
        type: 'string',
        default: 'private',
        required: true
    },
    bucketFileSize: {
        env: 'BUCKET_FILE_SIZE',
        type: 'integer',
        default: '5242880',
        required: true
    },
    localStorageDestination: {
        env: 'LOCAL_STORAGE_DESTINATION',
        type: 'string',
        default: 'uploads',
        required: true
    },
    medmoUrl: {
        env: 'MEDMO_URL',
        type: 'string',
        default: 'https://www.medmo.com',
        required: true
    },
    pxScanRequestRoute: {
        env: 'PX_SCAN_REQUEST_ROUTE',
        type: 'string',
        default: '',
        required: true
    },
    prescriptionExt: {
        env: 'DEFAULT_PRESCRIPTION_EXTENSION',
        type: 'string',
        default: 'pdf',
        required: true
    },
});

module.exports = cfg;
