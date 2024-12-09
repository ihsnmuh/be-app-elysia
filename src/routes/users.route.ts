import { Elysia } from "elysia";

//* Chaining method Users
export const usersRoutes = new Elysia({ prefix: "/users" })

	// Get All user
	.get(
		"/",
		() => {
			console.log("get all users");
			return {
				message: "Get All Users",
			};
		},
		{
			// local hook on route /user
			beforeHandle() {
				console.log("Local hooks only on /user");
			},
		},
	)
	// Get user by Id
	.get("/:id", ({ params }) => {
		const id = params.id;

		return {
			message: `Get user by ID ${id}`,
		};
	});
