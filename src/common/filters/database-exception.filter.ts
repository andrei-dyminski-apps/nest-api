import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import type { Response } from 'express';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const httpException = this.mapException(exception);
    const status = httpException.getStatus();
    const message = httpException.message;

    const payload = {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(status).json(payload);
  }

  private mapException(exception: unknown): HttpException {
    const error = exception as {
      driverError?: { code?: string; message?: string };
      code?: string;
      message?: string;
    };

    const driverError = error.driverError ?? error;
    const code: string | undefined = driverError.code;
    const message: string = driverError.message || error.message || '';

    if (code === 'SQLITE_CONSTRAINT' || /constraint failed/i.test(message)) {
      if (/UNIQUE constraint failed/i.test(message)) {
        const field = this.extractFieldName(message);
        return new ConflictException(
          field
            ? `${field} already exists`
            : 'A record with this value already exists',
        );
      }

      if (/FOREIGN KEY constraint failed/i.test(message)) {
        return new NotFoundException('The referenced item does not exist');
      }
    }

    const errorMessage =
      process.env.NODE_ENV === 'development'
        ? `Database error: ${message}`
        : 'An error occurred while processing your request';

    return new InternalServerErrorException(errorMessage);
  }

  private extractFieldName(message: string): string | null {
    const match = message.match(/UNIQUE constraint failed: \w+\.(\w+)/i);
    return match ? match[1] : null;
  }
}
