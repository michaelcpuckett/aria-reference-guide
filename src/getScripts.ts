import fs from "fs";
import path from "path";

const filterJsFiles = (file: string) => file.endsWith(".js");
const getDirectoryFiles = (dir: string) => {
  const absolutePath = path.resolve(dir);
  if (!fs.existsSync(absolutePath)) return [];
  if (!fs.statSync(absolutePath).isDirectory()) return [];

  return fs.readdirSync(absolutePath).filter(filterJsFiles);
};

export default async function getScripts() {
  const utilityFiles = getDirectoryFiles("./scripts/utilities");
  const componentFiles = getDirectoryFiles("./scripts/components");

  const getJsFiles = async (files: string[], filePath: string) => {
    return files
      .map((file) => `${fs.readFileSync(path.resolve(filePath, file))}`)
      .join("");
  };

  const utilityJs = await getJsFiles(utilityFiles, "./scripts/utilities");
  const componentJs = await getJsFiles(componentFiles, "./scripts/components");

  return `${utilityJs}${componentJs}`;
}
