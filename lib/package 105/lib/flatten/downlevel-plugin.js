"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downlevelCodeWithTsc = void 0;
const path = __importStar(require("path"));
const typescript_1 = require("typescript");
const log = __importStar(require("../utils/log"));
/**
 * Base `tsc` `CompilerOptions` shared among various downleveling methods.
 */
const COMPILER_OPTIONS = {
    target: typescript_1.ScriptTarget.ES2015,
    module: typescript_1.ModuleKind.ESNext,
    allowJs: true,
    sourceMap: true,
    importHelpers: true,
    downlevelIteration: true,
    moduleResolution: typescript_1.ModuleResolutionKind.Classic,
};
/**
 * Downlevels a .js file from `ES2015` to `ES2015`. Internally, uses `tsc`.
 */
async function downlevelCodeWithTsc(code, filePath) {
    log.debug(`tsc ${filePath}`);
    const compilerOptions = {
        ...COMPILER_OPTIONS,
        mapRoot: path.dirname(filePath),
    };
    const { outputText, sourceMapText } = (0, typescript_1.transpileModule)(code, {
        compilerOptions,
    });
    return {
        code: outputText,
        map: JSON.parse(sourceMapText),
    };
}
exports.downlevelCodeWithTsc = downlevelCodeWithTsc;
//# sourceMappingURL=downlevel-plugin.js.map