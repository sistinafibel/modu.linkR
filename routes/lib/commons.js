

let client = require(__base+'routes/lib/db');

module.exports = {
    /**
     * mapCodeTrans
     * 맵 코드와 맵 이름을 매칭하여 반환해줍니다.
     * @param {*} number 
     */
    mapCodeTrans : function (number) {
        var returnName = "";
        number = String(number);

        if (number === "0") {
            returnName = "전체";
        } else if (number === "1") {
            returnName = "서울";
        } else if (number === "2") {
            returnName = "부산";
        } else if (number === "3") {
            returnName = "대구";
        } else if (number === "4") {
            returnName = "인천";
        } else if (number === "5") {
            returnName = "광주";
        } else if (number === "6") {
            returnName = "대전";
        } else if (number === "7") {
            returnName = "울산";
        } else if (number === "8") {
            returnName = "세종";
        } else if (number === "9") {
            returnName = "경기";
        } else if (number === "10") {
            returnName = "강원";
        } else if (number === "11") {
            returnName = "충북";
        } else if (number === "12") {
            returnName = "충남";
        } else if (number === "13") {
            returnName = "전북";
        } else if (number === "14") {
            returnName = "전남";
        } else if (number === "15") {
            returnName = "경북";
        } else if (number === "16") {
            returnName = "경남";
        } else if (number === "17") {
            returnName = "제주";
        } else {
            returnName = "error";
        }
        return returnName;
    },

    /**
     * departmentCodeTrans
     * 대학코드와 이름을 매칭하여 반환해줍니다.
     * @param {*} number 
     */
    departmentCodeTrans : function (number) {
        var returnName = "";
        number = String(number);
        if (number === "A0") {
            returnName = "전체";
        } else if (number === "A1") {
            returnName = "공학";
        } else if (number === "A2") {
            returnName = "인문사회";
        } else if (number === "A3") {
            returnName = "자연과학";
        } else if (number === "A4") {
            returnName = "예체능";
        } else {
            returnName = "error";
        }
        return returnName;
    },
    /**
     * departmentCodeTrans
     * 야간 주간을 조회해서 보여줍니다.
     * @param {*} number 
     */
    weeklyCodeTrans : function (number) {
        var returnName = "";
        number = String(number);
        if (number === "B0") {
            returnName = "전체";
        } else if (number === "BY") {
            returnName = "Y";
        } else if (number === "BN") {
            returnName = "N";
        } else {
            returnName = "error";
        }
        return returnName;
    },
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
    },

    /**
     * 리스트를 페이징 처리합니다.
     * @param totalPageCount 총 데이터 수
     * @param curPage 페이지 인덱스
     */
        pagelist : function(curPage , totalPageCount){

            //할당된 페이지 게시글 수 
            var page_size = 10;
            
            //보여줄 페이지 갯수 (1~10) 
            var page_list_size = 10;
            
            var no = 0;

            //전체 페이지 갯수
            if (totalPageCount < 0) {
                totalPageCount = 0
            }

            //현제 페이지
            if(!curPage || curPage == 0){
                curPage = 1;
            }

            // 전체 페이지수
            var totalPage = Math.ceil(totalPageCount / page_size);
            
            if(totalPage < curPage){
                curPage = totalPage;
            }
            var totalSet = Math.ceil(totalPage / page_list_size); //전체 세트수
            var curSet = Math.ceil(curPage / page_list_size) // 현재 셋트 번호
            var startPage = ((curSet - 1) * 10) + 1 //현재 세트내 출력될 시작 페이지
            var endPage = (startPage + page_list_size) - 1; //현재 세트내 출력될 마지막 페이지

            //현재페이지가 0 보다 작으면
            if (curPage < 0) {
                no = 0
            } else {
            //0보다 크면 limit 함수에 들어갈 첫번째 인자 값 구하기
                no = (curPage - 1) * 10
            }

            let pageSet = {
                "no" : no,
                "page_size" : page_size,
                "totalPage" : totalPage,
                "totalSet" : totalSet,
                "curSet" : curSet,
                "startPage" : startPage,
                "endPage" : endPage,
                "curPage" : curPage
            };

            return pageSet;
        },
        /**
         * 공통 코드를 조회합니다.
         * @param code_id 코드 ID
        */

        codeList : function(code_id,back){
            let sql = 'SELECT * FROM tb_code  WHERE CODE_ID = ?';
            let sqlValue = code_id;

            client.query(sql,sqlValue, function(err,result) {
                if(err){
                    back(err.code);
                } else{
                    back(result);
                }
            });
        }




}

