var pubmethod = {}, path = window.location.href, lotCode = 0;
var lotKey = '';

function getLotKeyForHtml() {
    let urlPaths = window.location.pathname.split('/');
    let fileName = urlPaths[urlPaths.length - 1];
    return fileName.split('.')[0];
}

function parseIssueNo(issue) {
    issue = issue.toString();
    let issueStr;
    if (issue.indexOf('-') !== -1 && issue.length > 8) {
        issueStr = issue.substr(4).replace('-', '');
    } else {
        issueStr = issue.replace('-', '');
    }

    if (issueStr.length < 8) {
        issueStr += '期';
    }
    return issueStr;
}

$(function () {
    pubmethod.init(), $("#zixunHref").on("click", function () {
        $(this).attr("href", "index.html" + config.ym())
    }), $("#touzhuHref").on("click", function () {
        $(this).attr("href", "touzhu_index.html" + config.ym())
    }), $("#videoHref").on("click", function () {
        $(this).attr("href", "video_index.html" + config.ym())
    }), $("#kaiholeHref").on("click", function () {
        $(this).attr("href", "kaihole_index.html" + config.ym())
    })
}), pubmethod.init = function () {
    // if (-1 != path.indexOf("video_index") || void 0 != path.split("?")[1] && "" != path.split("?")[1]) {
    // lotCode = path.split("?")[1];
    var lotteryKey = getLotKeyForHtml();
    var lotteryModule = lotteryKey.split('_')[0];

    pubmethod.doAjax("", lotCode, lotteryModule, true)
    // } else alert("外链代码有误，请重新获取代码！")
}, pubmethod.tools = {
    type: function (lotCode) {
        for (var t = [["cqnc", "10009"], ["xgc", "10048", "10051"], ["egxy", "10046"], ["gxklsf", "10038"], ["jsft", "10035"], ["twbg", "10047"], ["fcsd", "10041", "10043"], ["bjkl8", "10013", "10014", "10054"], ["klsf", "10005", "10011", "10034", "10053"], ["pk10", "10001", "10012", "10037"], ["qgc", "10039", "10040", "10042", "10044", "10045"], ["ssc", "10002", "10003", "10004", "10010", "10036", "10050"], ["kuai3", "10007", "10026", "10027", "10028", "10029", "10030", "10031", "10032", "10033", "10052"], ["shiyi5", "10006", "10008", "10015", "10016", "10017", "10018", "10019", "10020", "10021", "10022", "10023", "10024", "10025", "10055"]], r = 0, o = t.length; r < o; r++) for (var s = 0, i = t[r].length; s < i; s++) if (lotCode == t[r][s]) return t[r][0]
    },
    // action: {
    //     pk10: "lottery/issues/v_kai168",
    //     cqnc: "klsf/getLotteryInfo.do",
    //     ssc: "lottery/issues/v_kai168",
    //     klsf: "klsf/getLotteryInfo.do",
    //     jsk3: "lotteryJSFastThree/getBaseJSFastThree.do",
    //     shiyi5: "ElevenFive/getElevenFiveInfo.do",
    //     bjkl8: "LuckTwenty/getBaseLuckTewnty.do",
    //     twbg: "LuckTwenty/getBaseLuckTewnty.do",
    //     egxy: "LuckTwenty/getPcLucky28.do",
    //     gxklsf: "gxklsf/getLotteryInfo.do",
    //     kuai3: "lotteryJSFastThree/getBaseJSFastThree.do",
    //     fcsd: "QuanGuoCai/getLotteryInfo1.do",
    //     jsft: "pks/getLotteryPksInfo.do",
    //     xgc: ""
    // },
    // pageView: function (e) {
    //     return {
    //         cqnc: "video/cqnc/index.html",
    //         egxy: "video/pcEgg_video/index.html",
    //         gxklsf: "video/gxklsf_video/index.html",
    //         fcsd: "video/fc3DVideo/index.html",
    //         bjkl8: "video/bjkl8Video/index.html",
    //         twbg: "video/twbgVideo/twbg_index.html",
    //         klsf: "video/GDklsf/index.html",
    //         pk10: "pk10/pk10_bj.html",
    //         qgc: "video/PK10/video.html",
    //         ssc: "video/SSC/index.html",
    //         kuai3: "video/kuai3_video/Kuai3.html",
    //         shiyi5: "video/11x5_video/index.html",
    //         jsft: "video/jisuft_video/index.html",
    //         xgc: "video/SixColor_animate/index.html"
    //     }[e]
    // },
    // random: function () {
    //     return (new Date).getTime()
    // },
    ifObj: function (e) {
        var t = null;
        return "object" != typeof e ? t = JSON.parse(e) : (t = JSON.stringify(e), t = JSON.parse(t)), t
    },
    cutTime: function (e, t) {
        var r = e.replace("-", "/"), t = t.replace("-", "/");
        return r = r.replace("-", "/"), t = t.replace("-", "/"), (new Date(r) - new Date(t)) / 1e3
    }
}, pubmethod.repeatAjax = function (e, t) {
    setTimeout(function () {
        e(t)
    }, config.startTime)
}, pubmethod.doAjax = function (e, t, r, o) {
    var s = {
        url: 'lottery/issues/v_kai168', issue: '', lotCode: 0, flag: o, type: r, succM: function (e, t) {
            pubmethod.creatHeadD[r](e, t)
        }
    };
    pubmethod.ajaxM(s)
}, pubmethod.ajaxM = function (e) {
    let lotKey = getLotKeyForHtml();
    $.ajax({
        url: config.publicUrl + "" + e.url,
        type: "GET",
        async: !0,
        data: {issue: void 0 == e.issue ? "" : e.issue, lotCode: e.lotCode, datestr: "", lotteryKey: lotKey},
        timeout: "6000",
        success: function (t) {
            try {
                e.succM(t, e)
            } catch (t) {
                pubmethod.repeatAjax(pubmethod.ajaxM, e)
            }
        },
        error: function (t) {
            pubmethod.repeatAjax(pubmethod.ajaxM, e)
        }
    })
}, pubmethod.creatHeadD = {
    ssc: function (res, option) {
        var obj = pubmethod.tools.ifObj(res);
        if (obj.status) {
            obj = obj.datas;
            var timeremain = obj.timeremain;
            var nums = obj.opencode.nums;
            timeremain = timeremain < 0 ? 1 : timeremain;
            var params = {
                preDrawCode: nums,
                id: "#numBig",
                counttime: timeremain,
                preDrawIssue: parseIssueNo(obj.issue),
                drawTime: obj.opentime.substr(obj.opentime.length - 8, 8),
                sumNum: obj.opencode.codes['总和']['总和'],
                sumSingleDouble: obj.opencode.codes['总和']['单双'],
                sumBigSmall: obj.opencode.codes['总和']['大小'],
                dragonTiger: obj.opencode.codes['龙虎']['龙虎'],
            };

            if (option.flag) {
                sscAnimateEnd(params, option);
            } else {
                if (!option.flag && timeremain <= 1) throw new Error("error");
                setTimeout(function () {
                    sscAnimateEnd(params, option)
                }, "1000")
            }
        }
    },
    pk10: function (res, option) {
        var obj = pubmethod.tools.ifObj(res);
        if (obj.status) {
            obj = obj.datas;
            var timeremain = obj.timeremain;
            var nums = obj.opencode.nums;
            var opencodeShort = "";
            for (var idx = 0; idx < nums.length; idx++) {
                if (nums[idx].substr(0, 1) == '0') {
                    opencodeShort += nums[idx].substr(1, 1) + ",";
                } else {
                    opencodeShort += nums[idx] + ",";
                }
            }
            timeremain = timeremain < 0 ? 1 : timeremain;
            $("#currentdrawid").text(parseIssueNo(obj.opencode.issue));
            $("#nextdrawid").text(parseIssueNo(obj.issue));
            $("#stat1_1").text(obj.opencode.codes['冠亚和']['总和']);
            $("#stat1_2").text(obj.opencode.codes['冠亚和']['大小']);
            $("#stat1_3").text(obj.opencode.codes['冠亚和']['单双']);
            // $("#stat1_2").text("0" == obj.sumBigSamll ? "大" : "小");
            // $("#stat1_3").text("0" == obj.sumSingleDouble ? "单" : "双");
            $("#stat2_1").text(obj.opencode.codes['冠军']['龙虎']);
            $("#stat2_2").text(obj.opencode.codes['亚军']['龙虎']);
            $("#stat2_3").text(obj.opencode.codes['第3名']['龙虎']);
            $("#stat2_4").text(obj.opencode.codes['第4名']['龙虎']);
            $("#stat2_5").text(obj.opencode.codes['第5名']['龙虎']);
            showcurrentresult(opencodeShort);
            if (option.flag) {
                // $("#hlogo").find("img").attr("src", "images/logo/logo-" + option.lotCode + ".png");
                // $(".statuslogo").css({background: "url(images/logo/logo-" + option.lotCode + ".png)no-repeat"});
                startcountdown(timeremain, option);
            } else {
                if (!option.flag && timeremain <= 1) throw new Error("error");
                setTimeout(function () {
                    finishgame(opencodeShort)
                }, "1000"), setTimeout(function () {
                    startcountdown(timeremain - 11, option)
                }, "10000")
            }
        }
    },
    pc28: function (res, option) {
        var obj = pubmethod.tools.ifObj(res);
        if (obj.status) {
            obj = obj.datas;
            var timeremain = obj.timeremain;
            var nums = obj.opencode.nums;
            nums.push(obj.opencode.codes['总和']['大小'].replace('和', ''));
            nums.push(obj.opencode.codes['总和']['单双'].replace('和', ''));
            timeremain = timeremain < 0 ? 1 : timeremain;
            var params = {
                nextIssue: parseIssueNo(obj.issue),
                drawTime: obj.opentime,
                // serverTime:
                timeremain: timeremain,
                numArr: nums,
                preDrawTime: obj.preIssue.opentime,
            };
            if (option.flag) {
                pcEgg.startVid(params, option);
                // $("#hlogo").find("img").attr("src", "img/cqssc/logo-" + option.lotCode + ".png");
            } else {
                if (!option.flag && timeremain <= 1) throw new Error("error");
                setTimeout(function () {
                    pcEgg.stopVid(params, option);
                }, "1000")
            }
        }
    },
    kl8: function (res, option) {
        var obj = pubmethod.tools.ifObj(res);
        if (obj.status) {
            obj = obj.datas;
            var timeremain = obj.timeremain;
            var nums = obj.opencode.nums;
            timeremain = timeremain < 0 ? 1 : timeremain;
            var nums2 = [];
            for (var idx = 0; idx < nums.length; idx++) {
                if ("0" == nums[idx].substr(0, 1)) {
                    nums2.push(1 * nums[idx].substr(1, 1));
                } else {
                    nums2.push(1 * nums[idx]);
                }
            }
            nums2.push(1);
            var params = {
                preDrawCode: nums2,
                cutime: timeremain,
                // sumNum: obj.opencode.codes['总和']['总和'],
                // drawIssue: parseIssueNo(obj.issue),
                drawTime: obj.opentime,
                preDrawIssue: parseIssueNo(obj.preIssue.issue),
            };
            if (option.flag) {
                syxwV.startVid(params, option);
                // $("#hlogo").find("img").attr("src", "img/cqssc/logo-" + option.lotCode + ".png");
            } else {
                if (!option.flag && timeremain <= 1) throw new Error("error");
                setTimeout(function () {
                    syxwV.stopVid(params, option);
                }, "1000")
            }
        }
    },
    k3: function (res, option) {
        var obj = pubmethod.tools.ifObj(res);
        if (obj.status) {
            obj = obj.datas;
            var timeremain = obj.timeremain;
            var nums = obj.opencode.nums;
            timeremain = timeremain < 0 ? 1 : timeremain;
            var params = {
                seconds: timeremain,
                preDrawCode: nums,
                sumNum: obj.opencode.codes['总和']['总和'],
                drawTime: obj.opentime.split(" ")[1],
                drawIssue: parseIssueNo(obj.issue),
                preDrawIssue: parseIssueNo(obj.preIssue.issue),
            };
            if (option.flag) {
                k3v.stopVideo(params, option);
                // $("#hlogo").find("img").attr("src", "img/cqssc/logo-" + option.lotCode + ".png");
            } else {
                if (!option.flag && timeremain <= 1) throw new Error("error");
                setTimeout(function () {
                    k3v.stopVideo(params, option);
                }, "1000")
            }
        }
    },
    kl10: function (res, option) {
        var obj = pubmethod.tools.ifObj(res);
        if (obj.status) {
            obj = obj.datas;
            var timeremain = obj.timeremain;
            var nums = obj.opencode.nums;
            timeremain = timeremain < 0 ? 1 : timeremain;
            var preIssue=obj.preIssue.issue;
            var issue=obj.issue;
            var opentime=obj.opentime.split(" ")[1];
            var nums2 = [];
            for (var idx = 0; idx < nums.length; idx++) {
                if ("0" == nums[idx].substr(0, 1)) {
                    nums2.push(1 * nums[idx].substr(1, 1));
                } else {
                    nums2.push(1 * nums[idx]);
                }
            }
            if (option.flag) {
                fun.fillHtml(preIssue, issue, opentime, timeremain, nums2, option);
            } else {
                if (!option.flag && timeremain <= 1) throw new Error("error");
                setTimeout(function () {
                    fun.Trueresult(nums2);
                    fun.fillHtml(preIssue, issue, opentime, timeremain, void 0, option);
                }, "1000")
            }
        }
    },
    cqnc: function (e, t) {
        var r = pubmethod.tools.ifObj(e);
        if ("100002" == r.result.businessCode) throw new Error("error");
        if (0 == r.errorCode && 0 == r.result.businessCode) {
            r = r.result.data;
            for (var o = pubmethod.tools.cutTime(r.drawTime, r.serverTime), s = r.preDrawCode.split(","), i = [], u = 0, n = s.length; u < n; u++) "0" == s[u].substr(0, 1) ? i.push(s[u].substr(1, 1)) : i.push(s[u]);
            if (o = o < 0 ? 1 : o, t.flag) cqncVideo.statusFun(r.preDrawIssue, i, o, !0, t); else {
                if (!t.flag && o <= 1) throw new Error("error");
                setTimeout(function () {
                    stopanimate(i, o, t)
                }, "1000")
            }
        }
    }, shiyi5: function (e, t) {
        var r = pubmethod.tools.ifObj(e);
        if (console.log(r), "100002" == r.result.businessCode) throw new Error("error");
        if (0 == r.errorCode && 0 == r.result.businessCode) {
            r = r.result.data;
            for (var o = pubmethod.tools.cutTime(r.drawTime, r.serverTime), s = r.preDrawCode.split(","), i = [], u = 0, n = s.length; u < n; u++) "0" == s[u].substr(0, 1) ? i.push(1 * s[u].substr(1, 1)) : i.push(1 * s[u]);
            if (o = o < 0 ? 1 : o, console.log(i), t.flag) $(".nameLogo").find("img").attr("src", "img/logo/11x5_" + t.lotCode + ".png"), k3v.startVideo(r, t), console.log($(".nameLogo"), t); else {
                if (!t.flag && o <= 1) throw new Error("error");
                console.log(r), setTimeout(function () {
                    k3v.stopVideo(r, t)
                }, "1000")
            }
        }
    }, fcsd: function (e, t) {
        var r = pubmethod.tools.ifObj(e);
        if ("100002" == r.result.businessCode) throw new Error("error");
        if (0 == r.errorCode && 0 == r.result.businessCode) {
            r = r.result.data;
            for (var o = pubmethod.tools.cutTime(r.drawTime, r.serverTime), s = r.preDrawCode.split(","), i = [], u = 0, n = s.length; u < n; u++) "0" == s[u].substr(0, 1) ? i.push(1 * s[u].substr(1, 1)) : i.push(1 * s[u]);
            o = o < 0 ? 1 : o, r.cutime = o;
            r.drawTime.split(" ")[1];
            if (console.log(r), r.preDrawCode = i, t.flag) $(".logo").css("background", "url(img/logo/" + t.lotCode + ".png) center center no-repeat"), fcsdv.startVid(r, t); else {
                if (t.flag && o <= 1) throw new Error("error");
                setTimeout(function () {
                    fcsdv.stopVid(r, t)
                }, "1000")
            }
        }
    }, twbg: function (e, t) {
        var r = pubmethod.tools.ifObj(e);
        if ("100002" == r.result.businessCode) throw new Error("error");
        if (0 == r.errorCode && 0 == r.result.businessCode) {
            r = r.result.data;
            for (var o = pubmethod.tools.cutTime(r.drawTime, r.serverTime), s = r.preDrawCode.split(","), i = [], u = 0, n = s.length; u < n; u++) "0" == s[u].substr(0, 1) ? i.push(1 * s[u].substr(1, 1)) : i.push(1 * s[u]);
            if (o = o < 0 ? 1 : o, r.cutime = o, console.log(r), r.preDrawCode = i, t.flag) syxwV.startVid(r, t); else {
                if (!t.flag && o <= 1) throw new Error("error");
                setTimeout(function () {
                    syxwV.stopVid(r, t)
                }, "1000")
            }
        }
    // }, gxklsf: function (e, t) {
    //     var r = pubmethod.tools.ifObj(e);
    //     if ("100002" == r.result.businessCode) throw new Error("error");
    //     if (0 == r.errorCode && 0 == r.result.businessCode) {
    //         r = r.result.data;
    //         for (var o = pubmethod.tools.cutTime(r.drawTime, r.serverTime), s = r.preDrawCode.split(","), i = [], u = 0, n = s.length; u < n; u++) "0" == s[u].substr(0, 1) ? i.push(1 * s[u].substr(1, 1)) : i.push(1 * s[u]);
    //         if (o = o < 0 ? 1 : o, r.cutime = o, console.log(r), r.numArr = i, t.flag) gxklsf.startVid(r, t); else {
    //             if (!t.flag && o <= 1) throw new Error("error");
    //             setTimeout(function () {
    //                 gxklsf.stopVid(r, t)
    //             }, "1000")
    //         }
    //     }
    // }, jsft: function (e, t) {
    //     var r = pubmethod.tools.ifObj(e);
    //     if ("100002" == r.result.businessCode) throw new Error("error");
    //     if (0 == r.errorCode && 0 == r.result.businessCode) {
    //         r = r.result.data;
    //         for (var o = pubmethod.tools.cutTime(r.drawTime, r.serverTime), s = r.preDrawCode.split(","), i = [], u = 0, n = s.length; u < n; u++) "0" == s[u].substr(0, 1) ? i.push(1 * s[u].substr(1, 1)) : i.push(1 * s[u]);
    //         if (o = o < 0 ? 1 : o, r.cutime = o, console.log(r), showcurrentresult(r.preDrawCode), $("#currentdrawid").text(r.drawCount), $("#nextdrawid").text(r.preDrawIssue), $("#stat1_1").text(r.sumFS), $("#stat1_2").text("0" == r.sumBigSamll ? "大" : "小"), $("#stat1_3").text("0" == r.sumSingleDouble ? "单" : "双"), $("#stat2_1").text("0" == r.firstDT ? "龙" : "虎"), $("#stat2_2").text("0" == r.secondDT ? "龙" : "虎"), $("#stat2_3").text("0" == r.thirdDT ? "龙" : "虎"), $("#stat2_4").text("0" == r.fourthDT ? "龙" : "虎"), $("#stat2_5").text("0" == r.fifthDT ? "龙" : "虎"), t.flag) startcountdown(o, t); else {
    //             if (!t.flag && o <= 1) throw new Error("error");
    //             setTimeout(function () {
    //                 finishgame(i.toString())
    //             }, "1000"), setTimeout(function () {
    //                 startcountdown(o - 11, t)
    //             }, "10000")
    //         }
    //     }
    }
};