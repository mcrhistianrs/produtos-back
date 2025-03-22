import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

export const SwaggerLogin = () =>
  applyDecorators(
    ApiBody({
      description: 'User login credentials',
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
            description: 'User password',
          },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'User successfully logged in.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              accessToken: {
                type: 'string',
                example:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMzEiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE2Mzg1MTY0MzAsImV4cCI6MTYzODUyMDAzMH0.VZCgCpZkH9ZAMKQPJj-8qi5NED-jimDsjMJkBLSPpRY',
                description: 'JWT access token for authentication',
              },
              user: {
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
            missingFields: {
              value: {
                message: 'email or password should not be empty',
                error: 'Bad Request',
                statusCode: 400,
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized.',
      content: {
        'application/json': {
          example: {
            message: 'Invalid email or password',
            error: 'Unauthorized',
            statusCode: 401,
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
