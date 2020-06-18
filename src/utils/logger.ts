interface Logger {
  log(...args: any[]): void;

  debug(...args: any[]): void;

  warn(...args: any[]): void;

  error(...args: any[]): void;

  getLogger(prefix: string): Logger
}

const internalLogger = {
  debug(...args: any[]): void {
    console.debug(...args);
  },
  error(...args: any[]): void {
    console.error(...args);
  },
  log(...args: any[]): void {
    console.log(...args);
  },
  warn(...args: any[]): void {
    console.warn(...args);
  },
};

class LoggerImpl implements Logger {

  constructor(
    private prefix?: string,
  ) {
  }

  debug(...args: any[]): void {
    internalLogger.debug(...this.addPrefix(...args));
  }

  error(...args: any[]): void {
    internalLogger.error(...this.addPrefix(...args));
  }

  log(...args: any[]): void {
    internalLogger.log(...this.addPrefix(...args));
  }

  warn(...args: any[]): void {
    internalLogger.warn(...this.addPrefix(...args));
  }

  private addPrefix(...args: any[]): any[] {
    return this.prefix ? [this.prefix + ':', ...args] : args;
  }

  getLogger(prefix: string): Logger {
    const p = this.prefix ? this.prefix + '.' + prefix : prefix;
    return new LoggerImpl(p);
  }
}

const logger = new LoggerImpl();

export default logger as Logger;

