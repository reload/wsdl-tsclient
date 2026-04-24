import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "fs";
import { parseAndGenerate } from "../../src";
import { Logger } from "../../src/utils/logger";
import { typecheck } from "../utils/tsc";

const target = "default_namespace_soap12";

describe(target, () => {
    Logger.disabled();

    const input = `./test/resources/${target}.wsdl`;
    const outdir = "./test/generated";

    it(`${target} - generate wsdl client`, async () => {
        await parseAndGenerate(input, outdir);
    });

    it(`${target} - check definitions`, async () => {
        assert.equal(existsSync(`${outdir}/defaultnamespacesoap12/definitions/Request.ts`), true);
        assert.equal(existsSync(`${outdir}/defaultnamespacesoap12/definitions/Response.ts`), true);
    });

    it(`${target} - compile`, async () => {
        await typecheck(`${outdir}/defaultnamespacesoap12/index.ts`);
    });
});
