$( document ).ready(function() {
    isSession();
});

function isSession() {
    $.ajax({
        url:"http://localhost:8080/book/checkSession",
        type:"GET",
        dataType:"jsonp",
        jsonp:"callback",
        success:function (result) {
            console.log(result.id);

            if(result.id==null){
                console.log("세션 없음");

            }else{
                console.log("세션 존재함");
                console.log(result.id);

                $("#mytoggle").text(result.id);
            }
        },
        error:function () {
            consol.log("세션 점검 실패");
        }
    });
}
    function insertBook(){
        $.ajax({
            url: "http://localhost:8080/book/bookInsert",
            type: "GET",
            dataType: "jsonp",
            jsonp: "callback",
            data: {
                isbn: $("#isbn").val(),
                title: $("#title").val(),
                author: $("#author").val(),
                price: $("#price").val()
            },
            success: function(){
                alert("Addition Complete");
                $("isbn").val("")
                $("title").val("")
                $("author").val("")
                $("price").val("")
                $(location).attr('href', "add.html")
            },
            error: function(){
                alert("It is wrong");
            }
        });
    }