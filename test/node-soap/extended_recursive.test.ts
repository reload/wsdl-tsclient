import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "fs";
import { parseAndGenerate } from "../../src";
import { Logger } from "../../src/utils/logger";
import { typecheck } from "../utils/tsc";

const target = "extended_recursive";

describe(target, () => {
    Logger.disabled();

    const input = `./test/resources/${target}.wsdl`;
    const outdir = "./test/generated";

    it(`${target} - generate wsdl client`, async () => {
        await parseAndGenerate(input, outdir);
    });

    it(`${target} - check definitions`, async () => {
        assert.equal(existsSync(`${outdir}/extendedrecursive/definitions/Department.ts`), true);
        assert.equal(existsSync(`${outdir}/extendedrecursive/definitions/GetPerson.ts`), true);
        assert.equal(existsSync(`${outdir}/extendedrecursive/definitions/GetPersonResponse.ts`), true);
        assert.equal(existsSync(`${outdir}/extendedrecursive/definitions/GetPersonResult.ts`), true);
    });

    it(`${target} - compile`, async () => {
        await typecheck(`${outdir}/extendedrecursive/index.ts`);
    });
});
