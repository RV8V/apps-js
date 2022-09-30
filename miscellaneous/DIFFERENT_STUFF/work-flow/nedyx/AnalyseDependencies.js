// const [
//  Widget {
// []       isNew: false,
// [nodemon]       id: 56,
// [nodemon]       title: 'cell2',
// [nodemon]       enabled: true,
// [nodemon]       visible: true,
// [nodemon]       type: 'CELL',
// [nodemon]       geometry: [Object],
// [nodemon]       styles: [Object],
// [nodemon]       format: [Object],
// [nodemon]       rawData: [Object],
// [nodemon]       page: [Page],
// [nodemon]       actions: [Array],
// [nodemon]       state: 'changed',
// [nodemon]       usedRefs: [Array],
// [nodemon]       dependentWidgets: {},
// [nodemon]       affectiveWidgets: [Object],
// [nodemon]       titleInfo: [Object]
// [nodemon]     },
// [nodemon]     Widget {
// [nodemon]       isNew: false,
// [nodemon]       id: 57,
// [nodemon]       title: 'cell3',
// [nodemon]       enabled: true,
// [nodemon]       visible: true,
// [nodemon]       type: 'CELL',
// [nodemon]       geometry: [Object],
// [nodemon]       styles: [Object],
// [nodemon]       format: [Object],
// [nodemon]       rawData: [Object],
// [nodemon]       page: [Page],
// [nodemon]       actions: [Array],
// [nodemon]       state: 'changed',
// [nodemon]       usedRefs: [Array],
// [nodemon]       dependentWidgets: {},
// [nodemon]       affectiveWidgets: [Object],
// [nodemon]       titleInfo: [Object]
// [nodemon]     },
// [nodemon]     Widget {
// [nodemon]       isNew: false,
// [nodemon]       id: 58,
// [nodemon]       title: 'cell4',
// [nodemon]       enabled: true,
// [nodemon]       visible: true,
// [nodemon]       type: 'CELL',
// [nodemon]       geometry: [Object],
// [nodemon]       styles: [Object],
// [nodemon]       format: [Object],
// [nodemon]       rawData: [Object],
// [nodemon]       page: [Page],
// [nodemon]       actions: [Array],
// [nodemon]       state: 'updating',
// [nodemon]       usedRefs: [Array],
// [nodemon]       dependentWidgets: {},
// [nodemon]       affectiveWidgets: [Object],
// [nodemon]       titleInfo: [Object]
// [nodemon]     }
// [nodemon]   ]
// [nodemon] }

const depX = {
  id: 4,
  title: 'cell4',
  page: {
    id: 12,
    title: 'page1',
  },
  dependentWidgets: {},
};

const dep1 = {
  id: 1,
  title: 'cell2',
  page: {
    id: 10,
    title: 'page1',
  },
  dependentWidgets: {},
};

const dep2 = {
  id: 2,
  title: 'cell3',
  page: {
    id: 10,
    title: 'page1',
  },
  dependentWidgets: { 12: depX },
};

const baseWidget = {
  id: 0,
  title: 'cell1',
  page: {
    id: 10,
    title: 'page1',
  },
  dependentWidgets: { 1: dep1, 2: dep2, 3: depX },
};

// console.dir({ baseWidget }, { depth: 3 });

const traverseWidgets = (acc = [], widget) => {
  console.log({ widget });
  const base = `${widget.page.title}.${widget.title}`;

  // acc.push(base);

  acc.push({
    name: base,
    hasNext: Boolean(Object.keys(widget.dependentWidgets).length),
    depsCount: Object.keys(widget.dependentWidgets).length,
  });

  console.log({ values: Object.values(widget.dependentWidgets) });

  for (const dependent of Object.values(widget.dependentWidgets)) {
    console.log({ dependent });
    if (Object.keys(dependent.dependentWidgets).length) {
      console.log({ enter: 'recursive' });
      return traverseWidgets(acc, dependent);
    } else {
      console.log({ enter: 'not recursive' });
      const title = `${dependent.page.title}.${dependent.title}`;
      // acc.push(title);

      acc.push({
        name: title,
        hasNext: Boolean(Object.keys(dependent.dependentWidgets).length),
        depsCount: Object.keys(dependent.dependentWidgets).length,
      });

      console.log({ acc, process: dependent });
    }
  }

  return acc;
};

// const result = traverseWidgets([], baseWidget);

// console.log({ result });

const result = [
  { name: 'Page1.cell1', hasNext: true, depsCount: 2 },
  { name: 'Page1.cell2', hasNext: true, depsCount: 2 },
  { name: 'Page1.cell4', hasNext: false, depsCount: 0 },
  { name: 'Page1.cell5', hasNext: false, depsCount: 0 },
  { name: 'Page1.cell3', hasNext: true, depsCount: 2 },
  { name: 'Page1.cell5', hasNext: false, depsCount: 0 },
  { name: 'Page1.cell6', hasNext: false, depsCount: 0 },

  // { name: 'Page1.cell7', hasNext: false, depsCount: 2 },
  // { name: 'Page1.cell8', hasNext: false, depsCount: 0 },
  // { name: 'Page1.cell9', hasNext: false, depsCount: 0 },
];

/**
 * need format to: range: [ [ 2, 12, 18 ], [ 4, 14, 1 ] ] -> 2 rows and 3 cols
 *
 */

const calculateWidth = (vector) => {
  let width = 0;
  const sequences = [];

  for (const value of vector) {
    if (value.hasNext) {
      width++;
    } else {
      sequences.push(width);
      width = 0;
    }
  }

  return Math.max(...sequences) + 1;
};

const calculateHeight = (vector) => vector.length;

const getTableStructure = (width, height) => {
  const table = [];

  for (let i = 0; i < height; i++) {
    table.push(new Array(width).fill());
  }
  return table;
};

// const fillTable = (table, vector) => {
//   const mappings = [];

//   for (let i = 0; i < table.length; i++) {
//     mappings.push([table[i], vector[i]]);
//   }

//   for (let i = 0; i < mappings.length; i++) {
//     const [fill, value] = mappings[i];

//     console.dir({ fill, value }, { depth: 4 });
//     // if (i === 0) {
//     //   fill[0] = value.name;
//     // }

//     // if (i > mappings.length)

//     // if (value.hasNext) {
//     //   fill[i] = value.name;
//     // } else {
//     //   if (
//     //     mappings[i].value &&
//     //     mappings[i].value.depsCount === 0 &&
//     //     mappings[i + 1].value.depsCount === 0
//     //   ) {
//     //     fill[i - 1] = value.name;
//     //   } else {
//     //     fill[i] = value.name;
//     //   }
//     // }

//     console.dir({ i, mappings }, { depth: 4 });
//   }

//   return mappings.map(([fill, structure]) => fill);
// };

// const fillTable = (table, vector) => {
//   const mappings = [];

//   const indexes = [];

//   for (let i = 0; i < vector.length; i++) {
//     const current = vector[i];
//     const next = vector[i + 1];

//     if (current.depsCount === 0 && next && next.depsCount !== 0) {
//       indexes.push(i);
//     }
//   }

//   /////////////////////////////////////////////

//   for (let i = 0; i < table.length; i++) {
//     if (i === 0) {
//       table[i][i] = vector[i].name;
//     }

//     console.log({ vector });

//     if (vector[i].hasNext || (!vector[i].hasNext && vector[i - 1].hasNext)) {
//       table[i][i] = vector[i].name;
//     } else {
//       console.log({ pref: vector[i - 1], cur: vector[i] });

//       table[i][i - 1] = vector[i].name;
//     }

//     // for (const index of indexes) {
//     //   if (index === i) {
//     //   }
//     // }

//     if (i === indexes[0] + 1) {
//       console.log({ i, in: indexes[0], vector, table });
//       i = i - 2;
//     }

//     // const filled = Boolean(table[table.length - 1].filter(Boolean).length);

//     // console.log({ filled });

//     // if (i === indexes[0]) {
//     //   if (!filled) {
//     //     break;
//     //   } else {
//     //     console.log({ enter: true });
//     //     i--;
//     //   }
//     // }
//   }

//   console.log({ table, vector, indexes });
// };

// const fillTable = (table, vector) => {
//   const mappings = [];

//   const indexes = [];

//   for (let i = 0; i < vector.length; i++) {
//     const current = vector[i];
//     const next = vector[i + 1];

//     if (current.depsCount === 0 && next && next.depsCount !== 0) {
//       indexes.push(i);
//     }
//   }

//   /////////////////////////////////////////////

//   for (let i = 0; i < table.length; i++) {
//     if (i === 0) {
//       table[i][i] = vector[i].name;
//     }

//     // console.log({ vector });

//     if (vector[i].hasNext || (!vector[i].hasNext && vector[i - 1].hasNext)) {
//       table[i][i] = vector[i].name;
//     } else {
//       // console.log({ pref: vector[i - 1], cur: vector[i] });

//       table[i][i - 1] = vector[i].name;
//     }

//     for (const index of indexes) {
//       console.log({ index, i });
//       if (index === i) {
//         table[index + 1][i - 2] = vector[i + 1].name;
//         i++;
//       }
//       // else if (i > index) {
//       //   table[index + 1][i - 2] = vector[i].name;
//       // }

//       // if (index === vector.length - 1) {
//       //   return table;
//       // }
//     }

//     // if (i === indexes[0] + 1) {
//     //   console.log({ i, in: indexes[0], vector, table });
//     //   i = i - 2;
//     // }

//     // const filled = Boolean(table[table.length - 1].filter(Boolean).length);

//     // console.log({ filled });

//     // if (i === indexes[0]) {
//     //   if (!filled) {
//     //     break;
//     //   } else {
//     //     console.log({ enter: true });
//     //     i--;
//     //   }
//     // }
//   }

//   console.log({ table, vector, indexes });
// };

// const fillTable = (start, pos, table, vector) => {
//   const mappings = [];

//   const indexes = [];

//   for (let i = 0; i < vector.length; i++) {
//     const current = vector[i];
//     const next = vector[i + 1];

//     if (current.depsCount === 0 && next && next.depsCount !== 0) {
//       indexes.push(i);
//     }
//   }

//   /////////////////////////////////////////////

//   for (let i = start; i < table.length; i++) {
//     if (i === start) {
//       table[i][pos] = vector[i].name;
//     }

//     console.log({ vector });

//     if (vector[i].hasNext || (!vector[i].hasNext && vector[i - 1].hasNext)) {
//       table[i][pos] = vector[i].name;
//     } else {
//       console.log({ pref: vector[i - 1], cur: vector[i] });

//       table[i][pos - 1] = vector[i].name;
//     }

//     if (i === indexes[0]) {
//       console.log({ in: table, i: i + 1 });
//       const rec = fillTable(i + 1, i - 2, table, vector);
//       console.log({ rec });

//       // break;
//     }

//     // for (const index of indexes) {
//     //   if (index === i) {
//     //   }
//     // }

//     // if (i === indexes[0] + 1) {
//     //   console.log({ i, in: indexes[0], vector, table });
//     //   i = i - 2;
//     // }

//     // const filled = Boolean(table[table.length - 1].filter(Boolean).length);

//     // console.log({ filled });

//     // if (i === indexes[0]) {
//     //   if (!filled) {
//     //     break;
//     //   } else {
//     //     console.log({ enter: true });
//     //     i--;
//     //   }
//     // }
//   }

//   return table;

//   console.log({ table, vector, indexes });
// };

//////////////////////////////////////////////

// const fillTable = (table, vector) => {
//   const mappings = [];

//   const indexes = [];

//   for (let i = 0; i < vector.length; i++) {
//     const current = vector[i];
//     const next = vector[i + 1];

//     if (current.depsCount === 0 && next && next.depsCount !== 0) {
//       indexes.push(i);
//     }
//   }

//   /////////////////////////////////////////////

//   for (let i = 0; i < table.length; i++) {
//     if (i === 0) {
//       table[i][i] = vector[i].name;
//     }

//     // console.log({ vector });

//     if (vector[i].hasNext || (!vector[i].hasNext && vector[i - 1].hasNext)) {
//       table[i][i] = vector[i].name;
//     } else {
//       // console.log({ pref: vector[i - 1], cur: vector[i] });

//       table[i][i - 1] = vector[i].name;
//     }

//     // for (const index of indexes) {
//     //   console.log({ index, i });
//     //   if (index === i) {
//     //     table[index + 1][i - 2] = vector[i + 1].name;
//     //     i++;
//     //   }
//     //   // else if (i > index) {
//     //   //   table[index + 1][i - 2] = vector[i].name;
//     //   // }

//     //   // if (index === vector.length - 1) {
//     //   //   return table;
//     //   // }
//     // }

//     // if (i === indexes[0] + 1) {
//     //   console.log({ i, in: indexes[0], vector, table });
//     //   i = i - 2;
//     // }

//     // const filled = Boolean(table[table.length - 1].filter(Boolean).length);

//     // console.log({ filled });

//     // if (i === indexes[0]) {
//     //   if (!filled) {
//     //     break;
//     //   } else {
//     //     console.log({ enter: true });
//     //     i--;
//     //   }
//     // }
//   }

//   for ()

//   for (const index of indexes) {
//     console.log({ index, i });
//     if (index === i) {
//       table[index + 1][i - 2] = vector[i + 1].name;
//       i++;
//     }
//     // else if (i > index) {
//     //   table[index + 1][i - 2] = vector[i].name;
//     // }

//     // if (index === vector.length - 1) {
//     //   return table;
//     // }
//   }

//   console.log({ table, vector, indexes });
// };

// const width = calculateWidth(result);

// console.log({ width });

// const toTableStructure = (vector) => {
//   const width = calculateWidth(vector);
//   const height = calculateHeight(vector);

//   const table = getTableStructure(width, height);
//   // const result = fillTable(table, vector);

//   console.log({ table });

//   console.log({ width, height });
//   console.dir({ result }, { depth: 3 });
// };

// toTableStructure(result);

// console.log({ result });

// const getMoves = (vector) => {
//   const indexes = [];

//   for (let i = 0; i < vector.length; i++) {
//     const current = vector[i];
//     const next = vector[i + 1];

//     if (current.depsCount === 0 && next && next.depsCount !== 0) {
//       indexes.push(i);
//     }
//   }

//   return indexes;
// };

const getMoves = (width, vector) => {
  const indexes = [];
  // let init = 3;
  let init = width;

  for (let i = 0; i < vector.length; i++) {
    const current = vector[i];
    const next = vector[i + 1];

    if (current.depsCount === 0 && next && next.depsCount !== 0) {
      indexes.push({
        index: i,
        init: init,
      });
      // init += init;
    }
  }

  return indexes;
};

const setCoordination = (width, vector) => {
  const moves = getMoves(width, vector);
  let differ = 0;

  // console.log({ moves });

  return vector.map((record, i) => {
    // if (i - 1 === moves[0]) {
    //   console.log({ enter: true });
    //   differ = 3;
    // }
    for (const { index, init } of moves) {
      if (i - 1 === index) {
        differ = init;
      }
    }
    if (i === 0) {
      console.log({ in: 'i == 0', record, row: i, col: i });
      return { ...record, row: i, col: i };
    }
    // if (record.hasNext || (!record.hasNext && vector[i - 1].hasNext)) {
    //   console.log({ in: '||', record, row: i, col: i });
    //   return { ...record, row: i, col: i };
    // }
    if (!record.hasNext && vector[i - 1].hasNext) {
      // console.log({ in: '||', record, row: i, col: i });
      console.log({ in: '||', record });
      // return { ...record, row: i, col: i };
      return { ...record, row: i, col: i - differ };
    }
    // if (record.hasNext) {
    //   console.log({ in: 'hasNext', record });
    //   return { ...record, row: i, col: i };
    // }
    if (!record.hasNext && !vector[i - 1].hasNext) {
      // console.log({ in: 'reverse', record, row: i, col: i - 1 });
      console.log({ in: 'reverse', record });

      // return { ...record, row: i, col: i - 1 };
      return { ...record, row: i, col: i - 1 - differ };
    }
    if (record.hasNext && !vector[i - 1].hasNext) {
      // console.log({ in: 'next', record, row: i, col: i - 1 });
      console.log({ in: 'next', record });
      return { ...record, row: i, col: i - differ };
    }
    if (record.hasNext) {
      // console.log({ in: 'as it is', record, row: i, col: i });
      console.log({ in: 'as it is', record });
      return { ...record, row: i, col: i };
    }
    // if (!record.hasNext && !vector[i - 1].hasNext) {
    //   console.log({ in: 'reverse', record, row: i, col: i - 1 });
    //   return { ...record, row: i, col: i - 1 };
    // }
  });
};

const setValueForTable = (table, vector) => {
  const filled = [...table];

  for (const { name, row, col } of vector) {
    filled[row][col] = name;
  }
  return filled;
};

const toTableStructure = (vector) => {
  const width = calculateWidth(vector);
  const height = calculateHeight(vector);

  const table = getTableStructure(width, height);
  const withCoords = setCoordination(width, vector);

  console.log({ setValueForTable: setValueForTable(table, withCoords) });

  console.log({ withCoords });
  // const result = fillTable(table, vector);

  console.log({ table });

  console.log({ width, height });
  // console.dir({ result }, { depth: 3 });
};

toTableStructure(result);

// console.log({ setCoordination: setCoordination(result) });

// toTableStructure(result);
