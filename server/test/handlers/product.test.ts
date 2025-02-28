import { Request, Response } from "express";
import * as productHandlers from "../../src/handlers/product";
import Product from "../../src/models/Product.model";

// Mock the Product model
jest.mock("../../src/models/Product.model", () => {
  return {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  };
});

describe("Product Handlers", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let resJsonSpy: jest.SpyInstance;
  let resStatusSpy: jest.SpyInstance;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    resJsonSpy = jest.spyOn(mockRes, "json");
    resStatusSpy = jest.spyOn(mockRes, "status");
    jest.clearAllMocks();
  });

  describe("getProducts", () => {
    it("should return all products", async () => {
      const mockProducts = [
        { id: 1, name: "Product 1", price: 100, available: true },
        { id: 2, name: "Product 2", price: 200, available: false }
      ];

      (Product.findAll as jest.Mock).mockResolvedValue(mockProducts);

      await productHandlers.getProducts(mockReq as Request, mockRes as Response);

      expect(Product.findAll).toHaveBeenCalledWith({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      expect(resJsonSpy).toHaveBeenCalledWith({ data: mockProducts });
    });

    it("should handle errors", async () => {
      const mockError = new Error("Database error");
      (Product.findAll as jest.Mock).mockRejectedValue(mockError);

      console.log = jest.fn(); // Mock console.log to prevent actual logging

      await productHandlers.getProducts(mockReq as Request, mockRes as Response);

      expect(console.log).toHaveBeenCalledWith(mockError);
    });
  });

  describe("getProductById", () => {
    it("should return a product when found", async () => {
      const mockProduct = { id: 1, name: "Product 1", price: 100, available: true };
      mockReq = { params: { id: "1" } };

      (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);

      await productHandlers.getProductById(mockReq as Request, mockRes as Response);

      expect(Product.findByPk).toHaveBeenCalledWith("1");
      expect(resJsonSpy).toHaveBeenCalledWith({ data: mockProduct });
    });

    it("should return 404 when product not found", async () => {
      mockReq = { params: { id: "999" } };

      (Product.findByPk as jest.Mock).mockResolvedValue(null);

      await productHandlers.getProductById(mockReq as Request, mockRes as Response);

      expect(resStatusSpy).toHaveBeenCalledWith(404);
      expect(resJsonSpy).toHaveBeenCalledWith({ error: "Product not found" });
    });
  });

  describe("createProduct", () => {
    it("should create a product successfully", async () => {
      const mockProductData = { name: "New Product", price: 300 };
      const mockCreatedProduct = { id: 3, ...mockProductData, available: true };

      mockReq = { body: mockProductData };
      (Product.create as jest.Mock).mockResolvedValue(mockCreatedProduct);

      await productHandlers.createProduct(mockReq as Request, mockRes as Response);

      expect(Product.create).toHaveBeenCalledWith(mockProductData);
      expect(resStatusSpy).toHaveBeenCalledWith(201);
      expect(resJsonSpy).toHaveBeenCalledWith({ data: mockCreatedProduct });
    });
  });

  describe("updateProduct", () => {
    it("should update a product when found", async () => {
      const mockProduct = {
        id: 1,
        name: "Old Name",
        price: 100,
        available: true,
        update: jest.fn(),
        save: jest.fn(),
      };

      const updateData = { name: "Updated Name", price: 150 };
      mockReq = { params: { id: "1" }, body: updateData };

      (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);

      await productHandlers.updateProduct(mockReq as Request, mockRes as Response);

      expect(Product.findByPk).toHaveBeenCalledWith("1");
      expect(mockProduct.update).toHaveBeenCalledWith(updateData);
      expect(mockProduct.save).toHaveBeenCalled();
      expect(resJsonSpy).toHaveBeenCalledWith({ data: mockProduct });
    });

    it("should return 404 when product not found for update", async () => {
      mockReq = { params: { id: "999" }, body: { name: "Updated Name" } };

      (Product.findByPk as jest.Mock).mockResolvedValue(null);

      await productHandlers.updateProduct(mockReq as Request, mockRes as Response);

      expect(resStatusSpy).toHaveBeenCalledWith(404);
      expect(resJsonSpy).toHaveBeenCalledWith({ error: "Product not found" });
    });
  });

  describe("updateAvailable", () => {
    it("should toggle availability when product found", async () => {
      const mockProduct = {
        dataValues: { available: true },
        available: true,
        save: jest.fn(),
      };

      mockReq = { params: { id: "1" } };

      (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);

      await productHandlers.updateAvailable(mockReq as Request, mockRes as Response);

      expect(Product.findByPk).toHaveBeenCalledWith("1");
      expect(mockProduct.available).toBe(false);  // Should toggle from true to false
      expect(mockProduct.save).toHaveBeenCalled();
      expect(resJsonSpy).toHaveBeenCalledWith({ data: mockProduct });
    });

    it("should return 404 when product not found for availability update", async () => {
      mockReq = { params: { id: "999" } };

      (Product.findByPk as jest.Mock).mockResolvedValue(null);

      await productHandlers.updateAvailable(mockReq as Request, mockRes as Response);

      expect(resStatusSpy).toHaveBeenCalledWith(404);
      expect(resJsonSpy).toHaveBeenCalledWith({ error: "Product not found" });
    });
  });

  describe("deleteProduct", () => {
    it("should delete a product when found", async () => {
      const mockProduct = {
        id: 1,
        name: "Product to delete",
        destroy: jest.fn(),
      };

      mockReq = { params: { id: "1" } };

      (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);

      await productHandlers.deleteProduct(mockReq as Request, mockRes as Response);

      expect(Product.findByPk).toHaveBeenCalledWith("1");
      expect(mockProduct.destroy).toHaveBeenCalled();
      expect(resJsonSpy).toHaveBeenCalledWith({ data: "Product deleted" });
    });

    it("should return 404 when product not found for deletion", async () => {
      mockReq = { params: { id: "999" } };

      (Product.findByPk as jest.Mock).mockResolvedValue(null);

      await productHandlers.deleteProduct(mockReq as Request, mockRes as Response);

      expect(resStatusSpy).toHaveBeenCalledWith(404);
      expect(resJsonSpy).toHaveBeenCalledWith({ error: "Product not found" });
    });
  });
});
