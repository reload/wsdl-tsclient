import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Project } from "ts-morph";

describe("ts-morph glob matching", () => {
    it("filters nested source files with include and exclude patterns", () => {
        const project = new Project({ useInMemoryFileSystem: true });
        project.createSourceFile("/src/client.ts", "");
        project.createSourceFile("/src/definitions/Request.ts", "");
        project.createSourceFile("/src/definitions/ignored.ts", "");
        project.createSourceFile("/other/client.ts", "");

        const files = project.getSourceFiles(["/src/**/*.ts", "!**/ignored.ts"]);

        assert.deepEqual(files.map((file) => file.getFilePath()).sort(), [
            "/src/client.ts",
            "/src/definitions/Request.ts",
        ]);
    });
});
