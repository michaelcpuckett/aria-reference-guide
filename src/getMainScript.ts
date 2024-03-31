import fs from "fs";
import path from "path";
import ts from "typescript";

const filterTsFiles = (file: string) => file.endsWith(".ts");

export default async function getMainScript() {
  const utilityFiles = fs
    .readdirSync(path.resolve("./scripts/utilities"))
    .filter(filterTsFiles);

  const componentFiles = fs
    .readdirSync(path.resolve("./scripts/components"))
    .filter(filterTsFiles);

  const getTsFiles = async (files: string[], filePath: string) => {
    return files
      .map((file) => `${fs.readFileSync(path.resolve(filePath, file))}`)
      .join("");
  };

  const utilityTs = await getTsFiles(utilityFiles, "./scripts/utilities");
  const componentTs = await getTsFiles(componentFiles, "./scripts/components");

  const concatnatedTs = `${utilityTs}${componentTs}`;

  const convertedJs = ts.transpile(concatnatedTs, {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ES2020,
    lib: ["ES2020", "DOM"],
    moduleResolution: ts.ModuleResolutionKind.Node10,
  });

  return convertedJs;
}
