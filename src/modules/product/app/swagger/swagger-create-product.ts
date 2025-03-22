import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { CategoryEnum } from '../enums/category-enum';

export const SwaggerCreateProduct = () =>
  applyDecorators(
    ApiBody({
      description: 'Product creation payload',
      schema: {
        type: 'object',
        required: [
          'name',
          'category',
          'price',
          'description',
          'imageUrl',
          'quantityInStock',
        ],
        properties: {
          name: {
            type: 'string',
            example: 'Potato Chips',
          },
          category: {
            type: 'string',
            enum: Object.values(CategoryEnum),
            example: 'snack',
          },
          price: {
            type: 'number',
            example: 299,
            description: 'The price of the product in cents',
          },
          description: {
            type: 'string',
            example: 'Crunchy potato chips with sea salt',
          },
          imageUrl: {
            type: 'string',
            example: 'https://example.com/images/potato-chips.jpg',
          },
          quantityInStock: {
            type: 'number',
            example: 100,
          },
        },
      },
    }),
    ApiResponse({
      status: 201,
      description: 'Product successfully created.',
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
                example: 'Potato Chips',
              },
              category: {
                type: 'string',
                enum: Object.values(CategoryEnum),
                example: 'snack',
              },
              price: {
                type: 'number',
                example: 299,
              },
              description: {
                type: 'string',
                example: 'Crunchy potato chips with sea salt',
              },
              imageUrl: {
                type: 'string',
                example: 'https://example.com/images/potato-chips.jpg',
              },
              quantityInStock: {
                type: 'number',
                example: 100,
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
            invalidName: {
              value: {
                message: 'Name should not be empty',
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
            invalidPrice: {
              value: {
                message: 'Price must be a positive number',
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
