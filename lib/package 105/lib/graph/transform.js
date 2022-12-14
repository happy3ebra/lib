"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformFromPromise = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const transformFromPromise = (transformFn) => (0, rxjs_1.pipe)((0, operators_1.switchMap)(async (graph) => {
    const transformResult = await transformFn(graph);
    return transformResult || graph;
}));
exports.transformFromPromise = transformFromPromise;
//# sourceMappingURL=transform.js.map