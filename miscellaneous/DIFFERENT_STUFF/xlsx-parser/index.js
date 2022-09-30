const Excel = require('exceljs');

const workbook = new Excel.Workbook();

const fs = require('fs');
const { Duplex } = require('stream');

// const filePath = '/home/ruslan/Downloads/bulkUpload Sep.csv';

// const excel = '/home/ruslan/Downloads/bulkUpload-Sep.xlsx';

const fields = [
  'datetime',
  'txType',
  'debitAccount',
  'debitAmount',
  'debitAsset',
  'creditAccount',
  'creditAmount',
  'creditAsset',
  'txFeeAccount',
  'txFeeAmount',
  'txFeeAsset',
  'payee',
  'memo',
  'txHash',
  'histFMV',
];

const xlsx = require('node-xlsx');

// const fileXls = '/home/ruslan/Downloads/bulkUpload-Sep.xls';

// const obj = xlsx.parse(fileXls); // parses a file

// const rows = [];
// const writeStr = '';

//looping through all sheets
// for (let i = 0; i < obj.length; i++) {
//   const sheet = obj[i];
//   //loop through all rows in the sheet
//   for (let j = 0; j < sheet['data'].length; j++) {
//     //add the row to the rows array
//     rows.push(sheet['data'][j]);
//   }
// }

// const rows1 = obj.flatMap((sheet) => sheet.data.map((record) => record));

// const rows1 = obj.flatMap((sheet) => sheet.data);

// for (let i = 0; i < obj.length; i++) {
//   const sheet = obj[i];
//   //loop through all rows in the sheet
//   for (let j = 0; j < sheet['data'].length; j++) {
//     //add the row to the rows array
//     rows.push(sheet['data'][j]);
//   }
// }

// console.log({ rows1 });

const parser = (fields) => async (filePath) => {
  //   const worksheet = await workbook.csv.readFile(filePath);

  const loadSource = (filePath, type) => workbook[type].readFile(filePath);

  const loadFromBuffer = (buffer, type) => workbook[type].load(buffer);

  const loadFromStream = (stream, type) => workbook[type].read(stream);

  const assignValue = (fields) => (values) =>
    fields.reduce((acc, field, idx) => ((acc[field] = values[idx]), acc), {});

  //   const assignValue =
  //     (fields) =>
  //     ([, ...values]) =>
  //       fields.reduce((acc, field, idx) => ((acc[field] = values[idx]), acc), {});

  const apFields = assignValue(fields);

  //   const eachRow = (parsed = [], worksheet) =>
  //     worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
  //       if (rowNumber === 1) return;
  //       parsed.push(apFields(row.values));
  //     });

  const eachRow = (parsed = [], worksheet) => (
    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      //   if (rowNumber === 1) return;

      const [, ...values] = row.values;

      console.log({ values });

      //   console.log({ values });

      parsed.push(apFields(values));
    }),
    parsed
  );

  const bufferToStream = (buffer) => {
    const stream = new Duplex();
    stream.push(buffer);
    stream.push(null);
    return stream;
  };

  const processCsv = async (type) => {
    const parsed = [];
    // const worksheet = await loadSource(filePath, type);

    // console.log({ worksheet });

    const buffer = await fs.promises.readFile(filePath);
    const stream = bufferToStream(buffer);

    // console.log({ stream });

    // console.log({ buffer, from: Buffer.from(buffer) });
    // const stream = fs.createReadStream(Buffer.from(buffer));
    const worksheet = await loadFromStream(stream, type);

    // console.log({ worksheet });

    // const buffer = await fs.promises.readFile(filePath);
    // const worksheet = await loadFromBuffer(buffer, type);

    return eachRow(parsed, worksheet);

    // worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    //   if (rowNumber === 1) return;
    //   parsed.push(apFields(row.values));
    // });
    // return result;
  };

  const processXlsx = async (type) => {
    const parsed = [];
    // const workbook = await loadSource(filePath, type);

    console.log({ filePath, type });

    const buffer = await fs.promises.readFile(filePath);
    const workbook = await loadFromBuffer(buffer, type);

    console.log({ filePath });

    const worksheet = workbook.getWorksheet();
    return eachRow(parsed, worksheet);
  };

  const processXls = async (type) => {
    const identity = (x) => x;
    const extractValues = (source) =>
      source.flatMap((sheet) => sheet.data.map(identity));

    const parsed = [];

    // const buffer = await fs.promises.readFile(filePath);
    // const source = xlsx.parse(buffer);

    const source = xlsx.parse(filePath);

    // parsed.push(apFields(extractValues(source)));

    parsed.push(...extractValues(source).map(apFields));

    return parsed;
  };

  const process = (type) => {
    const parsers = {
      csv: processCsv,
      xls: processXls,
      xlsx: processXlsx,
    };

    console.log({ type });

    if (!Object.keys(parsers).includes(type)) {
      throw new Error(
        'File type not supported, please choose one of those: .csv, .xlsx'
      );
    }

    return parsers[type](type);
  };

  return { process };
};

// const assignValue = (fields) => (values) =>
//   fields.reduce((acc, field, idx) => ((acc[field] = values[idx]), acc), {});

(async () => {
  //   const fileCsv = '/home/ruslan/Downloads/bulkUpload Sep.csv';
  //   const fileXlsx = '/home/ruslan/Downloads/bulkUpload-Sep.xlsx';
  //   const loader = await parser(filePath);
  //   const result = await loader.processCsv();
  //   //   const loader = await parser(excel);
  //   //   const result = await loader.processXlsx();
  const fileCsv = '/home/ruslan/Downloads/bulkUpload Sep.csv';
  const fileXlsx = '/home/ruslan/Downloads/bulkUpload-Sep.xlsx';
  const fileXls = '/home/ruslan/Downloads/bulkUpload-Sep.xls';

  //

  // const buffer = await fs.promises.readFile(fileXlsx);

  const parse = parser(fields);
  const loader = await parse(fileCsv);
  const result = await loader.process('csv');

  // const parse = parser(fields);
  // const loader = await parse(fileXlsx);
  // const result = await loader.process('xlsx');

  //
  // console.log({ result });
  //   //   const loader = await parse(fileCsv);
  //   //   const result = await loader.process('csv');
  //   //   const loader = await parse(fileXlsx);
  //   //   const result = await loader.process('xlsx');
  //   //   const result = await (await csv(filePath)).processCsv();
  //   console.log({ result });
  //   console.log({ fileCsv });
})();

`{
  datetime: '2021-09-21T02:14:43Z',
  txType: 'Withdrawal',
  debitAccount: 'Transaction Fee Expense',
  debitAmount: 0.004518789,
  debitAsset: 'ETH',
  creditAccount: 'Minteritem-0',
  creditAmount: 0.004518789,
  creditAsset: 'ETH',
  txFeeAccount: undefined,
  txFeeAmount: undefined,
  txFeeAsset: undefined,
  payee: 1.1156826584494827e+48,
  memo: 1.9029599755882155e+47,
  txHash: 1.120348295822936e+77,
  histFMV: undefined
},`;

// const fileXls = '/home/ruslan/Downloads/bulkUpload-Sep.xls';

// **********************************************************

// const fs = require('fs');
// const { type } = require('os');

// const fileXlsx = '/home/ruslan/Downloads/bulkUpload-Sep.xlsx';

// const buffer = fs.readFileSync(fileXlsx);

// workbook.xlsx.load(buffer).then((workbook) => {
//   workbook.eachSheet((sheet) => {
//     sheet.eachRow((row, rowIndex) => {
//       console.log({ values: row.values, rowIndex });
//     });
//   });
// });

// **********************************************************

/////// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

// const xlsx = require('node-xlsx');

// const fileXls = '/home/ruslan/Downloads/bulkUpload-Sep.xls';

// const obj = xlsx.parse(fileXls); // parses a file

// const rows = [];
// const writeStr = '';

// //looping through all sheets
// for (let i = 0; i < obj.length; i++) {
//   const sheet = obj[i];
//   //loop through all rows in the sheet
//   for (let j = 0; j < sheet['data'].length; j++) {
//     //add the row to the rows array
//     rows.push(sheet['data'][j]);
//   }
// }

// console.log({ rows });

/////// +++++++++++++++++++++++++++++++++++++++++++++++++++++++

// const xlsx = require('xlsx');

// const source = xlsx.readFile(fileXls);
// const data = xlsx.utils.json_to_sheet(source.SheetNames);

// const result = Object.keys(source.Sheets).map((name) => ({
//   name,
//   data: xlsx.utils.sheet_add_json(source.Sheets[name]),
// }));

// console.log({ a: source.Sheets['Worksheet'] });

// console.log({ sheet: source.SheetNames });

// console.log({ data });

//**************************************************** */

// workbook.xlsx.readFile(excel).then(function () {
//   var worksheet = workbook.getWorksheet();
//   const parsed = [];

//   worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
//     parsed.push(assignValue(fields)(row.values));
//     if (rowNumber === 1) return;
//   });

//   console.log({ parsed });
// });

//**************************************************** */

// const run = async () => {
//   await workbook.xlsx.readFile(excel);

//   var worksheet = workbook.getWorksheet('Sheet1');
//   const parsed = [];

//   worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
//     console.log({
//       rowNumber,
//       values: row.values,
//     });

//     if (rowNumber === 1) return;

//     parsed.push(assignValue(fields)(row.values));
//     // console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
//   });

//   console.log({ parsed });
// };

// run();

///////////////////////////////////////////////////////////

// const run = async () => {
//   const parsed = [];
//   const worksheet = await workbook.csv.readFile(filePath);

//   worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
//     if (rowNumber === 1) return;

//     parsed.push(apFields(row.values));

//     // console.log({
//     //   rowNumber,
//     //   values: row.values,
//     // });

//     // if (count++ === 3) process.exit(0);
//     // console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
//   });

//   console.log({ parsed });
// };

// run();
