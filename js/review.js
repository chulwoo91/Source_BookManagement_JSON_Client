// 로그인을 하고 리뷰 페이지로 들어간다.
//리뷰 페이지에서 페이지 검색을

function reviewBook(){
    if(event.keyCode==13){
        $.ajax({
            url: "http://localhost:8080/book/reviewBook",
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
                    var titleTd=$("<td></td>").text(result[i].title);
                    var authorTd=$("<td></td>").text(result[i].author);
                    var priceTd=$("<td></td>").text(result[i].price);

                    var writebtn=$("<input />").attr("type", "button").attr("value", "WRITE").attr("class", "btn-xs, btn-info");
                    writebtn.on("click", function(){

                            $(location).attr("href", "write.html");

                    });
                    var writebtntd=$("<td></td>").append(writebtn);

                    var readbtn=$("<input />").attr("type", "button").attr("value", "READ").attr("class", "btn-xs, btn-success");
                    readbtn.on("click", function(){

                        $(location).attr("href", "title.html");

                    });
                    var readbtntd=$("<td></td>").append(readbtn);


                    var deletebtn=$("<input />").attr("type", "button").attr("value", "DELETE").attr("class", "btn-xs, btn-danger");
                    deletebtn.on("click", function(){

                        $(location).attr("href", "delete.html");

                        var isbn=$(this).parent().parent().attr("data-isbn");
                        var obj=this;

                        $.ajax({
                            url: "http://localhost:8080/book/commentDelete",
                            type: "GET",
                            dataType: "jsonp",
                            jsonp: "callback",
                            data: {
                                isbn: isbn
                            },
                            success: function(){
                                alert("delete");
                                $(obj).parent().parent().remove();
                            },
                            error: function(){
                                alert("Delete fail");
                            }
                        })

                    });
                    var deletebtntd=$("<td></td>").append(deletebtn);

                    tr.append(imgTd);
                    tr.append(titleTd);
                    tr.append(authorTd);
                    tr.append(priceTd);
                    tr.append(writebtntd);
                    tr.append(readbtntd);
                    tr.append(deletebtntd);

                    $("tbody").append(tr);
                };
            },
            error: function(){
                alert("there is something wrong");
            }
        });
    }
}

function mySort(){
    var rows = $("table").find("tbody>tr").get();
    rows.sort(function (a, b) {
        var keyA = $(a).children("td").eq(3).text();
        var keyB = $(b).children("td").eq(3).text();

        if(keyA < keyB) return -1;
        if(keyA > keyB) return 1;

        return 0;
    });

    $.each(rows, function (idx, row) {
        $("table").children("tbody").append(row);
    });
}


function addreview(){
    $.ajax({
        url: "http://localhost:8080/book/reviewInsert",
        type: "GET",
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            isbn: $("#isbn").val(),
            id: $("#ID").val(),
            title: $("#Title").val(),
            review: $("#Review").val()
        },
        success: function(){
            alert("Addition Complete");
            $("isbn").val("")
            $("id").val("")
            $("title").val("")
            $("review").val("")
            $(location).attr('href', "write.html")
        },
        error: function(){
            alert("It is wrong");
        }
    });
}

function searchReview(){
    if(event.keyCode==13){
        $.ajax({
            url: "http://localhost:8080/book/reviewSearch",
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
                    var isbnTd=$("<td></td>").text(result[i].isbn)
                    var titleTd=$("<td></td>").text(result[i].title);
                    var userTd=$("<td></td>").text(result[i].user)
                    var reviewTd=$("<td></td>").text(result[i].review);

                    tr.append(isbnTd);
                    tr.append(titleTd);
                    tr.append(userTd);
                    tr.append(reviewTd);

                    $("tbody").append(tr);
                };
            },
            error: function(){
                alert("there is something wrong");
            }
        });
    }
}

function searchKeyword(){
    if(event.keyCode==13){
        $.ajax({
            url: "http://localhost:8080/book/reviewKeyword",
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
                    var isbnTd=$("<td></td>").text(result[i].isbn)
                    var userTd=$("<td></td>").text(result[i].user)
                    var titleTd=$("<td></td>").text(result[i].title);
                    var reviewTd=$("<td></td>").text(result[i].review);

                    tr.append(isbnTd);
                    tr.append(userTd);
                    tr.append(titleTd);
                    tr.append(reviewTd);

                    $("tbody").append(tr);
                };
            },
            error: function(){
                alert("there is something wrong");
            }
        });
    }
}

function beforedeleteReview(){
    if(event.keyCode==13){
        $.ajax({
            url: "http://localhost:8080/book/deleteSearch",
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
                    var isbnTd=$("<td></td>").text(result[i].isbn)
                    var userTd=$("<td></td>").text(result[i].user)
                    var titleTd=$("<td></td>").text(result[i].title);
                    var reviewTd=$("<td></td>").text(result[i].review);
                    var delbtn=$("<input />").attr("type", "button").attr("value", "DELETE").attr("class", "btn-danger");
                    delbtn.on("click", function(){

                        var isbn=$(this).parent().parent().attr("data-isbn");
                        var obj=this;

                        $.ajax({
                            url: "http://localhost:8080/book/commentDelete",
                            type: "GET",
                            dataType: "jsonp",
                            jsonp: "callback",
                            data: {
                                isbn: isbn
                            },
                            success: function(){
                                alert("Delete Complete");
                                $(obj).parent().parent().remove();
                            },
                            error: function(){
                                alert("Delete fail");
                            }
                        })

                    });
                    var delbtntd=$("<td></td>").append(delbtn);


                    tr.append(isbnTd);
                    tr.append(userTd);
                    tr.append(titleTd);
                    tr.append(reviewTd);
                    tr.append(delbtntd);

                    $("tbody").append(tr);
                };
            },
            error: function(){
                alert("there is something wrong");
            }
        });
    }
}



