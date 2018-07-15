//下单
function trade_create_order(volume, symbol, price){
    $.ajax({
        url : 'https://www.coineal.com/web/order/create ',
        method:'post',
        data : {side: "BUY", volume: "28", type: 1, symbol: "nealusdt", price: "0.15"},
        async: true,
        //timeout : 2000,
        dataType: 'json',
        success : function(data){
        console.log('trade_query_balance result is success.');
        console.log(data);
        download_jsondata("trade_query_balance.txt", JSON.stringify(data));
    },
    error : function(data){
        console.log('trade_query_balance result is error.');
        console.log(data);
    }
    });
}

//查询余额
function trade_query_balance(coin_type){
    $.ajax({
        url : 'https://www.coineal.com/web/account/symbol/balance?symbol=' + coin_type,
        method:'get',
        async: true,
        //timeout : 2000,
        dataType: 'json',
        success : function(data){
            console.log('trade_query_balance result is success.');
            console.log(data);
            download_jsondata("trade_query_balance.txt", JSON.stringify(data));
        },
        error : function(data){
          console.log('trade_query_balance result is error.');
          console.log(data);
        }
    })
}
var isSucc = 1,stop = 0, balanace = 0, usdt_2_eth_Sum = 0, eth_2_usdt_Sum = 0, sum = 0, coin_type;
//查询余额
function trade_query_balance(coin_type){
    coin_type = coin_type;
    $.ajax({
        url : 'https://www.coineal.com/web/account/symbol/balance?symbol=' + coin_type,
        method:'get',
        async: false,
        //timeout : 2000,
        dataType: 'json',
        success : function(data){
            console.log('trade_query_balance result is success.');
            console.log(data);
            try{
                if(data && data.data){
                    balanace = countCoinBalance;
                }
            } catch(e){
                console.log('查询余额时出错,coin_type:' + coin_type)
            }
        },
        error : function(data){
            console.log('trade_query_balance result is error.');
            console.log(data);
            isSucc = 0;
        }
    })
}

//下单
function trade_create_order(volume, symbol, price){
    if(!volume || volume <= 0) {
        if (coin_type == 'nealusdt') {
            volume = (Math.floor(balanace *10000) / 10000) / price;
            usdt_2_eth_Sum ++;
        } else if(coin_type == 'nealeth'){
            volume = (Math.floor(balanace *10000) / 10000) * price;
            eth_2_usdt_Sum ++;
        }
    }
    if (coin_type == 'nealusdt') {
        usdt_2_eth_Sum ++;
    } else if(coin_type == 'nealeth'){
        eth_2_usdt_Sum ++;
    }
    sum++;
    $.ajax({
        url : 'https://www.coineal.com/web/order/create ',
        method:'post',
        data : {'side': "BUY", 'volume': volume, type: 1, 'symbol': symbol, 'price': price},
        async: false,
        //timeout : 2000,
        dataType: 'json',
        success : function(data){
            console.log('trade_query_balance result is success.');
            console.log(data);
        },
        error : function(data){
            console.log('trade_query_balance result is error.');
            console.log(data);
        }
    });
}

//查询挂单

function trade_query_order(symbol){
    var result = 0;
    $.ajax({
        url : 'https://www.coineal.com/web/new_order?pageSize=10&page=1&symbol=' + symbol,
        method:'get',
        async: false,
        //timeout : 2000,
        dataType: 'json',
        success : function(data){
            console.log(data);
            if(data && data.data){
                if(data.data.count > 0){
                    result =  1;
                    console.log('存在未交易完成的挂单:');
                } else {
                    result = 2;
                    console.log('无挂单数据或交易已完成.');
                }
            }
        },
        error : function(data){
            console.log('trade_query_order result is error.');
            console.log(data);
            result = 3;
        }
    });
    return result;
}

function create_order_usdt_2_eth(volumn, price){
    isSucc = 1;
    trade_query_balance('nealusdt');
    if(isSucc == 0){
        return;
    }
    trade_create_order(volumn, 'nealusdt', price);
    while(true){
        if(stop == 1){
            break
        }
        var result = trade_query_order('nealusdt');
        if(result == 2){
            break;
        }
    }
}

function create_order_eth_2_usdt(volumn, price){
    isSucc = 1;
    trade_query_balance('nealeth');
    if(isSucc == 0){
        return;
    }
    trade_create_order(volumn, 'nealeth', price);
    while(true){
        if(stop == 1){
            break
        }
        var result = trade_query_order('nealusdt');
        if(result == 2){
            break;
        }
    }
}

function fake_click(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent(
        "click", true, false, window, 0, 0, 0, 0, 0
        , false, false, false, false, 0, null
    );
    obj.dispatchEvent(ev);
}
function download_jsondata(name, data) {
    var urlObject = window.URL || window.webkitURL || window;

    var downloadData = new Blob([data]);

    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    save_link.href = urlObject.createObjectURL(downloadData);
    save_link.download = name;
    fake_click(save_link);
}

download("itdouzi.txt","使用js下载www.itdouzi.com");

//查询挂单
function trade_query_resting_order(){

}

//下单
function trade_order(){

}

