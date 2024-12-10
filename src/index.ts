import { Elysia } from "elysia";
// import { todosRoutes } from "./routes/todos.route";
// import { usersRoutes } from "./routes/users.route";
import swagger from "@elysiajs/swagger";
// import { notesRoutes } from "./routes/notes.route";
import { authRouter } from "./presentation/router/authRouter";
import { noteRouter } from "./presentation/router/noteRouter";

//* Chaining method only
const app = new Elysia({ prefix: "/api" })

	// This is example for implement global Hooks
	.onBeforeHandle(({ headers, set }) => {
		// example use for validation / checking headers, token, etc
		// console.log("Global before hooks");
		// if (authorization !== "MyToken") {
		//   set.status = 401;
		//   return {
		//     message: "You dont have access",
		//   };
		// }
		// return {
		//   message: "stop at hook before handle",
		// };
	})

	.onAfterHandle(() => {
		// console.log("Global After handle hooks");
	})

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

	//* Routes
	.use(authRouter)
	.use(noteRouter)

	//! Route Test soon delete
	// .use(todosRoutes)
	// .use(usersRoutes)
	// .use(notesRoutes)

	//* This is Runner
	.listen(process.env.PORT as string);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
