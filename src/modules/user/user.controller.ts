import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

interface CreatePayload {
  firstName: string;
  lastName: string;
}

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async findAll(@Res() res: Response) {
    try {
      return res.status(200).json(await this.userService.findAll());
    } catch (error) {
      return res.status(500).send('INTERNAL SERVER ERROR');
    }
  }

  @Post('/')
  async create(@Body() body: CreatePayload, @Res() res: Response) {
    try {
      if (body.firstName && body.lastName) {
        await this.userService.save(body.firstName, body.lastName);
        return res.status(201).send('CREATED');
      }

      return res.status(400).send('BAD REQUEST');
    } catch (error) {
      return res.status(500).send('INTERNAL SERVER ERROR');
    }
  }
}
