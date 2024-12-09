import type { PrismaClient, Session } from "@prisma/client";
import type { ISession } from "../entity/interface";
import "reflect-metadata";
import { TYPES } from "../entity/type";
import { inject, injectable } from "inversify";

@injectable()
export class SessionRepository implements ISession {
	private prisma: PrismaClient;

	constructor(@inject(TYPES.prisma) prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async getOne(sessionId: string) {
		const session = await this.prisma.session.findUnique({
			where: {
				id: sessionId,
			},
		});

		return session;
	}

	async create(userId: string) {
		const createSession = await this.prisma.session.create({
			data: {
				user: {
					connect: {
						id: userId,
					},
				},
			},
		});

		return createSession;
	}

	async delete(sessionId: string) {
		await this.prisma.session.delete({
			where: {
				id: sessionId,
			},
		});
	}
}
