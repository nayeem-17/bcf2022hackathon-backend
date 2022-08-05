To use this repository,
- Create an `.env` file in the main directory and add this 
  ```bash
    PORT=8000
    DATABASE_URL=postgresql://postgres:pass@localhost:5432 # url of your test database 
    NODE_ENV=dev
    JWT_SECRET=U~A^O8vk510OZswgrvwwr4$%@&*(@)/*frwrgvwrs24422342w
  ```
- Run this command
  ```bash
  npm run push && npm run start
  ```