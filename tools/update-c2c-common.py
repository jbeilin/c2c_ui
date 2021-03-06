"""
This script load data from https://github.com/c2corg/v6_common and save it in a relevant format :

* common.json for attributes arrays
* fixed_strings_common_js.vue, a fake vue component, for attributes values that needs a translation

"""

import requests
import json
import os

URL = 'https://raw.githubusercontent.com/c2corg/v6_common/master/c2corg_common/{}.py'.format

# Load python file from c2corg_common, and parse it
def get_fields(name):

    proxies = {"https" : os.environ["HTTPS_PROXY"]} if "HTTPS_PROXY" in os.environ else None
    text = requests.get(URL(name), proxies = proxies).text

    # exec : only in dev mode, lint exception
    exec(text.encode('utf8'))

    return dict(locals())

# Load atributes file
# TODO : replace "values": "langs" by "values": "langs_priority" in fieldsProperties.json
attributes = get_fields('attributes')
attributes["langs"] = attributes["langs_priority"]

result = {}
result["attributes"] = {}

# get attribute list needed by UI
attribute_names = dict()
fields = json.load(open("./src/js/constants/fieldsProperties.json"))
for field in fields.values():
    if "values" in field:
        values = field["values"]
        if isinstance(values, str):
            attribute_names[values] = field.get("i18n", True)

# sort by key to help git tracking
attribute_names = {key: attribute_names[key] for key in sorted(attribute_names)}

# store this attribute in result
for attribute_name in attribute_names:
    result["attributes"][attribute_name] = attributes[attribute_name]

# store letter_types
result["letter_types"] = get_fields('document_types')['ALL']

# save result
json.dump(result, open("./src/js/constants/common.json", "w"), indent=4)

# and update attributes that need a translation
with open("./src/translations/fixed_strings_common_js.vue", "w") as f:
    f.write("<template>\n")
    f.write("    <!-- auto-generated by tools/update-c2c-common.py -->\n")
    f.write("    <span>\n")

    for field in sorted(fields):
        f.write("        <span v-translate>{}</span>\n".format(field))

    for attribute_name in sorted(attribute_names):
        if attribute_names[attribute_name]: # does it need translation ?
            f.write("        <!-- {} -->\n".format(attribute_name))
            for value in attributes[attribute_name]:
                f.write('        <span v-translate translate-context="{}">{}</span>\n'.format(attribute_name, value))

    f.write("    </span>\n")
    f.write("</template>\n")
