const valueSectionGeneration = (columns, body)=>{
      calls = [];
      cols =[];
      columns.forEach(col=>{
        let safe = body[col['column_name']]!==undefined?(body[col['column_name']]).replace("'", "''"):"";
        if(safe !== ""){
          cols.push(col['column_name']);
          if(col['data_type'] == 'integer'){
          calls.push(safe);
          }
          else{
          calls.push("'"+safe+"'");
          }
        }
      })
      calls.join(",  ");
      cols.join(',');
      return {'calls': calls, 'cols': cols};
}


const updateSectionGeneration = (columns, body)=>{
  calls = [];
      columns.forEach(col=>{
        let safe = body[col['column_name']]!==undefined?(body[col['column_name']]).replace("'", "''"):"";
        if(col['data_type'] != 'integer'){
            safe = "'"+safe+"'";
        }
        if(col['data_type'] == "integer" && safe === ""){
          safe = 0;
        }
        calls.push(col['column_name']+" = "+safe);
      })
      calls.join(",  ")
      return calls;
}

module.exports = {
    valueSectionGeneration,
    updateSectionGeneration
  }