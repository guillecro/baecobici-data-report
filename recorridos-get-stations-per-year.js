/**
 * This script will read the recorridos_realizados_{year}.csv files and will get the stations per year.
 * Its designed to avoid duplicates, so if a station is already in the array, it will not be added again.
 */

const fs = require('fs');
const path = require('path');
const PapaParse = require('papaparse');

const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
// const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016];
// const years = [2013]

const csvJson = []

// In this array, each element will be an object with the following structure
// {  
//   year: 2010,  
//   station_id: ...,
//   station_name: ...,
//   station_lat: ...,
//   station_lon: ...,
//   station_address: ...,
// }

function processRow2010(row) {
  // Column names
  // id_estacion_origen
  // ----------------
  // nombre_estacion_origen
  // long_estacion_origen
  // lat_estacion_origen
  // domicilio_estacion_origen
  // id_estacion_destino
  // nombre_estacion_destino
  // long_estacion_destino
  // lat_estacion_destino
  // domicilio_estacion_destino

  // check if the row has null values
  const nullValues = Object.values(row).filter(value => value === null);
  if(nullValues.length > 0) {
    // skip this row
    return;
  }


  // check if the year & station is already in the array
  const stationExistsFromOrigin = csvJson.find(station => station.station_id === row.id_estacion_origen);
  
  if(!stationExistsFromOrigin) {
    csvJson.push({
      year: 2010,
      station_id: row.id_estacion_origen,
      station_name: row.nombre_estacion_origen,
      station_lat: row.lat_estacion_origen,
      station_lon: row.long_estacion_origen,
      station_address: row.domicilio_estacion_origen,
    })
  }

  const stationExistsFromDestination = csvJson.find(station => station.station_id === row.id_estacion_destino);
  
  if(!stationExistsFromDestination) {
    csvJson.push({
      year: 2010,
      station_id: row.id_estacion_destino,
      station_name: row.nombre_estacion_destino,
      station_lat: row.lat_estacion_destino,
      station_lon: row.long_estacion_destino,
      station_address: row.domicilio_estacion_destino,
    })
  }

}

function processRow2011(row) {
  // Column names
  // ----------------
  // id_estacion_origen
  // nombre_estacion_origen
  // long_estacion_origen
  // lat_estacion_origen
  // domicilio_estacion_origen
  // id_estacion_destino
  // nombre_estacion_destino
  // long_estacion_destino
  // lat_estacion_destino
  // domicilio_estacion_destino

  // check if the row has null values
  const nullValues = Object.values(row).filter(value => value === null);
  if(nullValues.length > 0) {
    // skip this row
    return;
  }


  // check if the year & station is already in the array
  const stationExistsFromOrigin = csvJson.find(station => station.station_id === row.id_estacion_origen);
  
  if(!stationExistsFromOrigin) {
    csvJson.push({
      year: 2011,
      station_id: row.id_estacion_origen,
      station_name: row.nombre_estacion_origen,
      station_lat: row.lat_estacion_origen,
      station_lon: row.long_estacion_origen,
      station_address: row.domicilio_estacion_origen,
    })
  }

  const stationExistsFromDestination = csvJson.find(station => station.station_id === row.id_estacion_destino);

  if(!stationExistsFromDestination) {
    csvJson.push({
      year: 2011,
      station_id: row.id_estacion_destino,
      station_name: row.nombre_estacion_destino,
      station_lat: row.lat_estacion_destino,
      station_lon: row.long_estacion_destino,
      station_address: row.domicilio_estacion_destino,
    })
  }
}

function processRow2012(row) {
  // Column names
  // ----------------
  // id_estacion_origen
  // nombre_estacion_origen
  // long_estacion_origen
  // lat_estacion_origen
  // domicilio_estacion_origen
  // id_estacion_destino
  // nombre_estacion_destino
  // long_estacion_destino
  // lat_estacion_destino
  // domicilio_estacion_destino

  // check if the row has null values
  const nullValues = Object.values(row).filter(value => value === null);
  if(nullValues.length > 0) {
    // skip this row
    return;
  }

  // check if the year & station is already in the array
  const stationExistsFromOrigin = csvJson.find(station => station.station_id === row.id_estacion_origen);
  
  if(!stationExistsFromOrigin) {
    csvJson.push({
      year: 2012,
      station_id: row.id_estacion_origen,
      station_name: row.nombre_estacion_origen,
      station_lat: row.lat_estacion_origen,
      station_lon: row.long_estacion_origen,
      station_address: row.domicilio_estacion_origen,
    })
  }

  const stationExistsFromDestination = csvJson.find(station => station.station_id === row.id_estacion_destino);

  if(!stationExistsFromDestination) {
    csvJson.push({
      year: 2012,
      station_id: row.id_estacion_destino,
      station_name: row.nombre_estacion_destino,
      station_lat: row.lat_estacion_destino,
      station_lon: row.long_estacion_destino,
      station_address: row.domicilio_estacion_destino,
    })
  }
}

function processRow2013(row) {
  // Column names
  // ----------------
  // id_estacion_origen
  // nombre_estacion_origen
  // long_estacion_origen
  // lat_estacion_origen
  // domicilio_estacion_origen
  // id_estacion_destino
  // nombre_estacion_destino
  // long_estacion_destino
  // lat_estacion_destino
  // domicilio_estacion_destino

  // check if the row has null values
  const nullValues = Object.values(row).filter(value => value === null);
  if(nullValues.length > 0) {
    // skip this row
    return;
  }

  // check if the year & station is already in the array
  const stationExistsFromOrigin = csvJson.find(station => station.station_id === row.id_estacion_origen);
  
  if(!stationExistsFromOrigin) {
    csvJson.push({
      year: 2013,
      station_id: row.id_estacion_origen,
      station_name: row.nombre_estacion_origen,
      station_lat: row.lat_estacion_origen,
      station_lon: row.long_estacion_origen,
      station_address: row.domicilio_estacion_origen,
    })
  }

  const stationExistsFromDestination = csvJson.find(station => station.station_id === row.id_estacion_destino);
  
  if(!stationExistsFromDestination) {
    csvJson.push({
      year: 2013,
      station_id: row.id_estacion_destino,
      station_name: row.nombre_estacion_destino,
      station_lat: row.lat_estacion_destino,
      station_lon: row.long_estacion_destino,
      station_address: row.domicilio_estacion_destino,
    })
  }
}

function processRow2014(row) {
  // Column names
  // ----------------
  // NOMBRE_ORIGEN
  // DESTINO_ESTACION

  // check if the row has null values
  const nullValues = Object.values(row).filter(value => value === null);

  if(nullValues.length > 0) {
    // skip this row
    return;
  }

  // check if the year & station is already in the array
  const stationExistsFromOrigin = csvJson.find(station => station.year === 2014 && station.station_name === row.NOMBRE_ORIGEN);
  
  if(!stationExistsFromOrigin) {
    csvJson.push({
      year: 2014,
      station_id: null,
      station_name: row.NOMBRE_ORIGEN,
      station_lat: null,
      station_lon: null,
      station_address: null,
    })
  }

  const stationExistsFromDestination = csvJson.find(station => station.year === 2014 && station.station_name === row.DESTINO_ESTACION);

  if(!stationExistsFromDestination) {
    csvJson.push({
      year: 2014,
      station_id: null,
      station_name: row.DESTINO_ESTACION,
      station_lat: null,
      station_lon: null,
      station_address: null,
    })
  }

}

function processRow2015(row) {
  // Column names:
  // ----------------
  // id_estacion_origen
  // nombre_estacion_origen
  // long_estacion_origen
  // lat_estacion_origen
  // domicilio_estacion_origen
  // id_estacion_destino
  // nombre_estacion_destino
  // long_estacion_destino
  // lat_estacion_destino
  // domicilio_estacion_destino

  // check if the row has null values
  const nullValues = Object.values(row).filter(value => value === null);
  if(nullValues.length > 0) {
    // skip this row
    return;
  }

  // check if the year & station is already in the array
  const stationExistsFromOrigin = csvJson.find(station => station.station_id === row.id_estacion_origen);

  if(!stationExistsFromOrigin) {
    csvJson.push({
      year: 2015,
      station_id: row.id_estacion_origen,
      station_name: row.nombre_estacion_origen,
      station_lat: row.lat_estacion_origen,
      station_lon: row.long_estacion_origen,
      station_address: row.domicilio_estacion_origen,
    })
  }

  const stationExistsFromDestination = csvJson.find(station => station.station_id === row.id_estacion_destino);

  if(!stationExistsFromDestination) {
    csvJson.push({
      year: 2015,
      station_id: row.id_estacion_destino,
      station_name: row.nombre_estacion_destino,
      station_lat: row.lat_estacion_destino,
      station_lon: row.long_estacion_destino,
      station_address: row.domicilio_estacion_destino,
    })
  }


}

function processRow2016(row) {
  // Column names
  // ----------------
  // id_estacion_origen
  // nombre_estacion_origen
  // long_estacion_origen
  // lat_estacion_origen
  // domicilio_estacion_origen
  // id_estacion_destino
  // nombre_estacion_destino
  // long_estacion_destino
  // lat_estacion_destino
  // domicilio_estacion_destino

  // check if the row has null values
  const nullValues = Object.values(row).filter(value => value === null);
  if(nullValues.length > 0) {
    // skip this row
    return;
  }

  // check if the year & station is already in the array
  const stationExistsFromOrigin = csvJson.find(station => station.station_id === row.id_estacion_origen);
  
  if(!stationExistsFromOrigin) {
    csvJson.push({
      year: 2016,
      station_id: row.id_estacion_origen,
      station_name: row.nombre_estacion_origen,
      station_lat: row.lat_estacion_origen,
      station_lon: row.long_estacion_origen,
      station_address: row.domicilio_estacion_origen,
    })
  }

  const stationExistsFromDestination = csvJson.find(station => station.station_id === row.id_estacion_destino);

  if(!stationExistsFromDestination) {
    csvJson.push({
      year: 2016,
      station_id: row.id_estacion_destino,
      station_name: row.nombre_estacion_destino,
      station_lat: row.lat_estacion_destino,
      station_lon: row.long_estacion_destino,
      station_address: row.domicilio_estacion_destino,
    })
  }

}

function processRow2017(row) {
  // Column names
  // ----------------
  // id_estacion_origen
  // nombre_estacion_origen
  // long_estacion_origen
  // lat_estacion_origen
  // domicilio_estacion_origen
  // id_estacion_destino
  // nombre_estacion_destino
  // long_estacion_destino
  // lat_estacion_destino
  // domicilio_estacion_destino

  // check if the row has null values
  const nullValues = Object.values(row).filter(value => value === null);
  if(nullValues.length > 0) {
    // skip this row
    return;
  }
  
  // check if the year & station is already in the array
  const stationExistsFromOrigin = csvJson.find(station => station.station_id === row.id_estacion_origen);
  
  if(!stationExistsFromOrigin) {
    csvJson.push({
      year: 2017,
      station_id: row.id_estacion_origen,
      station_name: row.nombre_estacion_origen,
      station_lat: row.lat_estacion_origen,
      station_lon: row.long_estacion_origen,
      station_address: row.domicilio_estacion_origen,
    })
  }

  const stationExistsFromDestination = csvJson.find(station => station.station_id === row.id_estacion_destino);

  if(!stationExistsFromDestination) {
    csvJson.push({
      year: 2017,
      station_id: row.id_estacion_destino,
      station_name: row.nombre_estacion_destino,
      station_lat: row.lat_estacion_destino,
      station_lon: row.long_estacion_destino,
      station_address: row.domicilio_estacion_destino,
    })
  }

}

function processRow2018(row) {
  // Column names
  // ----------------
  // id_estacion_origen
  // nombre_estacion_origen
  // long_estacion_origen
  // lat_estacion_origen
  // domicilio_estacion_origen
  // id_estacion_destino
  // nombre_estacion_destino
  // long_estacion_destino
  // lat_estacion_destino
  // domicilio_estacion_destino

  // check if the row has null values
  const nullValues = Object.values(row).filter(value => value === null);

  if(nullValues.length > 0) {
    // skip this row
    return;
  }

  // check if the year & station is already in the array
  const stationExistsFromOrigin = csvJson.find(station => station.station_id === row.id_estacion_origen);
  
  if(!stationExistsFromOrigin) {
    csvJson.push({
      year: 2018,
      station_id: row.id_estacion_origen,
      station_name: row.nombre_estacion_origen,
      station_lat: row.lat_estacion_origen,
      station_lon: row.long_estacion_origen,
      station_address: row.domicilio_estacion_origen,
    })
  }

  const stationExistsFromDestination = csvJson.find(station => station.station_id === row.id_estacion_destino);

  if(!stationExistsFromDestination) {
    csvJson.push({
      year: 2018,
      station_id: row.id_estacion_destino,
      station_name: row.nombre_estacion_destino,
      station_lat: row.lat_estacion_destino,
      station_lon: row.long_estacion_destino,
      station_address: row.domicilio_estacion_destino,
    })
  }

}

function processRow2019(row) {
  // Column names
  // ----------------
  // id_estacion_origen
  // nombre_estacion_origen
  // long_estacion_origen
  // lat_estacion_origen
  // direccion_estacion_origen
  // id_estacion_destino
  // nombre_estacion_destino
  // long_estacion_destino
  // lat_estacion_destino
  // direccion_estacion_destino

  // NOTE 1) the column lat_estacion_* is a string with format "lat,lon", so we need to split it to get the lat and lon values
  // NOTE 2) the column lon is actually the lat, so we need to swap the values

  // check if the row has null values
  const nullValues = Object.values(row).filter(value => value === null);

  if(nullValues.length > 0) {
    // skip this row
    return;
  }

  // check if the year & station is already in the array
  const stationExistsFromOrigin = csvJson.find(station => station.station_id === row.id_estacion_origen);

  if(!stationExistsFromOrigin) {
    // check if is a string or a number, if a string, split it
    csvJson.push({
      year: 2019,
      station_id: row.id_estacion_origen,
      station_name: row.nombre_estacion_origen,
      station_lat: typeof row.lat_estacion_origen === 'string' ? Number(row.lat_estacion_origen.split(',')[0]) : row.lat_estacion_origen,
      station_lon: typeof row.lat_estacion_origen === 'string' ? Number(row.lat_estacion_origen.split(',')[1]) : row.long_estacion_origen,
      station_address: row.direccion_estacion_origen,
    })
  }

  const stationExistsFromDestination = csvJson.find(station => station.station_id === row.id_estacion_destino);

  if(!stationExistsFromDestination) {
    csvJson.push({
      year: 2019,
      station_id: row.id_estacion_destino,
      station_name: row.nombre_estacion_destino,
      station_lat: typeof row.lat_estacion_destino === 'string' ? Number(row.lat_estacion_destino.split(',')[0]) : row.lat_estacion_destino,
      station_lon: typeof row.lat_estacion_destino === 'string' ? Number(row.lat_estacion_destino.split(',')[1]) : row.long_estacion_destino,
      station_address: row.direccion_estacion_destino,
    })
  }
}

function processRow2020(row) {
  // Column names
  // ----------------
  // id_estacion_origen
  // nombre_estacion_origen
  // long_estacion_origen
  // lat_estacion_origen
  // direccion_estacion_origen
  // id_estacion_destino
  // nombre_estacion_destino
  // long_estacion_destino
  // lat_estacion_destino
  // direccion_estacion_destino


  // NOTE 1) the column lat_estacion_*, is a string. SOME values are correct, and others are with format "lat,lon", those values we need to split it to get the lat and lon values
  // NOTE 2) the column lon is actually the lat, so we need to swap the values

  // check if the row has null values
  const nullValues = Object.values(row).filter(value => value === null);

  if(nullValues.length > 0) {
    // skip this row
    return;
  }

  // check if the year & station is already in the array
  const stationExistsFromOrigin = csvJson.find(station => station.station_id === row.id_estacion_origen);
  
  if(!stationExistsFromOrigin) {
    const latOrigin = typeof row.lat_estacion_origen === 'string' ? Number(row.lat_estacion_origen.split(',')[0]) : row.lat_estacion_origen;
    const lonOrigin = typeof row.lat_estacion_origen === 'string' ? Number(row.lat_estacion_origen.split(',')[1]) : row.long_estacion_origen;

    csvJson.push({
      year: 2020,
      station_id: row.id_estacion_origen,
      station_name: row.nombre_estacion_origen,
      station_lat:  latOrigin,
      station_lon: lonOrigin,
      station_address: row.direccion_estacion_origen,
    })
  }

  const stationExistsFromDestination = csvJson.find(station => station.station_id === row.id_estacion_destino);

  if(!stationExistsFromDestination) {
    const latDestination = typeof row.lat_estacion_destino === 'string' ? Number(row.lat_estacion_destino.split(',')[0]) : row.lat_estacion_destino;
    const lonDestination = typeof row.lat_estacion_destino === 'string' ? Number(row.lat_estacion_destino.split(',')[1]) : row.long_estacion_destino;
    csvJson.push({
      year: 2020,
      station_id: row.id_estacion_destino,
      station_name: row.nombre_estacion_destino,
      station_lat: latDestination,
      station_lon: lonDestination,
      station_address: row.direccion_estacion_destino,
    })
  }
}

function processRow2021(row) {
    // Column names
  // ----------------
  // id_estacion_origen
  // nombre_estacion_origen
  // long_estacion_origen
  // lat_estacion_origen
  // direccion_estacion_origen
  // id_estacion_destino
  // nombre_estacion_destino
  // long_estacion_destino
  // lat_estacion_destino
  // direccion_estacion_destino

  // check if the row has null values
  const nullValues = Object.values(row).filter(value => value === null);

  if(nullValues.length > 0) {
    // skip this row
    return;
  }

  // check if the year & station is already in the array
  const stationExistsFromOrigin = csvJson.find(station => station.station_id === row.id_estacion_origen);

  if(!stationExistsFromOrigin) {
    const latOrigin = typeof row.lat_estacion_origen === 'string' ? Number(row.lat_estacion_origen.split(',')[0]) : row.lat_estacion_origen;
    const lonOrigin = typeof row.lat_estacion_origen === 'string' ? Number(row.lat_estacion_origen.split(',')[1]) : row.long_estacion_origen;
    csvJson.push({
      year: 2021,
      station_id: row.id_estacion_origen,
      station_name: row.nombre_estacion_origen,
      station_lat: latOrigin,
      station_lon: lonOrigin,
      station_address: row.direccion_estacion_origen,
    })
  }

  const stationExistsFromDestination = csvJson.find(station => station.station_id === row.id_estacion_destino);

  if(!stationExistsFromDestination) {
    const latDestination = typeof row.lat_estacion_destino === 'string' ? Number(row.lat_estacion_destino.split(',')[0]) : row.lat_estacion_destino;
    const lonDestination = typeof row.lat_estacion_destino === 'string' ? Number(row.lat_estacion_destino.split(',')[1]) : row.long_estacion_destino;
    csvJson.push({
      year: 2021,
      station_id: row.id_estacion_destino,
      station_name: row.nombre_estacion_destino,
      station_lat: latDestination,
      station_lon: lonDestination,
      station_address: row.direccion_estacion_destino,
    })
  }
}

function processRow2022(row) {
    // Column names
  // ----------------
  // id_estacion_origen
  // nombre_estacion_origen
  // long_estacion_origen
  // lat_estacion_origen
  // direccion_estacion_origen
  // id_estacion_destino
  // nombre_estacion_destino
  // long_estacion_destino
  // lat_estacion_destino
  // direccion_estacion_destino

  // check if the row has null values
  const nullValues = Object.values(row).filter(value => value === null);

  if(nullValues.length > 0) {
    // skip this row
    return;
  }

  // check if the year & station is already in the array
  const stationExistsFromOrigin = csvJson.find(station => station.station_id === row.id_estacion_origen);

  if(!stationExistsFromOrigin) {
    csvJson.push({
      year: 2022,
      station_id: row.id_estacion_origen,
      station_name: row.nombre_estacion_origen,
      station_lat: row.lat_estacion_origen,
      station_lon: row.long_estacion_origen,
      station_address: row.direccion_estacion_origen,
    })
  }

  const stationExistsFromDestination = csvJson.find(station => station.station_id === row.id_estacion_destino);

  if(!stationExistsFromDestination) {
    csvJson.push({
      year: 2022,
      station_id: row.id_estacion_destino,
      station_name: row.nombre_estacion_destino,
      station_lat: row.lat_estacion_destino,
      station_lon: row.long_estacion_destino,
      station_address: row.direccion_estacion_destino,
    })
  }
}

function processRow2023(row) {
    // Column names
  // ----------------
  // id_estacion_origen
  // nombre_estacion_origen
  // long_estacion_origen
  // lat_estacion_origen
  // direccion_estacion_origen
  // id_estacion_destino
  // nombre_estacion_destino
  // long_estacion_destino
  // lat_estacion_destino
  // direccion_estacion_destino

  // check if the row has null values
  const nullValues = Object.values(row).filter(value => value === null);

  if(nullValues.length > 0) {
    // skip this row
    return;
  }

  // check if the year & station is already in the array
  const stationExistsFromOrigin = csvJson.find(station => station.station_id === row.id_estacion_origen);

  if(!stationExistsFromOrigin) {
    csvJson.push({
      year: 2023,
      station_id: row.id_estacion_origen,
      station_name: row.nombre_estacion_origen,
      station_lat: row.lat_estacion_origen,
      station_lon: row.long_estacion_origen,
      station_address: row.direccion_estacion_origen,
    })
  }

  const stationExistsFromDestination = csvJson.find(station => station.station_id === row.id_estacion_destino);

  if(!stationExistsFromDestination) {
    csvJson.push({
      year: 2023,
      station_id: row.id_estacion_destino,
      station_name: row.nombre_estacion_destino,
      station_lat: row.lat_estacion_destino,
      station_lon: row.long_estacion_destino,
      station_address: row.direccion_estacion_destino,
    })
  }
}

function processRow2024(row) {
    // Column names
  // ----------------
  // id_estacion_origen
  // nombre_estacion_origen
  // long_estacion_origen
  // lat_estacion_origen
  // direccion_estacion_origen
  // id_estacion_destino
  // nombre_estacion_destino
  // long_estacion_destino
  // lat_estacion_destino
  // direccion_estacion_destino

  // check if the row has null values
  const nullValues = Object.values(row).filter(value => value === null);

  if(nullValues.length > 0) {
    // skip this row
    return;
  }

  // check if the year & station is already in the array
  const stationExistsFromOrigin = csvJson.find(station => station.station_id === row.id_estacion_origen);

  if(!stationExistsFromOrigin) {
    csvJson.push({
      year: 2024,
      station_id: row.id_estacion_origen,
      station_name: row.nombre_estacion_origen,
      station_lat: row.lat_estacion_origen,
      station_lon: row.long_estacion_origen,
      station_address: row.direccion_estacion_origen,
    })
  }

  // const stationExistsFromDestination = csvJson.find(station => station.station_id === row.id_estacion_destino && station.station_name === row.nombre_estacion_destino);
  const stationExistsFromDestination = csvJson.find(station => station.station_id === row.id_estacion_destino);

  if(!stationExistsFromDestination) {
    csvJson.push({
      year: 2024,
      station_id: row.id_estacion_destino,
      station_name: row.nombre_estacion_destino,
      station_lat: row.lat_estacion_destino,
      station_lon: row.long_estacion_destino,
      station_address: row.direccion_estacion_destino,
    })
  }
}


async function processFiles() {
  // const yearsReversed = years.reverse();
  // for (let i = 0; i < yearsReversed.length; i++) {
  //   const year = yearsReversed[i];
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
                processRow2015(results.data);
                break;
              case 2016:
                processRow2016(results.data);
                break;
              case 2017:
                processRow2017(results.data);
                break;
              case 2018:
                processRow2018(results.data);
                break;
              case 2019:
                processRow2019(results.data);
                break;
              case 2020:
                processRow2020(results.data);
                break;
              case 2021:
                processRow2021(results.data);
                break;
              case 2022:
                processRow2022(results.data);
                break;
              case 2023:
                processRow2023(results.data);
                break;
              case 2024:
                processRow2024(results.data);
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
  }
}

async function main() {
  await processFiles();
  
  console.log('Done!');
  console.log('Stations Count: ', csvJson.length);

  // save a csv using papaparse
  // const csv = PapaParse.unparse(csvJson, { header: true });
  // await fs.promises.writeFile(path.resolve(__dirname, 'recorridos-get-stations-per-year.csv'), csv);

  // console.log('Done! Writing recorridos-get-stations-per-year.json');
  // await fs.promises.writeFile('data/recorridos-get-stations-per-year.json', JSON.stringify(csvJson, null, 2));

  const csv = PapaParse.unparse(csvJson);

  console.log('Done! Saving file...')
  
  await fs.promises.writeFile('data/recorridos_get_stations_per_year.csv', csv);

  return 0;
}

main().catch(err => console.error(err));
