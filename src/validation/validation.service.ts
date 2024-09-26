import { Injectable } from '@nestjs/common';
import Joi from 'joi';

interface ValidationResult {
  isError: boolean;
  errorMessages?: { field: string; message: string }[];
}

@Injectable()
export class ValidationService {
  validate<T>(schema: Joi.Schema<T>, data: T): ValidationResult {
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => ({
        field: `${detail.path[0]}${detail.path[1] !== undefined ? `.${detail.path[1]}` : ''}`,
        message: detail.message,
      }));

      return { isError: true, errorMessages };
    }

    return { isError: false };
  }
}
