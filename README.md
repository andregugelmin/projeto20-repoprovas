# <p align = "center"> repoprovas-back </p>

<p align="center">
   <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f5c3-fe0f.svg" width="110"/>
</p>

<div align="center">
  <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/JWT-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink" height="30px"/>
</div>


##  :clipboard: Descrição

RepoProvas é um sistema de compartilhamento de provas entre estudantes onde qualquer pessoa pode procurar provas antigas de suas disciplinas e professores ou enviar provas antigas para ajudar os calouros

***

## :computer:	 Tecnologias e Conceitos

- REST APIs
- JWTs & refresh tokens
- Node.js
- TypeScript
- PostgreSQL com Prisma
- Jest e supertest

***

## :rocket: Rotas

```yml
POST /sign-up
    - Rota para cadastrar um novo usuário
    - headers: {}
    - body:{        
        "email": "lorem@gmail.com",
        "password": "loremipsum"
        "confirmPassword": "loremipsum"
    }
```
    
```yml 
POST /sign-in
    - Rota para fazer login
    - headers: {}
    - body: {
        "email": "lorem@gmail.com",
        "senha": "loremipsum"
      }
```
    
```yml 
GET /tests/disciplines (autenticada)
    - Rota para listar todos as provas ordenadas por período e disciplina
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /tests/teachers (autenticada)
    - Rota para listar todos as provas ordenadas por professor/professora
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml
POST /test (autenticada)
    - Rota para inserir uma nova prova
    - headers: { "Authorization": "Bearer $token" }
      body: {
          "name": "Lorem ipsum",
          "pdfUrl": "https://loremipsum.com",
          "category": "loremipsum",
          "discipline": "LoremScript",
          "teacher": "Lorem Silva"
      }    
     
```

***
