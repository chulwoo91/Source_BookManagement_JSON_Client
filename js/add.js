
    function updateBook(){
        $("tbody").empty();

        var titlebox=$("<input />").attr("type", "text");
        var authorbox=$("<input />").attr("type", "text");
        var pricebox=$("<input />").attr("type", "text");


        var tr=$("<tr></tr>");
        var img=$("<img />");
        var imgTd=$("<td></td>").append(img);
        var titleTd=$("<td></td>").append(titlebox);
        var authorTd=$("<td></td>").append(authorbox);
        var priceTd=$("<td></td>").append(pricebox);

        tr.append(imgTd);
        tr.append(titleTd);
        tr.append(authorTd);
        tr.append(priceTd);

        $("tbody").append(tr);

    }