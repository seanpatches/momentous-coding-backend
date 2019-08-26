require('dotenv').config();
const pool = require('../utils/connect');


const getUsers = (req, res) => {
  pool.query('SELECT * FROM users ORDER BY id ASC;', (error, results) => {
    if(error){
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('SELECT * FROM users WHERE id = $1;', [id], (error, results) => {
    if(error){
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const createUser = (req, res) => {
  const { name, email } = req.body;
  pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *;', [name, email], (error, results) => {
    if(error){
      throw error
    }
    
    res.status(201).send(`${name} was added to the database with the id: ${results.rows[0].id}`)
  })
}

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const {name, email} = req.body;
  pool.query('UPDATE users SET name = $1, email = $2 where id = $3;', [name, email, id], (error, results) => {
    if(error){
      throw error
    }
    res.status(200).send(`${name} was updated to the database with the id: ${id}`)
})
}

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('DELETE FROM users WHERE id = $1;', [id], (error, result) => {
    if(error){
      throw error
    }
    res.status(201).send(`User was deleted with the id: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
