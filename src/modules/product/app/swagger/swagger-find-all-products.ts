import { applyDecorators } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CategoryEnum } from '../enums/category-enum';

export const SwaggerFindAllProducts = () =>
  applyDecorators(
    ApiQuery({
      name: 'category',
      required: false,
      description: 'Filter products by category',
      enum: CategoryEnum,
    }),
    ApiQuery({
      name: 'name',
      required: false,
      description: 'Filter products by name (case-insensitive, partial match)',
      type: String,
    }),
    ApiQuery({
      name: 'minPrice',
      required: false,
      description:
        'Filter products with price greater than or equal to this value (in cents)',
      type: Number,
    }),
    ApiQuery({
      name: 'maxPrice',
      required: false,
      description:
        'Filter products with price less than or equal to this value (in cents)',
      type: Number,
    }),
    ApiQuery({
      name: 'inStock',
      required: false,
      description: 'Filter products that are in stock (quantityInStock > 0)',
      type: Boolean,
    }),
    ApiResponse({
      status: 200,
      description: 'List of products',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
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
          examples: {
            multipleProducts: {
              value: [
                {
                  id: '507f1f77bcf86cd799439011',
                  name: 'Potato Chips',
                  category: 'snack',
                  price: 299,
                  description: 'Crunchy potato chips with sea salt',
                  imageUrl: 'https://example.com/images/potato-chips.jpg',
                  quantityInStock: 100,
                  createdAt: '2025-03-22T10:40:50.775Z',
                  updatedAt: '2025-03-22T10:40:50.775Z',
                },
                {
                  id: '507f1f77bcf86cd799439012',
                  name: 'Chocolate Bar',
                  category: 'snack',
                  price: 199,
                  description: 'Delicious milk chocolate bar',
                  imageUrl: 'https://example.com/images/chocolate-bar.jpg',
                  quantityInStock: 50,
                  createdAt: '2025-03-22T10:41:22.123Z',
                  updatedAt: '2025-03-22T10:41:22.123Z',
                },
              ],
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
