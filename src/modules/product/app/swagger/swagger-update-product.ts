import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CategoryEnum } from '../enums/category-enum';

export const SwaggerUpdateProduct = () =>
  applyDecorators(
    ApiParam({
      name: 'id',
      required: true,
      description: 'Product ID',
      example: '507f1f77bcf86cd799439011',
    }),
    ApiBody({
      description: 'Product update payload',
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'Updated Potato Chips',
          },
          category: {
            type: 'string',
            enum: Object.values(CategoryEnum),
            example: 'snack',
          },
          price: {
            type: 'number',
            example: 349,
            description: 'The price of the product in cents',
          },
          description: {
            type: 'string',
            example: 'Delicious crunchy potato chips with sea salt and herbs',
          },
          imageUrl: {
            type: 'string',
            example: 'https://example.com/images/updated-potato-chips.jpg',
          },
          quantityInStock: {
            type: 'number',
            example: 120,
          },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Product successfully updated.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                example: '507f1f77bcf86cd799439011',
              },
              name: {
                type: 'string',
                example: 'Updated Potato Chips',
              },
              category: {
                type: 'string',
                enum: Object.values(CategoryEnum),
                example: 'snack',
              },
              price: {
                type: 'number',
                example: 349,
              },
              description: {
                type: 'string',
                example:
                  'Delicious crunchy potato chips with sea salt and herbs',
              },
              imageUrl: {
                type: 'string',
                example: 'https://example.com/images/updated-potato-chips.jpg',
              },
              quantityInStock: {
                type: 'number',
                example: 120,
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
            invalidPrice: {
              value: {
                message: 'Price must be a positive number',
                error: 'Bad Request',
                statusCode: 400,
              },
            },
            invalidCategory: {
              value: {
                message:
                  'Category must be one of the following values: snack, drink, meal, dessert',
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
      description: 'Product not found.',
      content: {
        'application/json': {
          example: {
            message: 'Product with ID 507f1f77bcf86cd799439011 not found',
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
