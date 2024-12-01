import { Elysia, t } from "elysia";

//* Chaining method Todos
export const todosRoutes = new Elysia({ prefix: "/todos" })

  // Using for passing data to other chain
  // for example each root need user data and derive can send the data
  // derive => hooks => handler
  .derive(({ headers }) => {
    console.log("derive", "<<");
    const { authorization } = headers;
    if (authorization === "Mytoken1") {
      return {
        username: "Abdul",
      };
    }

    if (authorization === "Mytoken2") {
      return {
        username: "Bambang",
      };
    }
  })

  // Global hooks on todos route
  .onBeforeHandle(() => {
    console.log("Local Hooks on todos");
  })

  // Get All todos
  .get("/", ({ cookie: { token }, query, username }) => {
    console.log(query, "<< read query");

    // example to set cookie like token
    token.set({
      value: "ini contoh token",
      expires: new Date(new Date().getDate() + 1),
      httpOnly: true,
    });

    return {
      message: "Get All Todos",
      username,
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
    }
  );
