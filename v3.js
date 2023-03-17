// 初始化設定（判斷是否在ECM環境，debug模式、給nowTime）
(function () {
    let nowTime;
    let isRemove = new Array();
    let isShow = new Array();

    function isInEcmWriter() {
        let isInEcmWriter =
            document.querySelectorAll('input[id^="eWriterBtn"]').length > 0; //ECM編輯模式
        return isInEcmWriter;
    }

    function isDebug() {
        let domainQur = window.location.search.substring(1);
        let debugOn =
            domainQur !== "" && location.protocol.indexOf("http") !== 0;
        return debugOn;
        // debugOn ? getParames(debugOn, domainQur) : initObj(ele, setup, null);
    }

    function setDocCondition() {
        this.isInEcmWriter = isInEcmWriter();
        this.isDebug = isDebug();
        return this;
    }

    function timeSwitchInit(docCondition) {
        if (docCondition.isDebug) {
            let testTime = prompt(`請輸入測試時間\n格式：YYYY/MM/DD 00:00:00`);

            // show debug time
            let tsTimeTemp = document.createElement("p");
            tsTimeTemp.innerText = `測試時間：${testTime}`;
            tsTimeTemp.style.cssText =
                "font:bolder 1.5rem/1.5rem SF Pro TC,SF Pro Text,SF Pro Icons,PingFang TC,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Helvetica,Arial,sans-serif; color: #454545; background: rgba(255, 255, 255, 0.75); border: 2px solid #454545; position: fixed; top : 0; left: 1.5rem; padding: 0.5rem 1rem; ";
            document.body.appendChild(tsTimeTemp);

            docCondition.nowTime = new Date(testTime);
        } else {
            docCondition.nowTime = new Date();
        }

        return docCondition;
    }

    let docCondition = new setDocCondition();
    window.docCondition = timeSwitchInit(docCondition);
    window.isRemove = isRemove;
    window.isShow = isShow;
})();

// 主程式
function timeSwitchObj(ele, setup) {
    this.element = document.querySelector(ele);
    this.setup = setup;
    this.original = window
        .getComputedStyle(this.element)
        .getPropertyValue("display");
    this.init = function (element) {
        switch (setup.mode) {
            case "show":
                break;
            case "hide":
                {
                    let display = window
                        .getComputedStyle(element)
                        .getPropertyValue("display");
                    element.style = `display : ${display}`;
                }
                break;
            case "addClass":
                {
                    this.element.classList.remove(
                        "timeswitch-pre",
                        "timeswitch-ing",
                        "timeswitch-after"
                    );
                }
                break;
        }
    };
    this.sendData = function (element) {
        // 判斷多時段
        if (setup.isMultiTime) {
            // 防呆 (addClass+多時段)
            switch (setup.mode) {
                case "addClass":
                    {
                        alert(`addClass模式不支援多時段設定\n錯誤物件：${ele}`);
                    }
                    break;

                default:
                    {
                        for (
                            let index = 0;
                            index < setup.startTimeAry.length;
                            index++
                        ) {
                            setup.debug
                                ? console.log(
                                      `${ele} 執行第 ${index + 1} 時間波段`
                                  )
                                : false;
                            let startTime = new Date(setup.startTimeAry[index]);
                            let endTime = new Date(setup.endTimeAry[index]);
                            let nowTime = setup.docCondition.nowTime;
                            let isSwitch = this.timeSwitch(
                                element,
                                startTime,
                                endTime,
                                nowTime
                            );

                            if (isSwitch) {
                                break;
                            }
                        }
                    }
                    break;
            }
        } else {
            this.timeSwitch(
                element,
                new Date(setup.startTime),
                new Date(setup.endTime),
                setup.docCondition.nowTime
            );
        }
    };

    this.timeSwitch = function (element, startTime, endTime, nowTime) {
        let isBetween = nowTime >= startTime && endTime >= nowTime;
        let isBefore = nowTime < startTime;
        let isAfter = endTime < nowTime;

        switch (setup.mode) {
            case "show": {
                function spliceCommonObject(element) {
                    let indexOfIsShow = isShow.indexOf(element);
                    let indexOfIsRemove = isRemove.indexOf(element);

                    if (indexOfIsShow !== -1 || indexOfIsRemove !== -1) {
                        isShow.splice(indexOfIsShow, 1);
                        isRemove.splice(indexOfIsRemove, 1);
                    }
                }

                function toShow(element) {
                    spliceCommonObject(element);
                    isShow.push(element);
                }

                function toRemove(element) {
                    spliceCommonObject(element);
                    isRemove.push(element);
                }

                isBetween ? toShow(this) : toRemove(this);
                this.setup.debug
                    ? console.log(
                          `${ele}目前狀態為\n`,
                          "isShow:",
                          isShow,
                          "isRemove:",
                          isRemove
                      )
                    : false;

                break;
            }
            case "hide": {
                function spliceCommonObject(element) {
                    let indexOfIsShow = isShow.indexOf(element);
                    let indexOfIsRemove = isRemove.indexOf(element);

                    if (indexOfIsShow !== -1 || indexOfIsRemove !== -1) {
                        isShow.splice(indexOfIsShow, 1);
                        isRemove.splice(indexOfIsRemove, 1);
                    }
                }

                function toShow(element) {
                    spliceCommonObject(element);
                    isShow.push(element);
                }

                function toRemove(element) {
                    spliceCommonObject(element);
                    isRemove.push(element);
                }

                isBetween ? toRemove(this) : toShow(this);
                this.setup.debug
                    ? console.log(
                          `${ele}目前狀態為\n`,
                          "isShow:",
                          isShow,
                          "isRemove:",
                          isRemove
                      )
                    : false;
                break;
            }

            case "addClass": {
                if (isBefore) {
                    element.classList.add("time-switch-pre");
                } else if (isBetween) {
                    element.classList.add("time-switch-ing");
                } else if (isAfter) {
                    element.classList.add("time-switch-after");
                }

                this.setup.debug
                    ? console.log(
                          `${ele} 目前狀態為\nisBefore : ${isBefore}\nisBetween : ${isBetween}\nisAfter : ${isAfter}`
                      )
                    : false;

                break;
            }
        }

        return isBetween;
    };

    this.operate = function (isRemove, isShow) {
        isRemove.forEach((element, index) => {
            element.element.remove();
        });

        isShow.forEach((element, index) => {
            element.style = `display: ${element.original}`;
        });
    };

    if (!docCondition.isInEcmWriter) {
        this.init(this.element);

        this.sendData(this.element);

        this.operate(isRemove, isShow);
    }
}

// v3   新增多時段切換
// v3.1 區間判斷條件調整 (00:00:00即符合當天)
