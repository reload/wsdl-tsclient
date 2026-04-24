import { existsSync, rmdirSync } from "fs";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { parseAndGenerate } from "../../src";
import { Logger } from "../../src/utils/logger";
import { typecheck } from "../utils/tsc";

const target = "jaxws_generated_service";

describe(target, () => {
    Logger.disabled();

    const input = `./test/resources/${target}/TestService.wsdl`;
    const outdir = "./test/generated/jaxws_generated_service";

    it(`${target} - generate wsdl client with default options`, async () => {
        await parseAndGenerate(input, outdir);
    });

    it(`${target} - check definitions`, async () => {
        assert.equal(existsSync(`${outdir}/testservice/definitions/Request.ts`), true);
        assert.equal(existsSync(`${outdir}/testservice/definitions/Request1.ts`), true);
        assert.equal(existsSync(`${outdir}/testservice/definitions/Return.ts`), true);
        assert.equal(existsSync(`${outdir}/testservice/definitions/TnsaddNumber.ts`), true);
        assert.equal(existsSync(`${outdir}/testservice/definitions/TnsaddNumberResponse.ts`), true);
    });

    it(`${target} - compile`, async () => {
        await typecheck(`${outdir}/testservice/index.ts`);
    });

    it(`${target} - generate wsdl client with useWsdlTypeNames`, async () => {
        await parseAndGenerate(input, outdir, { useWsdlTypeNames: true });
    });

    it(`${target} - check useWsdlTypeNames definitions`, async () => {
        assert.equal(existsSync(`${outdir}/testservice/definitions/ComplextRecursiveResult.ts`), true);
        assert.equal(existsSync(`${outdir}/testservice/definitions/ComplextRequest.ts`), true);
        assert.equal(existsSync(`${outdir}/testservice/definitions/SimpleRequest.ts`), true);
        assert.equal(existsSync(`${outdir}/testservice/definitions/TnsaddNumber.ts`), true);
        assert.equal(existsSync(`${outdir}/testservice/definitions/TnsaddNumberResponse.ts`), true);
    });

    it(`${target} - compile useWsdlTypeNames`, async () => {
        await typecheck(`${outdir}/testservice/index.ts`);
    });
});
