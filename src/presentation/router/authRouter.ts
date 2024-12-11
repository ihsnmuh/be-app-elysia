import Elysia, { t } from "elysia";
import { authServices } from "../../application/instance";

export const authRouter = new Elysia({ prefix: "/v1" })
	// routes

	//* Register
	.post(
		"/register",
		async ({ body, set }) => {
			try {
				const newUser = await authServices.registerUser(
					body.name,
					body.email,
					body.password,
				);

				set.status = 201;
				return newUser;
			} catch (error) {
				set.status = 500;

				if (error instanceof Error) {
					throw new Error(error.message);
				}

				throw new Error("Something went wrong!");
			}
		},
		{
			// schema guard
			body: t.Object({
				name: t.String({ minLength: 3 }),
				email: t.String({ format: "email" }),
				password: t.String({ minLength: 8 }),
			}),
		},
	)

	//* Login
	.post(
		"/login",
		async ({ body, set }) => {
			try {
				const session = await authServices.loginUser(body.email, body.password);

				set.status = 200;
				return { sessionId: session.id };
			} catch (error) {
				set.status = 500;

				if (error instanceof Error) {
					throw new Error(error.message);
				}

				throw new Error("Something went wrong!");
			}
		},
		{
			body: t.Object({
				email: t.String({ format: "email" }),
				password: t.String({ minLength: 8 }),
			}),
		},
	)

	//* Check session
	.post(
		"/session",
		async ({ body, set }) => {
			try {
				const sessionId = body.sessionId;

				const isValid = await authServices.checkSession(sessionId);

				if (isValid !== "valid") {
					set.status = 401;
					return { status: "invalid" };
				}

				return { status: "valid" };
			} catch (error) {
				set.status = 500;

				if (error instanceof Error) {
					throw new Error(error.message);
				}

				throw new Error("Something went wrong!");
			}
		},
		{
			body: t.Object({
				sessionId: t.String(),
			}),
		},
	);
