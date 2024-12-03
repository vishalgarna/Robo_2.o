from flask import Flask  , request , jsonify
import MetaTrader5 as mt5

app = Flask(__name__)

@app.route('/')
def home():
    return 'Kya haa Hai LAla '


# humne ek route define kiya uske and hum order execution jka function likha hua 
# jo user ki detail lekar orders exectute karta hai 
@app.route('/vishal' , methods = ['POST'])

def OrderPlaced():
    mt5.initialize()
    if not (mt5.initialize()):
        print('Beta Tumhare Mt5 Initialze nhai hua ' , mt5.last_error())


# user ki details nikali humne mje aa gaye 
    userdetails = request.get_json()   
    print('userdetails' , userdetails['account'])

    account =  182507753
    password = "Vishalgarna@1" 
    server = "Exness-MT5Trial6"

    if not (mt5.login(login = account , password = password , server=server)):
        print('Ye Kya Kardiy credential Wrong de diya ', mt5.lat_error())
        quit()

    else:
        print('ANdar aagaye iss id se ', account)


     
    if not (mt5.symbol_select(userdetails['symbol'])):
        print('le lo ladu aur dalo galat symbol ',userdetails['symbol'] )

   # jo request se details aaye wow nikal rahe hai   
    symbol = userdetails['symbol']
    symbol_info = mt5.symbol_info(symbol)
    print(userdetails['symbol'])
    print(symbol_info)

    # orderplace kar le thode se  
    orderplaceDeatils = {
        "action": mt5.TRADE_ACTION_DEAL,
        "symbol" :userdetails['symbol'] or 'USDJPY',
        "type"  : mt5.ORDER_TYPE_BUY if userdetails['type'] == 'BUY' else mt5.ORDER_TYPE_SELL,
        "price" : symbol_info.ask if userdetails['type'] == 'BUY' else symbol_info.bid,
       "volume" : 0.1
    }

    order_Result = mt5.order_send(orderplaceDeatils)

    if not order_Result.retcode != mt5.TRADE_RETCODE_DONE:
        print('Babu Ka Order Place nHai hu Mja aa bhi gaya')
        mt5.shutdown();
        print(order_Result)   
        return jsonify(order_Result),200

    else:
        print('Kya hi baat hai order place ho gaye bbau ka ',mt5.last_error())

    mt5.shutdown();   


    response = {
        "message": "Succes",
        "result" : order_Result
    } 

    return jsonify(response) , 200 

    # return  'baadsha Ki gali me aake Baadsha ka pta nhai puchte beta Gulamoke Jukw sir KudBaadsha Ka Pta Bta dete hai'



if __name__ == '__main__':
    app.run(debug = True ,port=5800)
# import MetaTrader5 as mt5

# # Initialize MT5
# if not mt5.initialize():
#     print('Failed to initialize MT5')
#     quit()

# # Login to your account
# account = 182507753
# password = "Vishalgarna@1"
# server = "Exness-MT5Trial6"

# if not mt5.login(login=account, password=password, server=server):
#     print(f"Failed to connect to account #{account}, error code: {mt5.last_error()}")
#     mt5.shutdown()
#     quit()
# else:
#     print(f"Connected to account #{account}")

# # Check if the symbol is available in the market watch
# symbol = 'AUDJPYm'
# if not mt5.symbol_select(symbol, True):

#     print(f"Failed to select symbol: {symbol}")
#     available_symbols = mt5.symbols_get() 
#     print(f"Available symbols: {[s.name for s in available_symbols]}")
#     mt5.shutdown()
#     quit()
# else:
#     print(f"Symbol {symbol} is selected.")

# # Check if the symbol info is available
# symbol_info = mt5.symbol_info(symbol)
# # print(symbol_info)


# # Create a market buy order request
# order_request = {
#     'action': mt5.TRADE_ACTION_DEAL,
#     'symbol': symbol,
#     'volume': 0.1,
#     'type': mt5.ORDER_TYPE_BUY,
#     'price': symbol_info.ask,
#     'deviation': 20,
#     'magic': 234000,
#     'comment': "Python script order",
#     'type_time': mt5.ORDER_TIME_GTC,
#     'type_filling': mt5.ORDER_FILLING_IOC,
# }

# # Send the order
# order_result = mt5.order_send(order_request)
# if order_result.retcode != mt5.TRADE_RETCODE_DONE:
#     print(f"Order failed. Retcode: {order_result.retcode}")
# else:
#     print("Order placed successfully!" ,order_request)

# # Shutdown connection to MT5
# mt5.shutdown()


