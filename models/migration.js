import pool from './pool';

//POOL CONNECT

pool.on('connect', () => {
    console.log('connected to database');
});

//CREATE USER TABLE
const createUserTable = () => {
    const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
  (id SERIAL PRIMARY KEY, 
  email VARCHAR(100) UNIQUE NOT NULL, 
  name VARCHAR(100) NOT NULL, 
  password VARCHAR(100) NOT NULL,
  created_on DATE NOT NULL)`;

    pool.query(userCreateQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

//DROP USER TABLE
const dropUserTable = () => {
    const userDropQuery = 'DROP TABLE IF EXISTS users';
    pool.query(userDropQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
}

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

export {
    createUserTable,
    dropUserTable,
};

require('make-runnable');