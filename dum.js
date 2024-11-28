const talib = require('technicalindicators');

const result = talib.macd({
    values: [4,8,7,8,7,4,7,9,4,3,7,5,6,4,7,4,7,9,4,3],
    slowPeriod: 4,
    fastPeriod: 9,
    signalPeriod: 3 // Ensure to add signal period
});

console.log(`result: ${JSON.stringify(result, null, 2)}`);
