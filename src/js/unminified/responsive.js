function expand() {
    var navBar = document.getElementById("navbar");
    if (navBar.className === "closed") {
        navBar.className = "open";
    } else {
        navBar.className = "closed";
    }
}

window.addEventListener("load", function() {
    if (document.getElementById("total")) {
        document.getElementById("total").addEventListener("click", function() {
            if (document.getElementById("total").innerHTML === "811.12") document.body.style.fontFamily = '"Comic Sans MS", cursive, sans-serif';
        });
    }
});