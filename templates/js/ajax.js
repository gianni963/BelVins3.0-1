$(document).ready(function() {
    $.ajax("js/vins.json",{// Lancement d'Ajax en reliant la source du fichier des données
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
                }/*,
                 TODO:click: highlight la sélection
                 TODO:click: ajouté une classe "selected"
                 TODO:click sur un autre élèment: retirez la classe "selected"

                 */
            },//liste des events,
            "li"
            );


            /* TO FIX
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
        error:function(){alert("Impossible de récupérer la Base de données. Veuillez contacter l'administrateur du site");}

    });
});