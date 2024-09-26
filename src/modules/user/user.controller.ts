import { Body, Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Logger } from 'winston';
import { UserService } from './user.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ValidationService } from 'src/validation/validation.service';
import Joi from 'joi';

interface CreatePayload {
  firstName: string;
  lastName: string;
}

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private validationService: ValidationService,
  ) {}

  @Get('/')
  async findAll(@Res() res: Response) {
    try {
      const users = await this.userService.findAll();
      this.logger.info('USER GETTED');

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).send('INTERNAL SERVER ERROR');
    }
  }

  @Post('/')
  async create(@Body() body: CreatePayload, @Res() res: Response) {
    try {
      const schema = Joi.object({
        firstName: Joi.string().required().min(3),
        lastName: Joi.string().required(),
        // array of string
        hobbies: Joi.array().required().items(Joi.string()),
        // object
        bestFriends: Joi.object({
          name: Joi.string().required(),
          age: Joi.number().required(),
        }).required(),
        // array of object
        friends: Joi.array().required().items(Joi.object({
          name: Joi.string().required(),
          age: Joi.number().required(),
        }).required()),
      });

      const { isError, errorMessages } = this.validationService.validate(
        schema,
        body,
      );

      if (!isError) {
        await this.userService.save(body.firstName, body.lastName);
        this.logger.info('USER CREATED');

        return res.status(201).send('CREATED');
      }

      return res.status(400).json({
        error: errorMessages,
      });
    } catch (error) {
      return res.status(500).send('INTERNAL SERVER ERROR');
    }
  }
}
