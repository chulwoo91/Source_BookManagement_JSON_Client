// 로그인
// 값을 입력하면 -> DB에 있는 id랑 pw랑 비교를 한다.
// 그 뒤에 서세스 시에는 리뷰로 출발, 에러시에는 롱롱롱

function loanlogin(){

    var user=$("#user").val();
    var pw=$("#pass").val()

    $.ajax({
        url: "http://localhost:8080/book/loanlogIn",
        type: "GET",
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            user: user,
            pass: pw
        },
        success: function(result) {
            if (result) {
                alert("Loan Complete!!!!!");
                $(location).attr('href', "index.html");
            }else{
                alert("It is wrong 1");
            }
        },
        error: function(){
            alert("It is wrong2");
        }
    });
}

function loanlogout(){
    var user=$("#user").val();
    var pw=$("#pass").val()

    $.ajax({
        url: "http://localhost:8080/book/loanlogOut",
        type: "GET",
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            user: user,
            pass: pw
        },
        success: function(result) {
            if (result) {
                alert("Return Complete!!!!!");
                $(location).attr('href', "search.html");
            }else{
                alert("It is wrong 1");
            }
        },
        error: function(){
            alert("It is wrong2");
        }
    });
}