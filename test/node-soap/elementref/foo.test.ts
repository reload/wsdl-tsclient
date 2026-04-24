import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "fs";
import { parseAndGenerate } from "../../../src";
import { Logger } from "../../../src/utils/logger";
import { typecheck } from "../../utils/tsc";

const target = "elementref/foo";

describe(target, () => {
    Logger.disabled();

    const input = `./test/resources/${target}.wsdl`;
    const outdir = "./test/generated/elementref";

    it(`${target} - generate wsdl client`, async () => {
        await parseAndGenerate(input, outdir);
    });

    it(`${target} - check definitions`, async () => {
        assert.equal(existsSync(`${outdir}/foo/definitions/BankSvcRq.ts`), true);
        assert.equal(existsSync(`${outdir}/foo/definitions/BankSvcRs.ts`), true);
        assert.equal(existsSync(`${outdir}/foo/definitions/FooRq.ts`), true);
        assert.equal(existsSync(`${outdir}/foo/definitions/FooRs.ts`), true);
        assert.equal(existsSync(`${outdir}/foo/definitions/PaymentRq.ts`), true);
        assert.equal(existsSync(`${outdir}/foo/definitions/PaymentRs.ts`), true);
    });

    it(`${target} - compile`, async () => {
        await typecheck(`${outdir}/foo/index.ts`);
    });
});
