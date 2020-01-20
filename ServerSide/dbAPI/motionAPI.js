const pool = require('./apiAccess.js').pool;
const provider = require('./provider.js');
const moment = require('moment');

let lastLog = 0;

const logMotion=()=>{
    let time = moment();
    let checkFrequency = 150000;//2.5 minutes
    if(lastLog === 0 || time > lastLog + checkFrequency){
        pool.query(`INSERT INTO motion_log (time) VALUES('${time.format('MM/DD/YYYY, h:mm:ss a')}');`, [], (error, results)=>{
            if(error){
            console.log(error);
            console.log(query);
            }
            else{
                lastLog = time;
            }
        });
    }
  }

  
module.exports = {
    logMotion
  }