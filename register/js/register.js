/**
 * 获取设备型号
 */
function getDeviceType() {
    let corpId = getCorpId();
    let param = {'currPage': 1, 'pageSize': 1000, 'corpId': corpId};
    $.ajax({
        url: getBaseUrl() + "api/mobile/model/queryList",
        data: JSON.stringify(param),
        type: "POST",
        contentType: "application/json",
        success: function (data) {
            console.log(data);
            let datas = data.result.list;
            deviceTypes = datas;
            $("#selector1").empty();
            for (let i = 0; i < datas.length; i++) {
                let item = datas[i];
                $("#selector1").append("<option value='" + i + "'>" + item.name + "</option>");
            }
            $('#selector1').searchableSelect();
        }
    });
}

// 显示样式
function getDisplayStyle(screenId) {
    let corpId = getCorpId();
    let param = {'currPage': 1, 'pageSize': 1000, 'corpId': corpId, 'screenId': screenId};
    $.ajax({
        url: getBaseUrl() + "api/mobile/display/queryList",
        data: JSON.stringify(param),
        type: "POST",
        contentType: "application/json",
        success: function (data) {
            console.log(data);
            let datas = data.result.list;
            $("#selector2").empty();
            for (let i = datas.length - 1; i > -1; i--) {
                let item = datas[i];
                $("#selector2").append("<option value='" + item.id + "'>" + item.name + "</option>");
            }
            $('#selector2').searchableSelect();
        }
    });
}

// 行业
function getIndustry() {
    let param = {'type': "industry"};
    $.ajax({
        url: getBaseUrl() + "api/mobile/dictionary/getDictionarysByType",
        data: JSON.stringify(param),
        type: "POST",
        contentType: "application/json",
        success: function (data) {
            let datas = data.result;
            $("#selector3").empty();
            for (let i = 0; i < datas.length; i++) {
                let item = datas[i];
                $("#selector3").append("<option value='" + item.id + "'>" + item.name + "</option>");
            }
            $("#selector3").searchableSelect();
        }
    });
}

// 获取省份
function getProvince() {
    let param = {};
    $.ajax({
        url: getBaseUrl() + "api/mobile/china/getPrivinces",
        data: JSON.stringify(param),
        type: "POST",
        contentType: "application/json",
        success: function (data) {
            let datas = data.result;
            $("#selector4").empty();
            for (let i = 0; i < datas.length; i++) {
                let item = datas[i];
                $("#selector4").append("<option value='" + item.id + "'>" + item.name + "</option>");
            }
            $("#selector4").searchableSelect();
        }
    });
}

/**
 * 获取市，区
 * @param flag：1 获取市    2 获取区
 * @param pid
 */
function getProvinceChild(flag, pid) {
    let param = {'pid': pid};
    $.ajax({
        url: getBaseUrl() + "api/mobile/china/getChildrens",
        data: JSON.stringify(param),
        type: "POST",
        contentType: "application/json",
        success: function (data) {
            let datas = data.result;
            if (flag === 1) {
                $("#selector5").empty();
                for (let i = 0; i < datas.length; i++) {
                    let item = datas[i];
                    $("#selector5").append("<option value='" + item.id + "'>" + item.name + "</option>");
                }
                $("#selector5").searchableSelect();
            } else {
                $("#selector6").empty();
                for (let i = 0; i < datas.length; i++) {
                    let item = datas[i];
                    $("#selector6").append("<option value='" + item.id + "'>" + item.name + "</option>");
                }
                $("#selector6").searchableSelect();
            }
        }
    });
}

function regist() {
    let param = {
        'corpId': getCorpId(),
        'code': $("#deviceNum").val(),
        'displayId': displayStyleId,
        'districtId': areaId,
        'industryId': industryId,
        'cityId': cityId,
        'name': $("#locNote").val(),
        'provinceId': provinceId,
        'registrationId': getUrlParam("regId"),
        'modelId': deviceTypeId,
        'sn': getUrlParam("sn"),
        'location': "",
        'operationWay': mode,
        'width': getUrlParam("width"),
        'height': getUrlParam("height"),
    };
    $.ajax({
        url: getBaseUrl() + "api/mobile/device/add",
        data: JSON.stringify(param),
        type: "POST",
        contentType: "application/json",
        success: function (data) {
            if (data.code === "0000") {
                alert("注册成功！")
            } else if (data.code === "-1") {
                alert(data.msg)
            }
        }
    });
}