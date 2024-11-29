import { Elysia } from "elysia";

//* Chaining method Todos
export const todosRoutes = new Elysia({ prefix: "/todos" })

  // Get All todos
  .get("/", () => {
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

  .post("/", ({ body }) => {
    return {
      message: "You are create Todo",
      body,
    };
  });
