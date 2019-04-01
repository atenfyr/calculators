function expand() {
    var navBar = document.getElementById("navbar");
    if (navBar.className === "closed") {
        navBar.className = "open";
    } else {
        navBar.className = "closed";
    }
}