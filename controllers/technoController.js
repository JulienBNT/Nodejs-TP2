const db = require('../database/database')
const bcrypt = require('bcrypt')
const json = require('jsonwebtoken')
require('dotenv').config()

exports.technoGetAll = async (req, res) => {
    const result = await db.query('SELECT techno.*, comment.* FROM techno LEFT JOIN comment ON techno.id = comment.comment_link');
    res.status(200).json(result);
};