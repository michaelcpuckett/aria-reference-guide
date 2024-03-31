import fs from "fs";
import path from "path";

const filterJsFiles = (file: string) => file.endsWith(".js");

export default async function getThirdPartyScript() {
  const thirdPartyFiles = fs
    .readdirSync(path.resolve("./scripts/third-party"))
    .filter(filterJsFiles);

  const getJsFiles = async (files: string[], filePath: string) => {
    return files
      .map((file) => `${fs.readFileSync(path.resolve(filePath, file))}`)
      .join("");
  };

  const thirdPartyJs = await getJsFiles(
    thirdPartyFiles,
    "./scripts/third-party"
  );

  return thirdPartyJs;
}
