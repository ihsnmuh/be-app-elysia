import type { NoteRepository } from "../../infrastructure/db/noteRepo";
import type { TCreateNote } from "../../infrastructure/entity/interface";

export class NoteServices {
	private noteRepo: NoteRepository;

	constructor(noteRepo: NoteRepository) {
		this.noteRepo = noteRepo;
	}

	async getAll(userId: string) {
		const notes = await this.noteRepo.getAll(userId);

		return notes;
	}

	async getOne(noteId: string) {
		const note = await this.noteRepo.getOne(noteId);

		return note;
	}

	async create(data: TCreateNote) {
		const newNote = await this.noteRepo.create(data);

		return newNote;
	}

	async update(noteId: string, data: TCreateNote) {
		const updateNote = await this.noteRepo.update(noteId, data);

		return updateNote;
	}

	async delete(noteId: string) {
		await this.noteRepo.delete(noteId);
	}
}
