$(document).ready(function() {
// Lancement d'Ajax en reliant la source du fichier des données
    $.ajax({
        url:"js/vins.json",
        cache: false,
        success: function(vins){
        //Menu des vins
            //Récupération des noms de vins
            for (var i in vins) {
                $("#listeVin").append("<li>" + vins[i].name + "</li>");
            }
            //Animations
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
            },// fin liste des events sur #listeVins
            "li"
            ); //fin de .on()


        },
        error:function(){alert("Impossible de rcup&eacute;rer la Base de donn&eacute;es. Veuillez contacter l'administrateur du site");}

    });
});