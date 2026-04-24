import { describe, it } from "node:test";
import { existsSync } from "fs";
import { parseAndGenerate } from "../../../src";
import { Logger } from "../../../src/utils/logger";
import { typecheck } from "../../utils/tsc";

const target = "recursive/B";

describe(target, () => {
    Logger.disabled();

    const input = `./test/resources/${target}.xsd`;
    const outdir = "./test/generated/recursive";

    it(`${target} - generate wsdl client`, async () => {
        await parseAndGenerate(input, outdir);
    });

    // t.test(`${target} - check definitions`, async t => {
    //     assert.equal(existsSync(`${outdir}/B/definitions/BankSvcRq.ts`), true);
    //     assert.equal(existsSync(`${outdir}/B/definitions/BankSvcRs.ts`), true);
    //     assert.equal(existsSync(`${outdir}/B/definitions/BRq.ts`), true);
    //     assert.equal(existsSync(`${outdir}/B/definitions/BRs.ts`), true);
    //     assert.equal(existsSync(`${outdir}/B/definitions/PaymentRq.ts`), true);
    //     assert.equal(existsSync(`${outdir}/B/definitions/PaymentRs.ts`), true);
    //     t.end();
    // });

    it(`${target} - compile`, async () => {
        await typecheck(`${outdir}/b/index.ts`);
    });
});
