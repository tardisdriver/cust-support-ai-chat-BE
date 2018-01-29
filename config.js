exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    'mongodb://localhost/custDB';

exports.TEST_DATABASE_URL = 'mongodb://localhost/custTest';


exports.PORT = process.env.PORT || 8080;
