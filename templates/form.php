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
        div {
            float: left;
        }
        ul {
            list-style-type: none;
        }
        li {
            margin: 5px 0;
        }
        body {
            font-family: sans-serif;
        }
        .highlight {
            background-color: #800020;
            color: white;
        }
        #imgVin {
            visibility: hidden;
        }
    </style>
</head>
<body>
<div>
    <form id="frmSearchVin">
        <input type="search" id="searchVin" name="searchVin" />
        <button type="button" id="btSearch" name="btSearch" value="Search">Search</button>
    </form>
    <ul id="listeVin">
    </ul>
</div>
<div>
    <form action="#" id="formVin" method="post"> <!-- $app->urlFor('ajoutWines');  retiré pour afficher le form-->
        <input type="reset" id="btReset" name="btReset" value="New">
        <label for="idVin">Id:</label>
        <input type="text" id="idVin" name="name" maxlength="50" readonly/>
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
        <img src="#" alt=#" id="imgVin"/>
        <label for="description">Description :</label>
        <textarea id="description" name="description" rows="10" cols="25" maxlength="500"></textarea>
        <button type="submit" id="btSubmit" name="btSubmit">Save</button>
        <button type="button" id="btDelete" name="btDelete">Delete</button>
    </form>
</div>
<script src="js/jquery-1.12.0.js"></script>
<script src="js/ajax.js"></script>
</body>
</html>