const pool = require('./apiAccess.js').pool;
const provider = require('./provider.js');

const getListOfGroup=(request, response)=>{
  pool.query('SELECT * FROM department_group ORDER BY name ASC', (error, results)=>{
      if(error){
        console.log(error);
      }
      else{
        response.status(200).json(results.rows);
      }
  });
}
const getIDListOfGroup=(request, response)=>{
  pool.query('SELECT id, name, short_description FROM department_group ORDER BY name ASC', (error, results)=>{
      if(error){
        console.log(error);
      }
      else{
        response.status(200).json(results.rows);
      }
  });
}

const getGroupById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query('SELECT * FROM department_group WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.log(error);
    }
    response.status(200).json(results.rows)
  })
}

const createGroup = (request, response) => {
  pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'department_group' AND column_name != 'id';",[], (error,results)=>{
    if(error){
      console.log(error);
    }
    else{
        const val = provider.valueSectionGeneration(results.rows, request.body);
        const query = "INSERT INTO department_group ($1) VALUES ($2);";
        pool.query(query, [val.cols, val.calls ], (error, results2) => {
        if (error) {
          console.log(error);
        }
        response.status(201).send(`Group created`);
      })
    }
  })
}

const updateGroup = (request, response) => {
  pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'department_group' AND column_name != 'id';",[], (error,results)=>{
    if(error){
      console.log(error);
    }
    else{
      const columns = results.rows;
      const id = parseInt(request.params.id)
      const body = request.body;
      
      const calls = provider.updateSectionGeneration(columns, body);
      let query = "UPDATE department_group SET $1 WHERE id = $2;";
      pool.query(query, [calls, id], (error, results2) => {
        if (error) {
          console.log(error);
        }
        response.status(201).send(`Group updated with ID: ${id}`)
      })
    }
  });
}




module.exports = {
  getListOfGroup,
  getIDListOfGroup,
  getGroupById,
  createGroup,
  updateGroup,
}