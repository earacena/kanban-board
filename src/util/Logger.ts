/* eslint-disable no-console */
class Logger {
  env: string;

  constructor(env: string | undefined) {
    this.env = env ?? 'production';
  }

  log(message: string): void {
    if (this.isDevEnv()) {
      console.log(message);
    }
  }

  isDevEnv(): boolean {
    const validDevEnvs = [
      'testing',
      'development',
    ];

    return validDevEnvs.includes(this.env);
  }
}

const reactEnv: string | undefined = process.env.REACT_APP_ENV;
const logger = new Logger(reactEnv);

export default logger;
