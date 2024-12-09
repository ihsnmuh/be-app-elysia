import type { PrismaClient } from "@prisma/client";
import type { IUser, TCreateUser, TUpdateUser } from "../entity/interface";
import "reflect-metadata";
import { injectable, inject, id } from "inversify";
import { TYPES } from "../entity/type";

@injectable()
export class UserRepository implements IUser {
	private prisma: PrismaClient;

	constructor(@inject(TYPES.prisma) prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async getAll() {
		const users = await this.prisma.user.findMany();
		return users;
	}

	async getOne(userIdOrEmail: string) {
		const user = await this.prisma.user.findFirst({
			where: {
				OR: [
					{
						id: userIdOrEmail,
					},
					{
						email: userIdOrEmail,
					},
				],
			},
		});

		return user;
	}

	async create(data: TCreateUser) {
		const newUser = await this.prisma.user.create({
			data,
		});

		return newUser;
	}

	async update(idUser: string, data: TUpdateUser) {
		const updateUser = await this.prisma.user.update({
			where: {
				id: idUser,
			},
			data,
		});

		return updateUser;
	}

	async delete(idUser: string) {
		await this.prisma.user.delete({
			where: {
				id: idUser,
			},
		});
	}
}
