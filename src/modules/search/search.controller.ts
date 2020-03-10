import {
  Controller, Get, Query,
} from '@nestjs/common';
// import axios from 'axios';
import { TSearchResult } from '../../type';
import { SearchService } from './search.service';

type TSearchQuery = {
  q: string
};

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/search')
  public async getData(@Query() query: TSearchQuery): Promise<TSearchResult[]> {
    const result = await this.searchService.getData(query.q);
    console.log('result - ', result);
    return result;
  }
}
