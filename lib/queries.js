require('dotenv').config();
const Pool = require('pg');
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT
});

const getUsers = (req, res) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, res) => {
    if(error){
      throw error
    }
    res.status(200).json(res.rows)
  })
}

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('SELECT * FROM users WHERE id = ASC', [id], (error, res) => {
    if(error){
      throw error
    }
    res.status(200).json(res.rows)
  })
}

const createUser = (req, res) => {
  const { name, email } = req.body;
  const id = parseInt(req.params.id);

  pool.query('INSERT INTO users (name, email) values ($1, $2)',[name, email], (error, res) => {
    if(error){
      throw error
    }
    res.status(201).json(`${name} was added to the database with the id: ${res.insertId}`)
  })
}

const updateUser = (req, res) => {
  const {name, email} = req.body;
  pool.query('UPDATE users SET name = $1, email = $2 where id = $3', [name, email,id]), (error, res) => {
    if(error){
      throw error
    }
    res.status(201).send(`${name} was updated to the database with the id: ${id}`)
  }
}

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('DELETE FROM users WHERE id = $1', [id]), (error, res) => {
    if(error){
      throw error
    }
    res.status(201).send(`User was deleted with the id: ${id}`)
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
