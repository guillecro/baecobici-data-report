/**
 * Script that generates a list of example values taken from each
 * recorridos_realizados_{year}.csv file, to analize the different data types and formats
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const PapaParse = require('papaparse');

const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

// In this object we will store, for each year, an array of 3 random values for each column
const valuesPerYear = {};

async function getExampleValues() {
  for (let i = 0; i < years.length; i++) {
    const year = years[i];
    const filePath = path.resolve(__dirname, `recorridos_realizados_${year}.csv`);

    try {
      console.log(`Processing data/original/recorridos_realizados_${year}.csv`)
      
      const fileStream = fs.createReadStream(filePath);
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });


      // count amount of rows
      let rowCount = 0;
      for await (const line of rl) {
        rowCount++;
      }
      
      console.log(rowCount)

      // get 3 random values for each column
      const randomRows = [];
      for (let i = 0; i < 3; i++) {
        const randomRow = Math.floor(Math.random() * rowCount) + 1; // +1 to skip the header row
        randomRows.push(randomRow);
      }

      // sort the array of numbers
      randomRows.sort((a, b) => a - b);
      console.log(randomRows)

      // for this type of files, we will use PapaParse to read the file, to have a more relaiable way to get the json value per column

      let currentRow = 1;
      let columnNames = [];
      let columnNamesDefined = false;

      await new Promise((resolve, reject) => {
        const config = {
          header: true,
          dynamicTyping: true,
          worker: true,
          step: function(results, parser) {
            if(!columnNamesDefined) {
              columnNames = results.meta.fields; // array of column names
              columnNamesDefined = true;
              // add to valuesPerYear[year] object the column names as key and values as empty arrays
              valuesPerYear[year] = {};
              for (let i = 0; i < columnNames.length; i++) {
                const columnName = columnNames[i];
                valuesPerYear[year][columnName] = [];
              }
              // console.log(columnNames)
              
            }
  
            if (randomRows.includes(currentRow)) {
              // remove the currentRow from the array
              randomRows.shift();
              // add the values to the valuesPerYear object
              for (let i = 0; i < columnNames.length; i++) {
                const columnName = columnNames[i];
                if (columnName === 'year') {
                  valuesPerYear[year][columnName].push(year);
                } else {
                  valuesPerYear[year][columnName].push(results.data[columnName] || null);
                }
              }

              // if there are no more randomRows, stop the parser
              if (randomRows.length === 0) {
                parser.abort();
              }
            }
            currentRow++;
          },
          complete: () => {
            console.log(`-- Completed data/original/recorridos_realizados_${year}.csv`);
            resolve(); // Resolve the promise here
          },
          error: (error) => {
            console.warn(`Error parsing data/original/recorridos_realizados_${year}.csv: ${error.message}`);
            reject(error); // Reject the promise here
          }
        };
        const read = fs.createReadStream(filePath);
        PapaParse.parse(read, config);
      });

    } catch (err) {
      console.warn(`Error reading data/original/recorridos_realizados_${year}.csv: ${err.message}`);
    }
  }
}

async function main() {
  await getExampleValues();
  console.log('done');
  await fs.promises.writeFile('data/recorridos_get_example_values.json', JSON.stringify(valuesPerYear, null, 2));
  return 0;
}

main().catch(err => console.error(err));
