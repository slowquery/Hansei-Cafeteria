"use strict";
let moment = require('moment'),
    request = require('request'),
    cheerio = require('cheerio'),
    entities = require('html-entities').AllHtmlEntities;

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
                    let today = Number(this.getDay());
                    let retst = "";
                    let cafeteria = $("td").filter(function() {
                        return $(this).text().indexOf(today) > -1;
                    }).html();

		    if(typeof parseInt(entities.decode(cafeteria.replace(/(<([^>]+)>)/g, "\n")).slice(1)) === 'number')
                        retst += "조회된 급식 정보가 없습니다.";
                    else if(cafeteria) 
                        retst += entities.decode(cafeteria.replace(/(<([^>]+)>)/g, "\n")).slice(1);
                    else
                        retst += "조회된 급식 정보가 없습니다.";

                    resolve(retst);
                }
            });
        });
    }
}
