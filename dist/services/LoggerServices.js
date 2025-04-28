"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
class ConsoleLogger {
    log(item) {
        console.log("LOG:", JSON.stringify(item, null, 2));
    }
}
exports.ConsoleLogger = ConsoleLogger;
