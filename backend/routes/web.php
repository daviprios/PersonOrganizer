<?php

/** @var \Laravel\Lumen\Routing\Router $router */

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api'], function () use ($router) {

    $router->group(['prefix' => 'v1'], function () use ($router) {

        $router->group(['prefix' => 'person'], function () use ($router) {
            $router->get('/', 'PersonController@index');
            $router->get('/{id}', 'PersonController@show');
            $router->post('/', 'PersonController@create');
            $router->put('/{id}', 'PersonController@update');
            $router->delete('/{id}', 'PersonController@delete');
        });

    });

});