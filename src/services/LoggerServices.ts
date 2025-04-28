export interface Logger<T> {
  log(item: T): void;
}

export class ConsoleLogger<T> implements Logger<T> {
  log(item: T): void {
    console.log("LOG:", JSON.stringify(item, null, 3));
  }
}
