import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "fs";
import { parseAndGenerate } from "../../src";
import { Logger } from "../../src/utils/logger";
import { typecheck } from "../utils/tsc";

const target = "array_namespace_override.wsdl";

describe(target, () => {
    Logger.disabled();

    const input = `./test/resources/${target}`;
    const outdir = "./test/generated";

    it(`${target} - generate wsdl client`, async () => {
        await parseAndGenerate(input, outdir);
    });

    it(`${target} - check definitions`, async () => {
        assert.equal(existsSync(`${outdir}/arraynamespaceoverride/definitions/Items.ts`), true);
        assert.equal(existsSync(`${outdir}/arraynamespaceoverride/definitions/Markdowns.ts`), true);
        assert.equal(existsSync(`${outdir}/arraynamespaceoverride/definitions/Order.ts`), true);
        assert.equal(existsSync(`${outdir}/arraynamespaceoverride/definitions/OrderDetails.ts`), true);
        assert.equal(existsSync(`${outdir}/arraynamespaceoverride/definitions/TnscreateOrderResponseVo.ts`), true);
        assert.equal(existsSync(`${outdir}/arraynamespaceoverride/definitions/TnscreateWebOrderRequest.ts`), true);
    });

    it(`${target} - compile`, async () => {
        await typecheck(`${outdir}/arraynamespaceoverride/index.ts`);
    });
});
