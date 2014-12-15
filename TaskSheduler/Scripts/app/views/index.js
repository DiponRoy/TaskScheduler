$(document).ready(function() {
    alert('index');

    amplify.store('name', "Dipon");
    
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
    
    $("#menu-toggle-from-right").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
    
});