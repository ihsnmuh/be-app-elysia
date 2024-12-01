import { Elysia, t } from "elysia";
import { loggerProd } from "../utils/loggerProd";
import { loggerDev } from "../utils/loggerDev";

//* Chaining method Todos
export const todosRoutes = new Elysia({ prefix: "/todos" })

  // define custom methods, and all handler can use it
  // example for func logger you can pass as logger depend the env
  // configuration over hooks
  .decorate("logger", process.env.NODE_ENV === "prod" ? loggerProd : loggerDev)

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
  .get(
    "/",
    ({ cookie: { token }, query, username, logger }) => {
      console.log(query, "<< read query");

      // example to set cookie like token
      token.set({
        value: "ini contoh token",
        expires: new Date(new Date().getDate() + 1),
        httpOnly: true,
      });

      logger.info("Log info");

      return {
        message: "Get All Todos",
        username,
      };
    },
    {
      detail: {
        description: "For get all data todos",
        // Set Tag For swagger doc
        tags: ["todos"],
        // set schema response for swagger doc
        responses: {
          200: {
            description: "Get all data todos",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      todo: { type: "string" },
                      userNameId: { type: "number" },
                      createdAt: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    }
  )
  // Get Todo by Id
  .get(
    "/:id",
    ({ params }) => {
      const id = params.id;

      return {
        message: `Get todo by ID ${id}`,
      };
    },
    {
      detail: {
        tags: ["todos"],
      },
    }
  )

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
      detail: {
        tags: ["todos"],
      },
      // This is Schema Guard
      body: t.Object({
        todo: t.String(),
        userId: t.Number(),
      }),
    }
  );
