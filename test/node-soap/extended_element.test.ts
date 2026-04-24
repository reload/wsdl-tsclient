import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "fs";
import { parseAndGenerate } from "../../src";
import { Logger } from "../../src/utils/logger";
import { typecheck } from "../utils/tsc";

const target = "extended_element";

describe(target, () => {
    Logger.disabled();

    const input = `./test/resources/${target}.wsdl`;
    const outdir = "./test/generated";

    it(`${target} - generate wsdl client`, async () => {
        await parseAndGenerate(input, outdir);
    });

    it(`${target} - check definitions`, async () => {
        assert.equal(existsSync(`${outdir}/extendedelement/definitions/DummyList.ts`), true);
        assert.equal(existsSync(`${outdir}/extendedelement/definitions/DummyRequest.ts`), true);
        assert.equal(existsSync(`${outdir}/extendedelement/definitions/DummyResponse.ts`), true);
        assert.equal(existsSync(`${outdir}/extendedelement/definitions/DummyResult.ts`), true);
        assert.equal(existsSync(`${outdir}/extendedelement/definitions/ExtendedDummyRequest.ts`), true);
    });

    it(`${target} - compile`, async () => {
        await typecheck(`${outdir}/extendedelement/index.ts`);
    });
});
