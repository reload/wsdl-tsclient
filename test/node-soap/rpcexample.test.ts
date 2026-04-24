import { describe, it } from "node:test";
import { existsSync } from "fs";
import { parseAndGenerate } from "../../src";
import { Logger } from "../../src/utils/logger";

const target = "rpcexample";

describe(target, () => {
    Logger.disabled();

    const input = `./test/resources/${target}.wsdl`;
    const outdir = "./test/generated";

    it(`${target} - generate wsdl client`, async () => {
        // TODO: Fix this issue
        // await parseAndGenerate(input, outdir);
    });

    // t.test(`${target} - compile`, async t => {
    //     await typecheck(`${outdir}/arraynamespaceoverride/index.ts`);
    // });
});
