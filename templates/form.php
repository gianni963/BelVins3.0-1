<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Belvin</title>
    <style>
        label, img, textarea {
            display: block;
        }
        input,button, label, img {
            margin: 5px;
        }

        #listeVin {
            list-style-type: none;
        }
        li {
            margin: 5px 0;
        }
        body {
            font-family: sans-serif;
        }
        .highlight, .selected {
            background-color: #800020;
            color: white;
        }
        #imgVin {
            visibility: hidden;
            width: 250px;
            height: 300px;
        }
        .ui-menu{
            background-color: white;
            z-index: 3;
            border: solid black 1px;
        }

        .ui-menu li {
            display: block;
        }
        .ui-menu li:hover {
            background-color: #7253C9;
            color: white;
        }
        .ui-helper-hidden-accessible {
            display:none;
        }
    </style>
    <link rel="stylesheet" href="../vendor/foundation-6/css/foundation.css" />
    <link rel="stylesheet" href="../vendor/foundation-6/css/app.css" />
</head>
<body>
    <div class="row">
        <div class="large-3  columns">
            <form id="frmSearchVin">
                <input type="search" id="searchVin" name="searchVin" />
            </form>
            <ul id="listeVin">
            </ul>
        </div>
               <!-- <form action="#" id="formVin" method="post"> <!-- $app->urlFor('ajoutWines');  retiré pour afficher le form-->
        <div class="large-6 columns">
            <button type="button" id="btReset" name="btReset">New</button>
            <label for="idVin">Id:</label>
            <input type="text" id="idVin" name="name" maxlength="50"/>
            <label for="nameVin">Name:</label>
            <input type="text" id="nameVin" name="name" maxlength="50"/>
            <label for="grapesVin">Grapes:</label>
            <input type="text" id="grapesVin" name="grapes" maxlength="50"/>
            <label for="countryVin">Country:</label>
            <input type="text" id="countryVin" name="country" maxlength="50"/>
            <label for="regionVin">Region:</label>
            <input type="text" id="regionVin" name="region" maxlength="50"/>
            <label for="yearVin">Year:</label>
            <input type="number" id="yearVin" name="year" min="1900" max="2100"/>
            <button type="button" id="btSubmit" name="btSubmit">Save</button>
            <button type="button" id="btDelete" name="btDelete">Delete</button>
        </div>

        <div class="large-3 columns">
                    <img src="#" alt=#" id="imgVin"/>
                    <label for="description" >Description :</label>
                    <textarea id="description" name="description" rows="10" cols="25" maxlength="500"></textarea>
        </div>
                <!--</form>-->
    </div>

<script src="js/jquery-1.12.0.js"></script>
<script src="js/ajax.js"></script>
</body>
</html>