import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('/api/users')
export class UserController {
  @Post()
  post(): string {
    return 'POST';
  }

  @Get('/sample')
  get(): string {
    return 'GET';
  }

  @Get('/:id')
  getById(@Req() req: Request): string {
    return `GET ${req.params.id}`;
  }

  @Get('/param/:id')
  getByParam(@Param('id') id: string): string {
    return `PARAM: ${id}`;
  }

  @Get('/query/query')
  getByQuery(@Query('search') search: string): string {
    return `QUERY: ${search}`;
  }
}
