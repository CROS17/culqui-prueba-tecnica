import mysql from 'serverless-mysql';

export const db = mysql({
    config: {
        host: 'localhost',
        database: 'bd_culqui_test',
        user: 'root',
        password: '',
    },
});
