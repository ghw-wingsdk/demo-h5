
//初始化数据
var config = {
    /*appId:'1640a911530f11e69dab0211fa47f775',
     appKey:"rtnexCfCAgUMUQvUBMC2p4bF9RDCuKz3",*/
    appId: '0befcc31aab711e5a22602c85f0429f5',
    appKey: 'GlKO1XOwNYhi8Kc3L2Kd1rOzhITc6VDX',
    sdkType: 'html5',
    platform: 'html5',
    debug: true,
    logSize: 10
};
wing.init(config);

//登录 start

//登录
function login() {
    wing.user.login({
        //platform: 'FACEBOOK',
        success: function(){
            console.log("登录成功");
        },
        fail: function(){
            console.log("登录失败");
        },
        cancel: function(){
            console.log("登录取消")
        },
    });

}

//登录
function loginFB() {
    wing.user.login({
        platform: 'FACEBOOK',
        FB:true,
        success: function(){
            console.log("登录成功");
        },
        fail: function(){
            console.log("登录失败");
        },
        cancel: function(){
            console.log("登录取消")
        },
    });


}

//取消登录
function colseModel(id) {
    $("#"+id).hide(500);
//        bg_auto();
    $('#info_table2').show(100);
}
// 登录 end


//支付 ---------start
var productList = [];

//获取商品
function getProducts() {
    productList = wing.pay.getProducts();
    if(productList==null){
        return ;
    }
    $("#goodsModel").removeClass("hide");
    $("#goodsModel").show(500);
//        bg_fixed();
    var  html2="";
    for (var i = 0; i<productList.length;i++) {
        var  template=document.getElementById("productsTemplate").innerHTML;
        for(x in productList[i]){
            template=template.replace(eval("/("+x+")/gi"), productList[i][x]);
        }
        html2+=template;
    }
    document.getElementById("productsHtml").innerHTML=html2;


}


//支付
function doPay(productId, productName, channel) {
    //$("#payModel").removeClass("hide");
    //$("#payModel").show(500);


    wing.pay.payUI({
        channel: channel,
        productId: productId,
        serverId: '3231',
        gameUserId: '32',
        productName: productName,
        success: function (a) {
            $("#payModel").hide(500);
//          $("#goodsModel").hide(500);
        }
    });




}

//--------------------数据收集 start----------------------------------

function getDataCollection() {
    $("#dataModel").removeClass("hide");
    $("#dataModel").show(500);

//        bg_fixed();
}

function sendData(idx) {
    $("#addable_area").empty();
    $("#addParamBtn").attr("disabled", true);
    var eventName = $(idx).parent().parent().find("td:eq(1)").html();
    $("#eventName").val(eventName);
    switch (eventName) {
        case wing.WAEvent.WA_EVENT_TYPE.GHW_USER_CREATE:
            addParam(null, wing.WAEvent.WA_EVENT_PARAMETER_NAME.NICKNAME, "ceshi001");
            addParam(null, wing.WAEvent.WA_EVENT_PARAMETER_NAME.REGISTER_TIME, new Date() * 1);
            addParam(null, wing.WAEvent.WA_EVENT_PARAMETER_NAME.ROLE_TYPE, 1);
            addParam(null, wing.WAEvent.WA_EVENT_PARAMETER_NAME.GENDER, 1);
            addParam(null, wing.WAEvent.WA_EVENT_PARAMETER_NAME.VIP, 6);
            addParam(null, wing.WAEvent.WA_EVENT_PARAMETER_NAME.STATUS, 0);
            addParam(null, wing.WAEvent.WA_EVENT_PARAMETER_NAME.BIND_GAME_GOLD, 1000);
            addParam(null, wing.WAEvent.WA_EVENT_PARAMETER_NAME.LEVEL, 200);
            addParam(null, wing.WAEvent.WA_EVENT_PARAMETER_NAME.FIGHTING, 50000);
            break;
        case wing.WAEvent.WA_EVENT_TYPE.GHW_USER_INFO_UPDATE:
            addParam(null, wing.WAEvent.WA_EVENT_PARAMETER_NAME.NICKNAME, "ceshi001");
            addParam(null, wing.WAEvent.WA_EVENT_PARAMETER_NAME.ROLE_TYPE, 1);
            break;
        case wing.WAEvent.WA_EVENT_TYPE.GHW_USER_IMPORT:
            addParam(null, wing.WAEvent.WA_EVENT_PARAMETER_NAME.IS_FIRST_ENTER, 0);
            break;
        case wing.WAEvent.WA_EVENT_TYPE.GHW_INITIATED_PURCHASE: break;
        case wing.WAEvent.WA_EVENT_TYPE.GHW_PURCHASE:
            addParam(null, wing.WAEvent.WA_EVENT_PARAMETER_NAME.ITEM_NAME, "product 1");
            addParam(null, wing.WAEvent.WA_EVENT_PARAMETER_NAME.ITEM_AMOUNT, 10);
            addParam(null, wing.WAEvent.WA_EVENT_PARAMETER_NAME.PRICE, 0.1);
            addParam(null, wing.WAEvent.WA_EVENT_PARAMETER_NAME.LEVEL, 200);
            break;
        case wing.WAEvent.WA_EVENT_TYPE.GHW_GOLD_UPDATE:
            addParam(null, wing.WAEvent.WA_EVENT_PARAMETER_NAME.GOLD_TYPE, "gold");
            addParam(null, wing.WAEvent.WA_EVENT_PARAMETER_NAME.APPROACH, "you known");
            addParam(null, wing.WAEvent.WA_EVENT_PARAMETER_NAME.AMOUNT, 100);
            addParam(null, wing.WAEvent.WA_EVENT_PARAMETER_NAME.CURRENT_AMOUNT, 600);
            break;
        case wing.WAEvent.WA_EVENT_TYPE.GHW_TASK_UPDATE:
            addParam(null, wing.WAEvent.WA_EVENT_PARAMETER_NAME.TASK_ID, "task no.1");
            addParam(null, wing.WAEvent.WA_EVENT_PARAMETER_NAME.TASK_NAME, "拯救雅典娜");
            addParam(null, wing.WAEvent.WA_EVENT_PARAMETER_NAME.TASK_TYPE, "task 2");
            addParam(null, wing.WAEvent.WA_EVENT_PARAMETER_NAME.TASK_STATUS, 2);
            break;
        case wing.WAEvent.WA_EVENT_TYPE.GHW_LEVEL_ACHIEVED:
            addParam(null, wing.WAEvent.WA_EVENT_PARAMETER_NAME.SCORE, 100);
            addParam(null, wing.WAEvent.WA_EVENT_PARAMETER_NAME.LEVEL, 100);
            addParam(null, wing.WAEvent.WA_EVENT_PARAMETER_NAME.FIGHTING, 5);
            break;
        case  'ghw_login': break;
        case  'ghw_initiated_payment': break;
        case  'ghw_payment': break;
        case  wing.WAEvent.WA_EVENT_TYPE.GHW_SELF_:
            $("#eventName").removeAttr("readonly");
            $("#addParamBtn").attr("disabled", false);
            break;
        default: break;
    }
    $("#sendDataModel").removeClass("hide");
    $("#sendDataModel").show(300);
    $('#info_table2').hide(100);
}

function addParam(val, paramName, paramValue) {
    if (val != null && $(val).attr("disabled") == "disabled") {
        return false
    }
    var key = "key";
    var value = "value";
    var readonly_str;
    var deleteButtonHtml =   "<div class='col-sm-2'><button onclick='$(this).parent().parent().remove()'>删除</button></div>";
    if (paramName) {
        key = paramName;
        readonly_str = "readonly";
        deleteButtonHtml = "";
    }
    if (paramValue != undefined) {
        value = paramValue;
    }
    var html = "<div class=\"form-group\">" +
        "                        <div class=\"col-sm-offset-1 col-sm-3\" ><input type=\"text\" name='paramName' "+readonly_str+" class=\"form-control\"  value=\""+key+"\"></div>" +
        "                        <div class=\"col-sm-7\">" +
        "                            <input type=\"text\" class=\"form-control\" id=\"defaultValue\" value=\"" + value + "\">" +
        "                        </div>\n" + deleteButtonHtml +
        "                    </div>";
    $("#addable_area").append(html);

    return true;
}


function doSend() {
    var eventName = $("#eventName").val();
    var executeObj = wing.WAEvent.builder().setDefaultEventName(eventName)
        .setDefaultValue($("#defaultValue").val());
    $("#eventName").attr("readonly", true);

    var NICKNAME = $("#addable_area input[value="+wing.WAEvent.WA_EVENT_PARAMETER_NAME.NICKNAME+"]")
        .parent().parent().find("#defaultValue").val();
    var REGISTER_TIME = $("#addable_area input[value="+wing.WAEvent.WA_EVENT_PARAMETER_NAME.REGISTER_TIME+"]")
        .parent().parent().find("#defaultValue").val();
    var ROLE_TYPE = $("#addable_area input[value="+wing.WAEvent.WA_EVENT_PARAMETER_NAME.ROLE_TYPE+"]")
        .parent().parent().find("#defaultValue").val();
    var GENDER = $("#addable_area input[value="+wing.WAEvent.WA_EVENT_PARAMETER_NAME.GENDER+"]")
        .parent().parent().find("#defaultValue").val();
    var VIP = $("#addable_area input[value="+wing.WAEvent.WA_EVENT_PARAMETER_NAME.VIP+"]")
        .parent().parent().find("#defaultValue").val();
    var STATUS = $("#addable_area input[value="+wing.WAEvent.WA_EVENT_PARAMETER_NAME.STATUS+"]")
        .parent().parent().find("#defaultValue").val();
    var BIND_GAME_GOLD = $("#addable_area input[value="+wing.WAEvent.WA_EVENT_PARAMETER_NAME.BIND_GAME_GOLD+"]")
        .parent().parent().find("#defaultValue").val();
    var LEVEL = $("#addable_area input[value="+wing.WAEvent.WA_EVENT_PARAMETER_NAME.LEVEL+"]")
        .parent().parent().find("#defaultValue").val();
    var FIGHTING = $("#addable_area input[value="+wing.WAEvent.WA_EVENT_PARAMETER_NAME.FIGHTING+"]")
        .parent().parent().find("#defaultValue").val();
    var IS_FIRST_ENTER = $("#addable_area input[value="+wing.WAEvent.WA_EVENT_PARAMETER_NAME.IS_FIRST_ENTER+"]")
        .parent().parent().find("#defaultValue").val();
    var ITEM_NAME = $("#addable_area input[value="+wing.WAEvent.WA_EVENT_PARAMETER_NAME.ITEM_NAME+"]")
        .parent().parent().find("#defaultValue").val();
    var ITEM_AMOUNT = $("#addable_area input[value="+wing.WAEvent.WA_EVENT_PARAMETER_NAME.ITEM_AMOUNT+"]")
        .parent().parent().find("#defaultValue").val();
    var PRICE = $("#addable_area input[value="+wing.WAEvent.WA_EVENT_PARAMETER_NAME.PRICE+"]")
        .parent().parent().find("#defaultValue").val();
    var GOLD_TYPE = $("#addable_area input[value="+wing.WAEvent.WA_EVENT_PARAMETER_NAME.GOLD_TYPE+"]")
        .parent().parent().find("#defaultValue").val();
    var APPROACH = $("#addable_area input[value="+wing.WAEvent.WA_EVENT_PARAMETER_NAME.APPROACH+"]")
        .parent().parent().find("#defaultValue").val();
    var AMOUNT = $("#addable_area input[value="+wing.WAEvent.WA_EVENT_PARAMETER_NAME.AMOUNT+"]")
        .parent().parent().find("#defaultValue").val();
    var CURRENT_AMOUNT = $("#addable_area input[value="+wing.WAEvent.WA_EVENT_PARAMETER_NAME.CURRENT_AMOUNT+"]")
        .parent().parent().find("#defaultValue").val();
    var TASK_ID = $("#addable_area input[value="+wing.WAEvent.WA_EVENT_PARAMETER_NAME.TASK_ID+"]")
        .parent().parent().find("#defaultValue").val();
    var TASK_NAME = $("#addable_area input[value="+wing.WAEvent.WA_EVENT_PARAMETER_NAME.TASK_NAME+"]")
        .parent().parent().find("#defaultValue").val();
    var TASK_TYPE = $("#addable_area input[value="+wing.WAEvent.WA_EVENT_PARAMETER_NAME.TASK_TYPE+"]")
        .parent().parent().find("#defaultValue").val();
    var TASK_STATUS = $("#addable_area input[value="+wing.WAEvent.WA_EVENT_PARAMETER_NAME.TASK_STATUS+"]")
        .parent().parent().find("#defaultValue").val();

    switch (eventName) {
        case wing.WAEvent.WA_EVENT_TYPE.GHW_USER_CREATE:
            executeObj
                .addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.NICKNAME, NICKNAME)
                .addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.REGISTER_TIME, REGISTER_TIME)
                .addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.ROLE_TYPE, ROLE_TYPE)
                .addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.GENDER, GENDER)
                .addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.VIP, VIP)
                .addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.STATUS, STATUS)
                .addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.BIND_GAME_GOLD, BIND_GAME_GOLD)
                .addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.LEVEL, LEVEL)
                .addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.FIGHTING, FIGHTING);
            break;
        case  wing.WAEvent.GHW_USER_INFO_UPDATE:
            executeObj.addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.ROLE_TYPE, ROLE_TYPE);
            executeObj.addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.NICKNAME, NICKNAME);
            break;
        case  wing.WAEvent.GHW_USER_IMPORT:
            executeObj.addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.IS_FIRST_ENTER, IS_FIRST_ENTER);
            break;
        case  wing.WAEvent.GHW_INITIATED_PURCHASE: break;
        case  wing.WAEvent.GHW_PURCHASE:
            executeObj.addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.ITEM_NAME, ITEM_NAME);
            executeObj.addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.ITEM_AMOUNT, ITEM_AMOUNT);
            executeObj.addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.PRICE, PRICE);
            executeObj.addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.LEVEL, LEVEL);
            break;
        case  wing.WAEvent.GHW_GOLD_UPDATE:
            executeObj.addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.GOLD_TYPE, GOLD_TYPE);
            executeObj.addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.APPROACH, APPROACH);
            executeObj.addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.AMOUNT, AMOUNT);
            executeObj.addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.CURRENT_AMOUNT, CURRENT_AMOUNT);
            break;
        case  wing.WAEvent.GHW_TASK_UPDATE:
            executeObj.addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.TASK_ID, TASK_ID);
            executeObj.addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.TASK_NAME, TASK_NAME);
            executeObj.addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.TASK_TYPE, TASK_TYPE);
            executeObj.addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.TASK_STATUS, TASK_STATUS);
            break;
        case  wing.WAEvent.GHW_LEVEL_ACHIEVED: break;
        case  'ghw_login': break;
        case  'ghw_initiated_payment': break;
//            case  'ghw_purchase':
//                executeObj.addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.ITEM_NAME, ITEM_NAME);
//                executeObj.addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.ITEM_AMOUNT, ITEM_AMOUNT);
//                executeObj.addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.PRICE, PRICE);
//                executeObj.addDefaultEventValue(wing.WAEvent.WA_EVENT_PARAMETER_NAME.LEVEL, LEVEL);
//                break;
        default :
//                console.log(executeObj.getDefaultEventValues(), "event_info")
//                $("#eventName").removeAttr("readonly");
            var groups = $("#addable_area").find("[class=form-group]");
            if (groups.length > 0) {
                for (var i=0; i< groups.length; i++) {
                    var key = groups.eq(i).find("[name=paramName]").val();
                    var value =  groups.eq(i).find("#defaultValue").val();
                    executeObj.addDefaultEventValue(key, value);
                }
            }
            break;

    }
//        console.log(executeObj.getDefaultEventValues(), "event_info")
    wing.trackEvent(executeObj);
    bootbox.alert("数据已发送");
}

//弹出框背景固定化
function bg_fixed(){
    $('body,html').bind('touchmove',function(e){
        e.preventDefault();
    })
}


//关闭弹出框背景取消固定化
function bg_auto(){
    $('body,html').unbind('touchmove')
}

$(window).resize(function(){
    var a=$(window).height();
    $('#goodsModel').css({overflow:'auto',height:a});
    $('#them_hidden').css({overflow:'hidden',height:a})
});


