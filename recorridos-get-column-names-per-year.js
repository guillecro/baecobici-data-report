/**
 * For every recorridos_realizados_{year}.csv file,
 * Get the column names for each year
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

async function getFirstLine() {
  const columnNamePerYear = {};

  for (let i = 0; i < years.length; i++) {
    const startWatch = process.hrtime();
    const year = years[i];
    const filePath = path.resolve(__dirname, `data/original/recorridos_realizados_${year}.csv`);

    try {
      const fileStream = fs.createReadStream(filePath);
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });

      for await (const line of rl) {
        const firstLine = line;
        console.log(`Processing data/original/recorridos_realizados_${year}.csv`);
        const columnNames = firstLine.split(',').map(columnName => columnName.replace(/"/g, '').replace(/\r/g, ''));
        columnNamePerYear[year] = columnNames;
        rl.close();
        break;
      }

      const endWatch = process.hrtime(startWatch);
      console.log(`-- Completed data/original/ecorridos_realizados_${year}.csv (took ${endWatch[0]}s)`);

    } catch (err) {
      console.warn(`Error reading data/original/recorridos_realizados_${year}.csv: ${err.message}`);
    }
  }

  return columnNamePerYear;
}

async function main() {
  const columnNamePerYear = await getFirstLine();

  console.log('Done! Saving file...')

  await fs.promises.writeFile('data/recorridos_get_column_names_per_year.json', JSON.stringify(columnNamePerYear, null, 2));
  return 0;
}

main().catch(err => console.error(err));