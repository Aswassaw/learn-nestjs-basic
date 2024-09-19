import {
  Controller,
  Get,
  Header,
  HttpCode,
  Inject,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user/user.service';
import { Connection } from './connection';
import { MailService } from './mail/mail.service';
import { UserRepository } from './user-repository';
import { MemberService } from './member/member.service';

interface UserPayloadResponse {
  name: string;
  age: number;
  isMarried: boolean;
}

@Controller('/api/users')
export class UserController {
  constructor(
    private service: UserService,
    private connection: Connection,
    private mail: MailService,
    private userRepo: UserRepository,
    @Inject('EMAIL_ALIAS_COBA_BRO') private emailService: MailService,
    private memberService: MemberService,
  ) {}

  @Get('/connection')
  getConnection() {
    this.userRepo.save();
    this.mail.send();
    this.emailService.send();

    console.info(this.memberService.getConnectionName());
    this.memberService.sendEmail();

    return this.connection.getName();
  }

  @Get('/hello')
  getHello(@Query('name') name: string, @Res() res: Response) {
    console.log(this.service.sayHello(name));

    return res.send(this.service.sayHello(name));
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
