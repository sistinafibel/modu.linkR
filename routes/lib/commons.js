

let client = require(__base+'routes/lib/db');

module.exports = {
    /**
     * 공백&배열이 null 인지 체크합니다
     * @param {*} value 
     */
    isEmpty : function(value){ 
        if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){ 
            return true 
        }else{ 
            return false 
        } 
    }
}

