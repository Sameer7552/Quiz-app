var name = "Guest"
var pass = ""
var user = name[0]
document.getElementById("welcome").innerHTML = "Hi, " + name + "&#128075;";
document.getElementById("log").innerHTML = name;
document.getElementById("user").innerHTML = user;
$(document).ready(function () {
    $("#myModal").modal('show');
});

function reg() {
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    pass = document.getElementById("pass").value;
    if (fname == "" || lname == "" || pass == ""){
        document.getElementById("valid").innerHTML = "Please fill all the requirements.";
        document.getElementById("valid").style.animation = 'shake .3s ease';
    }
    else{
        name = fname + " " + lname
        var temp = name[0]
        let user = temp.toUpperCase();
        document.getElementById("welcome").innerHTML = "Hi, " + name + "&#128075;";
        document.getElementById("log").innerHTML = name;
        document.getElementById("user").innerHTML = user;
        $(document).ready(function () {
            $("#myModal").modal('hide');
        });
        document.getElementById("blur").style.filter = "blur(0px)";
    }
}


function newtab(){
    document.getElementById("blur").style.display = "none";
    document.getElementById("newwin").style.display = "block";
    setTimeout(function() {
        window.open('quiz.html', '_self');
      }, 5000);
}


