import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import { authRouter } from "./presentation/router/authRouter";
import { noteRouter } from "./presentation/router/noteRouter";
import { uploadRouter } from "./presentation/router/uploadRouter";
import cors from "@elysiajs/cors";
import staticPlugin from "@elysiajs/static";

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
			.use(uploadRouter)
			.use(authRouter)
			.use(noteRouter),
	)

	// Serve the "public" directory as static files
	.use(staticPlugin())

	//* This is Runner
	.listen(process.env.PORT as string);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
