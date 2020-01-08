const pool = require('./apiAccess.js').pool;
const provider = require('./provider.js');

const getListOfTask=(request, response)=>{
  pool.query('SELECT * FROM task ORDER BY title ASC', (error, results)=>{
      if(error){
        console.log(error);
      }
      else{
        response.status(200).json(results.rows);
      }
  });
}
const getIDListOfTask=(request, response)=>{
  pool.query('SELECT id, title, short_description FROM task ORDER BY title ASC', (error, results)=>{
      if(error){
        console.log(error);
      }
      else{
        response.status(200).json(results.rows);
      }
  });
}

const getTaskById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query('SELECT * FROM task WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.log(error);
    }
    response.status(200).json(results.rows)
  })
}

const createTask = (request, response) => {
  pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'task' AND column_name != 'id';",[], (error,results)=>{
    if(error){
      console.log(error);
    }
    else{
        const val = provider.valueSectionGeneration(results.rows, request.body);
        const query = "INSERT INTO task ($1) VALUES ($2);";
        pool.query(query, [val.cols, val.calls], (error, results2) => {
        if (error) {
          console.log(error);
        }
        response.status(201).send(`Task created`);
      })
    }
  })
}

const updateTask = (request, response) => {
  pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'task' AND column_name != 'id';",[], (error,results)=>{
    if(error){
      console.log(error);
    }
    else{
      const columns = results.rows;
      const id = parseInt(request.params.id)
      const body = request.body;
      
      const calls = provider.updateSectionGeneration(columns, body);
      let query = "UPDATE task SET $1 WHERE id = $2;";
      pool.query(query, [calls, id], (error, results2) => {
        if (error) {
          console.log(error);
        }
        response.status(201).send(`Task updated with ID: ${id}`)
      })
    }
  });
}

const getTaskTable=(request, response)=>{
  pool.query('SELECT task.id as id, task.due_date as due_date, task.title as title, task.short_description as short_description, department_group.name as group_name FROM task LEFT JOIN department_group on department_group.id = task.group_id ORDER BY title ASC', (error, results)=>{
    if(error){
      console.log(error);
    }
    else{
      response.status(200).json(results.rows);
    }
});
}



module.exports = {
  getListOfTask,
  getIDListOfTask,
  getTaskById,
  createTask,
  updateTask,
  getTaskTable
}