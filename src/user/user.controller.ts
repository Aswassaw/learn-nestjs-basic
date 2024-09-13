import {
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface UserPayloadResponse {
  name: string;
  age: number;
  isMarried: boolean;
}

@Controller('/api/users')
export class UserController {
  @Get('/hello')
  getHello(
    @Query('first_name') firstName: string,
    @Query('last_name') lastName: string,
    @Res() res: Response,
  ) {
    return res.send(`Hello ${firstName} ${lastName}`);
  }

  @Get('/view/hello')
  viewHello(@Query('name') name: string, @Res() res: Response) {
    return res.render('index.html', {
      title: 'Coba Mustache',
      name: name,
    });
  }

  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() res: Response) {
    res.cookie('name', name);
    return res.status(200).send('Success Set Cookie');
  }

  @Get('/get-cookie')
  getCookie(@Req() req: Request, @Res() res: Response): Response<string> {
    return res.send(req.cookies['name']);
  }

  @Get('/sample-response')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async sampleResponse(): Promise<Record<string, UserPayloadResponse>> {
    return {
      data: {
        name: 'Andry',
        age: 21,
        isMarried: false,
      },
    };
  }

  @Post()
  @HttpCode(245)
  post() {
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

  helloBa(name: string, lastName: string): string {
    return `Halo ${name} ${lastName}`;
  }
}
