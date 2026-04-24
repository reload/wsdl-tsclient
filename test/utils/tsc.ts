import * as child from "child_process";
import * as path from "path";
import util from "util";

const exec = util.promisify(child.exec);

export async function typecheck(pathToIndex: string) {
    const dir = path.dirname(pathToIndex);
    const file = path.basename(pathToIndex);
    const cwd = process.cwd();
    const fullDir = path.resolve(cwd, dir);

    // TypeScript 6 requires --ignoreConfig when specifying files and tsconfig.json is present
    // So we explicitly pass all the important flags from our tsconfig.json
    await exec(
        `npx tsc ${file} --noEmit ` +
            `--target ES2018 ` +
            `--module commonjs ` +
            `--esModuleInterop ` +
            `--types node ` +
            `--skipLibCheck ` +
            `--noImplicitAny ` +
            `--strictFunctionTypes ` +
            `--strictBindCallApply ` +
            `--noImplicitThis ` +
            `--noImplicitReturns ` +
            `--forceConsistentCasingInFileNames ` +
            `--resolveJsonModule ` +
            `--ignoreConfig`,
        {
            cwd: fullDir,
            env: process.env,
        },
    );
}
