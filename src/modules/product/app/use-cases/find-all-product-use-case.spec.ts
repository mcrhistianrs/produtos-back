import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CategoryEnum, Product } from '../../domain/entities/product';
import { IProductDAO } from '../../domain/interface/interface-product';
import { FindAllDto } from '../dto/find-all-dto';
import { ProductMapper } from '../mapper/product-mapper';
import { FindAllProductUseCase } from './find-all-product-use-case';
describe('FindAllProductUseCase', () => {
  let sut: FindAllProductUseCase;
  let productDAO: IProductDAO;

  const mockProducts = [
    {
      _id: new Types.ObjectId(),
      name: 'Product 1',
      category: CategoryEnum.SNACK,
      price: 299,
      description: 'Description 1',
      imageUrl: 'https://example.com/image1.jpg',
      quantityInStock: 10,
    },
    {
      _id: new Types.ObjectId(),
      name: 'Product 2',
      category: CategoryEnum.BEVERAGE,
      price: 399,
      description: 'Description 2',
      imageUrl: 'https://example.com/image2.jpg',
      quantityInStock: 10,
    },
  ];

  const mockProductDomain = [
    Product.create({
      name: 'Product 1',
      category: CategoryEnum.SNACK,
      price: 299,
      description: 'Description 1',
      imageUrl: 'https://example.com/image1.jpg',
      quantityInStock: 10,
    }),
    Product.create({
      name: 'Product 2',
      category: CategoryEnum.BEVERAGE,
      price: 399,
      description: 'Description 2',
      imageUrl: 'https://example.com/image2.jpg',
      quantityInStock: 10,
    }),
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllProductUseCase,
        {
          provide: 'ProductDAO',
          useValue: {
            findAll: vi.fn().mockResolvedValue(mockProducts),
          },
        },
      ],
    }).compile();

    sut = module.get<FindAllProductUseCase>(FindAllProductUseCase);
    productDAO = module.get<IProductDAO>('ProductDAO');
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('execute', () => {
    it('should return all products without filters', async () => {
      const input = new FindAllDto();

      vi.spyOn(ProductMapper, 'toDomain')
        .mockReturnValueOnce(mockProductDomain[0])
        .mockReturnValueOnce(mockProductDomain[1]);

      const result = await sut.execute(input);

      expect(productDAO.findAll).toHaveBeenCalledWith({}, undefined);
      expect(ProductMapper.toDomain).toHaveBeenCalledTimes(2);
      expect(result).toEqual(mockProductDomain);
    });

    it('should apply name filter correctly', async () => {
      const input = new FindAllDto();
      input.name = 'Product';

      vi.spyOn(ProductMapper, 'toDomain')
        .mockReturnValueOnce(mockProductDomain[0])
        .mockReturnValueOnce(mockProductDomain[1]);

      const result = await sut.execute(input);

      expect(productDAO.findAll).toHaveBeenCalledWith(
        { name: 'Product' },
        undefined,
      );
      expect(result).toEqual(mockProductDomain);
    });

    it('should apply price range filters correctly', async () => {
      const input = new FindAllDto();
      input.priceFrom = 200;
      input.priceTo = 400;

      vi.spyOn(ProductMapper, 'toDomain')
        .mockReturnValueOnce(mockProductDomain[0])
        .mockReturnValueOnce(mockProductDomain[1]);

      const result = await sut.execute(input);

      expect(productDAO.findAll).toHaveBeenCalledWith(
        { priceFrom: 200, priceTo: 400 },
        undefined,
      );
      expect(result).toEqual(mockProductDomain);
    });

    it('should apply order correctly', async () => {
      const input = new FindAllDto();
      input.orderField = 'name';
      input.orderDirection = 'asc';

      vi.spyOn(ProductMapper, 'toDomain')
        .mockReturnValueOnce(mockProductDomain[0])
        .mockReturnValueOnce(mockProductDomain[1]);

      const result = await sut.execute(input);

      expect(productDAO.findAll).toHaveBeenCalledWith(
        {},
        { field: 'name', order: 'asc' },
      );
      expect(result).toEqual(mockProductDomain);
    });

    it('should default to asc order when orderField is provided without direction', async () => {
      const input = new FindAllDto();
      input.orderField = 'price';

      vi.spyOn(ProductMapper, 'toDomain')
        .mockReturnValueOnce(mockProductDomain[0])
        .mockReturnValueOnce(mockProductDomain[1]);

      const result = await sut.execute(input);

      expect(productDAO.findAll).toHaveBeenCalledWith(
        {},
        { field: 'price', order: 'asc' },
      );
      expect(result).toEqual(mockProductDomain);
    });

    it('should apply both filter and order together', async () => {
      const input = new FindAllDto();
      input.name = 'Product';
      input.priceFrom = 300;
      input.orderField = 'price';
      input.orderDirection = 'desc';

      vi.spyOn(ProductMapper, 'toDomain')
        .mockReturnValueOnce(mockProductDomain[0])
        .mockReturnValueOnce(mockProductDomain[1]);

      const result = await sut.execute(input);

      expect(productDAO.findAll).toHaveBeenCalledWith(
        { name: 'Product', priceFrom: 300 },
        { field: 'price', order: 'desc' },
      );
      expect(result).toEqual(mockProductDomain);
    });

    it('should throw an error if fetching products fails', async () => {
      vi.spyOn(productDAO, 'findAll').mockRejectedValue(
        new Error('Database error'),
      );

      await expect(sut.execute(new FindAllDto())).rejects.toThrow(
        'Database error',
      );
    });
  });
});
