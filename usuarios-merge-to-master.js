/**
 * This script will read the usuarios_ecobici_{year}.csv files and will get the stations per year.
 * Its designed to avoid duplicates, so if a station is already in the array, it will not be added again.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const PapaParse = require('papaparse');
const dayjs = require('dayjs');

const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

const csvJson = []

// Keys to be used in the final JSON
// id, genre, age (int), age_out_of_tos (bool), age_out_of_bounds (bool), created_at, has_dni 

function convertDateTime2015To2018(input) {
  // Split the input into date and time components
  let [datePart, timePart, meridian] = input.split(' ');

  // Split the date component
  let [day, month, year] = datePart.split('-');

  // Split the time component
  let [hours, minutes, seconds] = timePart.split(':');

  // Convert the hour to 24-hour format based on AM/PM
  if (meridian === 'PM' && hours !== '12') {
      hours = (parseInt(hours) + 12).toString();
  } else if (meridian === 'AM' && hours === '12') {
      hours = '00';
  }

  // Format year to 4 digits if it is 2 digits
  if (year.length === 2) {
      year = '20' + year;
  }

  // Construct the new datetime string
  const newDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
  return newDateTime;
}

function getGenreByLetter2015to2018(letter) {
  switch(letter) {
    case 'F':
      return 'female'
    case 'M':
      return 'male'
    case 'O':
      return 'other'
    case 'NA':
      return null
    default:
      return null
  }
}

function getGenre2019to2024(genre) {
  // Values found are MALE, FEMALE, OTHER and blanks (null)
  // For blanks, return null
  switch(genre) {
    case 'FEMALE':
      return 'female'
    case 'MALE':
      return 'male'
    case 'OTHER':
      return 'other'
    case null:
      return null
    default:
      return null
  }
}

function getAge(age){
  // check if the age can be converted to a number
  if (isNaN(age)) {
    return null;
  }
  return age;
}

function getAgeOutOfBounds(age) {
  if(isNaN(age)) {
    return 1 //false;
  }
  // check if the age is out of bounds
  if (age < 0 || age > 100) {
    return 1 //false;
  }
  return 0 //false;
}

function getAgeOutOfToS(age) {
  if(isNaN(age)) {
    return 1 //false;
  }
  // check if the age is suspicious
  if (age < 16 || age > 100) {
    return 1 //false;
  }
  return 0 //false;
}

function getCustomerHasDni(hasDni) {
  // Possible values are Yes, No and null
  switch(hasDni) {
    case 'Yes':
      return 1 //false
    case 'No':
      return 0 //false
    case null:
      return null
    default:
      return null
  }
}


function processRow2015(row) {
  // columns available
  // -----------------
  // id_usuario
  // genero_usuario
  // edad_usuario
  // fecha_alta
  // hora_alta
 
  csvJson.push({
    user_id: Number(row.id_usuario),
    year: 2015,
    genre: getGenreByLetter2015to2018(row.genero_usuario),
    age: getAge(row.edad_usuario),
    age_out_of_tos: getAgeOutOfToS(row.edad_usuario),
    age_out_of_bounds: getAgeOutOfBounds(row.edad_usuario),
    created_at: convertDateTime2015To2018(`${row.fecha_alta} ${row.hora_alta}`),
    has_dni: null
  })
}

function processRow2016(row) {
  // columns available
  // -----------------
  // id_usuario
  // genero_usuario
  // edad_usuario
  // fecha_alta
  // hora_alta

  csvJson.push({
    user_id: Number(row.id_usuario),
    year: 2016,
    genre: getGenreByLetter2015to2018(row.genero_usuario),
    age: getAge(row.edad_usuario),
    age_out_of_tos: getAgeOutOfToS(row.edad_usuario),
    age_out_of_bounds: getAgeOutOfBounds(row.edad_usuario),
    has_dni: null,
    created_at: convertDateTime2015To2018(`${row.fecha_alta} ${row.hora_alta}`)
  })
 
}

function processRow2017(row) {
  // columns available
  // -----------------
  // id_usuario
  // genero_usuario
  // edad_usuario
  // fecha_alta
  // hora_alta

  csvJson.push({
    user_id: Number(row.id_usuario),
    year: 2017,
    genre: getGenreByLetter2015to2018(row.genero_usuario),
    age: getAge(row.edad_usuario),
    age_out_of_tos: getAgeOutOfToS(row.edad_usuario),
    age_out_of_bounds: getAgeOutOfBounds(row.edad_usuario),
    has_dni: null,
    created_at: convertDateTime2015To2018(`${row.fecha_alta} ${row.hora_alta}`),
  })
}

function processRow2018(row) {
  // columns available
  // -----------------
  // id_usuario
  // genero_usuario
  // edad_usuario
  // fecha_alta
  // hora_alta

  csvJson.push({
    user_id: Number(row.id_usuario),
    year: 2018,
    genre: getGenreByLetter2015to2018(row.genero_usuario),
    age: getAge(row.edad_usuario),
    age_out_of_tos: getAgeOutOfToS(row.edad_usuario),
    age_out_of_bounds: getAgeOutOfBounds(row.edad_usuario),
    has_dni: null,
    created_at: convertDateTime2015To2018(`${row.fecha_alta} ${row.hora_alta}`)
  })
}

function processRow2019(row) {
  // columns available
  // -----------------
  // ID_usuario
  // genero_usuario
  // edad_usuario
  // fecha_alta
  // hora_alta
  
  csvJson.push({
    user_id: Number(row.ID_usuario),
    year: 2019,
    genre: getGenre2019to2024(row.genero_usuario),
    age: getAge(row.edad_usuario),
    age_out_of_tos: getAgeOutOfToS(row.edad_usuario),
    age_out_of_bounds: getAgeOutOfBounds(row.edad_usuario),
    has_dni: null,
    created_at: dayjs(`${row.fecha_alta} ${row.hora_alta}`).format(),
  })
}

function processRow2020(row) {
  // columns available
  // -----------------
  // ID_usuario
  // genero_usuario
  // edad_usuario
  // fecha_alta
  // hora_alta
  // Customer.Has.Dni..Yes...No.

  csvJson.push({
    user_id: Number(row.ID_usuario),
    year: 2020,
    genre: getGenre2019to2024(row.genero_usuario),
    age: getAge(row.edad_usuario),
    age_out_of_tos: getAgeOutOfToS(row.edad_usuario),
    age_out_of_bounds: getAgeOutOfBounds(row.edad_usuario),
    has_dni: getCustomerHasDni(row['Customer.Has.Dni..Yes...No.']),
    created_at: dayjs(`${row.fecha_alta} ${row.hora_alta}`).format(),
  })
}

function processRow2021(row) {
  // columns available
  // -----------------
  // ID_usuario
  // genero_usuario
  // edad_usuario
  // fecha_alta
  // hora_alta
  // Customer.Has.Dni..Yes...No.

  csvJson.push({
    user_id: Number(row.ID_usuario),
    year: 2021,
    genre: getGenre2019to2024(row.genero_usuario),
    age: getAge(row.edad_usuario),
    age_out_of_tos: getAgeOutOfToS(row.edad_usuario),
    age_out_of_bounds: getAgeOutOfBounds(row.edad_usuario),
    has_dni: getCustomerHasDni(row['Customer.Has.Dni..Yes...No.']),
    created_at: dayjs(`${row.fecha_alta} ${row.hora_alta}`).format(),
  })
  
}

function processRow2022(row) {
  // columns available
  // -----------------
  // ID_usuario
  // genero_usuario
  // edad_usuario
  // fecha_alta
  // hora_alta
  // Customer.Has.Dni..Yes...No.

  csvJson.push({
    user_user_id: Number(row.ID_usuario),
    year: 2022,
    genre: getGenre2019to2024(row.genero_usuario),
    age: getAge(row.edad_usuario),
    age_out_of_tos: getAgeOutOfToS(row.edad_usuario),
    age_out_of_bounds: getAgeOutOfBounds(row.edad_usuario),
    has_dni: getCustomerHasDni(row['Customer.Has.Dni..Yes...No.']),
    created_at: dayjs(`${row.fecha_alta} ${row.hora_alta}`).format(),
  })
}

function processRow2023(row) {
  // columns available
  // -----------------
  // ID_usuario
  // genero_usuario
  // edad_usuario
  // fecha_alta
  // hora_alta
  // Customer.Has.Dni..Yes...No.

  csvJson.push({
    user_id: Number(row.ID_usuario),
    year: 2023,
    genre: getGenre2019to2024(row.genero_usuario),
    age: getAge(row.edad_usuario),
    age_out_of_tos: getAgeOutOfToS(row.edad_usuario),
    age_out_of_bounds: getAgeOutOfBounds(row.edad_usuario),
    has_dni: getCustomerHasDni(row['Customer.Has.Dni..Yes...No.']),
    created_at: dayjs(`${row.fecha_alta} ${row.hora_alta}`).format(),
  })
}

function processRow2024(row) {
  // columns available
  // -----------------
  // ID_usuario
  // genero_usuario
  // edad_usuario
  // fecha_alta
  // hora_alta
  // Customer.Has.Dni..Yes...No.

  csvJson.push({
    user_id: Number(row.ID_usuario),
    year: 2024,
    genre: getGenre2019to2024(row.genero_usuario),
    age: getAge(row.edad_usuario),
    age_out_of_tos: getAgeOutOfToS(row.edad_usuario),
    age_out_of_bounds: getAgeOutOfBounds(row.edad_usuario),
    created_at: dayjs(`${row.fecha_alta} ${row.hora_alta}`).format(),
    has_dni: getCustomerHasDni(row['Customer.Has.Dni..Yes...No.'])
  })
}


async function processFiles() {
  // const yearsReversed = years.reverse();
  // for (let i = 0; i < yearsReversed.length; i++) {
  //   const year = yearsReversed[i];
  for (let i = 0; i < years.length; i++) {
    const year = years[i];
    const filePath = path.resolve(__dirname, `data/usuarios_ecobici_${year}.csv`);

    try {
      // get time to process the file
      const startWatch = process.hrtime();

      console.log(`Processing usuarios_ecobici_${year}.csv`)
      
      // for this type of files, we will use PapaParse to read the file, to have a more relaiable way to get the json value per column

      await new Promise((resolve, reject) => {
        const config = {
          header: true,
          dynamicTyping: true,
          worker: true,
          step: function(results, parser) {

            switch(year) {
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
            console.log(`-- Completed usuarios_ecobici_${year}.csv (took ${endWatch[0]}s)`);
            resolve(); // Resolve the promise here
          },
          error: (error) => {
            console.warn(`Error parsing usuarios_ecobici_${year}.csv: ${error.message}`);
            console.error(error)
            reject(error); // Reject the promise here
          }
        };
        const read = fs.createReadStream(filePath);
        PapaParse.parse(read, config);
      });

    } catch (err) {
      console.warn(`Error reading usuarios_ecobici_${year}.csv: ${err.message}`);
      console.error(err)
    }
  }
}

async function main() {
  await processFiles();

  
  console.log('Done!');
  console.log('Users count: ', csvJson.length);
  // console.log('Done! Writing usuarios-ecobici-final.json');
  // await fs.promises.writeFile('usuarios-ecobici-final.json', JSON.stringify(csvJson, null, 2));

  // save the file in a csv
  const csv = PapaParse.unparse(csvJson, {
    
  });
  await fs.promises.writeFile('data/users_master.csv', csv);

  return 0;
}

main().catch(err => console.error(err));

