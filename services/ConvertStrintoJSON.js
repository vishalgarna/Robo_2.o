async function convertToJSON(str) {
    // Step 1: Clean the string by removing leading/trailing commas and misplaced characters
    str = str.trim().replace(/^,|,$/g, ''); // Remove leading and trailing commas
    console.log('After cleaning:', str);

    // Step 2: Correct common errors in the JSON string
    str = str.replace(/(,?}\w+|{{|}})/g, ''); // Remove misplaced curly braces and characters
    console.log('After formatting:', str);

    // Step 3: Ensure the string is properly enclosed in curly braces
    str = `{${str}}`;
    console.log('Final string:', str);

    try {
        // Step 4: Parse the cleaned string to JSON
        const jsonObject = JSON.parse(str);
        console.log('Parsed JSON:', jsonObject);
        return jsonObject;
    } catch (error) {
        console.error('Error parsing JSON data:', error);
        console.log('Invalid JSON string:', str); // Log the invalid JSON string for debugging
        return null;
    }
}

// const inputStr = `,"mid":154.132,"symbol":"PY","ts":"1731983482082","bid":154.125,"ask":154.139`;
// const jsonData = convertToJSON(inputStr);

// if (jsonData) {
//     console.log('Mid Value:', jsonData['mid']);
// } else {
//     console.log('Failed to convert string to JSON.');
// }


module.exports = { convertToJSON }