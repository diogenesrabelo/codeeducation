const express = require('express');
const axios = require('axios').default;
const mariadb = require('mariadb');
const CREATE_DATABASE = "CREATE DATABASE IF NOT EXISTS nodedb;"
const CREATE_TABLE = "CREATE TABLE IF NOT EXISTS people(id int not null auto_increment primary key, name varchar(255));"
const app = express();
const PORT = 3000;

const pool = 
  mariadb.createPool({
    host: 'db',
    user: 'dvmrabelo', 
    password: 'pass',
    database: 'nodedb'
  });

app.get('/', (req, res) => {
  insertPeopleName(res);
});

app.listen(PORT, () => {
  console.log('STARTED AT ' + PORT);
});

async function generateName() {
  console.log('Iniciando chamada a API externa');
  const RANDOM = Math.floor(Math.random() * 1154);
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1154');
  personName = response.data.results;
  console.log('Retorno da API externa');
  const name = personName[RANDOM].name;
  const nameUpperFirstLetter = name.charAt(0).toUpperCase() + name.slice(1);
  return nameUpperFirstLetter
}

async function insertPeopleName(res) {
  const conn = await pool.getConnection();
    
  try {
    await conn.query(CREATE_DATABASE);
    await conn.query(CREATE_TABLE);
    console.log('Inserindo dados no banco de dados');
    for (let i = 0; i < 10; i++) {
      const name = await generateName();
      await conn.query( "insert into people(name) values(?)", [name]);
      console.log('Dados inseridos no banco de dados');
    }
    conn.end();
  } catch (err) {
      throw err;
  }
  console.log(`Nomes inseridos no banco!`);
  getPeople(res);
}

async function getPeople(res) {    
  const sql = "select * from people";  
  
  try {
    const conn = await pool.getConnection();
    const results = await conn.query(sql);
    console.log('consultando o banco de dados');
    conn.end();
    let table = '<table>';
    table += '<tr><th>#</th><th>Name</th></tr>';
    for(let people of results) {      
      table += `<tr><td>${people.id}</td><td>${people.name}</td></tr>`;
    }

    table += '</table>';    
    res.send('<h1>Full Cycle Rocks!</h1>' + table);    
  } catch (err) {
      throw err;
  }
}