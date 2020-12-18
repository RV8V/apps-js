'use strict';

const process_ = dataset => {
  const data_ = dataset['rdf:RDF'];
  const pgtermsEbook = data_['pgterms:ebook'];
  const o = pgtermsEbook[0];

  let subjects = o['dcterms:subject'];
  const lan = o['dcterms:language'];
  const creator = o['dcterms:creator'];
  const title = o['dcterms:title'] ? 'undefined' : o['dcterms:title'][0];
  const rights_ = o['dcterms:rights'];
  const publishername = o['dcterms:publisher'][0];
  const issued = o['dcterms:issued'];
  const language = lan[0]['rdf:Description'] ? 'undefined' : lan[0]['rdf:Description'][0]['rdf:value'][0]._;

  let authorname;
  if (!creator) authorname = 'undefined';
  else if (!creator[0]['pgterms:agent']) authorname = 'undefined';
  else if (!creator[0]['pgterms:agent'][0]['pgterms:name']) authorname = 'undefined';
  else if (creator) authorname = creator[0]['pgterms:agent'][0]['pgterms:name'][0];

  const date = issued[0] ? console.log('issued___undefined') : issued[0]._;
  const licenseRights = rights_[0] ? console.log('rights___undefined') : rights_[0];

  if (subjects === undefined) {
    subjects = undefined;
  } else {
    for (let i = 0; i < subjects.length; i++) {
      const value = subjects[i]['rdf:Description'][0]['rdf:value'];
      const test = value[0];
      const value__ = test;
      subjects[i] = value__;
    }
  }
  return { language, authorname, date, title, publishername, licenseRights, subjects };
};

module.exports = { process_ };
