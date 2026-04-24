import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "fs";
import { parseAndGenerate } from "../../src";
import { Logger } from "../../src/utils/logger";
import { typecheck } from "../utils/tsc";

const target = "marketo";

describe(target, () => {
    Logger.disabled();

    const input = `./test/resources/${target}.wsdl`;
    const outdir = "./test/generated";

    it(`${target} - generate wsdl client`, async () => {
        await parseAndGenerate(input, outdir);
    });

    it(`${target} - check definitions`, async () => {
        assert.equal(existsSync(`${outdir}/marketo/definitions/ActivityNameFilter.ts`), true);
        assert.equal(existsSync(`${outdir}/marketo/definitions/TnsparamsGetLeadChanges.ts`), true);
        assert.equal(existsSync(`${outdir}/marketo/definitions/TnssuccessGetLeadChanges.ts`), true);
    });

    it(`${target} - compile`, async () => {
        await typecheck(`${outdir}/marketo/index.ts`);
    });
});
