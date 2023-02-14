import fs from "fs";
import path from "path";

const buffer = fs.readFileSync(path.resolve("./package.json"));

const json = JSON.parse(buffer.toString());

console.log(json.version);
