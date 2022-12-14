"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WRITE_PACKAGE_TRANSFORM = exports.WRITE_PACKAGE_TRANSFORM_TOKEN = void 0;
const injection_js_1 = require("injection-js");
const transform_di_1 = require("../../graph/transform.di");
const options_di_1 = require("../options.di");
const write_package_transform_1 = require("./write-package.transform");
exports.WRITE_PACKAGE_TRANSFORM_TOKEN = new injection_js_1.InjectionToken(`ng.v5.writePackageTransform`);
exports.WRITE_PACKAGE_TRANSFORM = (0, transform_di_1.provideTransform)({
    provide: exports.WRITE_PACKAGE_TRANSFORM_TOKEN,
    useFactory: write_package_transform_1.writePackageTransform,
    deps: [options_di_1.OPTIONS_TOKEN],
});
//# sourceMappingURL=write-package.di.js.map