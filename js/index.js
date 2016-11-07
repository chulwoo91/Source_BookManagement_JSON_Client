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

					var delbtn=$("<input />").attr("type", "button").attr("value", "DELETE").attr("class", "btn-xs, btn-danger");
						delbtn.on("click", function(){

							var isbn=$(this).parent().parent().attr("data-isbn");
							var obj=this;

							$.ajax({
								url: "http://localhost:8080/book/bookDelete",
								type: "GET",
								dataType: "jsonp",
								jsonp: "callback",
								data: {
									isbn: isbn
								},
								success: function(){
									alert("Will You Delete This Book?");
									alert("Book Completely Deleted");
									$(obj).parent().parent().remove();
								},
								error: function(){
									alert("Delete fail");
								}
							})

						});
					var delbtntd=$("<td></td>").append(delbtn);

					var updatebtn=$("<input />").attr("type", "button").attr("value", "UPDATE").attr("class", "btn-xs, btn-info");

						updatebtn.on("click", function(){

							var title=$(this).parent().parent().find("td:nth-child(2)").text();
							var author=$(this).parent().parent().find("td:nth-child(3)").text();
							var price=$(this).parent().parent().find("td:nth-child(4)").text();
							var titlebox=$("<input />").attr("type", "text").val(title);
							var authorbox=$("<input />").attr("type", "text").val(author);
							var pricebox=$("<input />").attr("type", "text").val(price);

							$(this).parent().parent().find("td:nth-child(2)").text("");
							$(this).parent().parent().find("td:nth-child(2)").append(titlebox);

							$(this).parent().parent().find("td:nth-child(3)").text("");
							$(this).parent().parent().find("td:nth-child(3)").append(authorbox);

							$(this).parent().parent().find("td:nth-child(4)").text("");
							$(this).parent().parent().find("td:nth-child(4)").append(pricebox);
							//$(this).parent().parent().find("[type=button]").attr("disabled", "disabled");

							$(this).on("click", function(){

									//update 처리
									//DB처리를 하고 AJAX를 호출해서 서버프로그램을 실행시켜 Database의 데이터 변경
									//변경된 책 가격, ISBN값이 필요
									var isbn=$(this).parent().parent().attr("data-isbn");
									var title=$(titlebox).val();
									var author=$(authorbox).val();
									var price=$(pricebox).val();

									var tr=$(this).parent().parent();

									$.ajax({
										url:"http://localhost:8080/book/bookUpdate",
										type:"GET",
										dataType:"jsonp",
										jsonp:"callback",
										data:{
											isbn: isbn,
											title: title,
											author: author,
											price: price
										},
										success: function(result){
											alert("정상적으로 처리되었습니다.");
											tr.find("td:nth-child(2)").empty();
											tr.find("td:nth-child(2)").text(title);
											tr.find("td:nth-child(3)").empty();
											tr.find("td:nth-child(3)").text(author);
											tr.find("td:nth-child(4)").empty();
											tr.find("td:nth-child(4)").text(price);
										},
										error: function(){
											alert("비정상적으로 처리되었습니다");
										}
									});

							});

						});
					var updatebtntd=$("<td></td>").append(updatebtn);


					var detbtn=$("<input />").attr("type", "button").attr("value", "DETAIL").attr("class", "btn-xs, btn-success");
						detbtn.on("click", function(){

							var isbn=$(this).parent().parent().attr("data-isbn");

							$.ajax({
								url: "http://localhost:8080/book/bookDetail",
								type: "GET",
								dataType: "jsonp",
								jsonp: "callback",
								data: {
									isbn: isbn
								},
								success: function(result){
									alert("More Information About The Book");
									page = $("<tr></tr>").text("쪽 수 : "+result[0].page);
									date = $("<tr></tr>").text("발행일 : "+result[0].date);
									translator = $("<tr></tr>").text("번역 : "+result[0].translator);
									publisher = $("<tr></tr>").text("출판사 : "+result[0].publisher);
									supplement = $("<tr></tr>").text("부록 : "+result[0].supplement);
									div.empty();

									div.append(page);
									div.append(date);
									div.append(translator);
									div.append(supplement);
									div.append(publisher);

									$("#detaildiv"+isbn).append(div);
								},
								error: function(){
									alert("Detail fail");
								}
							})

						});
						var detbtntd=$("<td></td>").append(detbtn);

						var revbtn=$("<input />").attr("type", "button").attr("value", "REVIEW").attr("class", "btn-xs, btn-warning");
						revbtn.on("click", function(){

							$(location).attr("href", "review.html")

						});
						var revbtntd=$("<td></td>").append(revbtn);


					tr.append(imgTd);
					tr.append(titleTd);
					tr.append(authorTd);
					tr.append(priceTd);
					tr.append(delbtntd);
					tr.append(updatebtntd);
					tr.append(detbtntd);
					tr.append(revbtntd);

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

