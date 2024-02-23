const fs = require("fs");

// The chances of ObjectId collision are incredibly low, 1/16,777,216 in one second, on one machine, on one process
// a reasonable strategy is to do a simple string replace

// the file name of the VF file
const FILE_NAME = "test.vf";

// load in the VF file, convert from string to JSON
const VFFile = JSON.parse(fs.readFileSync(FILE_NAME, "utf8"));

// create a dictionary of ID to variable names
const idToVariableMap = Object.fromEntries(
  VFFile.variables.map((variable) => [variable.id, variable.name])
);

// convert all diagrams to string
const diagrams = JSON.stringify(VFFile.diagrams);

// replace all the variables with their names, explainer: https://chat.openai.com/share/4435b97a-0b7a-4e97-958f-503e2e0e7871
const replacedDiagrams = diagrams.replace(
  /[a-zA-Z0-9]{24}/g,
  (match) => idToVariableMap[match] || match
);

VFFile.diagrams = JSON.parse(replacedDiagrams);

// write the file back
fs.writeFileSync(
  FILE_NAME.replace(".vf", ".out.vf"),
  JSON.stringify(VFFile, null, 2)
);
