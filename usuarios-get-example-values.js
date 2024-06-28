/**
 * Script that generates a list of example values taken from each
 * usuario_ecobici_{year}.csv file, to analize the different data types and formats
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

// In this object we will store, for each year, an array of 3 random values for each column
const valuesPerYear = {};

async function getExampleValues() {
  for (let i = 0; i < years.length; i++) {
    
    const startWatch = process.hrtime();
    const year = years[i];
    const filePath = path.resolve(__dirname, `data/original/usuarios_ecobici_${year}.csv`);

    try {  
      const fileStream = fs.createReadStream(filePath);
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });

      console.log(`Processing usuarios_ecobici_${year}.csv`)

      // count and process the first row as the column names
      let rowCount = 0;
      let firstRow = true;
      let columnNames = [];
      valuesPerYear[year] = {};
      for await (const line of rl) {
        rowCount++;
        if (firstRow) {
          // read the first row to get the column names, remove the quotes if present
          columnNames = line.replace(/"/g, '').split(',');
          // add at the beginning of the array of column names the number of the year
          columnNames.unshift('year');
          for (let i = 0; i < columnNames.length; i++) {
            columnNames[i] = columnNames[i]
            // add the column name to the object, with an empty array
            valuesPerYear[year][columnNames[i]] = [];
          }
          firstRow = false;
        }
      }
      
      // get 3 random values for each column
      const randomRows = [];
      for (let i = 0; i < 3; i++) {
        const randomRow = Math.floor(Math.random() * rowCount) + 1; // +1 to skip the header row
        randomRows.push(randomRow);
      }

      // read the file again to get the values
      const fileStream2 = fs.createReadStream(filePath);
      const rl2 = readline.createInterface({
        input: fileStream2,
        crlfDelay: Infinity
      });

      let currentRow = 0;
      for await (const line of rl2) {
        currentRow++;
        if (randomRows.includes(currentRow)) {
          const values = line.replace(/"/g, '').split(',');
          // add the year at the beginning of the array of values
          values.unshift(year);
          for (let i = 0; i < columnNames.length; i++) {
            valuesPerYear[year][columnNames[i]].push(values[i]);
          }
        }
      }

      const endWatch = process.hrtime(startWatch);
      console.log(`-- Completed usuarios_ecobici_${year}.csv (took ${endWatch[0]}s)`);

    } catch (err) {
      console.warn(`Error reading usuarios_ecobici_${year}.csv: ${err.message}`);
      console.error(err); 
    }
  }
}


async function main() {
  await getExampleValues();
  console.log('done');

  console.table(valuesPerYear);

  await fs.promises.writeFile('data/usuarios-get-example-values.json', JSON.stringify(valuesPerYear, null, 2));
  return 0;
}

main().catch(err => console.error(err));