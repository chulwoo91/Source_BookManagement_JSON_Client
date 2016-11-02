
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
					var titleTd=$("<td></td>").text(result[i].title);
					var authorTd=$("<td></td>").text(result[i].author);
					var priceTd=$("<td></td>").text(result[i].price);
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

					var delbtn=$("<input />").attr("type", "button").attr("value", "DELETE");
						delbtn.on("click", function(){

							$(this).parent().parent().remove();

						});
					var delbtntd=$("<td></td>").append(delbtn);

					var updatebtn=$("<input />").attr("type", "button").attr("value", "UPDATE");
						updatebtn.on("click", function(){

							var price=$(this).parent().parent().find("td:nth-child(4)").text();
							var updatebox=$("<input />").attr("type", "text").val(price);
							updatebox.on("keyup", function(){
								if(event.keyCode==13){
									//update 처리
									//DB처리를 하고 AJAX를 호출해서 서버프로그램을 실행시켜 Database의 데이터 변경
									//변경된 책 가격, ISBN값이 필요
									var isbn=$(this).parent().parent().attr("data-isbn");
									var price=$(this).val();
									var tr=$(this).parent().parent();
									$.ajax({
										url:"http://localhost:8080/book/bookUpdate",
										type:"GET",
										dataType:"jsonp",
										jsonp:"callback",
										data:{
											isbn: isbn,
											price: price
										},
										success: function(result){
											alert("정상적으로 처리되었습니다.");
											tr.find("td:nth-child(4)").empty();
											tr.find("td:nth-child(4)").text(price);
										},
										error: function(){
											alert("비정상적으로 처리되었습니다");
										}
									});

								}
							});
							$(this).parent().parent().find("td:nth-child(4)").text("");
							$(this).parent().parent().find("td:nth-child(4)").append(updatebox);
							$(this).parent().parent().find("[type=button]").attr("disabled", "disabled");

						});
					var updatebtntd=$("<td></td>").append(updatebtn);

					tr.append(imgTd);
					tr.append(titleTd);
					tr.append(authorTd);
					tr.append(priceTd);
					tr.append(delbtntd);
					tr.append(updatebtntd);

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

