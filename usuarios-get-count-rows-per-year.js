/**
 * For every usuarios_ecobici_{year}.csv file,
 * get the count of rows per year
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const PapaParse = require('papaparse');

const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

async function getRowCountPerYear() {
  const rowCountPerYear = {};

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

      let rowCount = 0;
      for await (const line of rl) {
        rowCount++;
      }

      const endWatch = process.hrtime(startWatch);
      console.log(`-- Completed usuarios_ecobici_${year}.csv (took ${endWatch[0]}s)`);

      rowCountPerYear[year] = rowCount - 1; // Subtract 1 to exclude the header row
    } catch (err) {
      console.warn(`Error reading usuarios_ecobici_${year}.csv: ${err.message}`);
    }
  }

  return rowCountPerYear;
}

async function main() {
  const rowCountPerYear = await getRowCountPerYear();
  
  const csvJson = []
  // columns are year, row_count

  for (const year in rowCountPerYear) {
    csvJson.push({
      year: year,
      row_count: rowCountPerYear[year]
    });
  }

  const csv = PapaParse.unparse(csvJson);

  console.log('Done! Saving file...')

  console.table(csvJson);
  
  await fs.promises.writeFile('data/usuarios_get_count_rows_per_year.csv', csv);
  
  return 0;
}

main().catch(err => console.error(err));