import { Elysia } from "elysia";
import { todosRoutes } from "./routes/todos.route";
import { usersRoutes } from "./routes/users.route";

//* Chaining method
const app = new Elysia()
  //* Routes Todos
  .use(todosRoutes)
  .use(usersRoutes)

  //* This is Runner
  .listen(process.env.PORT as string);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
