const db = require('../database/database')
const bcrypt = require('bcrypt')
const json = require('jsonwebtoken')
require('dotenv').config()


exports.adminGetAll = async (req, res) => {
    const connection = await db.getConnection();
    const result = await connection.query('SELECT * FROM users');
    connection.release();
    let html = '<html><head><title>Admin Page</title></head><body><h1>Liste des Utilisateurs</h1><ul>';
    result.forEach(user => {
        html += `<li>${user.id}</li>`;
        html += `<li>${user.firsname}</li>`;
        html += `<li>${user.lastname}</li>`;
        html += `<li>${user.email}</li>`;
        html += `<li><form method="post" action="/admin/delete/${user.id}"><button type="submit">Supprimer</button></form></li>`;
        html += `<li><form method="put" action="/admin/edit/${user.id}">
                <input type="text" name="firstname" placeholder="Nouveau prénom" />
                <input type="text" name="lastname" placeholder="Nouveau nom de famille" />
                <input type="text" name="email" placeholder="Nouveau email" />
                <button type="submit">Modifier</button></form>
                </form></li>`;
    });
    html += '</ul></body></html>';
    res.send(html);
    res.sendFile(__dirname + '/adminform.html');
};

exports.adminCreateUser = async (req, res) => {
    const { firstname, lastname, email } = req.body;
    const connection = await db.getConnection();
    const result = await connection.query('INSERT INTO users (firstname, lastname, email) VALUES (?, ?, ?)', [firstname, lastname, email]);
    connection.release();
    res.send('Utilisateur créé');
};

exports.adminCreateTechno = async (req, res) => {
    const { techno_name } = req.body;
    const connection = await db.getConnection();
    const result = await connection.query('INSERT INTO techo (techno_name) VALUES (?)', [techno_name]);
    connection.release();
    res.send('techo créé');
}

exports.adminDeleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const connection = await db.getConnection();
        await connection.query('DELETE FROM users WHERE id = ?', [userId]);
        connection.release();
        // Rediriger vers admin après suppression
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Oh fak');
    }
}

exports.adminDeleteTechno = async (req, res) => {
    const TechnoId = req.params.id;
    try {
        const connection = await db.getConnection();
        await connection.query('DELETE FROM techno WHERE id = ?', [TechnoId]);
        connection.release();
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Oh fak');
    }
}

exports.adminModifyUser = async (req, res) => {
    const userId = req.params.id;
    const { firstname, lastname, email } = req.body;
    try {
        const connection = await db.getConnection();
        await connection.query('UPDATE users SET firstname = ?, lastname = ?, email = ? WHERE id = ?', [firstname, lastname, email, userId]);
        connection.release();
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Encore ?!');
    }
}

exports.adminModifyTechno = async (req, res) => {
    const technoId = req.params.id;
    const { techno_name, creation_date, creation_name } = req.body;
    try {
        const connection = await db.getConnection();
        await connection.query('UPDATE techno SET techno_name = ?, creation_date = ?, creation_name = ? WHERE id = ?', [techno_name, creation_date, creation_name, technoId]);
        connection.release();
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Encore ?!');
    }
}