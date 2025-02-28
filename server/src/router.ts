import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateAvailable,
    updateProduct,
} from "./handlers/product";
import { handleInputErrors } from "./middleware";
import { body, param } from "express-validator";
import { productValidations } from "./validators/productValidations";

const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The auto-generated id of the product
 *                  example: 1
 *              name:
 *                  type: string
 *                  description: The name of the product
 *                  example: Samsung TV
 *              price:
 *                  type: number
 *                  description: The price of the product
 *                  example: 2000
 *              available:
 *                  type: boolean
 *                  description: The availability of the product
 *                  example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *      summary: Get all products
 *      tags: [Products]
 *      description: Get all products
 *      responses:
 *          200:
 *              description: The list of the products
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 */
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get product by id
 *      tags: [Products]
 *      description: Get product by id
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The product id
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: The product description by id
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: The product was not found
 *          400:
 *              description: The id must be an integer
 */
router.get(
    "/:id",
    param("id").isInt().withMessage("Id must be an integer"),
    handleInputErrors,
    getProductById
);

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Create a product
 *      tags: [Products]
 *      description: Create a product
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: The name of the product
 *                              example: Samsung TV
 *                          price:
 *                              type: number
 *                              description: The price of the product
 *                              example: 2000
 *      responses:
 *          201:
 *              description: The product was successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: The id must be an integer
 */
router.post("/", productValidations, handleInputErrors, createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Update a product
 *      tags: [Products]
 *      description: Update a product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The product id
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: The name of the product
 *                              example: Samsung TV
 *                          price:
 *                              type: number
 *                              description: The price of the product
 *                              example: 2000
 *                          available:
 *                              type: boolean
 *                              description: The availability of the product
 *                              example: true
 *      responses:
 *          200:
 *              description: The product was successfully updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: The id must be an integer
 *          404:
 *              description: The product was not found
 */
router.put(
    "/:id",
    param("id").isInt().withMessage("Id must be an integer"),
    productValidations,
    handleInputErrors,
    updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update availability
 *      tags: [Products]
 *      description: Update availability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The product id
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: The product was successfully updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: The id must be an integer
 *          404:
 *              description: The product was not found
 */
router.patch(
    "/:id",
    param("id").isInt().withMessage("Id must be an integer"),
    body("available")
        .optional()
        .isBoolean()
        .withMessage("available must be a boolean"),
    handleInputErrors,
    updateAvailable
);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Delete a product
 *      tags: [Products]
 *      description: Delete a product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The product id
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: The product was successfully deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: The product was successfully deleted
 *          400:
 *              description: The id must be an integer
 *          404:
 *              description: The product was not found
 */
router.delete(
    "/:id",
    param("id").isInt().withMessage("Id must be an integer"),
    handleInputErrors,
    deleteProduct
);

export default router;
