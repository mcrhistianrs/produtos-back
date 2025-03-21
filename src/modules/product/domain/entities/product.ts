import { Types } from 'mongoose';

enum CategoryEnum {
  FOOD = 'food',
  BEVERAGE = 'beverage',
  SNACK = 'snack',
}

interface ProductFields {
  _id?: string;
  name: string;
  category: CategoryEnum;
  price: number;
  description: string;
  imageUrl: string;
  quantityInStock: number;
}

class Product {
  constructor(
    private fields: ProductFields,
    id?: string,
  ) {
    this.fields = {
      ...fields,
      _id: id || fields._id || new Types.ObjectId().toString(),
    };
  }

  static create(fields: ProductFields, id?: string) {
    return new Product(fields, id);
  }

  get id(): string {
    return this.fields._id;
  }

  get name(): string {
    return this.fields.name;
  }
  set name(name: string) {
    this.fields.name = name;
  }

  get category(): CategoryEnum {
    return this.fields.category;
  }
  set category(category: CategoryEnum) {
    this.fields.category = category;
  }

  get price(): number {
    return this.fields.price;
  }
  set price(price: number) {
    this.fields.price = price;
  }

  get description(): string {
    return this.fields.description;
  }
  set description(description: string) {
    this.fields.description = description;
  }

  get imageUrl(): string {
    return this.fields.imageUrl;
  }
  set imageUrl(imageUrl: string) {
    this.fields.imageUrl = imageUrl;
  }

  get quantityInStock(): number {
    return this.fields.quantityInStock;
  }
  set quantityInStock(quantityInStock: number) {
    this.fields.quantityInStock = quantityInStock;
  }
}

export { CategoryEnum, Product };
