"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripExtension = stripExtension;
/**
 * @example "weather.wsdl" -> "weather"
 */
function stripExtension(filename) {
    return filename.split(".").slice(0, -1).join(".");
}
//# sourceMappingURL=file.js.map