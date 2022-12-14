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
exports.saveCacheEntry = exports.readCacheEntry = exports.generateKey = void 0;
const cacache = __importStar(require("cacache"));
const crypto_1 = require("crypto");
const fs_1 = require("../utils/fs");
const ng_compiler_cli_1 = require("./ng-compiler-cli");
let ngPackagrVersion;
try {
    ngPackagrVersion = require('../../package.json').version;
}
catch {
    // dev path
    ngPackagrVersion = require('../../../package.json').version;
}
let compilerCliVersion;
async function generateKey(...valuesToConsider) {
    if (compilerCliVersion === undefined) {
        compilerCliVersion = (await (0, ng_compiler_cli_1.ngCompilerCli)()).VERSION.full;
    }
    return (0, crypto_1.createHash)('sha1')
        .update(ngPackagrVersion)
        .update(compilerCliVersion)
        .update(valuesToConsider.join(':'))
        .digest('hex');
}
exports.generateKey = generateKey;
async function readCacheEntry(cachePath, key) {
    const entry = await cacache.get.info(cachePath, key);
    if (entry) {
        return JSON.parse(await (0, fs_1.readFile)(entry.path, 'utf8'));
    }
    return undefined;
}
exports.readCacheEntry = readCacheEntry;
async function saveCacheEntry(cachePath, key, content) {
    await cacache.put(cachePath, key, content);
}
exports.saveCacheEntry = saveCacheEntry;
//# sourceMappingURL=cache.js.map