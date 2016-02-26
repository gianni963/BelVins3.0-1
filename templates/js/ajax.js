$(document).ready(function() {
// Lancement d'Ajax en reliant la source du fichier des données
    $.ajax({
        url:"js/vins.json",
        cache: false,
        success: function(vins){
        //Menu des vins
            //Récupération des noms de vins
            var liste =[];
            for (var i in vins) {
                $("#listeVin").append("<li data-id='"+vins[i].id+"'>" + vins[i].name + "</li>");
                liste.push(vins[i].name);
            }
            //Animations du menu Vins
            $("#listeVin").on({
                mouseover:function () {
                    $(this).addClass('highlight');
                },
                mouseout:function () {
                    $(this).removeClass('highlight');
                },
                click: function(){
                    if ($("li").hasClass("selected"))
                        $("li").removeClass("selected");
                    if ($(this).hasClass("highlight")) {
                        $(this).addClass("selected");
            //Publication des données sur le formulaire
                        var id_wine = $(this).index();
                        var traversing = $(this).closest("body");
                        var src_pic= "pics/"+ vins[id_wine].picture;
                        var alt_pic= "bouteille de /"+ vins[id_wine].name;

                        if((id_wine+1) != vins[id_wine].id) {
                            alert("Erreur dans la BD: mauvaise indexation");
                            console.log("index du menu: "+id_wine);
                            console.log("index du champs 'id' dans la bd: "+ vins[id_wine].id); //devrait être id_wine+1
                        }
                        else {
                            traversing.find('#idVin').val(vins[id_wine].id);
                            traversing.find('#nameVin').val(vins[id_wine].name);
                            traversing.find('#grapesVin').val(vins[id_wine].grapes);
                            traversing.find('#countryVin').val(vins[id_wine].country);
                            traversing.find('#regionVin').val(vins[id_wine].region);
                            traversing.find('#yearVin').val(vins[id_wine].year);
                            traversing.find('#description').val(vins[id_wine].description);
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
                            $(this).closest("body").find("#listeVin li.selected").removeClass("selected");
                            $(this).closest("body").find("#listeVin li:contains("+choice+")").addClass( "selected" );
                            var vin = $(this).closest("body").find("#listeVin li.selected");
                            var id_wine = vin.data("id");
                            console.log(vins[id_wine]);
                            var traversing = $(this).closest("body");
                            var src_pic= "pics/"+ vins[id_wine].picture;
                            var alt_pic= "bouteille de /"+ vins[id_wine].name;

                            traversing.find('#idVin').val(vins[id_wine].id);
                            traversing.find('#nameVin').val(vins[id_wine].name);
                            traversing.find('#grapesVin').val(vins[id_wine].grapes);
                            traversing.find('#countryVin').val(vins[id_wine].country);
                            traversing.find('#regionVin').val(vins[id_wine].region);
                            traversing.find('#yearVin').val(vins[id_wine].year);
                            traversing.find('#description').val(vins[id_wine].description);
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