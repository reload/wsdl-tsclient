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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseWsdl = parseWsdl;
var path = __importStar(require("path"));
var elements_1 = require("soap/lib/wsdl/elements");
var utils_1 = require("soap/lib/utils");
var index_1 = require("soap/lib/wsdl/index");
var parsed_wsdl_1 = require("./models/parsed-wsdl");
var change_case_1 = require("./utils/change-case");
var file_1 = require("./utils/file");
var javascript_1 = require("./utils/javascript");
var logger_1 = require("./utils/logger");
var defaultOptions = {
    modelNamePreffix: "",
    modelNameSuffix: "",
    maxRecursiveDefinitionName: 64,
    caseInsensitiveNames: false,
    useWsdlTypeNames: false,
};
function findReferenceDefiniton(visited, definitionParts) {
    return visited.find(function (def) { return def.parts === definitionParts; });
}
var NODE_SOAP_PARSED_TYPES = {
    int: "number",
    integer: "number",
    short: "number",
    long: "number",
    double: "number",
    float: "number",
    decimal: "number",
    bool: "boolean",
    boolean: "boolean",
    dateTime: "Date",
    date: "Date",
};
function toPrimitiveType(type) {
    var index = type.indexOf(":");
    if (index >= 0) {
        type = type.substring(index + 1);
    }
    return NODE_SOAP_PARSED_TYPES[type] || "string";
}
function findElementSchemaType(definitions, element) {
    var _a, _b, _c;
    if (!("$type" in element) && !("$ref" in element))
        return element;
    var type = element.$type || element.$ref;
    if (!type)
        return element;
    var _d = (0, utils_1.splitQName)(type), prefix = _d.prefix, localName = _d.name;
    var ns = (_b = (_a = element.schemaXmlns[prefix]) !== null && _a !== void 0 ? _a : definitions.xmlns[prefix]) !== null && _b !== void 0 ? _b : definitions.xmlns[element.targetNSAlias];
    var schema = definitions.schemas[ns];
    if (!schema)
        return element;
    var typeElement = (_c = schema.complexTypes[localName]) !== null && _c !== void 0 ? _c : schema.types[localName];
    return typeElement;
}
function findPropSchemaType(definitions, parentElement, propName) {
    if (!(parentElement === null || parentElement === void 0 ? void 0 : parentElement.children))
        return undefined;
    for (var _i = 0, _a = parentElement.children; _i < _a.length; _i++) {
        var child = _a[_i];
        if (child instanceof elements_1.ChoiceElement ||
            child instanceof elements_1.SequenceElement ||
            child instanceof elements_1.AllElement ||
            child instanceof elements_1.SimpleContentElement ||
            child instanceof elements_1.ComplexContentElement ||
            child instanceof elements_1.ExtensionElement) {
            return findPropSchemaType(definitions, child, propName);
        }
        if (child.$name === propName) {
            if (child instanceof elements_1.ElementElement ||
                child instanceof elements_1.ComplexTypeElement ||
                child instanceof elements_1.SimpleTypeElement) {
                return findElementSchemaType(definitions, child);
            }
        }
    }
    return undefined;
}
function getNameFromSchema(element) {
    if (!element)
        return undefined;
    if ("$type" in element || "$ref" in element) {
        var type = element.$type || element.$ref;
        var localName = (0, utils_1.splitQName)(type).name;
        return localName;
    }
    return element.$name;
}
/**
 * parse definition
 * @param parsedWsdl context of parsed wsdl
 * @param name name of definition, will be used as name of interface
 * @param defParts definition's parts - its properties
 * @param stack definitions stack of path to current subdefinition (immutable)
 * @param visitedDefs set of globally visited definitions to avoid circular definitions
 */
function parseDefinition(parsedWsdl, options, name, defParts, stack, visitedDefs, definitions, schema) {
    var defName = (0, change_case_1.changeCase)(name, { pascalCase: true });
    logger_1.Logger.debug("Parsing Definition ".concat(stack.join("."), ".").concat(name));
    var nonCollisionDefName;
    try {
        nonCollisionDefName = parsedWsdl.findNonCollisionDefinitionName(defName);
    }
    catch (err) {
        var e = new Error("Error for finding non-collision definition name for ".concat(stack.join("."), ".").concat(name));
        throw e;
    }
    var definition = {
        name: "".concat(options.modelNamePreffix).concat((0, change_case_1.changeCase)(nonCollisionDefName, { pascalCase: true })).concat(options.modelNameSuffix),
        sourceName: name,
        docs: [name],
        properties: [],
        description: "",
    };
    parsedWsdl.definitions.push(definition); // Must be here to avoid name collision with `findNonCollisionDefinitionName` if sub-definition has same name
    visitedDefs.push({ name: definition.name, parts: defParts, definition: definition }); // NOTE: cache reference to this defintion globally (for avoiding circular references)
    if (defParts) {
        // NOTE: `node-soap` has sometimes problem with parsing wsdl files, it includes `defParts.undefined = undefined`
        if ("undefined" in defParts && defParts.undefined === undefined) {
            // TODO: problem while parsing WSDL, maybe report to node-soap
            // TODO: add flag --FailOnWsdlError
            logger_1.Logger.error({
                message: "Problem while generating a definition file",
                path: stack.join("."),
                parts: defParts,
            });
        }
        else {
            Object.entries(defParts).forEach(function (_a) {
                var _b, _c;
                var propName = _a[0], type = _a[1];
                if (propName === "targetNSAlias") {
                    definition.docs.push("@targetNSAlias `".concat(type, "`"));
                }
                else if (propName === "targetNamespace") {
                    definition.docs.push("@targetNamespace `".concat(type, "`"));
                }
                else if (propName.endsWith("[]")) {
                    var stripedPropName = propName.substring(0, propName.length - 2);
                    // Array of
                    if (typeof type === "string") {
                        // primitive type
                        definition.properties.push({
                            kind: "PRIMITIVE",
                            name: stripedPropName,
                            sourceName: propName,
                            description: type,
                            type: toPrimitiveType(type),
                            isArray: true,
                        });
                    }
                    else if (type instanceof elements_1.ComplexTypeElement) {
                        // TODO: Finish complex type parsing by updating node-soap
                        definition.properties.push({
                            kind: "PRIMITIVE",
                            name: stripedPropName,
                            sourceName: propName,
                            description: "ComplexType are not supported yet",
                            type: "any",
                            isArray: true,
                        });
                        logger_1.Logger.warn("Cannot parse ComplexType '".concat(stack.join("."), ".").concat(name, "' - using 'any' type"));
                    }
                    else {
                        // With sub-type
                        var visited = findReferenceDefiniton(visitedDefs, type);
                        if (visited) {
                            // By referencing already declared definition, we will avoid circular references
                            definition.properties.push({
                                kind: "REFERENCE",
                                name: stripedPropName,
                                sourceName: propName,
                                ref: visited.definition,
                                isArray: true,
                            });
                        }
                        else {
                            try {
                                var propSchema = findPropSchemaType(definitions, schema, stripedPropName);
                                var guessPropName = (_b = getNameFromSchema(propSchema)) !== null && _b !== void 0 ? _b : stripedPropName;
                                var subDefinition = parseDefinition(parsedWsdl, options, guessPropName, type, __spreadArray(__spreadArray([], stack, true), [propName], false), visitedDefs, definitions, propSchema);
                                definition.properties.push({
                                    kind: "REFERENCE",
                                    name: stripedPropName,
                                    sourceName: propName,
                                    ref: subDefinition,
                                    isArray: true,
                                });
                            }
                            catch (err) {
                                var e = new Error("Error while parsing Subdefinition for '".concat(stack.join("."), ".").concat(name, "'"));
                                throw e;
                            }
                        }
                    }
                }
                else if (typeof type === "string") {
                    // primitive type
                    definition.properties.push({
                        kind: "PRIMITIVE",
                        name: propName,
                        sourceName: propName,
                        description: type,
                        type: toPrimitiveType(type),
                        isArray: false,
                    });
                }
                else if (type instanceof elements_1.ComplexTypeElement) {
                    // TODO: Finish complex type parsing by updating node-soap
                    definition.properties.push({
                        kind: "PRIMITIVE",
                        name: propName,
                        sourceName: propName,
                        description: "ComplexType are not supported yet",
                        type: "any",
                        isArray: false,
                    });
                    logger_1.Logger.warn("Cannot parse ComplexType '".concat(stack.join("."), ".").concat(name, "' - using 'any' type"));
                }
                else {
                    // With sub-type
                    var reference = findReferenceDefiniton(visitedDefs, type);
                    if (reference) {
                        // By referencing already declared definition, we will avoid circular references
                        definition.properties.push({
                            kind: "REFERENCE",
                            name: propName,
                            sourceName: propName,
                            description: "",
                            ref: reference.definition,
                            isArray: false,
                        });
                    }
                    else {
                        try {
                            var propSchema = findPropSchemaType(definitions, schema, propName);
                            var guessPropName = (_c = getNameFromSchema(propSchema)) !== null && _c !== void 0 ? _c : propName;
                            var subDefinition = parseDefinition(parsedWsdl, options, guessPropName, type, __spreadArray(__spreadArray([], stack, true), [propName], false), visitedDefs, definitions, propSchema);
                            definition.properties.push({
                                kind: "REFERENCE",
                                name: propName,
                                sourceName: propName,
                                ref: subDefinition,
                                isArray: false,
                            });
                        }
                        catch (err) {
                            var e = new Error("Error while parsing Subdefinition for ".concat(stack.join("."), ".").concat(name));
                            throw e;
                        }
                    }
                }
            });
        }
    }
    else {
        // Empty
    }
    return definition;
}
// TODO: Add logs
// TODO: Add comments for services, ports, methods and client
/**
 * Parse WSDL to domain model `ParsedWsdl`
 * @param wsdlPath - path or url to wsdl file
 */
function parseWsdl(wsdlPath, options) {
    return __awaiter(this, void 0, void 0, function () {
        var mergedOptions;
        return __generator(this, function (_a) {
            mergedOptions = __assign(__assign({}, defaultOptions), options);
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    (0, index_1.open_wsdl)(wsdlPath, { namespaceArrayElements: false, ignoredNamespaces: ["tns", "targetNamespace", "typeNamespace"] }, function (err, wsdl) {
                        var _a, _b, _c;
                        if (err) {
                            return reject(err);
                        }
                        if (wsdl === undefined) {
                            return reject(new Error("WSDL is undefined"));
                        }
                        var parsedWsdl = new parsed_wsdl_1.ParsedWsdl({
                            maxStack: options.maxRecursiveDefinitionName,
                            caseInsensitiveNames: options.caseInsensitiveNames,
                            modelNamePreffix: options.modelNamePreffix,
                            modelNameSuffix: options.modelNameSuffix,
                        });
                        var filename = path.basename(wsdlPath);
                        parsedWsdl.name = (0, change_case_1.changeCase)((0, file_1.stripExtension)(filename), {
                            pascalCase: true,
                        });
                        parsedWsdl.wsdlFilename = path.basename(filename);
                        parsedWsdl.wsdlPath = path.resolve(wsdlPath);
                        var visitedDefinitions = [];
                        var allPorts = [];
                        var services = [];
                        for (var _i = 0, _d = Object.entries(wsdl.definitions.services); _i < _d.length; _i++) {
                            var _e = _d[_i], serviceName = _e[0], service = _e[1];
                            logger_1.Logger.debug("Parsing Service ".concat(serviceName));
                            var servicePorts = []; // TODO: Convert to Array
                            for (var _f = 0, _g = Object.entries(service.ports); _f < _g.length; _f++) {
                                var _h = _g[_f], portName = _h[0], port = _h[1];
                                logger_1.Logger.debug("Parsing Port ".concat(portName));
                                var portMethods = [];
                                for (var _j = 0, _k = Object.entries(port.binding.methods); _j < _k.length; _j++) {
                                    var _l = _k[_j], methodName = _l[0], method = _l[1];
                                    logger_1.Logger.debug("Parsing Method ".concat(methodName));
                                    // TODO: Deduplicate code below by refactoring it to external function. Is it even possible ?
                                    var requestParamName = "request";
                                    var inputDefinition = null; // default type
                                    if (method.input) {
                                        if (method.input.$name) {
                                            requestParamName = method.input.$name;
                                        }
                                        var inputMessage = wsdl.definitions.messages[method.input.$name];
                                        if (inputMessage.element) {
                                            // TODO: if `$type` not defined, inline type into function declartion (do not create definition file) - wsimport
                                            var typeName = (_a = inputMessage.element.$type) !== null && _a !== void 0 ? _a : inputMessage.element.$name;
                                            var type = parsedWsdl.findDefinition((_b = inputMessage.element.$type) !== null && _b !== void 0 ? _b : inputMessage.element.$name);
                                            var schema = mergedOptions.useWsdlTypeNames
                                                ? findElementSchemaType(wsdl.definitions, inputMessage.element)
                                                : undefined;
                                            inputDefinition =
                                                type !== null && type !== void 0 ? type : parseDefinition(parsedWsdl, mergedOptions, typeName, inputMessage.parts, [typeName], visitedDefinitions, wsdl.definitions, schema);
                                        }
                                        else if (inputMessage.parts) {
                                            var type = parsedWsdl.findDefinition(requestParamName);
                                            inputDefinition =
                                                type !== null && type !== void 0 ? type : parseDefinition(parsedWsdl, mergedOptions, requestParamName, inputMessage.parts, [requestParamName], visitedDefinitions, wsdl.definitions, undefined);
                                        }
                                        else {
                                            logger_1.Logger.debug("Method '".concat(serviceName, ".").concat(portName, ".").concat(methodName, "' doesn't have any input defined"));
                                        }
                                    }
                                    var responseParamName = "response";
                                    var outputDefinition = null; // default type, `{}` or `unknown` ?
                                    if (method.output) {
                                        if (method.output.$name) {
                                            responseParamName = method.output.$name;
                                        }
                                        var outputMessage = wsdl.definitions.messages[method.output.$name];
                                        if (outputMessage.element) {
                                            // TODO: if `$type` not defined, inline type into function declartion (do not create definition file) - wsimport
                                            var typeName = (_c = outputMessage.element.$type) !== null && _c !== void 0 ? _c : outputMessage.element.$name;
                                            var type = parsedWsdl.findDefinition(typeName);
                                            var schema = mergedOptions.useWsdlTypeNames
                                                ? findElementSchemaType(wsdl.definitions, outputMessage.element)
                                                : undefined;
                                            outputDefinition =
                                                type !== null && type !== void 0 ? type : parseDefinition(parsedWsdl, mergedOptions, typeName, outputMessage.parts, [typeName], visitedDefinitions, wsdl.definitions, schema);
                                        }
                                        else {
                                            var type = parsedWsdl.findDefinition(responseParamName);
                                            outputDefinition =
                                                type !== null && type !== void 0 ? type : parseDefinition(parsedWsdl, mergedOptions, responseParamName, outputMessage.parts, [responseParamName], visitedDefinitions, wsdl.definitions, undefined);
                                        }
                                    }
                                    var camelParamName = (0, change_case_1.changeCase)(requestParamName);
                                    var portMethod = {
                                        name: methodName,
                                        paramName: javascript_1.reservedKeywords.includes(camelParamName)
                                            ? "".concat(camelParamName, "Param")
                                            : camelParamName,
                                        paramDefinition: inputDefinition, // TODO: Use string from generated definition files
                                        returnDefinition: outputDefinition, // TODO: Use string from generated definition files
                                    };
                                    portMethods.push(portMethod);
                                }
                                var servicePort = {
                                    name: (0, change_case_1.changeCase)(portName, { pascalCase: true }),
                                    sourceName: portName,
                                    methods: portMethods,
                                };
                                servicePorts.push(servicePort);
                                allPorts.push(servicePort);
                            } // End of Port cycle
                            services.push({
                                name: (0, change_case_1.changeCase)(serviceName, { pascalCase: true }),
                                sourceName: serviceName,
                                ports: servicePorts,
                            });
                        } // End of Service cycle
                        parsedWsdl.services = services;
                        parsedWsdl.ports = allPorts;
                        return resolve(parsedWsdl);
                    });
                })];
        });
    });
}
//# sourceMappingURL=parser.js.map