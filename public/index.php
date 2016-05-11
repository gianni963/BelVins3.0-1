<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

//Acces DB
$user = 'root';
$pass = '';
$dbname = 'BelVins';

//REDBEAN
define('LIB_PATH',__DIR__.'../../vendor/RedBean/');
require LIB_PATH.'rb.php';
R::setup('mysql:host=localhost;dbname=' . $dbname, $user, $pass);


// Create app
$app = new \Slim\App(array(
    'debug' => true
));

// Get container
$container = $app->getContainer();

// Register component on container
$container['view'] = function ($container) {
    $view = new \Slim\Views\Twig('../templates', [
        //'cache' => '../templates/cache'
    ]);
    $view->addExtension(new \Slim\Views\TwigExtension(
        $container['router'],
        $container['request']->getUri()
    ));

    return $view;
};

// ROUTING

$app -> get('/api/catalogue', function (Request $request, Response $response, array $args) {
  return $this->view->render($response, 'catalogue.html.twig');
})->setName('catalogue');

//Chercher tout les vins
$app->get('/api/wine',  function($request, $response, $args){
    $vinsORM = R::findAll('wine');
    $vins = R::exportAll($vinsORM);;
    $vinsJSON = json_encode($vins);

    if ($request->isXhr()) {
        echo '{"wine": ' . $vinsJSON . '}';
    }else{
        return $this->view->render($response, 'listing.html', array('vins' => $vins));
    }
})->setName('getWines');







//Chercher vin par id ou par nom
$app->get('/api/wine/{id}',  function($request, $response, $args){
    $id = $args['id'];
    $vinsJSON = '';

    if(preg_match('#[0-9]+#',$id)){
        $vinsORM = R::load('wine', $id);
        $vinsJSON = $vinsORM->export();
        $vinsJSON = json_encode($vinsJSON);
    }

    if(preg_match('#[^0-9]#',$id)){
        $vinsORM = R::findAll('wine',' name LIKE :name ',
            array(':name' => '%' . $id . '%' )
        );
        $vinsJSON = R::exportAll($vinsORM);
        $vinsJSON = json_encode($vinsJSON);
    }

    if ($request->isXhr()) {
        echo '{"wine": ' . $vinsJSON . '}';
    }else{
        return $this->view->render($response, 'listing.html', array('vins' => $vinsJSON));
    }
})->setName('getWinesById');

//Rajouter un vins
$app->post('/api/wine',  function($request, $response, $args){
    $wine = R::dispense('wine');

    if(!empty($_POST['name'])){
        $wine->name = $_POST['name'];
    }
    if(!empty($_POST['year'])){
        $wine->year = $_POST['year'];
    }
    if(!empty($_POST['grapes'])){
        $wine->grapes = $_POST['grapes'];
    }
    if(!empty($_POST['country'])){
        $wine->country = $_POST['country'];
    }
    if(!empty($_POST['region'])){
        $wine->region = $_POST['region'];
    }
    if(!empty($_POST['description'])){
        $wine->description = $_POST['description'];
    }
    if(!empty($_FILES['picture'])){
        $resultat = move_uploaded_file($_FILES['picture']['tmp_name'],'../templates/pics/' . $_FILES['picture']['name']);
        $wine->picture = $_FILES['picture']['name'];
    }

    if(!empty($wine->name) &&
        !empty($wine->year) &&
        !empty($wine->grapes) &&
        !empty($wine->country) &&
        !empty($wine->region) &&
        !empty($wine->description) &&
        !empty($wine->picture)){
        R::store($wine);
    }
})->setName('ajoutWines');

//Supprimer un vin avec l'id
$app->delete('/api/wine/{id:[0-9]+}', function ($request, $response, $args){
    $id = $args['id'];
    $vinsORM = R::load('wine', $id);
    R::trash($vinsORM);
})->setName('deleteWinesById');

//Modifier un vin
$app->put('/api/wine/{id:[0-9]+}',  function($request, $response, $args){
    $id = $args['id'];
    $vinsORM = R::load('wine', $id);

    if(!empty($_POST['name'])){
        $vinsORM->name = $_POST['name'];
    }
    if(!empty($_POST['year'])){
        $vinsORM->year = $_POST['year'];
    }
    if(!empty($_POST['grapes'])){
        $vinsORM->grapes = $_POST['grapes'];
    }
    if(!empty($_POST['country'])){
        $vinsORM->country = $_POST['country'];
    }
    if(!empty($_POST['region'])){
        $vinsORM->region = $_POST['region'];
    }
    if(!empty($_POST['description'])){
        $vinsORM->description = $_POST['description'];
    }
    if(!empty($_FILES['picture'])){
        $resultat = move_uploaded_file($_FILES['picture']['tmp_name'],'../templates/pics/' . $_FILES['picture']['name']);
        $vinsORM->picture = $_FILES['picture']['name'];
    }

    if(!empty($vinsORM->name) &&
        !empty($vinsORM->year) &&
        !empty($vinsORM->grapes) &&
        !empty($vinsORM->country) &&
        !empty($vinsORM->region) &&
        !empty($vinsORM->description) &&
        !empty($vinsORM->picture)){
        R::store($vinsORM);
    }
})->setName('modifWines');

//Trier vin par id, nom ou année
$app->get('/api/wine/filter/{type}',  function($request, $response, $args){
    $type = $args['type'];
    $vinsJSON = '';

    if($type === 'name'){
        $vinsORM = R::findAll('wine',' ORDER by name');
        $vinsJSON = R::exportAll($vinsORM);
        $vinsJSON = json_encode($vinsJSON);
    }
    if($type === 'id'){
        $vinsORM = R::findAll('wine',' ORDER by id');
        $vinsJSON = R::exportAll($vinsORM);
        $vinsJSON = json_encode($vinsJSON);
    }
    if($type === 'year'){
        $vinsORM = R::findAll('wine',' ORDER by year');
        $vinsJSON = R::exportAll($vinsORM);
        $vinsJSON = json_encode($vinsJSON);
    }

    if ($request->isXhr()) {
        echo '{"wine": ' . $vinsJSON . '}';
    }else{
        return $this->view->render($response, 'listing.html', array('vins' => $vinsJSON));
    }
})->setName('filterWines');

//Système de pagination
$app->get('/api/wine/page/{number:[0-9]+}',  function($request, $response, $args){
    $number = $args['number'];
    $vinsJSON = '';
    $nbWines = 6;
    $nextwine = ($number - 1) * $nbWines;


    $vinsORM = R::findAll('wine',' LIMIT :nbWines OFFSET :nextWine',
        array(':nbWines' => $nbWines, ':nextWine' => $nextwine)
    );
    $vinsJSON = R::exportAll($vinsORM);
    $vinsJSON = json_encode($vinsJSON);

    if ($request->isXhr()) {
        echo '{"wine": ' . $vinsJSON . '}';
    }else{
        return $this->view->render($response, 'listing.html', array('vins' => $vinsJSON));
    }
})->setName('pagesWines');

// Run app
$app->run();
