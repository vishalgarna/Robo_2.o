const axios = require('axios');

const historicalData = {
    close: [10, 11, 12, 11, 14, 13, 14, 15, 16, 15, 17, 18, 19, 20, 21],
    // Include open, high, low if needed
};


async function loadData(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Sample usage
// const dataUrl = 'https://api.example.com/historical_data';
// loadData(dataUrl).then(historicalData => {
//     console.log(historicalData);
// });


const { SMA, RSI } = require('technicalindicators');

const indicatorFunctions = {
    SMA: SMA.calculate,
    RSI: RSI.calculate,
    // Add more indicators as needed
};

async function calculateIndicators(indicatorsConfig, data) {

    //  reduce function JavaScript mein ek powerful array method hai 
    //  jo ek single value return karta hai array ke elements ko iterate karke.
    //  Yeh function aapko cumulative calculations (mtlb running calcultaion  1+2+3+4 = 10) ya transformations karne mein madad karta hai.
    //   Chaliye dekhte hain yeh kaise kaam karta hai aur kab use karna chahiye:
    return indicatorsConfig.reduce((acc, config) => {
        const { name, type, parameters } = config;
        const calcFunc = indicatorFunctions[type];

        if (!calcFunc) {
            throw new Error(`Unsupported indicator type: ${type}`);
        }

        acc[name] = calcFunc({
            ...parameters,
            values: data.close,
        });

        return acc;
    }, {});
}

// Sample strategy configuration
const strategy = {
    indicators: [
        {
            name: "SMA30",
            type: "SMA",
            parameters: { period: 10 },
        },
        {
            name: "RSI30",
            type: "RSI",
            parameters: { period: 5 },
        },
    ],
};

// Assume historicalData is already defined with closing prices
const calculatedIndicators = calculateIndicators(strategy.indicators, historicalData);

console.log(calculatedIndicators);


// *************** yaha tak muje samj me aa gaya hai 


const comparisonFunctions = {
    'less_than': (a, b) => a < b,
    'greater_than': (a, b) => a > b,
    'equal_to': (a, b) => a === b,
    'not_equal_to': (a, b) => a !== b,
    // Add more as needed
};

function evaluateRule(rule, indicators, currentPrice) {

    // const rules = [
    // {
    //     condition: "if",
    //     indicator: "close",
    //     comparison: "less_than",
    //     value: "SMA30 ?  [42,45,75,74,89,49,65,54,]", // 
    //     action: "check_next_condition",
    //     logical_operator: "AND"
    // },
    // {
    //     condition: "if",
    //     indicator: "RSI30",
    //     comparison: "greater_than",
    //     value: 30,
    //     action: "execute_trade",
    //     logical_operator: "AND"
    // }
    const { indicator, comparison, value } = rule;

    //  "close"      "154"
    let indicatorValues = indicators[indicator] || currentPrice;
    // sma30 ki value nikal hui hai to uke coress ponding arry hai indicatores me [42,45,75,74,89,49,65,54,]

    const compareToValues = indicators[value] || parseFloat(value);


    //                 ya pe ye chcke kar raha hai ki jo latevalue aayi hia wow ek aarrry hai ? to uski last value le lo : to wow single value hestige store kar lo 
    const latestValue = Array.isArray(indicatorValues) ? indicatorValues[indicatorValues.length - 1] : indicatorValues;
    //                 ya pe bhi yahi  chcke kar raha hai ki jo latevalue aayi hia wow ek aarrry hai ? to uski last value le lo : to wow single value hestige store kar lo 
    const compareToValue = Array.isArray(compareToValues) ? compareToValues[compareToValues.length - 1] : compareToValues;

    // ye chek kar raha kya jo camprison value aay i hao wow is me camprison function exixt karti hai nahi 
    // agar karti hai to uske corresponding function wow isme store ho jayega 
    const comparisonFunction = comparisonFunctions[comparison];

    // agar koi key aesi exixst nahi karti to error throw ho jaega 
    if (!comparisonFunction) {
        throw new Error(`Unsupported comparison type: ${comparison}`);
    }
    //  exixt karne par hume true flase milega 
    // latesvalue hai close price 
    // comparvalue hai SMA30 ki last price 
    return comparisonFunction(latestValue, compareToValue);
}


// Sample rules
const rules = [
    {
        condition: "if",
        indicator: "close",
        comparison: "less_than",
        value: "SMA30",
        action: "check_next_condition",
        logical_operator: "AND"
    },
    {
        condition: "if",
        indicator: "RSI30",
        comparison: "greater_than",
        value: 30,
        action: "execute_trade",
        logical_operator: "AND"
    }
];

// Evaluate each rule dynamically
const currentPrice = historicalData.close[historicalData.close.length - 1];

//   ************************************** yaha pe ^ apne prua rule ka ek object measn sirf ek kyuki hum map kar rahe  paas kasr diya 
const ruleResults = rules.map(rule => evaluateRule(rule, calculatedIndicators, currentPrice));
console.log(ruleResults);// Returns a new array of results

// map: Use for transforming arrays.

// forEach: Use for side effects.

// reduce: Use for aggregations.


function evaluateLogicalConditions(results, logicalConditions) {
    const { operator, conditions, action } = logicalConditions[0];
    const finalResult = operator === 'AND' ? results.every(Boolean) : results.some(Boolean);
    return finalResult ? action : 'no_action';
}

// Sample logical conditions
const logicalConditions = [
    {
        operator: "AND",
        conditions: [
            {
                indicator: "close",
                comparison: "less_than",
                value: "SMA30"
            },
            {
                indicator: "RSI30",
                comparison: "greater_than",
                value: 30
            }
        ],
        action: "execute_trade"
    }
];

// Determine the final action based on logical conditions
const finalAction = evaluateLogicalConditions(ruleResults, logicalConditions);
console.log(`Final Action: ${finalAction}`);



