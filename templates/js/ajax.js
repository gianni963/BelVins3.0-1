$(document).ready(function() {
    $.ajax({// Lancement d'Ajax en reliant la source du fichier des données
        url:"js/vins.json",
        cache: false,
        success: function(vins){
        //Menu des vins
            //Récupération des noms de vins
            for (var i in vins) {
                $("#listeVin").append("<li>" + vins[i].name + "</li>");
            }
            //Animation
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
                    if ($("li").hasClass("highlight"))
                        $(this).addClass("selected");
                }

            },// fin liste des events sur #listeVins
            "li"
            );


            /* FIXME
            $("li").on('click', function () {
                //$(this).addClass('highlight');
                var id = $(this).attr("id");
                console.log(id);
                var traversing = $(this).closest("body");


                traversing.find('#idVin').val(id);
                traversing.find('#nameVin').val(vins[id].name);
                traversing.find('#grapesVin').val(vins[id].grapes);
                traversing.find('#countryVin').val(vins[id].country);
                traversing.find('#regionVin').val(vins[id].region);
                traversing.find('#yearVin').val(vins[id].year);
                traversing.find('#description').val(vins[id].description);
                traversing.find('#imgVin').attr("src", vins[id].picture);
                traversing.find('#imgVin').attr("alt", vins[id].name);
                traversing.find('#imgVin').css("visibility", "visible");

            });
            */
        },
        error:function(){alert("Impossible de rcup&eacute;rer la Base de donn&eacute;es. Veuillez contacter l'administrateur du site");}

    });
});