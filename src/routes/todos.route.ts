import { Elysia, t } from "elysia";

//* Chaining method Todos
export const todosRoutes = new Elysia({ prefix: "/todos" })

  // Global hooks on todos route
  .onBeforeHandle(() => {
    console.log("Local Hooks on todos");
  })

  // Get All todos
  .get("/", ({ cookie: { token }, query }) => {
    console.log(query, "<< read query");

    // example to set cookie like token
    token.set({
      value: "ini contoh token",
      expires: new Date(new Date().getDate() + 1),
      httpOnly: true,
    });

    return {
      message: "Get All Todos",
    };
  })
  // Get Todo by Id
  .get("/:id", ({ params }) => {
    const id = params.id;

    return {
      message: `Get todo by ID ${id}`,
    };
  })

  .post(
    "/",
    ({ body, headers, set }) => {
      console.log(headers, "<< get all headers");

      // set status
      set.status = 200;

      return {
        message: "You are create Todo",
        body,
      };
    },
    {
      // This is Schema Guard
      body: t.Object({
        todo: t.String(),
        userId: t.Number(),
      }),
    },
  );
