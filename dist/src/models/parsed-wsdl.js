"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsedWsdl = void 0;
var sanitize_filename_1 = __importDefault(require("sanitize-filename"));
var logger_1 = require("../utils/logger");
var defaultOptions = {
    caseInsensitiveNames: false,
    maxStack: 64,
    maxStackWarn: 32,
    modelNamePreffix: "",
    modelNameSuffix: "",
};
var ParsedWsdl = /** @class */ (function () {
    function ParsedWsdl(options) {
        this.definitions = [];
        this.ports = [];
        this.services = [];
        this._options = __assign(__assign({}, defaultOptions), options);
        this._warns = [];
    }
    /** Find already parsed definition by it's name */
    ParsedWsdl.prototype.findDefinition = function (definitionName) {
        return this.definitions.find(function (def) { return def.name === definitionName; });
    };
    /**
     * To make every definition's name unique.
     * If definition with same name exists, suffix it with incremented number
     * @throws Will throw an error when suffixed number exceed `maxStack`
     */
    ParsedWsdl.prototype.findNonCollisionDefinitionName = function (defName) {
        var definitionName = (0, sanitize_filename_1.default)(defName);
        var isInSensitive = this._options.caseInsensitiveNames;
        var defNameToCheck = "".concat(this._options.modelNamePreffix).concat(definitionName).concat(this._options.modelNameSuffix);
        if (isInSensitive) {
            defNameToCheck = defNameToCheck.toLowerCase();
        }
        if (!this.definitions.find(function (def) {
            return isInSensitive ? def.name.toLowerCase() === defNameToCheck : def.name === defNameToCheck;
        })) {
            return definitionName;
        }
        var _loop_1 = function (i) {
            if (!this_1.definitions.find(function (def) {
                return isInSensitive
                    ? def.name.toLowerCase() === "".concat(defNameToCheck).concat(i).toLowerCase()
                    : def.name === "".concat(defNameToCheck).concat(i);
            })) {
                return { value: "".concat(definitionName).concat(i) };
            }
            if (i == this_1._options.maxStackWarn && !this_1._warns.includes(definitionName)) {
                logger_1.Logger.warn("Too many definitions with same name \"".concat(definitionName, "\""));
                this_1._warns.push(definitionName);
            }
        };
        var this_1 = this;
        for (var i = 1; i < this._options.maxStack; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        throw new Error("Out of stack (".concat(this._options.maxStack, ") for \"").concat(definitionName, "\", there's probably cyclic definition. You can also try to increase maxStack with --TODO option"));
    };
    return ParsedWsdl;
}());
exports.ParsedWsdl = ParsedWsdl;
//# sourceMappingURL=parsed-wsdl.js.map