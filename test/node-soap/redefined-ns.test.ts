import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "fs";
import { parseAndGenerate } from "../../src";
import { Logger } from "../../src/utils/logger";
import { typecheck } from "../utils/tsc";

const target = "redefined-ns";

describe(target, () => {
    Logger.disabled();

    const input = `./test/resources/${target}.wsdl`;
    const outdir = "./test/generated";

    it(`${target} - generate wsdl client`, async () => {
        await parseAndGenerate(input, outdir);
    });

    it(`${target} - check definitions`, async () => {
        assert.equal(existsSync(`${outdir}/redefinedns/definitions/VerificationData.ts`), true);
        assert.equal(existsSync(`${outdir}/redefinedns/definitions/VerificationRequest.ts`), true);
        assert.equal(existsSync(`${outdir}/redefinedns/definitions/Verify.ts`), true);
        assert.equal(existsSync(`${outdir}/redefinedns/definitions/VerifyResponse.ts`), true);
        assert.equal(existsSync(`${outdir}/redefinedns/definitions/VerifyResult.ts`), true);
    });

    it(`${target} - compile`, async () => {
        await typecheck(`${outdir}/redefinedns/index.ts`);
    });
});
