
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
            },
            error: function(){
                alert("It is wrong");
            }
        });
    }