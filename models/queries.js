const createUserQuery = `INSERT INTO
users(email, name, password, created_on)
VALUES($1, $2, $3, $4)
returning *`;

const userDetailsQuery = 'SELECT * FROM users WHERE email = $1';

export {
    createUserQuery,
    userDetailsQuery,
};