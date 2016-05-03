<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require_once '../vendor/twig/twig/lib/twig/autoloader.php';
Twig_Autoloader::register();
$loader = new Twig_Loader_Filesystem('twig');
$twig = new Twig_Environment($loader, array(
    'cache' => false));

echo $twig->render('catalogue.html.twig',array('nom'=>'benjamin'));