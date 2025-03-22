import { applyDecorators } from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { CategoryEnum } from '../enums/category-enum';

export const SwaggerFindProductById = () =>
  applyDecorators(
    ApiParam({
      name: 'id',
      required: true,
      description: 'Product ID',
      example: '507f1f77bcf86cd799439011',
    }),
    ApiResponse({
      status: 200,
      description: 'Product found',
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
      status: 404,
      description: 'Product not found',
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
      status: 400,
      description: 'Invalid ID format',
      content: {
        'application/json': {
          example: {
            message: 'Invalid product ID format',
            error: 'Bad Request',
            statusCode: 400,
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
