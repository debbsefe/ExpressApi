import pool from "./pool";
export default {
    /**
    *  Query DB
    * @param {object} req
    * @param {object} res
    * @returns {object} object
    */
    query(queryText, params) {
        return new Promise((resolve, reject) => {
            pool.query(queryText, params)
                .then((res) => {
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
        });
    }
};