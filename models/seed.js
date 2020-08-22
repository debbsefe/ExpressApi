import pool from './pool';

pool.on('connect', () => {
    console.log('connected to db');
});


/**
 * SEED User
 */
const seedUser = () => {
    const seedUserQuery = `INSERT INTO
    users VALUES 
    ( default, 'eferha@gmail.com', 'Eferha Mamus',  '111111',  NOW()),
    ( default, 'mamusgmail.com', 'Florence Eferha', '111111',  NOW())`;

    pool.query(seedUserQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};


pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

export { seedUser };

require('make-runnable');
