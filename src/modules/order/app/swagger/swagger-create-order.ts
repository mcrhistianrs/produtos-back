import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { StatusEnum } from '../enums/status-enum';

export const SwaggerCreateOrder = () =>
  applyDecorators(
    ApiBody({
      description: 'Order creation payload',
      schema: {
        type: 'object',
        required: ['items'],
        properties: {
          items: {
            type: 'array',
            items: {
              type: 'object',
              required: ['productId', 'quantity', 'price'],
              properties: {
                productId: {
                  type: 'string',
                  example: '507f1f77bcf86cd799439011',
                  description: 'ID of the product being ordered',
                },
                quantity: {
                  type: 'number',
                  example: 2,
                  description: 'Quantity of the product',
                },
                price: {
                  type: 'number',
                  example: 299,
                  description: 'Price of the product in cents',
                },
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 201,
      description: 'Order successfully created.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: '507f1f77bcf86cd799439021',
              },
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    productId: {
                      type: 'string',
                      example: '507f1f77bcf86cd799439011',
                    },
                    quantity: {
                      type: 'number',
                      example: 2,
                    },
                    price: {
                      type: 'number',
                      example: 299,
                    },
                  },
                },
              },
              total: {
                type: 'number',
                example: 598,
                description: 'Total order amount in cents',
              },
              status: {
                type: 'string',
                enum: Object.values(StatusEnum),
                example: 'pending',
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                example: '2025-03-22T10:40:50.775Z',
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
                example: '2025-03-22T10:40:50.775Z',
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
            invalidItems: {
              value: {
                message: 'Items should not be empty',
                error: 'Bad Request',
                statusCode: 400,
              },
            },
            productNotFound: {
              value: {
                message: 'Product with ID 507f1f77bcf86cd799439011 not found',
                error: 'Bad Request',
                statusCode: 400,
              },
            },
            insufficientStock: {
              value: {
                message:
                  'Insufficient stock for product Potato Chips. Available: 5, Requested: 10',
                error: 'Bad Request',
                statusCode: 400,
              },
            },
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
