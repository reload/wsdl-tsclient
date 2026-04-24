import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { parseAndGenerate } from "../../../src";
import { Logger } from "../../../src/utils/logger";
import { typecheck } from "../../utils/tsc";

const target = "strict/EVacSyncService_SPClient";

describe(target, () => {
    Logger.disabled();

    const input = `./test/resources/${target}.wsdl`;
    const outdir = "./test/generated/strict";

    // // TODO: Failing test because of cycling dependency
    it(`${target} - generate wsdl client`, async () => {
        await parseAndGenerate(input, outdir);
    });

    it(`${target} - compile`, async () => {
        await typecheck(`${outdir}/evacsyncservicespclient/index.ts`);
    });
});
