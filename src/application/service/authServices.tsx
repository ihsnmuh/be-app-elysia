import type { SessionRepository } from "../../infrastructure/db/sessionRepo";
import type { UserRepository } from "../../infrastructure/db/userRepo";

export class AuthServices {
	private userRepo: UserRepository;
	private sessionRepo: SessionRepository;

	constructor(userRepo: UserRepository, sessionRepo: SessionRepository) {
		this.userRepo = userRepo;
		this.sessionRepo = sessionRepo;
	}

	async registerUser(name: string, email: string, password: string) {
		// check collision => email/user available
		const user = await this.userRepo.getOne(email);

		// User Available
		if (user) {
			throw new Error("User Already Register");
		}

		// Create New User
		const hashedPassword = await Bun.password.hash(password);
		const newUser = await this.userRepo.create({
			name,
			email,
			password: hashedPassword,
			avatar: "",
		});

		return newUser;
	}

	async loginUser(email: string, password: string) {
		// check User
		const user = await this.userRepo.getOne(email);
		if (!user) {
			throw new Error("User not Found");
		}

		// mathing password
		const matchPassword = await Bun.password.verify(password, user.password);
		if (!matchPassword) {
			throw new Error("Invalid Credential");
		}

		// Create Session
		const createSession = await this.sessionRepo.create(user.id);

		return createSession;
	}
}
