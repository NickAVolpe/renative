import chalk from 'chalk';

const highlight = chalk.green;

export const generateOptions = (inputData, isMultiChoice = false, mapping, renderMethod) => {
    let asString = '';
    const valuesAsObject = {};
    const valuesAsArray = [];
    const keysAsObject = {};
    const keysAsArray = [];
    const isArray = Array.isArray(inputData);

    const output = {};
    const renderer = renderMethod || _generateOptionString;
    if (isArray) {
        inputData.map((v, i) => {
            asString += renderer(i, v, mapping, v);
            valuesAsArray.push(v);
            if (!mapping) keysAsArray.push(v);
            if (!mapping) valuesAsObject[v] = v;
        });
    } else {
        let i = 0;
        for (const k in inputData) {
            const v = inputData[k];
            asString += renderer(i, v, mapping, k);
            keysAsArray.push(k);
            keysAsObject[k] = true;
            valuesAsObject[k] = v;
            valuesAsArray.push(v);
            i++;
        }
    }
    output.keysAsArray = keysAsArray.sort(_sort);
    output.valuesAsArray = valuesAsArray.sort(_sort);
    output.keysAsObject = keysAsObject;
    output.valuesAsObject = valuesAsObject;
    output.asString = asString;
    return output;
};

const _sort = (a, b) => {
    let aStr = '';
    let bStr = '';
    if (typeof a === 'string') {
        aStr = a.toLowerCase();
        bStr = b.toLowerCase();
    } else {
        if (a && a.name) aStr = a.name.toLowerCase();
        if (b && b.name) bStr = b.name.toLowerCase();
    }

    let com = 0;
    if (aStr > bStr) {
        com = 1;
    } else if (aStr < bStr) {
        com = -1;
    }
    return com;
};

const _generateOptionString = (i, obj, mapping, defaultVal) => `-[${highlight(i + 1)}] ${highlight(mapping ? '' : defaultVal)} \n`;