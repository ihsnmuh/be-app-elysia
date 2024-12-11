import Elysia, { t } from "elysia";
import { UploadError } from "../../infrastructure/entity/error";

export const uploadRouter = new Elysia({ prefix: "/v1" })
	// * Upload Image
	.post(
		"/upload",
		async ({ body, set }) => {
			try {
				const { image, location } = body;
				const imageName = image.name;
				const imageSize = image.size;
				const imageType = image.type;

				// Validate file type
				if (
					imageType !== "image/png" &&
					imageType !== "image/jpeg" &&
					imageType !== "image/jpg"
				) {
					set.status = 415;
					throw new UploadError("Image type not supported");
				}

				// Validate file size
				if (imageSize > 500000) {
					throw new UploadError("Size exceeds 500KB");
				}

				const uploadPath = `./public/images/${location}/${imageName.toLowerCase()}`;

				// Save the file
				await Bun.write(uploadPath, image);

				return {
					imageLink: `/public/images/${location}/${imageName.toLowerCase()}`,
				};
			} catch (error) {
				set.status = 500;

				if (error instanceof UploadError) {
					throw error;
				}

				throw new UploadError(
					error instanceof Error ? error.message : "Something went wrong!",
				);
			}
		},
		{
			body: t.Object({
				image: t.File(),
				location: t.String(),
			}),
		},
	);
