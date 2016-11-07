 // 로그인
 // 값을 입력하면 -> DB에 있는 id랑 pw랑 비교를 한다.
 // 그 뒤에 서세스 시에는 리뷰로 출발, 에러시에는 롱롱롱
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

        function login(){
            var user=$("#user").val();
            var pw=$("#pass").val()

            $.ajax({
                url: "http://localhost:8080/book/logIn",
                type: "GET",
                dataType: "jsonp",
                jsonp: "callback",
                data: {
                    user: user,
                    pass: pw
                },
                success: function(result) {
                    if (result) {
                    alert("Login Complete");
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

 function login2(){
     var user=$("#user").val();
     var pw=$("#pass").val()

     $.ajax({
         url: "http://localhost:8080/book/logIn",
         type: "GET",
         dataType: "jsonp",
         jsonp: "callback",
         data: {
             user: user,
             pass: pw
         },
         success: function(result) {
             if (result) {
                 alert("Login Complete");
                 $(location).attr('href', "loan.html");
             }else{
                 alert("It is wrong 1");
             }
         },
         error: function(){
             alert("It is wrong2");
         }
     });
 }

 function login3(){
     var user=$("#user").val();
     var pw=$("#pass").val()

     $.ajax({
         url: "http://localhost:8080/book/logIn",
         type: "GET",
         dataType: "jsonp",
         jsonp: "callback",
         data: {
             user: user,
             pass: pw
         },
         success: function(result) {
             if (result) {
                 alert("Login Complete");
                 $(location).attr('href', "review.html");
             }else{
                 alert("It is wrong 1");
             }
         },
         error: function(){
             alert("It is wrong2");
         }
     });
 }

         function logout(){
             var user=$("#user").val();
             var pw=$("#pass").val()

             $.ajax({
                 url: "http://localhost:8080/book/logOut",
                 type: "GET",
                 dataType: "jsonp",
                 jsonp: "callback",
                 data: {
                     user: user,
                     pass: pw
                 },
                 success: function(result) {
                     if (result) {
                         alert("It is wrong 1");
                     }else{
                         alert("Logout Complete");
                         $(location).attr('href', "main.html");

                     }
                 },
                 error: function(){
                     alert("It is wrong2");
                 }
             });
         }

        function enroll(){
            var name=$("#name").val();
            var sex=$("#sex").val();
            var age=$("#age").val();
            var email=$("#email").val();
            var address=$("#address").val();
            var user=$("#user").val();
            var pw=$("#pass").val()

            $.ajax({
                url: "http://localhost:8080/book/enroll",
                type: "GET",
                dataType: "jsonp",
                jsonp: "callback",
                data: {
                    name: name,
                    sex: sex,
                    age: age,
                    email: email,
                    address: address,
                    user: user,
                    pass: pw
                },
                success: function(result){

                        alert("Addition Complete");
                        $(location).attr('href', "login.html");
                },
                error: function(){
                    alert("It is wrong2");
                }
            });
        }
