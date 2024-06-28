/**
 * Script that generates a CSV from a json, with the following structure:
 * year | columns... | null_count
 * 
 */

const fs = require('fs');
const path = require('path');
const PapaParse = require('papaparse');

const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

// In this array, each element will be an object with the following structure
// {  
//   year: 2010,  
//   column: 'column_name',
//   null_count: 0,
//   empty_string_count: 0,
// }
const csvJson = []

async function processFiles() {
  for (let i = 0; i < years.length; i++) {
    const year = years[i];
    const filePath = path.resolve(__dirname, `data/original/recorridos_realizados_${year}.csv`);

    try {
      // get time to process the file
      const startWatch = process.hrtime();

      console.log(`Processing data/original/recorridos_realizados_${year}.csv`)
      
      // for this type of files, we will use PapaParse to read the file, to have a more relaiable way to get the json value per column

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
              columnNamesDefined = true; // only do this once

              for(let i = 0; i < columnNames.length; i++) {
                const column = columnNames[i];
                csvJson.push({
                  year: year,
                  column_name: column,
                  null_count: 0,
                  empty_string_count: 0,
                  row_count: 0,
                  null_rate: 0,
                })
              }
            }

            // process the row
            for (let i = 0; i < columnNames.length; i++) {
              const column = columnNames[i];
              // find the year and column in the csvJson array
              const row = csvJson.find(row => row.year === year && row.column_name === column);
              // check if the value is null or empty string
              if(results.data[column] === null) {
                row.null_count++;
              }
              // check if the value is an empty string
              if(results.data[column] === '') {
                row.empty_string_count++;
              }
              // increment the row count
              row.row_count++;
            }
          },
          complete: () => {
            const endWatch = process.hrtime(startWatch);
            console.log(`-- Completed data/original/recorridos_realizados_${year}.csv (took ${endWatch[0]}s)`);
            resolve(); // Resolve the promise here
          },
          error: (error) => {
            console.warn(`Error parsing data/original/recorridos_realizados_${year}.csv: ${error.message}`);
            reject(error); // Reject the promise here
          }
        };

        // read the file
        const read = fs.createReadStream(filePath);
        PapaParse.parse(read, config); // Parse the file
      });

    } catch (err) {
      console.warn(`Error reading data/original/recorridos_realizados_${year}.csv: ${err.message}`);
      console.error(err)
    }
  }
}

async function main() {
  await processFiles();

  // calculate the error rate for each column
  for (let i = 0; i < csvJson.length; i++) {
    const row = csvJson[i];
    row.null_rate = (row.null_count / row.row_count) * 100;
  }
  
  console.log('All files processed. Generating CSV file...')

  // save the file in a csv
  const csv = PapaParse.unparse(csvJson, {});
  await fs.promises.writeFile('data/recorridos_get_invalid_rows.csv', csv);

  console.log('Done. CSV file saved as recorridos_get_invalid_rows.csv')

  return 0;
}

main().catch(err => console.error(err));
