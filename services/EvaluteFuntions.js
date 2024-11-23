const talib = require('technicalindicators')
const { GetCloseData } = require('./Historicaldata.services')


const { SMA, RSI, MACD } = talib

// SMA.calculate({
//     period,
//     values
// })


// map indicators function with theri name 
const TalibIndicators = {

    "SMA": SMA.calculate,
    "RSI": RSI.calculate,
    "MACD": MACD.calculate

}

// map function with comparison input
const ComparisonFunction = {

    "isGreaterThan": (x, y) => x > y,

    "isLessThan": (x, y) => x < y,

    "isEqual": (x, y) => x === y

}


// *********************fuction to evalute indicators ***************************
const EvaluteIndicators = async (Indicators) => {

    const Historicaltdata = await GetCloseData(100);

    return Indicators.reduce(async (acc, config) => {

        const { name, type, parameters } = config


        // if (type === "close") {
        //     let ans = await GetCloseData(1);

        //     console.log('jinga lala urr' + ans);


        // }


        let InidcatorFun = TalibIndicators[type]

        if (!InidcatorFun && type != 'close') {

            return console.log(`Unspported Indicators ${type}`);
        }

        else if (type === "close") {
            acc["close"] = await GetCloseData(1)
        }


        else {
            acc[name] = InidcatorFun({

                ...parameters,
                values: Historicaltdata

            })
        }

        // console.log(acc);


        return acc
    }, {})








}

//******************** */ Function To EvalueRule    ***********************
async function EvaluteRules(SingleRule, result) {


    const { indicator, comparison, value, action } = SingleRule


    // get latestvalue From the results 
    const LatestValue = result[indicator] || GetCloseData(1)
    // In the second case, value might be a string representation of a number (e.g., "123.45").
    //  Using parseFloat(value) ensures that the string is converted to a number.
    //  This is important for numerical operations.
    const comapreValue = (result[value] === undefined ? await GetCloseData(1) : result[value]) || parseFloat(value)


    // humne yaha par chek kiya jo value hume mile hai wow array hai ya single value 
    // agar aarray hai to uski last value le nahi to  single ha ti hestigie dal to 
    const newvalue = Array.isArray(LatestValue) ? LatestValue[LatestValue.length - 1] : LatestValue
    const SecondValue = Array.isArray(comapreValue) ? comapreValue[comapreValue.length - 1] : comapreValue

    const ComparisonValue = ComparisonFunction[comparison]

    if (!ComparisonValue) {
        console.log(`Kya Comaprison Dala hai TUmne Baby ${comparison}`);
        return False;
    }

    console.log(`newvalue ${newvalue}`);

    console.log(`SecondValue ${SecondValue}`);


    return { data: ComparisonValue(newvalue, SecondValue), action };
}


module.exports = {
    EvaluteIndicators,
    EvaluteRules
}