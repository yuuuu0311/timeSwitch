// 設定檔
window.onload = () => {
    let tsObj = new timeSwitchObj("h1", {
        debug: false,
        docCondition: docCondition,
        mode: "show", // show/hide/addClass
        isMultiTime: true,
        startTimeAry: [
            "2023/3/10 00:00:00",
            "2023/3/15 00:00:00",
            "2023/3/20 00:00:00",
        ], // 多時段
        endTimeAry: [
            "2023/3/12 00:00:00",
            "2023/3/18 00:00:00",
            "2023/3/24 00:00:00",
        ],
    });
    let tsOb1 = new timeSwitchObj("h2", {
        debug: false,
        docCondition: docCondition,
        mode: "hide", // show/hide/addClass
        isMultiTime: true,
        startTimeAry: [
            "2023/3/10 00:00:00",
            "2023/3/13 00:00:00",
            "2023/3/20 00:00:00",
        ], // 多時段
        endTimeAry: [
            "2023/3/12 00:00:00",
            "2023/3/18 00:00:00",
            "2023/3/24 00:00:00",
        ],
    });
    let tsOb3 = new timeSwitchObj("h3", {
        debug: false,
        docCondition: docCondition,
        mode: "addClass", // show/hide/addClass
        isMultiTime: false,
        startTime: "2023/3/10 00:00:00",
        endTime: "2023/3/12 00:00:00",
    });
};
