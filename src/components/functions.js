import moment from 'moment';
export const convertCtoF = (celsius)=>{
    let temp = (((celsius * 9/5) + 32) + '').split('.')[0];
    return temp;
};

export const convertmmtoin=(millimeters)=>{
    return (millimeters/25.4);
}

export const formatDecimal = (dataset)=>{
    dataset = (dataset+'').split('.')[0];
    if(typeof dataset === 'string'){
        return parseInt(dataset);
    }
    else{
        return dataset;
    }
}

export const formatHour = (dataset)=>{
    if(dataset < 0){
        dataset+=24;
    }
    if(dataset < 12){
        return (dataset) + ' AM';
    }
    else{
        if(dataset === 12){
            return '12 PM';
        }
        else if(dataset === 24){
            return '12 AM';
        }
        else{
            return (dataset-12) + ' PM';
        }
    }
}

export const formatTime=(dataset)=>{
    dataset = dataset.split(':')[0];
    dataset = dataset.replace('T',':');
    dataset = 'Day: ' + dataset.split(':')[0] + '\nTime: '+ formatHour(parseInt(dataset.split(':')[1])-getTimeAdjustment()+1);
    return dataset;
}

export const formatTimeMoment=(dataset)=>{
    //expected input 2019-08-17T00:00:00+00:00/PT1H
    let time = moment(dataset.split('+'[0]), "YYYY-MM-DDThh:mm:ss").subtract(getTimeAdjustment(), 'hours');
    time = time.format('MM/DD/YY h:mm A');
    if(time === 'Invalid date'){
        console.log(dataset);
        time = moment(dataset.split('+'[0]), "YYYY-MM-DDThh:mm:ss").subtract(getTimeAdjustment(), 'hours');
        console.log(time);
        
    }
    return time;
}

export const getTimeAdjustment=()=>{
    return 5;
}

export const feedArray=(dataArray, callback, propertyName, additionalproperty=null)=>{
    dataArray.forEach((dataset)=>{
         dataset[propertyName] = callback(dataset[propertyName], additionalproperty);
    });
    return dataArray;
}

export const formatValueByType=(dataset, type)=>{
    if(type === 'unit:degC'){
        return convertCtoF(dataset);
    }
    else if(type === 'unit:mm'){
        return convertmmtoin(dataset);
    }
    else{
        return dataset;
    }
}

export const formatDate=(dataset)=>{
    //2019-07-12T07:00:00+00:00/PT1H
    dataset = dataset.split(':')[0];
    dataset = dataset.replace('T',':');
    //2019-07-12:07
    let time = parseInt(dataset.split(':')[1]);
    let date = (dataset.split(':')[0]).split('-');
    time -= parseInt(getTimeAdjustment());
    if(time < 0){
        date[2] = parseInt(date[2])-1;
        time += 24;
    }
    if(time === 0){
        time = 'Midnight';
    }
    else if(time < 12){
        time = time + ' AM';
    }
    else if(time > 12){
        time -=12;
        time = time + ' PM';
    }
    else if(time === 12){
        time = 'Noon';
    }
    
    date = date[1]+'/'+date[2]+'/'+date[0];

    return 'Day: ' + date + '\nTime: '+ time;    
}

export const getLocation=(callback)=>{
    let location;
    let latitude;
    let longitude;
    if (window.navigator && window.navigator.geolocation) {
        location = window.navigator.geolocation
    }
    else{
        callback({});
    }
    if (location){
        location.getCurrentPosition(function (position) {
            let latLon = {};
            latLon.latitude = position.coords.latitude;
            latLon.longitude= position.coords.longitude;
            callback(latLon);
            console.log(latLon);
        }, latitude, longitude)
    }
    else{
        callback({});
    }
}


export const delayCall=(callback, delay)=>{
    new Promise(function(resolve, reject){
        setTimeout(function(){
          resolve();
        }, delay)
      }).then(()=>{
        callback();
      });
}