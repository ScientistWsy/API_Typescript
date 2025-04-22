# API Livros - Typescript + Express

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Esta é uma API RESTful simples para gerenciar livros e editoras, construída com **TypeScript**, **Node.js**, e **Express**. O projeto foi pensado para fins educativos e demonstra uma estrutura básica de API moderna, organizada, tipada e documentada com **Swagger**.

## Linguagens e Ferramentas

- **Typescript**
- **Express**
- **Node.js**
- **Docker**
- **PostgreSQL**
- **Swagger OpenAPI**


## API Rotas
<div align="center">
  <img src="https://github.com/user-attachments/assets/c00a659c-f580-43d1-b114-afc003022dd2" alt="APIRotas">
</div>

## Banco de Dados: PostgreSQL

O banco de dados foi configurado e está sendo executado em um contêiner Docker para facilitar o ambiente de desenvolvimento e garantir uma configuração limpa e isolada.

Configuração do PostgreSQL com Docker
Para rodar o banco de dados em um ambiente Docker, o projeto usa um container do PostgreSQL, que pode ser facilmente inicializado com o seguinte comando:

`docker-compose up -d`

Esse comando cria e executa o container com o PostgreSQL configurado. Os dados são persistidos em volumes Docker para garantir que não se percam após a parada do container.

## Estrutura do Banco de Dados

O banco de dados contém tabelas essenciais para o funcionamento da API, como Livros e Editoras. O esquema foi projetado para manter relações entre livros e suas respectivas editoras, proporcionando uma estrutura organizada e eficiente para realizar as operações CRUD (Criar, Ler, Atualizar, Excluir):

<div align="center">
  <img src="https://github.com/user-attachments/assets/86ae2071-73bf-4372-93f7-f391c7fbbacc"/>
</div>

---

## Contribuição 🤝

Este é um projeto de código aberto e adoraríamos receber contribuições da comunidade de desenvolvedores! Sinta-se à vontade para fazer fork deste repositório, trabalhar em melhorias e enviar pull requests para análise.

Se você encontrar problemas ou tiver sugestões, abra uma issue e teremos prazer em discuti-las.

Lembre-se de seguir as diretrizes de contribuição do projeto e respeitar o código de conduta.

Junte-se a nós para tornar este projeto ainda mais incrível!

---
