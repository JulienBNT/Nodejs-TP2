const db = require('../database/database')
const bcrypt = require('bcrypt')
const json = require('jsonwebtoken')
require('dotenv').config()


// exports.userGetAll = async (req, res) => {
//     const result = await db.query('SELECT * FROM users');
//     res.status(200).json(result);
// }

exports.userHome = async (req, res)=>{
    res.writeHead(200).end("Page user")
};

exports.userGetOne = async (req, res)=>{
    const idUser = req.params.id
    const connection = await db.getConnection();
    const rows = await connection.query('SELECT * FROM users WHERE id=?', [idUser]);
    res.writeHead(200).end(`Page user n°${idUser}`)
    connection.release();
    // Pour que l'utilisateur modifie ses données
    let html = '<html><head><title>User Page</title></head><body><h1>Profil User</h1><ul>';
    html += '</ul></body></html>';
    html += `<form method="put" action="/users/edit/${user.id}">
                <input type="text" name="firstname" placeholder="Nouveau prénom" />
                <input type="text" name="lastname" placeholder="Nouveau nom de famille" />
                <button type="submit">Modifier</button></form>
                </form>`
    res.send(html);
    res.sendFile(__dirname + '/userform.html');
}



exports.userEditUser = async (req, res) => {
    const userId = req.params.id;
    const { firstname, lastname } = req.body;
    try {
        const connection = await db.getConnection();
        await connection.query('UPDATE users SET firstname = ?, lastname = ? WHERE id = ?', [firstname, lastname, userId]);
        connection.release();
        res.redirect('/users');
    } catch (error) {
        console.error(error);
        res.status(500).send('Damn');
    }
}

exports.userCreateComment = async (req, res) => {
    const { comment_link, description } = req.body;
    const connection = await db.getConnection();
    const result = await connection.query('INSERT INTO comment (description, comment_link) VALUES (?, ?)', [comment_link, description]);
    connection.release();
    res.send('Commentaire créé');
}

exports.userRegister = async(req, res)=> {
    const { email, password } = req.body 
    const result = await db.query('select * from client where email = ?', [email])
    if(result.length > 0){
        return res.status(401).json({error: "utilisateur existant"})
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO user (email, password) VALUES (?, ?)',
    [email, hashPassword]
    )
    const token = jwt.sign({email}, process.env.SECRETKEY, { expiresIn : '1h'})
    res.json({token})
}

exports.userLogin = async(req, res)=> {
    const { email, password } = req.body 
    const result = await db.query('select * from user where email = ?', [email])
    if(result.length == 0){
        return res.status(401).json({error: "utilisateur non existant"})
    }
    const client = result[0];
    console.log(client);
    const SamePassword = await bcrypt.compare(password, client.password)
    if(!SamePassword){
        return res.status(401).json({error: "mdp ???"})
    }
    const token = jwt.sign({email}, process.env.SECRETKEY, { expiresIn : '1h'})
    res.json({token})
}