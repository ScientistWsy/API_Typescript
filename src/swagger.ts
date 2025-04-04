import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

/**
 * Configuração do Swagger para gerar a documentação da API.
 */
const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0', // Especifica que estamos usando OpenAPI 3.0
    info: {
      title: 'Minha API',  // Título da API
      version: '1.0.0',    // Versão da API
      description: 'API RESTful para gerenciar recursos do sistema.',
    },
    servers: [
      {
        url: 'http://localhost:3000/api', // URL base para a API
      },
    ],
  },
  // Caminho para os arquivos de rota
  apis: ['./src/routes/*.ts'], // Aqui você pode apontar para as rotas onde os comentários Swagger estão
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app: any) => {
  // Rota para acessar a documentação Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default swaggerSpec;
