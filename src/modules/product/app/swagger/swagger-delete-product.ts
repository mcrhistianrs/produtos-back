import { applyDecorators } from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';

export const SwaggerDeleteProduct = () =>
  applyDecorators(
    ApiParam({
      name: 'id',
      required: true,
      description: 'Product ID',
      example: '507f1f77bcf86cd799439011',
    }),
    ApiResponse({
      status: 204,
      description: 'Product successfully deleted.',
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
      status: 409,
      description: 'Product cannot be deleted',
      content: {
        'application/json': {
          example: {
            message:
              'Cannot delete product as it is referenced in existing orders',
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
