#target illustrator

// ============================================================================
// JSON PARSER (This replaces #include "json2.js")
// =This code adds the JSON.parse function to the script
// ============================================================================
if (typeof JSON === 'undefined') {
    JSON = (function () {
        var m = {
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"' : '\\"',
                '\\': '\\\\'
            };
        function f(n) {
            return n < 10 ? '0' + n : n;
        }
        var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        return {
            parse: function (text) {
                var j;
                function walk(holder, key) {
                    var k, v, value = holder[key];
                    if (value && typeof value === 'object') {
                        for (k in value) {
                            if (Object.prototype.hasOwnProperty.call(value, k)) {
                                v = walk(value, k);
                                if (v !== undefined) {
                                    value[k] = v;
                                } else {
                                    delete value[k];
                                }
                            }
                        }
                    }
                    return value;
                }
                text = String(text);
                cx.lastIndex = 0;
                if (cx.test(text)) {
                    text = text.replace(cx, function (a) {
                        return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                    });
                }
                if (/^[\],:{}\s]*$/
                        .test(text.replace(/\\(?:["\\\/bfnr]|u[0-9a-fA-F]{4})/g, '@')
                            .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                            .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                    j = eval('(' + text + ')');
                    return j;
                }
                throw new SyntaxError('JSON.parse');
            }
        };
    }());
}

// ============================================================================
// HELPER FUNCTION (Your original)
// This function is clean and we'll keep it.
// ============================================================================
function fillObject(obj, color) {
    if (!obj) return; // Safety check
    obj.locked = false;
    if(obj.layer) obj.layer.locked = false;

    if (obj.typename === "PathItem" || obj.typename === "CompoundPathItem") {
        obj.fillColor = color;
    } else if (obj.typename === "GroupItem") {
        // Loop through path items in a group
        for(var p = 0; p < obj.pathItems.length; p++){
            obj.pathItems[p].fillColor = color;
        }
        // Also loop through compound path items in a group
        for(var c = 0; c < obj.compoundPathItems.length; c++){
             obj.compoundPathItems[c].fillColor = color;
        }
    }
}

// ============================================================================
// THE "ENGINE"
// ============================================================================

// This map is correct and we keep it.
var PART_MAP = {
    "FRONT PANELS":     { objectName: "FRONT_PANEL",      textName: "TEXT_FRONT_PANEL" },
    "FRONT EYELETS":    { objectName: "FRONT_EYELETS",    textName: "TEXT_FRONT_EYELE" },
    "BACK PANELS":      { objectName: "BACK_PANEL",       textName: "TEXT_BACK_PANEL" },
    "BACK EYELETS":     { objectName: "BACK_EYELETS",     textName: "TEXT_BACK_EYELETS" },
    "CROWN STITCHING":  { objectName: "CROWN_STITCHING",  textName: "TEXT_CROWN_STITCHING" },
    "ROPE":             { objectName: "ROPE",             textName: "TEXT_ROPE" },
    "VISOR":            { objectName: "VISOR",            textName: "TEXT_VISOR" },
    "UNDERVISOR":       { objectName: "UNDERVISOR",       textName: "TEXT_UNDERVISOR" },
    "VISOR STITCHING":  { objectName: "VISOR_STITCHING",  textName: "TEXT_VISOR_STITCHING" },
    "BUTTON":           { objectName: "BUTTON",           textName: "TEXT_BUTTON" },
    "BACKSTRAP BOTTOM": { objectName: "BACKSTRAP_BOTTOM", textName: "TEXT_BACKSTRAP_BOTTOM" },
    "BACKSTRAP TOP":    { objectName: "BACKSTRAP_TOP",    textName: "TEXT_BACKSTRAP_TOP" },
    "FRONT LINING":     { objectName: "FRONT_LINING",     textName: "TEXT_FRONT_LINING" },
    "SWEATBAND":        { objectName: "SWEATBAND",        textName: "TEXT_SWEATBAND" },
    "INTERIOR TAPING":  { objectName: "INTERIOR_TAPING",  textName: "TEXT_INTERIOR_TAPING" }
};

// *** THIS IS THE NEW, UPDATED FUNCTION ***
// It replaces your old applyAllColors and findObjectByName
function applyAllColors(selectionsJSON) {
    if (!app.activeDocument) {
        return "Error: Please open an Illustrator document first.";
    }
    var doc = app.activeDocument;
    
    var selections;
    try {
        // This JSON.parse() works because of the polyfill at the top
        selections = JSON.parse(selectionsJSON);
    } catch (e) {
        return "Error: " + e.message + " (Line: " + e.line + "). JSON: " + selectionsJSON;
    }

    // 1. Create lookup maps from the user's selections for efficiency
    var colorsToApply = {}; // e.g. { "FRONT_PANEL": illColor, ... }
    var textToApply = {};   // e.g. { "TEXT_FRONT_PANEL": "S15-Blue", ... }
    var errors = [];

    for (var partName in selections) {
        if (selections.hasOwnProperty(partName)) {
            var partData = PART_MAP[partName];
            if (!partData) {
                errors.push("No part map for '" + partName + "'");
                continue;
            }

            // Get the color data
            var colorName = selections[partName].name;
            var colorRGB = selections[partName].rgb;

            // Create the Illustrator color object
            var illColor = new RGBColor();
            illColor.red = colorRGB.r;
            illColor.green = colorRGB.g;
            illColor.blue = colorRGB.b;

            // --- CASE-INSENSITIVE FIX ---
            // Add to our lookup maps using UPPERCASE keys
            colorsToApply[partData.objectName.toUpperCase()] = illColor;
            textToApply[partData.textName.toUpperCase()] = colorName;
        }
    }

    // 2. Loop through ALL page items to apply colors
    // This solves the "only one item" problem.
    var itemsChanged = 0;
    var itemsTotal = doc.pageItems.length;

    for (var i = 0; i < itemsTotal; i++) {
        var currentItem = doc.pageItems[i];
        
        // --- CASE-INSENSITIVE FIX ---
        // Check if this item's name (converted to UPPERCASE) is in our color map
        if (currentItem.name) {
            var upperCaseName = currentItem.name.toUpperCase();
            if (colorsToApply[upperCaseName]) {
                var color = colorsToApply[upperCaseName];
                try {
                    // Use your original helper function
                    fillObject(currentItem, color);
                    itemsChanged++;
                } catch (e) {
                    errors.push("Failed to color " + currentItem.name + ": " + e.message);
                }
            }
        }
    }

    // 3. Loop through ALL text frames to apply text
    var textChanged = 0;
    var textFramesTotal = doc.textFrames.length;

    for (var j = 0; j < textFramesTotal; j++) {
        var textFrame = doc.textFrames[j];
        
        // --- CASE-INSENSITIVE FIX ---
        // Convert the text frame's contents to UPPERCASE
        var frameContentsUpper = textFrame.contents.toUpperCase();
        var textKey = null;

        // Check if this UPPERCASE content contains any of our UPPERCASE keys
        for (var key in textToApply) {
            if (frameContentsUpper.indexOf(key) > -1) {
                textKey = key;
                break;
            }
        }

        if (textKey) {
            var newText = textToApply[textKey];
            try {
                textFrame.locked = false;
                if(textFrame.layer) textFrame.layer.locked = false;
                
                textFrame.contents = newText; // Update text
                textChanged++;
            } catch (e) {
                errors.push("Failed to update text " + textKey + ": " + e.message);
            }
        }
    }

    // 4. Redraw and report
    app.redraw();

    var successMessage = "Applied " + itemsChanged + " colors and updated " + textChanged + " text fields.";
    
    if (errors.length > 0) {
        // Use your original error dialog, but with more info
        var errorDialog = new Window("dialog", "Script Completed with Errors");
        errorDialog.orientation = "column";
        errorDialog.alignChildren = "fill";
        errorDialog.add("statictext", undefined, "Success: " + successMessage);
        errorDialog.add("statictext", undefined, "The following errors also occurred:");
        var errorList = errorDialog.add("edittext", [0,0,400,150], errors.join("\n"), {multiline: true, readonly: true});
        errorDialog.add("button", undefined, "OK", { name: "ok" });
        errorDialog.show();
        // --- THIS IS THE FIX ---
        // The old line had a syntax error (an extra un-escaped quote)
        // return "Completed with errors. "All colors and text applied successfully!"";
        
        // This is the corrected line:
        return "Completed with errors. See dialog for details.";
    }

    return successMessage; // Return the full success message
}