import { Elysia } from "elysia";
// import { todosRoutes } from "./routes/todos.route";
// import { usersRoutes } from "./routes/users.route";
import swagger from "@elysiajs/swagger";
// import { notesRoutes } from "./routes/notes.route";
import { authRouter } from "./presentation/router/authRouter";
import { noteRouter } from "./presentation/router/noteRouter";
import cors from "@elysiajs/cors";

//* Chaining method only
const app = new Elysia()

	.use(cors())

	// swagger plugin handler
	.use(
		swagger({
			path: "/docs",
			// set config for setup swagger
			// more info on https://github.com/scalar/scalar/blob/main/documentation/configuration.md
			scalarConfig: {
				defaultHttpClient: {
					targetKey: "javascript",
					clientKey: "fetch",
				},
			},
		}),
	)

	// Group /api
	.group("/api", (app) =>
		app
			//* Routes
			.use(authRouter)
			.use(noteRouter),
	)

	//* This is Runner
	.listen(process.env.PORT as string);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
