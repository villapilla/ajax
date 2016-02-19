$(window).ready(function() {
    var sideslider = $('[data-toggle=collapse-side]'),
        sel = sideslider.attr('data-target'),
        sel2 = sideslider.attr('data-target-2'),
        bodyWidth,
        contentPosition,
        timeoutCarrusel = createSetInterval();
        //document.getElementById("new").parentElement.addEventListener("hover", changeProducts, false);
        /*$("#new").on("mouseenter", changeProducts);
        $("#perifericos").on("mouseenter", changeProducts);
        $("#componentes").on("mouseenter", changeProducts);*/
        function createSetInterval() {
            return window.setInterval(function () {
            if($("#carrusel1").position().left < 600) {
                $("#carrusel1").animate({
                    left : "-101%"
                }, 2000 , function () {
                    $("#carrusel1").css("left", "105%"); 
                    $("#boton_carrusel2").css("opacity", 1);
                    $("#boton_carrusel1").css("opacity", 0.5);   
                });
                $("#carrusel2").animate({
                    left : "3%"
                }, 2000);
            } else {
                $("#carrusel1").animate({
                    left : "0"
                }, 2000);
                $("#carrusel2").animate({
                    left : "-100%"
                }, 2000, function () {
                    $("#carrusel2").css("left", "101%"); 
                    $("#boton_carrusel1").css("opacity", 1);
                    $("#boton_carrusel2").css("opacity", 0.5);   
                });
            }
            }, 30000);
        }   
    $("#boton_carrusel1").click(function (e) {
        $("#boton_carrusel1").css("opacity", 1);
        $("#boton_carrusel2").css("opacity", 0.5);
        if($("#carrusel1").position().left > 600) {
            $("#carrusel1").animate({
                left : "0"
            }, 2000);
            $("#carrusel2").animate({
                left : "-101%"
            }, 2000, function () {
                $("#carrusel2").css("left", "101%");     
            });
        }
        clearInterval(timeoutCarrusel);
        timeoutCarrusel = createSetInterval();
    });
    $("#boton_carrusel2").click(function (e) {
        $("#boton_carrusel2").css("opacity", 1);
        $("#boton_carrusel1").css("opacity", 0.5);
        if($("#carrusel1").position().left < 600) {
            $("#carrusel1").animate({
                left : "-101%"
            }, 2000 , function () {
                $("#carrusel1").css("left", "101%");     
            });
            $("#carrusel2").animate({
                left : "3%"
            }, 2000);
        }
        clearInterval(timeoutCarrusel);
        timeoutCarrusel = createSetInterval();
    });
    if (window.screen.availWidth < 768) {
        $("main nav .side-collapse").css({top : $("#descripcion").offset().top + "px"});
    }
    
    sideslider.click(function(event) {
        $(sel).toggleClass('in');
        $(sel2).toggleClass('out');
    });

    $(document).on('scroll', function() {
        contentPosition = $('header').height() + 25;
        if (window.scrollY > contentPosition) {
            $('#nav_main').addClass('navbar navbar-fixed-top navbar-inverse linear_gradient');
            $("#nav_main .container").addClass("linear_gradient");
            $("main nav .side-collapse").css({top : $(".navbar-header")[0].clientHeight + "px"});
        } else {
            $('#nav_main').removeClass("navbar navbar-fixed-top linear_gradient");
            $("#nav_main .container").removeClass("linear_gradient");
           
            $("main nav .side-collapse").css({top : $("#descripcion").offset().top + "px"});
        }
    });
});
function changeProducts() {
    var section = $("#escaparate"),
        novedades = $(".new"),
        componentes = $(".componentes"),
        perifericos = $(".perifericos"),
        newSection = $("#escaparate").clone(false).empty();
    if(this.id === "new") {
        newSection.append(novedades);
        newSection.append(componentes);
        newSection.append(perifericos);
    } else {
        if(this.id === "componentes") {
            newSection.append(componentes);
            newSection.append(perifericos);
            newSection.append(novedades);
        } else {
            newSection.append(perifericos);
            newSection.append(novedades);
            newSection.append(componentes);
        }
    }
    $("#escaparate").replaceWith(newSection);
    $("#new").off("mouseenter", changeProducts);
    $("#perifericos").off("mouseenter", changeProducts);
    $("#componentes").off("mouseenter", changeProducts);
}