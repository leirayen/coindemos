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
if(!window.jQuery){
    var new_element = document.createElement("script");
    new_element.setAttribute("type", "text/javascript");
    new_element.setAttribute("src", "https://cdn.bootcss.com/jquery/2.0.0/jquery.min.js");
    document.body.appendChild(new_element);
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
}