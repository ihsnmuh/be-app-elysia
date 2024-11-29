import { Elysia } from "elysia";

//* Chaining method Users
export const usersRoutes = new Elysia({ prefix: "/users" })

  // Get All user
  .get("/", () => {
    return {
      message: "Get All Users",
    };
  })
  // Get user by Id
  .get("/:id", ({ params }) => {
    const id = params.id;

    return {
      message: `Get user by ID ${id}`,
    };
  });
