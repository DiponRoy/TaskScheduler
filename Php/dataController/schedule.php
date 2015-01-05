<?php
//http://stackoverflow.com/questions/4360182/call-php-function-from-url
if (isset($_GET['action']) && function_exists($_GET['action'])){
    $_GET['action']();
} else {
    throw new Exception('Function not Found;');
}

function all(){
    echo 'all';
}

function get(){
    echo 'get';
}

function post(){
    echo 'post';
}

function put(){
    echo 'put';
}

function delete(){
    echo 'delete';
}