/**
 * This script will read the recorridos_realizados_{year}.csv files
 * and transform the data to a new format, to be used in the database.
 * 
 * The script will read the files in chunks to avoid memory issues.
 * 
 * There will be many transformations to the data, like:
 * - Transform the date format
 * - Calculate the distance between the origin and destination stations
 * - Calculate the duration of the trip
 * - Other data transformations
 * 
 * After that it will save the data in multiple files, one for each year, up to 3000000 rows per file per year.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const PapaParse = require('papaparse');
const dayjs = require('dayjs');

const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

let csvJson = []
const stations = [];
let rowId = 1;
let rowsProcessed = 0;
let rowsDiscarded = 0;
let rowsWithInvalidStations = 0;

// In this array, each element will be an object with the following structure
// { trip_id, year, id_user, origin_id,  origin_date, destination_id, destination_date, distance, duration }

function getStationId2010To2018(stationId) {
  if(stationId == 'NA') return null;
  const station = stations.find(station => station.id_2010_2019 === stationId);
  return station || null;
}

function getStationId2014(stationId) {
  const station = stations.find(station => station.id_2014 === stationId);
  return station || null;
}

function getStationId2019To2024(stationId) {
  const station = stations.find(station => station.id === stationId);
  return station || null;
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const toRadians = angle => angle * (Math.PI / 180);

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in kilometers
  return distance;

}

function processDate2010(datetime) {
  // datetime is in dd/mm/yyyy hh:mm format, transform it to yyyy-mm-dd hh:mm:ss
  const [date, time] = datetime.split(' ');
  const [day, month, year] = date.split('/');
  const [hours, minutes] = time.split(':');
  return `${year}-${month}-${day} ${hours}:${minutes}:00`;
}

function processDate2012to2014(datetime) {
  // check if the datetime is in yyyy-mm-dd hh:mm:ss.SSS format or in format dd/mm/yyyy hh:mm
  if (datetime.includes('-')) {
    return datetime.split('.')[0];
  } else {
    const [date, time] = datetime.split(' ');
    const [day, month, year] = date.split('/');
    const [hours, minutes] = time.split(':');
    return `${year}-${month}-${day} ${hours}:${minutes}:00`;
  }
}

function processDuration(startDate, endDate) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  return end.diff(start, 'seconds');
}
  

function transformMinutesToSeconds(minutes) {
  return Number(minutes) * 60;
}

function transformDurationStringToSeconds(duration) {
  if(duration == 'NA') return null;
  // the string is formatted this way, ex. 0 days 00:37:26.000000000
  const [days, time] = duration.split(' days ');
  const [hours, minutes, seconds] = time.split(':');
  return (Number(days) * 24 * 60 * 60) + (Number(hours) * 60 * 60) + (Number(minutes) * 60) + Number(seconds);
}

function processRow2010(row) {
  // Column names
  // ----------------
  // fecha_origen_recorrido
  // id_estacion_origen
  // nombre_estacion_origen
  // long_estacion_origen
  // lat_estacion_origen
  // domicilio_estacion_origen
  // duracion_recorrido
  // fecha_destino_recorrido
  // id_estacion_destino
  // nombre_estacion_destino
  // long_estacion_destino
  // lat_estacion_destino
  // domicilio_estacion_destino
  
  const columnsToCheck = [
    'id_estacion_origen',
    'id_estacion_destino',
    'fecha_origen_recorrido',
    'fecha_destino_recorrido',
    'duracion_recorrido',
  ]

  const checkEmptyValues = function (row, columns) {
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      if (!row[column]) {
        return true;
      }
    }
    return false;
  }

  if (checkEmptyValues(row, columnsToCheck)) {
    rowsDiscarded++;
    return;
  }

  const originStation = getStationId2010To2018(row.id_estacion_origen);

  if (!originStation) {
    rowsWithInvalidStations++;
    return;
  }

  const destinationStation = getStationId2010To2018(row.id_estacion_destino);

  if (!destinationStation) {
    rowsWithInvalidStations++;
    return;
  }

  // calculate distance
  const distance = getDistanceFromLatLonInKm(
    originStation.latitude,
    originStation.longitude,
    destinationStation.latitude,
    destinationStation.longitude
  );


  const trip = {
    id: rowId++,
    id_trip: null,
    year: 2010,
    id_user: null,
    origin_id: originStation.id,
    origin_date: processDate2010(row.fecha_origen_recorrido),
    destination_id: destinationStation.id,
    destination_date: processDate2010(row.fecha_destino_recorrido),
    distance: distance,
    duration: transformMinutesToSeconds(row.duracion_recorrido),
  };

  csvJson.push(trip);
}

function processRow2011(row) {
  // Column names
  // ----------------
  // fecha_origen_recorrido
  // id_estacion_origen
  // nombre_estacion_origen
  // long_estacion_origen
  // lat_estacion_origen
  // domicilio_estacion_origen
  // duracion_recorrido
  // fecha_destino_recorrido
  // id_estacion_destino
  // nombre_estacion_destino
  // long_estacion_destino
  // lat_estacion_destino
  // domicilio_estacion_destino
  
  const columnsToCheck = [
    'id_estacion_origen',
    'id_estacion_destino',
    'fecha_origen_recorrido',
    'fecha_destino_recorrido',
    'duracion_recorrido',
  ]

  const checkEmptyValues = function (row, columns) {
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      if (!row[column]) {
        return true;
      }
    }
    return false;
  }

  if (checkEmptyValues(row, columnsToCheck)) {
    rowsDiscarded++;
    return;
  }

  const originStation = getStationId2010To2018(row.id_estacion_origen);

  if (!originStation) {
    rowsWithInvalidStations++;
    return;
  }

  const destinationStation = getStationId2010To2018(row.id_estacion_destino);

  if (!destinationStation) {
    rowsWithInvalidStations++;
    return;
  }

  // calculate distance
  const distance = getDistanceFromLatLonInKm(
    originStation.latitude,
    originStation.longitude,
    destinationStation.latitude,
    destinationStation.longitude
  );


  const trip = {
    id: rowId++,
    id_trip: null,
    year: 2011,
    id_user: null,
    origin_id: originStation.id,
    origin_date: row.fecha_origen_recorrido,
    destination_id: destinationStation.id,
    destination_date: processDate2010(row.fecha_destino_recorrido),
    distance: distance,
    duration: transformMinutesToSeconds(row.duracion_recorrido),
  };

  csvJson.push(trip);
}

function processRow2012(row) {
  // Column names
  // ----------------
  // fecha_origen_recorrido
  // id_estacion_origen
  // nombre_estacion_origen
  // long_estacion_origen
  // lat_estacion_origen
  // domicilio_estacion_origen
  // duracion_recorrido
  // fecha_destino_recorrido
  // id_estacion_destino
  // nombre_estacion_destino
  // long_estacion_destino
  // lat_estacion_destino
  // domicilio_estacion_destino
  
  const columnsToCheck = [
    'id_estacion_origen',
    'id_estacion_destino',
    'fecha_origen_recorrido',
    'fecha_destino_recorrido',
    'duracion_recorrido',
  ]

  const checkEmptyValues = function (row, columns) {
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      if (!row[column]) {
        return true;
      }
    }
    return false;
  }

  if (checkEmptyValues(row, columnsToCheck)) {
    rowsDiscarded++;
    return;
  }

  const originStation = getStationId2010To2018(row.id_estacion_origen);

  if (!originStation) {
    rowsWithInvalidStations++;
    return;
  }

  const destinationStation = getStationId2010To2018(row.id_estacion_destino);

  if (!destinationStation) {
    rowsWithInvalidStations++;
    return;
  }

  // calculate distance
  const distance = getDistanceFromLatLonInKm(
    originStation.latitude,
    originStation.longitude,
    destinationStation.latitude,
    destinationStation.longitude
  );


  const trip = {
    id: rowId++,
    id_trip: null,
    year: 2012,
    id_user: null,
    origin_id: originStation.id,
    origin_date: processDate2012to2014(row.fecha_origen_recorrido),
    destination_id: destinationStation.id,
    destination_date: processDate2012to2014(row.fecha_destino_recorrido),
    distance: distance,
    duration: transformMinutesToSeconds(row.duracion_recorrido),
  };

  csvJson.push(trip);
}

function processRow2013(row) {
  // Column names
  // ----------------
  // fecha_origen_recorrido
  // id_usuario
  // id_estacion_origen
  // nombre_estacion_origen
  // long_estacion_origen
  // lat_estacion_origen
  // domicilio_estacion_origen
  // duracion_recorrido
  // fecha_destino_recorrido
  // id_estacion_destino
  // nombre_estacion_destino
  // long_estacion_destino
  // lat_estacion_destino
  // domicilio_estacion_destino
  
  const columnsToCheck = [
    'id_estacion_origen',
    'id_estacion_destino',
    'fecha_origen_recorrido',
    'fecha_destino_recorrido',
    'duracion_recorrido',
  ]

  const checkEmptyValues = function (row, columns) {
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      if (!row[column]) {
        return true;
      }
    }
    return false;
  }

  if (checkEmptyValues(row, columnsToCheck)) {
    rowsDiscarded++;
    return;
  }

  const originStation = getStationId2010To2018(row.id_estacion_origen);

  if (!originStation) {
    rowsWithInvalidStations++;
    return;
  }

  const destinationStation = getStationId2010To2018(row.id_estacion_destino);

  if (!destinationStation) {
    rowsWithInvalidStations++;
    return;
  }

  // calculate distance
  const distance = getDistanceFromLatLonInKm(
    originStation.latitude,
    originStation.longitude,
    destinationStation.latitude,
    destinationStation.longitude
  );

  const dateStart = processDate2012to2014(row.fecha_origen_recorrido);
  const dateEnd = processDate2012to2014(row.fecha_destino_recorrido);

  const trip = {
    id: rowId++,
    id_trip: null,
    year: 2013,
    id_user: row.id_usuario || null,
    origin_id: originStation.id,
    origin_date: dateStart,
    destination_id: destinationStation.id,
    destination_date: dateEnd,
    distance: distance,
    duration: processDuration(dateStart, dateEnd)
  };

  csvJson.push(trip);
}

function processRow2014(row) {
  // Column names
  // ----------------
  // ORIGEN_FECHA
  // NOMBRE_ORIGEN
  // DESTINO_FECHA
  // DESTINO_ESTACION
  
  const columnsToCheck = [
    'ORIGEN_FECHA',
    'NOMBRE_ORIGEN',
    'DESTINO_FECHA',
    'DESTINO_ESTACION'
  ]

  const checkEmptyValues = function (row, columns) {
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      if (!row[column]) {
        return true;
      }
    }
    return false;
  }

  if (checkEmptyValues(row, columnsToCheck)) {
    rowsDiscarded++;
    return;
  }

  const originStation = getStationId2014(row.NOMBRE_ORIGEN);

  if (!originStation) {
    rowsWithInvalidStations++;
    return;
  }

  const destinationStation = getStationId2014(row.DESTINO_ESTACION);

  if (!destinationStation) {
    rowsWithInvalidStations++;
    return;
  }

  // calculate distance
  const distance = getDistanceFromLatLonInKm(
    originStation.latitude,
    originStation.longitude,
    destinationStation.latitude,
    destinationStation.longitude
  );

  const dateStart = processDate2012to2014(row.ORIGEN_FECHA);
  const dateEnd = processDate2012to2014(row.DESTINO_FECHA);

  const trip = {
    id: rowId++,
    id_trip: null,
    year: 2014,
    id_user: null,
    origin_id: originStation.id,
    origin_date: dateStart,
    destination_id: destinationStation.id,
    destination_date: dateEnd,
    distance: distance,
    duration: processDuration(dateStart, dateEnd)
  };

  csvJson.push(trip);
}

function processRow2015To2018(row,year) {
  // Column names
  // ----------------
  // periodo
  // genero_usuario
  // fecha_origen_recorrido
  // id_estacion_origen
  // nombre_estacion_origen
  // long_estacion_origen
  // lat_estacion_origen
  // domicilio_estacion_origen
  // duracion_recorrido
  // fecha_destino_recorrido
  // id_estacion_destino
  // nombre_estacion_destino
  // long_estacion_destino
  // lat_estacion_destino
  // domicilio_estacion_destino
  
  let columnsToCheck = [
    'id_estacion_origen',
    'id_estacion_destino',
    'fecha_origen_recorrido',
    'fecha_destino_recorrido',
  ]

  if(year == 2016 || year == 2017 || year == 2018){
    columnsToCheck = [
      'id_estacion_origen',
      'id_estacion_destino',
      'fecha_origen_recorrido',
      'duracion_recorrido'
    ]
  }

  const checkEmptyValues = function (row, columns) {
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      if (!row[column]) {
        return true;
      }
    }
    return false;
  }

  if (checkEmptyValues(row, columnsToCheck)) {
    rowsDiscarded++;
    return;
  }

  const originStation = getStationId2010To2018(row.id_estacion_origen);

  if (!originStation) {
    rowsWithInvalidStations++;
    return;
  }

  const destinationStation = getStationId2010To2018(row.id_estacion_destino);

  if (!destinationStation) {
    rowsWithInvalidStations++;
    return;
  }

  // calculate distance
  const distance = getDistanceFromLatLonInKm(
    originStation.latitude,
    originStation.longitude,
    destinationStation.latitude,
    destinationStation.longitude
  );

  const dateStart = row.fecha_origen_recorrido;
  let duration2016and2018 = null
  let dateEnd = null
  if (year == 2016 || year == 2017 || year == 2018) {
    // in 2016 && 2017, many fecha_destino_recorrido are empty, so we will use the fecha_origen_recorrido + duracion_recorrido
    // check if duracion_recorrido is empty

    duration2016and2018 = transformDurationStringToSeconds(row.duracion_recorrido);

    if(isNaN(duration2016and2018)){
      rowsDiscarded++;
      return;
    }

    dateEnd = dayjs(dateStart).add(duration2016and2018, 'seconds').format('YYYY-MM-DD HH:mm:ss');
  } else {
    dateEnd = row.fecha_destino_recorrido;
  }

  if(dateEnd == 'NA'){
    rowsDiscarded++;
    return;
  }

  const trip = {
    id: rowId++,
    id_trip: null,
    year: year,
    id_user: row.id_usuario || null,
    origin_id: originStation.id,
    origin_date: dateStart,
    destination_id: destinationStation.id,
    destination_date: dateEnd,
    distance: distance,
    duration: processDuration(dateStart, dateEnd)
  };

  csvJson.push(trip);
}

function processRow2019To2024(row,year) {
  // Column names
  // ----------------
  // Id_recorrido
  // id_usuario
  // género
  // fecha_origen_recorrido
  // id_estacion_origen
  // nombre_estacion_origen
  // long_estacion_origen
  // lat_estacion_origen
  // direccion_estacion_origen
  // duracion_recorrido
  // fecha_destino_recorrido
  // id_estacion_destino
  // nombre_estacion_destino
  // long_estacion_destino
  // lat_estacion_destino
  // direccion_estacion_destino
  // modelo_bicicleta
  
  const columnsToCheck = [
    'id_estacion_origen',
    'id_estacion_destino',
    'fecha_origen_recorrido',
    'fecha_destino_recorrido',
  ]

  const checkEmptyValues = function (row, columns) {
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      if (!row[column]) {
        return true;
      }
    }
    return false;
  }

  if (checkEmptyValues(row, columnsToCheck)) {
    rowsDiscarded++;
    return;
  }

  const originStation = getStationId2019To2024(row.id_estacion_origen);

  if (!originStation) {
    rowsWithInvalidStations++;
    return;
  }

  const destinationStation = getStationId2019To2024(row.id_estacion_destino);

  if (!destinationStation) {
    rowsWithInvalidStations++;
    return;
  }

  // calculate distance
  const distance = getDistanceFromLatLonInKm(
    originStation.latitude,
    originStation.longitude,
    destinationStation.latitude,
    destinationStation.longitude
  );

  const dateStart = row.fecha_origen_recorrido;
  const dateEnd = row.fecha_destino_recorrido;

  const trip = {
    id: rowId++,
    id_trip: row.Id_recorrido.replace('BAEcobici','') || null,
    year: year,
    id_user: row.id_usuario || null,
    origin_id: originStation.id,
    origin_date: dateStart,
    destination_id: destinationStation.id,
    destination_date: dateEnd,
    distance: distance,
    duration: processDuration(dateStart, dateEnd)
  };

  csvJson.push(trip);
}



// load the stations from the file using PapaParse
async function loadStations() {
  console.log('Loading stations...')
  const filePath = path.resolve(__dirname, 'data/stations_master.csv');

  try {
    await new Promise((resolve, reject) => {
      const config = {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
          stations.push(...results.data);
          console.log('-- Stations loaded. Count: ', stations.length);
          resolve();
        },
        error: (error) => {
          console.warn(`Error parsing stations-master.csv: ${error.message}`);
          console.error(error)
          reject(error); // Reject the promise here
        }
      };
      const read = fs.createReadStream(filePath);
      PapaParse.parse(read, config);
    });
  } catch (err) {
    console.warn(`Error reading stations-master.csv: ${err.message}`);
    console.error(err)
  }
}

async function processFiles() {

  for (let i = 0; i < years.length; i++) {
    const year = years[i];
    const filePath = path.resolve(__dirname, `data/original/recorridos_realizados_${year}.csv`);

    try {
      // get time to process the file
      const startWatch = process.hrtime();

      console.log(`Processing data/original/recorridos_realizados_${year}.csv`)
      
      // for this type of files, we will use PapaParse to read the file, to have a more relaiable way to get the json value per column

      await new Promise((resolve, reject) => {
        const config = {
          header: true,
          dynamicTyping: true,
          worker: true,
          step: function(results, parser) {
            rowsProcessed++;
            switch(year) {
              case 2010:
                processRow2010(results.data);
                break;
              case 2011:
                processRow2011(results.data);
                break;
              case 2012:
                processRow2012(results.data);
                break;
              case 2013:
                processRow2013(results.data);
                break;
              case 2014:
                processRow2014(results.data);
                break;
              case 2015:
                processRow2015To2018(results.data, year);
                break;
              case 2016:
                processRow2015To2018(results.data, year);
                break;
              case 2017:
                processRow2015To2018(results.data, year);
                break;
              case 2018:
                processRow2015To2018(results.data, year);
                break;
              case 2019:
                processRow2019To2024(results.data, year);
                break;
              case 2020:
                processRow2019To2024(results.data, year);
                break;
              case 2021:
                processRow2019To2024(results.data, year);
                break;
              case 2022:
                processRow2019To2024(results.data, year);
                break;
              case 2023:
                processRow2019To2024(results.data, year);
                break;
              case 2024:
                processRow2019To2024(results.data, year);
                break;
            }
          },
          complete: () => {
            const endWatch = process.hrtime(startWatch);
            console.log(`-- Completed data/original/recorridos_realizados_${year}.csv (took ${endWatch[0]}s)`);
            resolve(); // Resolve the promise here
          },
          error: (error) => {
            console.warn(`Error parsing data/original/recorridos_realizados_${year}.csv: ${error.message}`);
            console.error(error)
            reject(error); // Reject the promise here
          }
        };
        const read = fs.createReadStream(filePath);
        PapaParse.parse(read, config);
      });

    } catch (err) {
      console.warn(`Error reading data/original/recorridos_realizados_${year}.csv: ${err.message}`);
      console.error(err)
    }

    // after processing the file, write the csv file in chunks to avoid memory issues.
    const chunkSize = 750000;
    // let chunkIndex = 0;
    let chunk = [];
    let chunkCount = 0;

    for (let i = 0; i < csvJson.length; i++) {
      chunk.push(csvJson[i]);
      if (chunk.length === chunkSize) {
        chunkCount++;
        const chunkFilePath = path.resolve(__dirname, `data/trips_master_${year}_${chunkCount}.csv`);
        const csv = PapaParse.unparse(chunk);
        fs.writeFileSync(chunkFilePath, csv);
        chunk = [];
      }
    }

    // write the last chunk
    if (chunk.length > 0) {
      chunkCount++;
      const chunkFilePath = path.resolve(__dirname, `data/trips_master_${year}_${chunkCount}.csv`);
      const csv = PapaParse.unparse(chunk);
      fs.writeFileSync(chunkFilePath, csv);
    }

    // reset the csvJson array
    csvJson = [];
  }
}

async function main() {
  
  await loadStations();

  await processFiles();
  
  console.log('Done!');
  console.log('Stations Count: ', stations.length);
  console.log('Last row id: ', rowId - 1)
  console.log('Rows processed: ', rowsProcessed);
  console.log('Rows correct: ', rowsProcessed - rowsDiscarded)
  console.log('Rows discarded for incomplete data: ', rowsDiscarded);
  console.log('Rows with invalid stations: ', rowsWithInvalidStations);
  console.log('Rows incorrect', rowsDiscarded + rowsWithInvalidStations)
  console.log('Percentage of rows discarded: ', (rowsDiscarded / rowsProcessed) * 100, '%');
  console.log('Percentage of rows with invalid stations: ', (rowsWithInvalidStations / rowsProcessed) * 100, '%');
  console.log('Percentage of rows incorrect: ', ((rowsDiscarded + rowsWithInvalidStations) / rowsProcessed) * 100, '%');

  console.log('Done!');
  return 0;
}

main().catch(err => console.error(err));
