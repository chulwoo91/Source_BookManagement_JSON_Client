
        function login() {
            if ($("#name").val()=="JavaScript") {
                if ($("#pass").val()=="Kit") {
                    location="review.html"
                } else {
                    alert("Invalid Password")
                }
            } else {  alert("Invalid UserID")
            }
        }
