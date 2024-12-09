import type { Note, PrismaClient } from "@prisma/client";
import type { INote, TCreateNote, TUpdateNote } from "../entity/interface";
import "reflect-metadata";
import { injectable, inject } from "inversify";
import { TYPES } from "../entity/type";

@injectable()
export class NoteRepository implements INote {
	private prisma: PrismaClient;

	constructor(@inject(TYPES.prisma) prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async getAll(userId: string) {
		const notes = await this.prisma.note.findMany({
			where: {
				authorId: userId,
			},
		});
		return notes;
	}

	async getOne(noteId: string) {
		const note = await this.prisma.note.findUnique({
			where: {
				id: noteId,
			},
		});

		return note;
	}

	async create(data: TCreateNote) {
		const createNote = await this.prisma.note.create({
			data,
		});

		return createNote;
	}

	async update(noteId: string, data: TUpdateNote) {
		const updateNote = await this.prisma.note.update({
			where: {
				id: noteId,
			},
			data,
		});

		return updateNote;
	}

	async delete(noteId: string) {
		await this.prisma.note.delete({
			where: {
				id: noteId,
			},
		});
	}
}
