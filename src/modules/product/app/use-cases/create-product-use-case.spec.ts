import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { CategoryEnum, Product } from '../../domain/entities/product';
import { IProductDAO } from '../../domain/interface/interface-product';
import { CreateProductDto } from '../dto/create-product-dto';
import { ProductMapper } from '../mapper/product-mapper';
import { CreateProductUseCase } from './create-product-use-case';

describe('CreateProductUseCase', () => {
  let sut: CreateProductUseCase;
  let productDAO: IProductDAO;

  const mockProductDTO: CreateProductDto = {
    name: 'Test Product',
    category: CategoryEnum.SNACK,
    price: 299,
    description: 'Test description',
    imageUrl: 'https://example.com/image.jpg',
    quantityInStock: 10,
  };

  const mockProduct = Product.create({
    name: 'Test Product',
    category: CategoryEnum.SNACK,
    price: 299,
    description: 'Test description',
    imageUrl: 'https://example.com/image.jpg',
    quantityInStock: 10,
  });

  const mockProductDocument = {
    _id: new Types.ObjectId(),
    name: 'Test Product',
    category: CategoryEnum.SNACK,
    price: 299,
    description: 'Test description',
    imageUrl: 'https://example.com/image.jpg',
    quantityInStock: 10,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductUseCase,
        {
          provide: 'ProductDAO',
          useValue: {
            create: vi.fn().mockResolvedValue(mockProductDocument),
          },
        },
      ],
    }).compile();

    sut = module.get<CreateProductUseCase>(CreateProductUseCase);
    productDAO = module.get<IProductDAO>('ProductDAO');
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('execute', () => {
    it('should create a product and return product', async () => {
      vi.spyOn(Product, 'create').mockReturnValue(mockProduct);
      vi.spyOn(ProductMapper, 'toDomain').mockReturnValue(mockProduct);
      vi.spyOn(ProductMapper, 'toOutput').mockReturnValue({
        id: mockProduct.id,
        name: mockProduct.name,
        category: mockProduct.category,
        price: mockProduct.price,
        description: mockProduct.description,
        imageUrl: mockProduct.imageUrl,
        quantityInStock: mockProduct.quantityInStock,
      });

      const result = await sut.execute(mockProductDTO);

      expect(Product.create).toHaveBeenCalledWith({
        name: mockProductDTO.name,
        category: mockProductDTO.category,
        price: mockProductDTO.price,
        description: mockProductDTO.description,
        imageUrl: mockProductDTO.imageUrl,
        quantityInStock: mockProductDTO.quantityInStock,
      });

      expect(productDAO.create).toHaveBeenCalledWith(mockProduct);
      expect(ProductMapper.toDomain).toHaveBeenCalledWith(mockProductDocument);
      expect(ProductMapper.toOutput).toHaveBeenCalled();

      expect(result).toEqual({
        id: mockProduct.id,
        name: mockProduct.name,
        category: mockProduct.category,
        price: mockProduct.price,
        description: mockProduct.description,
        imageUrl: mockProduct.imageUrl,
        quantityInStock: mockProduct.quantityInStock,
      });
    });

    it('should throw an error if product creation fails', async () => {
      vi.spyOn(Product, 'create').mockReturnValue(mockProduct);
      vi.spyOn(productDAO, 'create').mockRejectedValue(
        new Error('Database error'),
      );

      await expect(sut.execute(mockProductDTO)).rejects.toThrow(
        'Database error',
      );
    });
  });
});
