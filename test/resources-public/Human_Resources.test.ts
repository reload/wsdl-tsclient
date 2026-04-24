import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "fs";
import { parseAndGenerate } from "../../src";
import { Logger } from "../../src/utils/logger";

const target = "Human_Resources";

describe(target, () => {
    Logger.disabled();

    const input = `./test/resources-public/${target}.wsdl`;
    const outdir = "./test/generated";

    it(`${target} - generate wsdl client`, async () => {
        await parseAndGenerate(input, outdir, { maxRecursiveDefinitionName: 85 });
    });

    it(`${target} - check definitions`, async () => {
        // TODO: Add more definitions to check
        assert.equal(existsSync(`${outdir}/humanresources/definitions/AcademicAppointee.ts`), true);
    });
});
