$( document ).ready(function() {
    isSession();
});

function isSession() {
    $.ajax({
        url:"http://localhost:8080/book/checkLOG",
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

function searchBook(){
    if(event.keyCode==13){
        $.ajax({
            url: "http://localhost:8080/book/bookList",
            type: "GET",
            dataType: "jsonp",
            jsonp: "callback",
            data: {
                keyword: $("#keyword").val()
            },
            success: function(result){
                $("tbody").empty();
                for(var i=0; i<result.length; i++){



                    var tr=$("<tr></tr>").attr("data-isbn", result[i].isbn);
                    var img=$("<img />").attr("src", result[i].img);
                    var imgTd=$("<td></td>").append(img);
                    var div=$("<div></div>").attr("id", "detaildiv"+result[i].isbn);
                    var titleTd=$("<td></td>").text(result[i].title).attr("id", "title").append(div);
                    var authorTd=$("<td></td>").text(result[i].author);
                    var priceTd=$("<td></td>").text(result[i].price);


                    var date = null;
                    var page= null;
                    var translator= null;
                    var supplement= null;
                    var publisher= null;
                    //	var delTd = $("<td></td>");
                    /*var delBtn=$("<input>");
                     delBtn.attr("type", "button");
                     delBtn.attr("value", "DELETE");
                     delBtn.attr("onclick", "del(this)");
                     delTd.append(delBtn);
                     var updateTd = $("<td></td>");
                     var updateBtn=$("<input>");
                     updateBtn.attr("type", "button");
                     updateBtn.attr("value", "UPDATE");
                     updateBtn.attr("onclick", "function()");
                     updateTd.append(updateBtn); */

                    var lonbtn=$("<input />").attr("type", "button").attr("value", "LOAN").attr("class", "btn-xs, btn-warning");
                    lonbtn.on("click", function(){
                        var id = $("#mytoggle").text(result.id);

                        $.ajax({
                            url:"http://localhost:8080/book/bookLoan",
                            type:"GET",
                            dataType:"jsonp",
                            jsonp:"callback",
                            success:function (result) {

                                if(id==null){
                                    alert("You cannot rent this book");
                                }else{

                                }
                            },
                            error:function () {
                                consol.log("세션 점검 실패");
                            }
                        });


                    });
                    var lonbtntd=$("<td></td>").append(lonbtn);

                    var retbtn=$("<input />").attr("type", "button").attr("value", "RETURN").attr("class", "btn-xs, btn-danger");
                    retbtn.on("click", function(){

                        $(location).attr("href", "returnlog.html")

                    });
                    var retbtntd=$("<td></td>").append(retbtn);

                    tr.append(imgTd);
                    tr.append(titleTd);
                    tr.append(authorTd);
                    tr.append(priceTd);
                    tr.append(lonbtntd);
                    tr.append(retbtntd);

                    $("tbody").append(tr);
                };
            },
            error: function(){
                alert("there is something wrong");
            }
        });
    }
}
/*	function del(Object){
 $(Object).parent().remove();

 } */



