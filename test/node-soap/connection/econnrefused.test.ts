import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "fs";
import { parseAndGenerate } from "../../../src";
import { Logger } from "../../../src/utils/logger";
import { typecheck } from "../../utils/tsc";

const target = "connection/econnrefused";

describe(target, () => {
    Logger.disabled();

    const input = `./test/resources/${target}.wsdl`;
    const outdir = "./test/generated/connection";

    it(`${target} - generate wsdl client`, async () => {
        try {
            await parseAndGenerate(input, outdir);
            t.fail("Should throw error ECONNREFUSED 127.0.0.1:1");
        } catch (err) {
            assert.ok(err, "Got error");
        }
    });
});
