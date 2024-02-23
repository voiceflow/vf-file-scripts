import json
import re

FILE_NAME = "test.vf"

# Load in the VF file
with open(FILE_NAME, "r", encoding="utf8") as file:
    VFFile = json.load(file)

# Create a dictionary of ID to variable names
id_to_variable_map = {variable['id']: variable['name'] for variable in VFFile['variables']}

diagrams = json.dumps(VFFile['diagrams'])

def replace_match(match):
    return id_to_variable_map.get(match.group(0), match.group(0))

replaced_diagrams = re.sub(r'[a-zA-Z0-9]{24}', replace_match, diagrams)

VFFile['diagrams'] = json.loads(replaced_diagrams)

# Write the modified data back to a new file
new_file_name = FILE_NAME.replace(".vf", ".out.vf")
with open(new_file_name, "w", encoding="utf8") as file:
    json.dump(VFFile, file, indent=2)
