"use strict";
let moment = require('moment'),
    request = require('request'),
    cheerio = require('cheerio');

module.exports = class Hcafeteria {
    constructor(schoolCode) {
        this.author = "antiweb";
        this.schoolCode = schoolCode;
    }
    getDay() {
        return new moment().utcOffset("+09:00").format("DD");
    }
    parseCafeteria() {
        return new Promise((resolve, reject) => {
            request("http://stu.sen.go.kr/sts_sci_md00_001.do?schulCode="+this.schoolCode+"&schulCrseScCode=4&schulKndScCode=04&schMmealScCode=1", (err, res, html) => {
                if(err) resolve(err);
                else {
                    let $ = cheerio.load(html);
                    let list = $("td").children("div");
                    let today = Number(this.getDay());
                    let retst = "";

                    if(list[today+2].children.length > 1) {
                        for(let i = 0; i < list[today+2].children.length; i+=2) {
                            if(i+1 === list[today+2].children.length)
                                retst += list[today+2].children[i].data;
                            else
                                retst += list[today+2].children[i].data + "\n";
                        }
                    }
                    else {
                        retst += "조회된 급식 정보가 없습니다.";
                    }
                    resolve(retst);
                }
            });
        });
    }
}
