import Elysia, { t } from "elysia";
import { authServices, noteServices } from "../../application/instance";

export const noteRouter = new Elysia({ prefix: "/v1/note" })
	.derive(async ({ headers }) => {
		const sessionId = headers.authorization?.split(" ")[1]; //* Bearer authorization

		if (!sessionId) {
			throw new Error("Error!");
		}

		const user = await authServices.decodeSession(sessionId);

		return user;
	})
	//* Get all Notes
	.get("/", async ({ user }) => {
		const notes = await noteServices.getAll(user.id);
		return notes;
	})

	.get("/:id", async ({ params }) => {
		const note = await noteServices.getOne(params.id);
		return note;
	})

	//* Create Note
	.post(
		"/",
		async ({ body, user }) => {
			const { title, content } = body;

			const createNote = await noteServices.create({
				title,
				content,
				authorId: user.id,
			});
			return createNote;
		},
		{
			body: t.Object({
				title: t.String(),
				content: t.String(),
			}),
		},
	)

	//* update Note
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
				title: t.String(),
				content: t.String(),
			}),
		},
	)

	// * Delete
	.delete("/:id", async ({ params }) => {
		await noteServices.delete(params.id);
	});
