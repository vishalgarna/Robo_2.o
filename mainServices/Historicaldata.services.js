const { ForexDataModel } = require('../models/ForexDatamodel')


async function GetCloseData(peiod) {
    try {
        const document = await ForexDataModel.findOne({ symbol: "USDJPY" })
        // console.log(document);

        if (document) {
            const closeValues = document.data1m.map(item => item.close);
            // slice - hume arr ko modified karke deta hai kha se kha tak ki value ho tab 
            const modifiedData = closeValues.slice(-(peiod))

            return modifiedData
        } else {
            console.log('No document found for the given symbol.');
        }
    } catch (error) {
        console.error('Error fetching document:', error);
    }
}


module.exports = {
    GetCloseData
}
