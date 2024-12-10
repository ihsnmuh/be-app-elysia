import Elysia, { t } from "elysia";
import { authServices, noteServices } from "../../application/instance";
import { AuthorizationError } from "../../infrastructure/entity/error";

export const noteRouter = new Elysia({ prefix: "/v1/notes" })

	//* get session Id and sent to all routes
	.derive(async ({ headers }) => {
		const sessionId = headers.authorization?.split(" ")[1]; //* Bearer authorization

		if (!sessionId) {
			throw new AuthorizationError("SessionId not provided!");
		}

		const user = await authServices.decodeSession(sessionId);

		return user;
	})

	//* Get all Notes
	.get("/", async ({ user }) => {
		const notes = await noteServices.getAll(user.id);
		return notes;
	})

	//* Get Note by id
	.get("/:id", async ({ params }) => {
		const note = await noteServices.getOne(params.id);
		return note;
	})

	//* Create Note
	.post(
		"/",
		async ({ body, user, set }) => {
			const { title, content } = body;

			const createNote = await noteServices.create({
				title,
				content,
				authorId: user.id,
			});

			set.status = 201;
			return createNote;
		},
		{
			body: t.Object({
				title: t.String(),
				content: t.String(),
			}),
		},
	)

	//* update note
	.patch(
		"/:id",
		async ({ body, params }) => {
			const { title, content } = body;

			const updateNote = await noteServices.update(params.id, {
				title,
				content,
			});

			return updateNote;
		},
		{
			body: t.Object({
				title: t.Optional(t.String()),
				content: t.Optional(t.String()),
			}),
		},
	)

	// * Delete note
	.delete("/:id", async ({ params, set }) => {
		set.status = 204;
		await noteServices.delete(params.id);
	});
