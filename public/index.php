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

// Render Twig template in route
$app->get('/hello/{name}', function ($request, $response, $args) {
    return $this->view->render($response, 'profile.html', [
        'name' => $args['name']
    ]);
})->setName('profile');

//Chercher tout les vins
$app->get('/api/wine',  function($request, $response, $args){
    $vinsORM = R::findAll('wine');
    $vinsJSON = R::exportAll( $vinsORM );

    return $this->view->render($response, 'listing.html', array('vins' => $vinsJSON));
})->setName('getWines');

//Chercher vin par id
$app->get('/api/wine/{id:[0-9]+}',  function($request, $response, $args){
    $id = $args['id'];
    $vinsORM = R::load('wine', $id);
    $vinsJSON = $vinsORM->export();

    return $this->view->render($response, 'listing.html', array('vins' => $vinsJSON));
})->setName('getWinesById');

// Run app
$app->run();
