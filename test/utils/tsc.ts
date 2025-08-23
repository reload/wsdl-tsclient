import * as child from "child_process";
import util from "util";

const exec = util.promisify(child.exec);

export async function typecheck(pathToIndex: string) {
    await exec(`tsc ${pathToIndex} --noEmit --esModuleInterop`, {
        env: process.env,
    });
}
