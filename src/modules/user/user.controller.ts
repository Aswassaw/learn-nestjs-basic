import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Logger } from 'winston';
import { UserService } from './user.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ValidationService } from 'src/validation/validation.service';
import Joi from 'joi';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import {
  LoginUserRequest,
  loginUserRequestValidation,
} from 'src/model/login.model';

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

  @Post('/login')
  login(
    @Body(new ValidationPipe(loginUserRequestValidation))
    body: LoginUserRequest,
    @Res() res: Response,
  ) {
    return res.json(body);
  }

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

  @Get('/:id')
  async findById(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const number = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return res.status(200).send(`${number[id]}`);
  }

  @Post('/')
  async create(@Body() body: CreatePayload, @Res() res: Response) {
    try {
      if (!body.firstName) {
        throw new Error('firstName is required');
      }

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
        friends: Joi.array()
          .required()
          .items(
            Joi.object({
              name: Joi.string().required(),
              age: Joi.number().required(),
            }).required(),
          ),
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
      throw new HttpException(
        {
          code: 500,
          errors: error.message,
        },
        500,
      );
    }
  }
}
