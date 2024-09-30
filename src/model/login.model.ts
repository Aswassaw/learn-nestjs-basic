import Joi from 'joi';

export class LoginUserRequest {
  username: string;
  password: string;
}

export const loginUserRequestValidation = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
