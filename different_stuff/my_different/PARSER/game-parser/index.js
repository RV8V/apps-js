const axios = require('axios');
const cherio = require('cherio');
const fs = require('fs');
const path = require('path');

const parse = async () => {
  const getHtml = async url => {
    const {data} = await axios.get(url);
    return cherio.load(data);
  }

  const $ = await getHtml('https://kanobu.ru/games/playstation_5/popular/');
  const pageNumber = $('a.ui-kit-paginator--list-link').eq(-2).text();

  for (let i = 1; i <= parseInt(pageNumber); ++i) {
    const selector = await getHtml(`https://kanobu.ru/games/playstation_5/popular/?page=${i}`);
    selector('li.c-game').each((i, element) => {
      const title = selector(element).find('div.h2');
      const link = `https://kanobu.ru${selector(element).find('a').attr('href')}`;
      fs.appendFileSync('./data.txt', `title: ${title.text()} - link: ${link}\n`);
    })
  }
}

parse();
