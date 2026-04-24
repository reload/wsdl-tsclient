import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "fs";
import { parseAndGenerate } from "../../src";
import { Logger } from "../../src/utils/logger";
import { typecheck } from "../utils/tsc";

const target = "builtin_types";

describe(target, () => {
    Logger.disabled();

    const input = `./test/resources/${target}.wsdl`;
    const outdir = "./test/generated";

    it(`${target} - generate wsdl client`, async () => {
        await parseAndGenerate(input, outdir);
    });

    it(`${target} - check definitions`, async () => {
        assert.equal(existsSync(`${outdir}/builtintypes/definitions/Xsduration.ts`), true);
        assert.equal(existsSync(`${outdir}/builtintypes/definitions/XsnonNegativeInteger.ts`), true);
        assert.equal(existsSync(`${outdir}/builtintypes/definitions/XsnonNegativeInteger1.ts`), true);
        assert.equal(existsSync(`${outdir}/builtintypes/definitions/Xsstring.ts`), true);
    });

    it(`${target} - compile`, async () => {
        await typecheck(`${outdir}/builtintypes/index.ts`);
    });
});
