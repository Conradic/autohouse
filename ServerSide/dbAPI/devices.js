const pool = require('./apiAccess.js').pool;
const provider = require('./provider.js');

const getListOfActiveDevices=(request, response, next, server=false, callback=null)=>{
  pool.query('SELECT id, title, description, mac_address, device_classification_id, last_seen FROM devices WHERE active = 1 ORDER BY title DESC', (error, results)=>{
      if(error){
        console.log(error);
      }
      else if(server === false){
        response.status(200).json(results.rows);
      }
      else{
        callback(results.rows.map(row=>{return {mac: row.mac_address, title: row.title, dev_name: row.dev_name, found: false}}));
      }
  });
}


const getIDListOfDevices=(request, response)=>{
  pool.query('SELECT id, title FROM devices ORDER BY title ASC', (error, results)=>{
      if(error){
        console.log(error);
      }
      else{
        response.status(200).json(results.rows);
      }
  });
}

const getDeviceById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query('SELECT * FROM devices WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.log(error);
    }
    response.status(200).json(results.rows)
  })
}

const createDevice = (request, response) => {
  pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'devices' AND column_name != 'id';",[], (error,results)=>{
    if(error){
      console.log(error);
    }
    else{
      const columns = results.rows;
      const body = request.body;
      
      calls = [];
      cols =[];
      columns.forEach(col=>{
        cols.push(col['column_name']);
        let safe = body[col['column_name']]!==undefined?(body[col['column_name']]).replace("'", "''"):"";
        if(Number.isInteger(safe)){
          calls.push(safe);
        }
        else{
          calls.push("'"+safe+"'");
        }
      })
      calls.join(",  ");
      cols.join(',');
      const query = "INSERT INTO devices ($1) VALUES ($2);";
      pool.query(query, [cols,calls], (error, results2) => {
        if (error) {
          console.log(error);
        }
        response.status(201).send(`Device added`)
      })
    }
  })
}

const updateDevice = (request, response) => {
  pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'users' AND column_name != 'id';",[], (error,results)=>{
    if(error){
      console.log(error);
    }
    else{
      const columns = results.rows;
      const id = parseInt(request.params.id)
      const body = request.body;
      
      let query = "UPDATE devices SET $1 WHERE id = $2";
      calls = provider.updateSectionGeneration(columns, body);
      
      pool.query(query, [calls, id], (error, results2) => {
        if (error) {
          console.log(error);
        }
        response.status(201).send(`Device updated with ID: ${id}`)
      })
    }
  });

  
}


module.exports = {
    getListOfActiveDevices,
    getIDListOfDevices,
    getDeviceById,
    createDevice,
    updateDevice
}