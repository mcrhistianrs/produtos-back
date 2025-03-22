import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const SwaggerListUsers = () =>
  applyDecorators(
    ApiResponse({
      status: 200,
      description: 'List of users retrieved successfully.',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
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
          examples: {
            multipleUsers: {
              value: [
                {
                  id: '507f1f77bcf86cd799439031',
                  email: 'user1@example.com',
                },
                {
                  id: '507f1f77bcf86cd799439032',
                  email: 'user2@example.com',
                },
                {
                  id: '507f1f77bcf86cd799439033',
                  email: 'user3@example.com',
                },
              ],
            },
            emptyList: {
              value: [],
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
            message: 'Unauthorized',
            statusCode: 401,
          },
        },
      },
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden.',
      content: {
        'application/json': {
          example: {
            message: 'Insufficient permissions to access user list',
            error: 'Forbidden',
            statusCode: 403,
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
