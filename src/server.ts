import app from './app';
import swaggerUI from "swagger-ui-express"
import swaggerDocs from "./swagger.json"

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs))