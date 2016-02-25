<form action="../public/api/wine/14" method="post" enctype="multipart/form-data">
    <input type="reset" id="btReset" name="btReset" value="New">
    <label for="nameVin">id:</label>
    <input type="text" id="idVin" name="id" maxlength="50"/>
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
    <label for="description">Description :</label>
    <input id="description" name="description" type="text">
    <label for="picture">Picture :</label>
    <input id="picture" name="picture" type="file">
    <input type="hidden" name="_METHOD" value="PUT"/>
    <input type="submit" value="Update Wine"/>
</form>