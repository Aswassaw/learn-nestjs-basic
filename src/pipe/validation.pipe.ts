import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import Joi from 'joi';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private joiSchema: Joi.Schema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      const { error, value: validatedValue } = this.joiSchema.validate(value, {
        abortEarly: false,
      });

      if (error) {
        throw new BadRequestException(error);
      }

      return validatedValue;
    } else {
      return value;
    }
  }
}
