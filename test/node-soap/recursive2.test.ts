import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "fs";
import { parseAndGenerate } from "../../src";
import { Logger } from "../../src/utils/logger";
import { typecheck } from "../utils/tsc";

const target = "recursive2";

describe(target, () => {
    Logger.disabled();

    const input = `./test/resources/${target}.wsdl`;
    const outdir = "./test/generated";

    it(`${target} - generate wsdl client`, async () => {
        await parseAndGenerate(input, outdir);
    });

    it(`${target} - check definitions`, async () => {
        assert.equal(existsSync(`${outdir}/recursive2/definitions/AccountElement.ts`), true);
        assert.equal(existsSync(`${outdir}/recursive2/definitions/AccountElements.ts`), true);
        assert.equal(existsSync(`${outdir}/recursive2/definitions/AddAttribute.ts`), true);
        assert.equal(existsSync(`${outdir}/recursive2/definitions/AddAttributeRequest.ts`), true);
        assert.equal(existsSync(`${outdir}/recursive2/definitions/AddAttributeResponse.ts`), true);
        assert.equal(existsSync(`${outdir}/recursive2/definitions/Attr.ts`), true);
        assert.equal(existsSync(`${outdir}/recursive2/definitions/Identifier.ts`), true);
        assert.equal(existsSync(`${outdir}/recursive2/definitions/Items.ts`), true);
        assert.equal(existsSync(`${outdir}/recursive2/definitions/Messages.ts`), true);
        assert.equal(existsSync(`${outdir}/recursive2/definitions/OperationResponse.ts`), true);
        assert.equal(existsSync(`${outdir}/recursive2/definitions/RequestItem.ts`), true);
        assert.equal(existsSync(`${outdir}/recursive2/definitions/RequestItems.ts`), true);
        assert.equal(existsSync(`${outdir}/recursive2/definitions/Requests.ts`), true);
        assert.equal(existsSync(`${outdir}/recursive2/definitions/Response.ts`), true);
        assert.equal(existsSync(`${outdir}/recursive2/definitions/ResponseItem.ts`), true);
    });

    it(`${target} - compile`, async () => {
        await typecheck(`${outdir}/recursive2/index.ts`);
    });
});
