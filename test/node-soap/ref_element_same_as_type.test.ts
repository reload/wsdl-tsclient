import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "fs";
import { parseAndGenerate } from "../../src";
import { Logger } from "../../src/utils/logger";
import { typecheck } from "../utils/tsc";

const target = "ref_element_same_as_type";

describe(target, () => {
    Logger.disabled();

    const input = `./test/resources/${target}.wsdl`;
    const outdir = "./test/generated";

    it(`${target} - generate wsdl client`, async () => {
        await parseAndGenerate(input, outdir);
    });

    it(`${target} - check definitions`, async () => {
        assert.equal(existsSync(`${outdir}/refelementsameastype/definitions/ExampleContent.ts`), true);
        assert.equal(existsSync(`${outdir}/refelementsameastype/definitions/OutMessage.ts`), true);
        assert.equal(existsSync(`${outdir}/refelementsameastype/definitions/V1ExampleRequestType.ts`), true);
    });

    it(`${target} - compile`, async () => {
        await typecheck(`${outdir}/refelementsameastype/index.ts`);
    });
});
