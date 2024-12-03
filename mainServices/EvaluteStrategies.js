const strategiesModel = require('../models/Strategies.Model')
const EvaluteFunction = require('./EvaluteFuntions')
const {PlaceOrdersByAPi} = require('../PythonApis/OrderService')

async function EvaluteStrategy() {

    // 1 pahle to jo deplo stragegies wow get karo 

    await strategiesModel.find({ deployed: true })
        .then(async (response) => {


            if (response != null) {

                // console.log(response);


                // response.forEach((singleStrategies) => {
                //     console.log(singleStrategies);

                // })
                response.forEach(async (singleStrategies) => {


                    // detail Underatanding  
                    // Step: 1  pahle hum saari stragesy ko nikalna hai
                    // Step: 2    uske bbad indicators ki value find karni hai
                    // Step: 3   uske basdd rules ko evalute karn hai
                    // Step: 4   action base work karna hai

                    console.time('time')

                    // store single strategy 
                    const strategy = singleStrategies

                    // ya pe hume destructe karke ek single strae object 
                    //se indicators and rules nikal liye 
                    const { indicators, rules } = strategy;

                    //     // ya pe humne indicators nam ke arry ke ek ek elemnt ka ruslt reullt me store kara raha hai 
                    //     // imse jitne bhi indicators hai uske reult ha gaya hoga 

                    //                     map Function:

                    // map synchronous hai aur directly Promise return karta hai jab aap async function ke saath use karte hain.

                    // Promise.all:

                    // Promise.all ek array of promises leta hai aur unhe resolve hone tak wait karta hai.

                    // Iske baad, Promise.all resolved values ka array return karta hai.
                    const InicatorsResult = await EvaluteFunction.EvaluteIndicators(indicators)

                    // ye anwer string me convert nha raha hai isliye hum isse json stringy karnge 
                    // console.log('vishal babu' + JSON.stringify(InicatorsResult.close));
                    console.timeEnd('time')


                    // ya single rule nikalenge rule arrya me se uske baad usko evalute karenge evalutRules funtion ki madad se 
                    const ruleResult = await Promise.all(rules.map((singlerule) => EvaluteFunction.EvaluteRules(singlerule, InicatorsResult)))

                    console.log(ruleResult[0].data);

                    if (ruleResult[0].data) {

                        if (ruleResult[0].action === "execute_order") {

                            // condition match hone ke baad order execute kar do jo strategies me order details  de rakhe hai 
                            try {

                             PlaceOrdersByAPi(singleStrategies.orderDetails).then((response)=>{
                                if(!response){
                                    console.log('no order are excecuted');  
                                }
                                else{
                                    // send email and message and show open orders in ui 
                                }
                             })
                            } catch (error) {
                                
                                console.log(`error orderplac ${error}`);
                                
                            }


                        }

                    }





                })





            }


        })

}



module.exports = {  EvaluteStrategy}