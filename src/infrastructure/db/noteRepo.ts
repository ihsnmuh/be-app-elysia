import { Prisma, type Note, type PrismaClient } from "@prisma/client";
import type { INote, TCreateNote, TUpdateNote } from "../entity/interface";
import "reflect-metadata";
import { injectable, inject } from "inversify";
import { TYPES } from "../entity/type";
import { DBError } from "../entity/error";

@injectable()
export class NoteRepository implements INote {
	private prisma: PrismaClient;

	constructor(@inject(TYPES.prisma) prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async getAll(userId: string) {
		try {
			const notes = await this.prisma.note.findMany({
				where: {
					authorId: userId,
				},
			});
			return notes;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new DBError("Error getting resource from DB");
			}

			throw new DBError("Something went wrong while doing DB operation");
		}
	}

	async getOne(noteId: string) {
		try {
			const note = await this.prisma.note.findUnique({
				where: {
					id: noteId,
				},
			});

			if (!note) {
				throw new DBError("Something went wrong while doing DB operation");
			}

			return note;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new DBError("Error getting resource from DB");
			}

			throw new DBError("Something went wrong while doing DB operation");
		}
	}

	async create(data: TCreateNote) {
		try {
			const createNote = await this.prisma.note.create({
				data,
			});

			return createNote;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new DBError("Error getting resource from DB");
			}

			throw new DBError("Something went wrong while doing DB operation");
		}
	}

	async update(noteId: string, data: TUpdateNote) {
		try {
			const updateNote = await this.prisma.note.update({
				where: {
					id: noteId,
				},
				data,
			});

			return updateNote;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new DBError("Error getting resource from DB");
			}

			throw new DBError("Something went wrong while doing DB operation");
		}
	}

	async delete(noteId: string) {
		try {
			await this.prisma.note.delete({
				where: {
					id: noteId,
				},
			});
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new DBError("Error getting resource from DB");
			}

			throw new DBError("Something went wrong while doing DB operation");
		}
	}
}
