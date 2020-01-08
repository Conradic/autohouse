const pool = require('./apiAccess.js').pool;
const provider = require('./provider.js');

const getListOfPeople=(request, response)=>{
  pool.query('SELECT * FROM users ORDER BY first_name ASC', (error, results)=>{
      if(error){
        console.log(error);
      }
      else{
        response.status(200).json(results.rows);
      }
  });
}
const getIDListOfPeople=(request, response)=>{
  pool.query('SELECT id, first_name, last_name FROM users ORDER BY first_name ASC', (error, results)=>{
      if(error){
        console.log(error);
      }
      else{
        response.status(200).json(results.rows);
      }
  });
}

const getPersonById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.log(error);
    }
    response.status(200).json(results.rows)
  })
}

const createPerson = (request, response) => {
  pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'users' AND column_name != 'id';",[], (error,results)=>{
    if(error){
      console.log(error);
    }
    else{
      const val = provider.valueSectionGeneration(results.rows, request.body);
      const query = `INSERT INTO users ${val.cols} VALUES ${val.calls};`;
      pool.query(query, (error, results2) => {
      if (error) {
        console.log(error);
      }
      response.status(201).send(`User created`);
      })
    }
  })
}

const updatePerson = (request, response) => {
  pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'users' AND column_name != 'id';",[], (error,results)=>{
    if(error){
      console.log(error);
    }
    else{
      const columns = results.rows;
      const id = parseInt(request.params.id)
      const body = request.body;
      const calls = provider.updateSectionGeneration(columns, body);
      
      pool.query(`UPDATE users SET ${calls} WHERE id = ${id};`, (error, results2) => {
        if (error) {
          console.log(error);
        }
        response.status(201).send(`User updated with ID: ${id}`)
      });
    }
    
  });

  
}


module.exports = {
  getListOfPeople,
  getIDListOfPeople,
  getPersonById,
  createPerson,
  updatePerson
}