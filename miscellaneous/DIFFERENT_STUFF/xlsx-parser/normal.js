const Excel = require('exceljs');
const xlsx = require('node-xlsx');

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

const parser = (fields) => async (filePath) => {
  const workbook = new Excel.Workbook();

  const loadSource = (filePath, type) => workbook[type].readFile(filePath);

  const assignValue = (fields) => (values) =>
    fields.reduce((acc, field, idx) => ((acc[field] = values[idx]), acc), {});

  const apFields = assignValue(fields);

  const eachRow = (parsed = [], worksheet) => (
    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      const [, ...values] = row.values;
      parsed.push(apFields(values));
    }),
    parsed
  );

  const processCsv = async (type) => {
    const parsed = [];
    const worksheet = await loadSource(filePath, type);

    return eachRow(parsed, worksheet);
  };

  const processXlsx = async (type) => {
    const parsed = [];
    const workbook = await loadSource(filePath, type);

    const worksheet = workbook.getWorksheet();
    return eachRow(parsed, worksheet);
  };

  const processXls = async (type) => {
    const identity = (x) => x;
    const extractValues = (source) =>
      source.flatMap((sheet) => sheet.data.map(identity));

    const parsed = [];
    const source = xlsx.parse(filePath);

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
        'File type not supported, please choose one of those: .csv, .xls .xlsx'
      );
    }

    return parsers[type](type);
  };

  return Object.freeze({ process });
};

(async () => {
  //   const fileCsv = '/home/ruslan/Downloads/bulkUpload Sep.csv';
  //   const fileXlsx = '/home/ruslan/Downloads/bulkUpload-Sep.xlsx';
  //   const loader = await parser(filePath);
  //   const result = await loader.processCsv();
  //   //   const loader = await parser(excel);
  //   //   const result = await loader.processXlsx();
  const fileCsv = '/home/ruslan/Downloads/bulkUpload Sep.csv';
  //   const fileXlsx = '/home/ruslan/Downloads/bulkUpload-Sep.xlsx';
  //   const fileXls = '/home/ruslan/Downloads/bulkUpload-Sep.xls';
  const parse = parser(fields);
  const loader = await parse(fileCsv);
  const result = await loader.process('csv');
  console.log({ result });
  //   //   const loader = await parse(fileCsv);
  //   //   const result = await loader.process('csv');
  //   //   const loader = await parse(fileXlsx);
  //   //   const result = await loader.process('xlsx');
  //   //   const result = await (await csv(filePath)).processCsv();
  //   console.log({ result });
  //   console.log({ fileCsv });
})();
