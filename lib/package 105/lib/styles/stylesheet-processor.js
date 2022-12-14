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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StylesheetProcessor = exports.InlineStyleLanguage = exports.CssUrl = void 0;
const browserslist_1 = __importDefault(require("browserslist"));
const fs_1 = require("fs");
const path_1 = require("path");
const postcss_1 = __importDefault(require("postcss"));
const postcss_preset_env_1 = __importDefault(require("postcss-preset-env"));
const postcss_url_1 = __importDefault(require("postcss-url"));
const esbuild_executor_1 = require("../esbuild/esbuild-executor");
const cache_1 = require("../utils/cache");
const log = __importStar(require("../utils/log"));
var CssUrl;
(function (CssUrl) {
    CssUrl["inline"] = "inline";
    CssUrl["none"] = "none";
})(CssUrl = exports.CssUrl || (exports.CssUrl = {}));
var InlineStyleLanguage;
(function (InlineStyleLanguage) {
    InlineStyleLanguage["sass"] = "sass";
    InlineStyleLanguage["scss"] = "scss";
    InlineStyleLanguage["css"] = "css";
    InlineStyleLanguage["less"] = "less";
})(InlineStyleLanguage = exports.InlineStyleLanguage || (exports.InlineStyleLanguage = {}));
class StylesheetProcessor {
    constructor(basePath, cssUrl, includePaths, cacheDirectory) {
        this.basePath = basePath;
        this.cssUrl = cssUrl;
        this.includePaths = includePaths;
        this.cacheDirectory = cacheDirectory;
        this.esbuild = new esbuild_executor_1.EsbuildExecutor();
        log.debug(`determine browserslist for ${this.basePath}`);
        // By default, browserslist defaults are too inclusive
        // https://github.com/browserslist/browserslist/blob/83764ea81ffaa39111c204b02c371afa44a4ff07/index.js#L516-L522
        // We change the default query to browsers that Angular support.
        // https://angular.io/guide/browser-support
        browserslist_1.default.defaults = [
            'last 1 Chrome version',
            'last 1 Firefox version',
            'last 2 Edge major versions',
            'last 2 Safari major versions',
            'last 2 iOS major versions',
            'Firefox ESR',
        ];
        this.styleIncludePaths = [...this.includePaths];
        let prevDir = null;
        let currentDir = this.basePath;
        while (currentDir !== prevDir) {
            const p = (0, path_1.join)(currentDir, 'node_modules');
            if ((0, fs_1.existsSync)(p)) {
                this.styleIncludePaths.push(p);
            }
            prevDir = currentDir;
            currentDir = (0, path_1.dirname)(prevDir);
        }
        this.browserslistData = (0, browserslist_1.default)(undefined, { path: this.basePath });
        this.targets = transformSupportedBrowsersToTargets(this.browserslistData);
        this.postCssProcessor = this.createPostCssPlugins();
    }
    async process({ filePath, content }) {
        let key;
        if (!content.includes('@import') && !content.includes('@use') && this.cacheDirectory) {
            // No transitive deps, we can cache more aggressively.
            key = await (0, cache_1.generateKey)(content, ...this.browserslistData);
            const result = await (0, cache_1.readCacheEntry)(this.cacheDirectory, key);
            if (result) {
                result.warnings.forEach(msg => log.warn(msg));
                return result.css;
            }
        }
        // Render pre-processor language (sass, styl, less)
        const renderedCss = await this.renderCss(filePath, content);
        // We cannot cache CSS re-rendering phase, because a transitive dependency via (@import) can case different CSS output.
        // Example a change in a mixin or SCSS variable.
        if (!key) {
            key = await (0, cache_1.generateKey)(renderedCss, ...this.browserslistData);
        }
        if (this.cacheDirectory) {
            const cachedResult = await (0, cache_1.readCacheEntry)(this.cacheDirectory, key);
            if (cachedResult) {
                cachedResult.warnings.forEach(msg => log.warn(msg));
                return cachedResult.css;
            }
        }
        // Render postcss (autoprefixing and friends)
        const result = await this.postCssProcessor.process(renderedCss, {
            from: filePath,
            to: filePath.replace((0, path_1.extname)(filePath), '.css'),
        });
        const warnings = result.warnings().map(w => w.toString());
        const { code, warnings: esBuildWarnings } = await this.esbuild.transform(result.css, {
            loader: 'css',
            minify: true,
            target: this.targets,
            sourcefile: filePath,
        });
        if (esBuildWarnings.length > 0) {
            warnings.push(...(await this.esbuild.formatMessages(esBuildWarnings, { kind: 'warning' })));
        }
        if (this.cacheDirectory) {
            await (0, cache_1.saveCacheEntry)(this.cacheDirectory, key, JSON.stringify({
                css: code,
                warnings,
            }));
        }
        warnings.forEach(msg => log.warn(msg));
        return code;
    }
    createPostCssPlugins() {
        const postCssPlugins = [];
        if (this.cssUrl !== CssUrl.none) {
            postCssPlugins.push((0, postcss_url_1.default)({ url: this.cssUrl }));
        }
        postCssPlugins.push((0, postcss_preset_env_1.default)({
            browsers: this.browserslistData,
            autoprefixer: true,
            stage: 3,
        }));
        return (0, postcss_1.default)(postCssPlugins);
    }
    async renderCss(filePath, css) {
        const ext = (0, path_1.extname)(filePath);
        switch (ext) {
            case '.sass':
            case '.scss': {
                return (await Promise.resolve().then(() => __importStar(require('sass'))))
                    .renderSync({
                    file: filePath,
                    data: css,
                    indentedSyntax: '.sass' === ext,
                    importer: customSassImporter,
                    includePaths: this.styleIncludePaths,
                })
                    .css.toString();
            }
            case '.less': {
                const { css: content } = await (await Promise.resolve().then(() => __importStar(require('less')))).default.render(css, {
                    filename: filePath,
                    math: 'always',
                    javascriptEnabled: true,
                    paths: this.styleIncludePaths,
                });
                return content;
            }
            case '.styl':
            case '.stylus': {
                const stylus = (await Promise.resolve().then(() => __importStar(require('stylus')))).default;
                return (stylus(css)
                    // add paths for resolve
                    .set('paths', [this.basePath, '.', ...this.styleIncludePaths, 'node_modules'])
                    // add support for resolving plugins from node_modules
                    .set('filename', filePath)
                    // turn on url resolver in stylus, same as flag --resolve-url
                    .set('resolve url', true)
                    .define('url', stylus.resolver(undefined))
                    .render());
            }
            case '.css':
            default:
                return css;
        }
    }
}
exports.StylesheetProcessor = StylesheetProcessor;
function transformSupportedBrowsersToTargets(supportedBrowsers) {
    const transformed = [];
    // https://esbuild.github.io/api/#target
    const esBuildSupportedBrowsers = new Set(['safari', 'firefox', 'edge', 'chrome', 'ios']);
    for (const browser of supportedBrowsers) {
        let [browserName, version] = browser.split(' ');
        // browserslist uses the name `ios_saf` for iOS Safari whereas esbuild uses `ios`
        if (browserName === 'ios_saf') {
            browserName = 'ios';
        }
        // browserslist uses ranges `15.2-15.3` versions but only the lowest is required
        // to perform minimum supported feature checks. esbuild also expects a single version.
        [version] = version.split('-');
        if (esBuildSupportedBrowsers.has(browserName)) {
            if (browserName === 'safari' && version === 'TP') {
                // esbuild only supports numeric versions so `TP` is converted to a high number (999) since
                // a Technology Preview (TP) of Safari is assumed to support all currently known features.
                version = '999';
            }
            transformed.push(browserName + version);
        }
    }
    return transformed.length ? transformed : undefined;
}
function customSassImporter(url, prev) {
    // NB: Sass importer should always be sync as otherwise it will cause
    // sass to go in the async path which is slower.
    if (url[0] !== '~') {
        return undefined;
    }
    return {
        file: url.substr(1),
        prev,
    };
}
//# sourceMappingURL=stylesheet-processor.js.map