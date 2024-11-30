import { Elysia } from "elysia";
import { todosRoutes } from "./routes/todos.route";
import { usersRoutes } from "./routes/users.route";

//* Chaining method
const app = new Elysia()
  // This is example for implement global Hooks
  .onBeforeHandle(({ headers, set }) => {
    const { authorization } = headers;
    // example use for validation / checking headers, token, etc
    console.log("Global before hooks");

    if (authorization !== "MyToken") {
      set.status = 401;
      return {
        message: "You dont have access",
      };
    }

    return {
      message: "stop at hook before handle",
    };
  })

  .onAfterHandle(() => {
    console.log("Global After handle hooks");
    return {
      message: "After handle",
    };
  })

  //* Routes Todos
  .use(todosRoutes)
  .use(usersRoutes)

  //* This is Runner
  .listen(process.env.PORT as string);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
