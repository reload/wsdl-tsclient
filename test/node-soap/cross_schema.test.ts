import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "fs";
import { parseAndGenerate } from "../../src";
import { Logger } from "../../src/utils/logger";
import { typecheck } from "../utils/tsc";

const target = "cross_schema";

describe(target, () => {
    Logger.disabled();

    const input = `./test/resources/${target}.wsdl`;
    const outdir = "./test/generated";

    it(`${target} - generate wsdl client`, async () => {
        await parseAndGenerate(input, outdir);
    });

    it(`${target} - check definitions`, async () => {
        assert.equal(existsSync(`${outdir}/crossschema/definitions/OperationResponse.ts`), true);
        assert.equal(existsSync(`${outdir}/crossschema/definitions/OperationReturn.ts`), true);
    });

    // TODO: Finish
    // t.test(`${target} - compile`, async t => {
    //     await typecheck(`${outdir}/crossschema/index.ts`);
    // 	t.end();
    // });
});
