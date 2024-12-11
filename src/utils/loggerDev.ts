class LoggerDev {
	public info(message: string) {
		console.log(message);
	}

	public warn(message: string) {
		console.warn(message);
	}

	public error(message: string) {
		console.error(message);
	}
}

export const loggerDev = new LoggerDev();
