import moment from 'moment';

import db from '../models/connection';

import {
    hashPassword,
    comparePassword,
    isValidEmail,
    validatePassword,
    isEmpty,
    generateUserToken,
} from '../helpers/validations';

import {
    createUserQuery,
    userDetailsQuery,

} from '../models/queries.js';

import {
    errorMessage, successMessage, status,
} from '../helpers/status';

/**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
const createUser = async (req, res) => {
    const {
        email, name, password
    } = req.body;

    const created_on = moment(new Date());
    if (isEmpty(email) || isEmpty(name) || isEmpty(password)) {
        errorMessage.error = 'Email, password, name field cannot be empty';
        return res.status(status.bad).send(errorMessage);
    }
    if (!isValidEmail(email)) {
        errorMessage.error = 'Please enter a valid Email';
        return res.status(status.bad).send(errorMessage);
    }
    if (!validatePassword(password)) {
        errorMessage.error = 'Password must be more than five(5) characters';
        return res.status(status.bad).send(errorMessage);
    }
    const { rows } = await db.query(userDetailsQuery, [email]);
    if (rows.length > 0) {
        errorMessage.error = 'User with that EMAIL already exists';
        return res.status(status.conflict).send(errorMessage);

    }

    const hashedPassword = hashPassword(password);

    const values = [
        email,
        name,
        hashedPassword,
        created_on,
    ];

    try {
        const { rows } = await db.query(createUserQuery, values);
        const dbResponse = rows[0];
        console.log(dbResponse);
        delete dbResponse.password;
        const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.name);
        successMessage.data = dbResponse;
        successMessage.data.token = token;
        return res.status(status.created).send(successMessage);
    } catch (e) {
        console.log(e);

        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
    }
};

/**
   * Signin
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
const signinUser = async (req, res) => {
    const { email, password } = req.body;
    if (isEmpty(email) || isEmpty(password)) {
        errorMessage.error = 'Email or Password detail is missing';
        return res.status(status.bad).send(errorMessage);
    }
    if (!isValidEmail(email) || !validatePassword(password)) {
        errorMessage.error = 'Please enter a valid Email or Password';
        return res.status(status.bad).send(errorMessage);
    }
    try {
        const { rows } = await db.query(userDetailsQuery, [email]);
        const dbResponse = rows[0];
        if (!dbResponse) {
            errorMessage.error = 'User with this email does not exist';
            return res.status(status.notfound).send(errorMessage);
        }
        if (!comparePassword(dbResponse.password, password)) {
            errorMessage.error = 'The password you provided is incorrect';
            return res.status(status.bad).send(errorMessage);
        }
        const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.name);
        delete dbResponse.password;
        successMessage.data = dbResponse;
        successMessage.data.token = token;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = 'Operation was not successful';
        console.log(error);
        return res.status(status.error).send(errorMessage);
    }

};

export {
    createUser,
    signinUser,
};
