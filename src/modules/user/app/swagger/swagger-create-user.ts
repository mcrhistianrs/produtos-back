import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

export const SwaggerCreateUser = () =>
  applyDecorators(
    ApiBody({
      description: 'User creation payload',
      schema: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            example: 'user@example.com',
            description: 'User email address',
          },
          password: {
            type: 'string',
            example: 'Password123!',
            description: 'User password (will be encrypted)',
          },
        },
      },
    }),
    ApiResponse({
      status: 201,
      description: 'User successfully created.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: '507f1f77bcf86cd799439031',
              },
              email: {
                type: 'string',
                example: 'user@example.com',
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request.',
      content: {
        'application/json': {
          examples: {
            invalidEmail: {
              value: {
                message: 'email must be a valid email address',
                error: 'Bad Request',
                statusCode: 400,
              },
            },
            weakPassword: {
              value: {
                message: 'password is too weak',
                error: 'Bad Request',
                statusCode: 400,
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 409,
      description: 'Conflict.',
      content: {
        'application/json': {
          example: {
            message: 'User with email user@example.com already exists',
            error: 'Conflict',
            statusCode: 409,
          },
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error.',
      content: {
        'application/json': {
          example: {
            message: 'Internal server error',
            statusCode: 500,
          },
        },
      },
    }),
  );
