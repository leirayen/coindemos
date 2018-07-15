var add = function (arg1, arg2) {
    arg1 = arg1.toString(), arg2 = arg2.toString();
    var arg1Arr = arg1.split("."), arg2Arr = arg2.split("."), d1 = arg1Arr.length == 2 ? arg1Arr[1] : "",
        d2 = arg2Arr.length == 2 ? arg2Arr[1] : "";
    var maxLen = Math.max(d1.length, d2.length);
    var m = Math.pow(10, maxLen);
    var result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen));
    var d = arguments[2];
    return typeof d === "number" ? Number((result).toFixed(d)) : result;
};

var Sub = function (arg1, arg2) {
    return Calc.Add(arg1, -Number(arg2), arguments[2]);
}

var Mul = function (arg1, arg2) {
    var r1 = arg1.toString(), r2 = arg2.toString(), m, resultVal, d = arguments[2];
    m = (r1.split(".")[1] ? r1.split(".")[1].length : 0) + (r2.split(".")[1] ? r2.split(".")[1].length : 0);
    resultVal = Number(r1.replace(".", "")) * Number(r2.replace(".", "")) / Math.pow(10, m);
    return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
}

var Div = function (arg1, arg2) {
    var r1 = arg1.toString(), r2 = arg2.toString(), m, resultVal, d = arguments[2];
    m = (r2.split(".")[1] ? r2.split(".")[1].length : 0) - (r1.split(".")[1] ? r1.split(".")[1].length : 0);
    resultVal = Number(r1.replace(".", "")) / Number(r2.replace(".", "")) * Math.pow(10, m);
    return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
}

// var new_element = document.createElement("script");
// new_element.setAttribute("type", "text/javascript");
// new_element.setAttribute("src", "https://cdn.bootcss.com/jquery/2.0.0/jquery.min.js");
// document.body.appendChild(new_element);

//封装ajax
var Ajax={
    get: function(url, fn) {
        // XMLHttpRequest对象用于在后台与服务器交换数据
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.onreadystatechange = function() {
            // readyState == 4说明请求已完成
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
                // 从服务器获得数据
                fn.call(this, xhr.responseText);
            }
        };
        xhr.send();
    },
    // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
    post: function (url, data, fn) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        // 添加http头，发送信息至服务器时内容编码类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
                fn.call(this, xhr.responseText);
            }
        };
        var send_data = '';
        for(var key in data){
            send_data += key + '=' + data[key] + '&';
        }
        console.log('send data：'+ send_data);
        xhr.send(send_data);
    }
}

function calc() {
    var page = 1, stop = 0, sum = 0, sum_1 = 0, sum_2 = 0, sum_3 = 0;
    var today = new Date('2018-07-15 00:00:00');
    var qk_1 = new Date('2018-07-15 06:00:00');
    var qk_2 = new Date('2018-07-15 12:00:00');
    while(true){
        console.log('now page:' + page);
        Ajax.get(
            'https://abcc.com/history/trades.json?from=&market=&to=&page='+ page,
            function (data) {
                data = JSON.parse(data).trades;
                for(var i in data){
                    var record = data[i];
                    var recordDate = new Date(record.updated_at.replace('T', ' ').substr(0, 19));
                    if(recordDate > qk_2){
                        sum_3 = add(sum_3, record.fee);
                    } else if(recordDate < qk_2 && recordDate > qk_1){
                        sum_2 = add(sum_2, record.fee);
                    } else if(recordDate < qk_1 && recordDate > today){
                        sum_1 = add(sum_1, record.fee);
                    }
                    if(recordDate < today){
                        console.log(record);
                        console.log('recordDate:' + recordDate + '    today : ' + today + '   flag:' + (recordDate < today));
                        stop = 1;
                        break;
                    }
                    sum = add(sum, record.fee);
                }
            }
        );
        page ++;
        if(stop == 1){
            break;
        }
    }
    console.log('total fee: ' + sum + ' 区块1 fee:' + sum_1 + '， 区块2 fee : ' + sum_2 + '，区块3 fee:' + sum_3);
}


function total_fee_1() {
    var page = 1, stop = 0, sum = 0, sum_14_1 = 0, sum_14_2 = 0, sum_14_3 = 0, sum_14_4 = 0;
    var sum_15_1 = 0, sum_15_2 = 0, sum_15_3 = 0, sum_15_4 = 0;
    var startDate = new Date('2018-07-14 00:00:00');
    var qk_14_1 = new Date('2018-07-14 00:00:00');
    var qk_14_2 = new Date('2018-07-14 06:00:00');
    var qk_14_3 = new Date('2018-07-14 12:00:00');
    var qk_14_4 = new Date('2018-07-14 18:00:00');
    var qk_15_1 = new Date('2018-07-15 00:00:00');
    var qk_15_2 = new Date('2018-07-15 06:00:00');
    var qk_15_3 = new Date('2018-07-15 12:00:00');
    var qk_15_4 = new Date('2018-07-15 18:00:00');
    while(true){
        console.log('now page:' + page);
        Ajax.get(
            'https://abcc.com/history/trades.json?from=&market=&to=&page='+ page,
            function (data) {
                data = JSON.parse(data).trades;
                for(var i in data){
                    var record = data[i];
                    var recordDate = new Date(record.updated_at.replace('T', ' ').substr(0, 19));
                    if(recordDate > qk_15_4){
                        sum_15_4 = add(sum_15_4, record.fee);
                    } else if(recordDate < qk_15_4 && recordDate > qk_15_3){
                        sum_15_3 = add(sum_15_3, record.fee);
                    } else if(recordDate < qk_15_3 && recordDate > qk_15_2){
                        sum_15_2 = add(sum_15_2, record.fee);
                    } else if(recordDate < qk_15_2 && recordDate > qk_15_1){
                        sum_15_1 = add(sum_15_1, record.fee);
                    } else if(recordDate < qk_15_1 && recordDate > qk_14_4){
                        sum_14_4 = add(sum_14_4, record.fee);
                    } else if(recordDate < qk_14_4 && recordDate > qk_14_3){
                        sum_14_3 = add(sum_14_3, record.fee);
                    } else if(recordDate < qk_14_3 && recordDate > qk_14_2){
                        sum_14_2 = add(sum_14_2, record.fee);
                    } else if(recordDate < qk_14_2 && recordDate > qk_14_1){
                        sum_14_1 = add(sum_14_1, record.fee);
                    }
                    if(recordDate < startDate){
                        console.log(record);
                        console.log('recordDate:' + recordDate + '    today : ' + startDate + '   flag:' + (recordDate < startDate));
                        stop = 1;
                        break;
                    }
                    sum = add(sum, record.fee);
                }
            }
        );
        page ++;
        if(stop == 1){
            break;
        }
    }
    console.log('total fee: ' + sum);
    console.log('2018-07-15 4: ' + sum_15_4);
    console.log('2018-07-15 3: ' + sum_15_3);
    console.log('2018-07-15 2: ' + sum_15_2);
    console.log('2018-07-15 1: ' + sum_15_1);
    console.log('2018-07-14 4: ' + sum_14_4);
    console.log('2018-07-14 3: ' + sum_14_3);
    console.log('2018-07-14 2: ' + sum_14_2);
    console.log('2018-07-14 1: ' + sum_14_1);
}

var usdt_eth_num = 0, eth_usdt_num = 0;
function trade_s(price, money, times){
    usdt_eth_num = Div(money, price);
    usdt_eth_num = Math.floor(usdt_eth_num, 2);
    eth_usdt_num = usdt_eth_num;
    var total = Mul(price, usdt_eth_num);
    var fee = Mul(total, 0.001);
    var usdt_eth_fee_total = add(total, fee);
    jQuery.ajax({
        url :   'https://abcc.com/markets/ethusdt/order_bids',
        method : 'post',
        dataType : 'json',
        async : false,
        data : {
            'utf8' : '✓',
            'order_bid[ord_type]' : 'limit',
            'order_bid[price]' : price,
            'order_bid[origin_volume]' : usdt_eth_num,
            'order_bid[total]' : usdt_eth_fee_total,
            'order_ask[percent]' : 0
        },
        success : function (data) {
            console.log('trade-buy:' + data);
        }
    });
    // Ajax.post(
    //     'https://abcc.com/markets/ethusdt/order_bids',
    //     {
    //         'utf8' : '✓',
    //         'order_bid[ord_type]' : 'limit',
    //         'order_bid[price]' : price,
    //         'order_bid[origin_volume]' : usdt_eth_num,
    //         'order_bid[total]' : usdt_eth_fee_total,
    //         'order_ask[percent]' : 0
    //     },
    //     function (data) {
    //         console.log('trade-buy:' + data);
    //     }
    // );
}

function trade(price, money, times){
    usdt_eth_num = money/price;
    usdt_eth_num = Math.floor(usdt_eth_num, 2);
    eth_usdt_num = usdt_eth_num;
    var total = Mul(price * usdt_eth_num);
    var fee = Mul(total, 0.001);
    var usdt_eth_fee_total = total + fee;
    Ajax.post(
        'https://abcc.com/markets/ethusdt/order_bids',
        {
            'utf8' : '✓',
            'order_bid[ord_type]' : 'limit',
            'order_bid[price]' : price,
            'order_bid[origin_volume]' : usdt_eth_num,
            'order_bid[total]' : usdt_eth_fee_total,
            'order_ask[percent]' : 0
        },
        function (data) {
            console.log('trade-buy:' + data);
        }
    );

    var eth_usdt_fee_total = total - fee;
    Ajax.post(
        'https://abcc.com/markets/ethusdt/order_asks',
        {
            'utf8' : '✓',
            'order_bid[ord_type]' : 'limit',
            'order_bid[price]' : price,
            'order_bid[origin_volume]' : eth_usdt_num,
            'order_bid[total]' : eth_usdt_fee_total,
            'order_ask[percent]' : 0
        },
        function (data) {
            console.log('trade-sell:' + data);
        }
    );

}