import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "fs";
import { parseAndGenerate } from "../../src";
import { Logger } from "../../src/utils/logger";
import { typecheck } from "../utils/tsc";

const target = "non_identifier_chars_in_operation";

describe(target, () => {
    Logger.disabled();

    const input = `./test/resources/${target}.wsdl`;
    const outdir = "./test/generated";

    it(`${target} - generate wsdl client`, async () => {
        await parseAndGenerate(input, outdir);
    });

    it(`${target} - check definitions`, async () => {
        assert.equal(existsSync(`${outdir}/nonidentifiercharsinoperation/definitions/Request.ts`), true);
        assert.equal(existsSync(`${outdir}/nonidentifiercharsinoperation/definitions/Response.ts`), true);
    });

    // TODO: Finish
    // t.test(`${target} - compile`, async t => {
    //     await typecheck(`${outdir}/nonidentifiercharsinoperation/index.ts`);
    // 	t.end();
    // });
});
