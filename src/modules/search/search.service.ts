import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { shopsNames } from '../../const/const';
import { TSearchResult, TShops } from '../../type';

type ShopMethods = Record<TShops, (search: string) => Promise<TSearchResult[]>>;

@Injectable()
export class SearchService implements ShopMethods {
  async getData(string: any): Promise<TSearchResult[]> {
    const result = await Promise.all(
      shopsNames.map((shopName) => this[shopName](string)),
    );
    return result.flat();
  }

  async veloplaneta(string: string): Promise<TSearchResult[]> {
    const data: TSearchResult[] = [];
    const rawData = await axios.get(
      `https://veloplaneta.com.ua/catalogsearch/result/?q=${encodeURIComponent(
        string,
      )}`,
    );
    const $ = cheerio.load(rawData.data);
    $(
      '#amasty-shopby-product-list > div.product-del.clear_fix.product-grid > div',
    ).each((i, elem) => {
      if (!elem) return;
      data.push({
        // image: undefined,
        image: $(elem)
          .find('img.product-image-photo')
          .attr('src'),
        title: $(elem)
          .find('img.product-image-photo')
          .attr('alt'),
        price: $(elem)
          .find('span.price-wrapper')
          .data('price-amount'),
        link: $(elem)
          .find('a.one-goods__name')
          .attr('href'),
        shop: 'veloplaneta',
        shopURL: 'https://veloplaneta.com.ua/',
      });
    });

    // console.log('veloplaneta!! - ', data);
    return data[0] ? [data[0], data[1], data[2]] : [];
  }

  async velostyle(string: string): Promise<TSearchResult[]> {
    const data: TSearchResult[] = [];
    const rawData = await axios.get(
      `http://www.velostyle.com.ua/advanced_search_result.php?keywords=${encodeURIComponent(
        string,
      )}`,
    );
    const $ = cheerio.load(rawData.data);
    $('#content > div.page > div.pageItem > form > table > tbody > tr').each(
      (i, elem) => {
        if (!elem) return;
        if (i === 0) return;
        data.push({
          image: `http://www.velostyle.com.ua/${$(elem)
            .find('img')
            .attr('src')}`,
          title: $(elem)
            .find('img')
            .attr('alt'),
          price: $(elem)
            .find('span.bold.price')
            .text().split(',')[0],
          link: $(elem)
            .find('td > a')
            .attr('href'),
          shop: 'velostyle',
          shopURL: 'http://www.velostyle.com.ua/',
        });
      },
    );
    return data[0] ? [data[0], data[1], data[2]] : [];
    // return data;
  }

  async velopuls(string: string): Promise<TSearchResult[]> {
    const data: TSearchResult[] = [];
    const convertedStr = string.split(' ').join('+');
    const rawData = await axios.get(
      `https://velopuls.ua/search/?query=${encodeURIComponent(convertedStr)}`,
    );
    const $ = cheerio.load(rawData.data);
    $('#product-list-wrap > div > ul > li').each((i, elem) => {
      if (!elem) return;
      data.push({
        image: `https://velopuls.ua${$(elem)
          .find('a > img.product-list__item-image-img')
          .attr('src')}`,
        title: $(elem)
          .find('a > img.product-list__item-image-img')
          .attr('alt'),
        price: $(elem)
          .find('div > p.product-list__item-price')
          .text().split(/ грн\s*/)[0],
        link: `https://velopuls.ua${$(elem)
          .find('a.product-list__item-image')
          .attr('href')}`,
        shop: 'velopuls',
        shopURL: 'https://velopuls.ua/',
      });
    });
    // return data;
    // console.log('velopulse!! - ', data);

    return data[0] ? [data[0], data[1], data[2]] : [];
  }

  async drivesport(string: string): Promise<TSearchResult[]> {
    const data: TSearchResult[] = [];
    const rawData = await axios.get(
      `https://drive-sport.com.ua/gds.php?q=${encodeURIComponent(string)}`,
    );
    const $ = cheerio.load(rawData.data);
    $('#filter_form > div.right_col > div.objects > div').each((i, elem) => {
      if (!elem) return;
      data.push({
        image: $(elem)
          .find('a > span > span > img')
          .attr('src'),
        title: $(elem)
          .find('a.title')
          .text(),
        price: $(elem)
          .find('span.discount > span.value')
          .text().split(/ грн\s*/)[0],
        link: `https://drive-sport.com.ua${$(elem)
          .find('span.txt > a')
          .attr('href')}`,
        shop: 'drivesport',
        shopURL: 'https://drive-sport.com.ua/',
      });
    });
    return data[0] ? [data[0]] : [];
    // return data[0] ? [data[0], data[1], data[2]] : [];
  }
}
