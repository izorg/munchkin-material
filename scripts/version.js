import fs from "node:fs";
import path from "node:path";

const buffer = fs.readFileSync(path.resolve("./package.json"));

const json = JSON.parse(buffer.toString());

console.log(json.version);
