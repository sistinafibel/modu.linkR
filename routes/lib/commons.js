module.exports = {
    /**
     * 공백&배열이 null 인지 체크합니다
     * @param {*} value 
     */
    isEmpty : (value) => { 
        if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){ 
            return true 
        }else{ 
            return false 
        } 
    },
    /**
     * 7자리의 랜덤 String값을 전달합니다.
     */
    randomId : () => {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( let i=0; i < 7; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

}

