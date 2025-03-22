import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { StatusEnum } from '../enums/status-enum';

export const SwaggerUpdateOrder = () =>
  applyDecorators(
    ApiParam({
      name: 'id',
      required: true,
      description: 'Order ID',
      example: '507f1f77bcf86cd799439021',
    }),
    ApiBody({
      description: 'Order update payload',
      schema: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                productId: {
                  type: 'string',
                  example: '507f1f77bcf86cd799439011',
                  description: 'ID of the product being ordered',
                },
                quantity: {
                  type: 'number',
                  example: 3,
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
          status: {
            type: 'string',
            enum: Object.values(StatusEnum),
            example: 'concluded',
            description: 'New status for the order',
          },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Order successfully updated.',
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
                      example: 3,
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
                example: 897,
                description: 'Total order amount in cents',
              },
              status: {
                type: 'string',
                enum: Object.values(StatusEnum),
                example: 'concluded',
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                example: '2025-03-22T10:40:50.775Z',
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
                example: '2025-03-22T10:45:22.123Z',
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
            invalidStatus: {
              value: {
                message:
                  'Status must be one of the following values: pending, concluded, cancelled',
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
                  'Cannot complete order: Insufficient stock for product Potato Chips.',
                error: 'Bad Request',
                statusCode: 400,
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Order not found.',
      content: {
        'application/json': {
          example: {
            message: 'Order with ID 507f1f77bcf86cd799439021 not found',
            error: 'Not Found',
            statusCode: 404,
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
