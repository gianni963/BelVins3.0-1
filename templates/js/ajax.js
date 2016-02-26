$(document).ready(function() {
// Lancement d'Ajax en reliant la source du fichier des données
    $.ajax({
        url:"http://localhost/belvins3.0/public/api/wine",
        cache: false,
        dataType: "json", // data type of response
        success: function(data){
        //Menu des vins
            //Récupération des noms de vins
            var liste =[];
            var items = data == null ? [] : (data.wine instanceof Array ? data.wine : [data.wine]);

            $.each(items, function(index, wine) {
                $("#listeVin").append("<li data-id='"+wine.id+"'>" + wine.name + "</li>");
                liste.push(wine.name);
            });

            //Animations du menu Vins
            $("#listeVin").on({
                mouseover:function () {
                    $(this).addClass('highlight');
                },
                mouseout:function () {
                    $(this).removeClass('highlight');
                },
                click: function(){
                    if ($("li").hasClass("active"))
                        $("li").removeClass("active");
                    if ($(this).hasClass("highlight")) {
                        $(this).addClass("active");
            //Publication des données sur le formulaire
                        var id_wine = $(this).index();
                        var traversing = $(this).closest("body");
                        var src_pic= "pics/"+ data.wine[id_wine].picture;
                        var alt_pic= "bouteille de /"+ data.wine[id_wine].name;

                        if((id_wine+1) != data.wine[id_wine].id) {
                            alert("Erreur dans la BD: mauvaise indexation");
                            console.log("index du menu: "+id_wine);
                            console.log("index du champs 'id' dans la bd: "+ data.wine[id_wine].id); //devrait être id_wine+1
                        }
                        else {
                            traversing.find('#idVin').val(data.wine[id_wine].id);
                            traversing.find('#nameVin').val(data.wine[id_wine].name);
                            traversing.find('#grapesVin').val(data.wine[id_wine].grapes);
                            traversing.find('#countryVin').val(data.wine[id_wine].country);
                            traversing.find('#regionVin').val(data.wine[id_wine].region);
                            traversing.find('#yearVin').val(data.wine[id_wine].year);
                            traversing.find('#description').val(data.wine[id_wine].description);
                            traversing.find('#imgVin').attr("src", src_pic);
                            traversing.find('#imgVin').attr("alt", alt_pic);
                            traversing.find('#imgVin').css("visibility", "visible");
                        }
                    }
                }// fin du event "click"

            },// fin liste des events sur #listeVin
            "li"
            ); //fin de .on() pour #listeVIn
            //Animations des boutons
                //Nouveau Vin
            $("#btReset").click(function(){
                var traversing = $(this).closest("body");
                var vin = $(this).closest("body").find("#listeVin :last-child");
                var id_wine = (vin.data("id"));
                var src_pic= "#";
                var alt_pic="";
                traversing.find('#idVin').val(id_wine+1);
                traversing.find('#nameVin').val("");
                traversing.find('#grapesVin').val("");
                traversing.find('#countryVin').val("");
                traversing.find('#regionVin').val("");
                traversing.find('#yearVin').val("");
                traversing.find('#description').val("");
                traversing.find('#imgVin').attr("src", src_pic);
                traversing.find('#imgVin').attr("alt", alt_pic);
                traversing.find('#imgVin').css("visibility", "hidden");
            });
                //Sauvegarde du Vin
            $("#btSubmit").click(function(){});//TODO: message de validation voir si vs. avec Foundation
                //Suppression du Vin
            $("#btDelete").click(function(){
                var traversing = $(this).closest("body");
                var src_pic= "#";
                var alt_pic="";
                traversing.find('#idVin').val("");
                traversing.find('#nameVin').val("");
                traversing.find('#grapesVin').val("");
                traversing.find('#countryVin').val("");
                traversing.find('#regionVin').val("");
                traversing.find('#yearVin').val("");
                traversing.find('#description').val("");
                traversing.find('#imgVin').attr("src", src_pic);
                traversing.find('#imgVin').attr("alt", alt_pic);
                traversing.find('#imgVin').css("visibility", "hidden");
            });//TODO: message de validation voir si vs. avec Foundation
            //JQUERYUI: Autocomplete
            $.getScript("js/jquery-ui.js",function(){
                $("#searchVin").autocomplete({
                        source: liste,
                        position: {
                            my: "top",
                            at: "bottom"
                        },
                        select : function(event, ui){
                            var choice = ui.item.value;
                            $(this).closest("body").find("#listeVin li.active").removeClass("active");
                            $(this).closest("body").find("#listeVin li:contains("+choice+")").addClass( "active" );
                            var vin = $(this).closest("body").find("#listeVin li.active");
                            var id_wine = data.wine.data("id");
                            console.log(data.wine[id_wine]);
                            var traversing = $(this).closest("body");
                            var src_pic= "pics/"+ data.wine[id_wine].picture;
                            var alt_pic= "bouteille de /"+ data.wine[id_wine].name;

                            traversing.find('#idVin').val(data.wine[id_wine].id);
                            traversing.find('#nameVin').val(data.wine[id_wine].name);
                            traversing.find('#grapesVin').val(data.wine[id_wine].grapes);
                            traversing.find('#countryVin').val(data.wine[id_wine].country);
                            traversing.find('#regionVin').val(data.wine[id_wine].region);
                            traversing.find('#yearVin').val(data.wine[id_wine].year);
                            traversing.find('#description').val(data.wine[id_wine].description);
                            traversing.find('#imgVin').attr("src", src_pic);
                            traversing.find('#imgVin').attr("alt", alt_pic);
                            traversing.find('#imgVin').css("visibility", "visible");
                        }

                    }
                );

            });
        },
        error:function(){
            alert("Impossible de r\351cup\351rer la Base de donn\351es. Veuillez contacter l'administrateur du site");
            $("button").addClass("disabled");
            $("input,textarea").attr("readonly","readonly")
        }

    });
});