import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        tags: [
            {
                name: "Products",
                description: "Endpoints for products",
            },
        ],
        info: {
            title: "REST API with express and typescript",
            version: "1.0.0",
            description: "API docs for Products",
        },
    },
    apis: ["./src/router.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptios: SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url('https://pantherahub.com/images/logos/logo-white.svg');
            height: 35px;
            width: auto;
        }
    `,
    customSiteTitle: "REST API with express and typescript",
};

export default swaggerSpec;
export { swaggerUiOptios };
