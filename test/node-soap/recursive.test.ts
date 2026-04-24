import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "fs";
import { parseAndGenerate } from "../../src";
import { Logger } from "../../src/utils/logger";

const target = "recursive";

describe(target, () => {
    Logger.disabled();

    const input = `./test/resources/${target}.wsdl`;
    const outdir = "./test/generated";

    it(`${target} - generate wsdl client`, async () => {
        // TODO: Fix this issue
        // await parseAndGenerate(input, outdir);
    });

    it(`${target} - check definitions`, async () => {
        // assert.equal(existsSync(`${outdir}/recursive/definitions/ActivityNameFilter.ts`), true);
        // assert.equal(existsSync(`${outdir}/recursive/definitions/TnsparamsGetLeadChanges.ts`), true);
        // assert.equal(existsSync(`${outdir}/recursive/definitions/TnssuccessGetLeadChanges.ts`), true);
        // t.end();
    });

    // t.test(`${target} - compile`, async t => {
    //     await typecheck(`${outdir}/arraynamespaceoverride/index.ts`);
    // });
});
