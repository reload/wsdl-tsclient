import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "fs";
import { parseAndGenerate } from "../../src";
import { Logger } from "../../src/utils/logger";

const target = "self_recursive";

describe(target, () => {
    Logger.disabled();

    const input = `./test/resources/${target}.wsdl`;
    const outdir = "./test/generated";

    it(`${target} - generate wsdl client`, async () => {
        await parseAndGenerate(input, outdir);
    });

    it(`${target} - check definitions`, async () => {
        assert.equal(existsSync(`${outdir}/selfrecursive/definitions/GetPerson.ts`), true);
        assert.equal(existsSync(`${outdir}/selfrecursive/definitions/GetPersonResponse.ts`), true);
        assert.equal(existsSync(`${outdir}/selfrecursive/definitions/Person.ts`), true);
        assert.equal(existsSync(`${outdir}/selfrecursive/definitions/Request.ts`), true);
    });
});
