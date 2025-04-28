"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger() {
    }
    ConsoleLogger.prototype.log = function (item) {
        console.log("LOG:", JSON.stringify(item, null, 2));
    };
    return ConsoleLogger;
}());
exports.ConsoleLogger = ConsoleLogger;
