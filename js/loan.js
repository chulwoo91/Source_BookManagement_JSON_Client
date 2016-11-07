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

                    var lonbtn=$("<input />").attr("type", "button").attr("value", "LOAN").attr("class", "btn-xs, btn-warning");
                    if(result[i].rent != null){
                        lonbtn.attr("value", result[i].rent).attr("disabled", true);
                    }

                     lonbtn.on("click", function(){
                        var id = $("#mytoggle").text();
                        var isbn=$(this).parent().parent().attr("data-isbn");

                        $.ajax({
                            url:"http://localhost:8080/book/bookLoan",
                            type:"GET",
                            dataType:"jsonp",
                            jsonp:"callback",
                            data:{
                                id: id,
                                isbn: isbn
                            },
                            success:function (result) {
                                if(result==true) {
                                    alert("You can rent this book");
                                    alert("Will you rent this book?");
                                    alert("You have borrowed this book!")
                                    $(location).attr("href", "loan.html");
                                }
                                else{
                                    alert("It is wrong");
                                }
                            },
                            error:function () {
                                consol.log("세션 점검 실패");
                            }
                        });


                    });
                    var lonbtntd=$("<td></td>").append(lonbtn);


                    tr.append(imgTd);
                    tr.append(titleTd);
                    tr.append(authorTd);
                    tr.append(priceTd);
                    tr.append(lonbtntd);

                    $("tbody").append(tr);
                };

                $(document).ready(function(){

                    $('#nav').empty();

                    $('#data').after('<div id="nav"></div>');
                    var rowsShown = 20;
                    var rowsTotal = $('#myTbody tr').length;
                    var numPages = rowsTotal/rowsShown;

                    for(i = 0;i < numPages;i++) {
                        var pageNum = i + 1;
                        $('#nav').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
                    }

                    $('#myTbody tr').hide();
                    $('#myTbody tr').slice(0, rowsShown).show();
                    $('#nav a:first').addClass('active');


                    $('#nav a').bind('click', function(){

                        $('#nav a').removeClass('active');
                        $(this).addClass('active');
                        var currPage = $(this).attr('rel');
                        var startItem = currPage * rowsShown;
                        var endItem = startItem + rowsShown;
                        $('#myTbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
                        css('display','table-row').animate({opacity:1}, 300);

                    });
                });

            },
            error: function(){
                alert("there is something wrong");
            }
        });
    }
}

function searchBookLoan(){
    if(event.keyCode==13){
        var id = $("#mytoggle").text();
        var isbn=$(this).parent().parent().attr("data-isbn");

        $.ajax({
            url: "http://localhost:8080/book/bookStatus",
            type: "GET",
            dataType: "jsonp",
            jsonp: "callback",
            data: {
                id: id
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

                    var returnbtn=$("<input />").attr("type", "button").attr("value", "RETURN").attr("class", "btn-xs, btn-warning");

                    returnbtn.on("click", function(){
                        var id = $("#mytoggle").text();
                        var isbn=$(this).parent().parent().attr("data-isbn");

                        $.ajax({
                            url:"http://localhost:8080/book/bookReturn",
                            type:"GET",
                            dataType:"jsonp",
                            jsonp:"callback",
                            data:{
                                id: id,
                                isbn: isbn
                            },
                            success:function (result) {
                                if(result==true) {
                                    alert("Will you return this book?");
                                    alert("You have successfully returned this book");
                                    $(location).attr("href", "loanreturn.html");
                                }
                                else{
                                    alert("It is wrong");
                                }
                            },
                            error:function () {
                                consol.log("세션 점검 실패");
                            }
                        });


                    });
                    var returnbtntd=$("<td></td>").append(returnbtn);


                    tr.append(imgTd);
                    tr.append(titleTd);
                    tr.append(authorTd);
                    tr.append(priceTd);
                    tr.append(returnbtntd);

                    $("tbody").append(tr);
                };

                $(document).ready(function(){

                    $('#nav').empty();

                    $('#data').after('<div id="nav"></div>');
                    var rowsShown = 20;
                    var rowsTotal = $('#myTbody tr').length;
                    var numPages = rowsTotal/rowsShown;

                    for(i = 0;i < numPages;i++) {
                        var pageNum = i + 1;
                        $('#nav').append('<a href="#" rel="'+i+'">'+pageNum+'</a> ');
                    }

                    $('#myTbody tr').hide();
                    $('#myTbody tr').slice(0, rowsShown).show();
                    $('#nav a:first').addClass('active');


                    $('#nav a').bind('click', function(){

                        $('#nav a').removeClass('active');
                        $(this).addClass('active');
                        var currPage = $(this).attr('rel');
                        var startItem = currPage * rowsShown;
                        var endItem = startItem + rowsShown;
                        $('#myTbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
                        css('display','table-row').animate({opacity:1}, 300);

                    });
                });

            },
            error: function(){
                alert("there is something wrong");
            }
        });
    }
}




