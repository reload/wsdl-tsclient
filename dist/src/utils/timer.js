"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeElapsed = timeElapsed;
/**
 * Convert `process.hrtime` to `ms`
 */
function timeElapsed(time) {
    return (time[0] * 1000000000 + time[1]) / 1000000;
}
//# sourceMappingURL=timer.js.map