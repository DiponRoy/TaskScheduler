<?php
//http://stackoverflow.com/questions/4360182/call-php-function-from-url
if (isset($_GET['action']) && function_exists($_GET['action'])){
    $_GET['action']();
} else {
    throw new Exception('Function not Found;');
}

function all(){
    $events = array();
    echo json_encode($events);
}

function get(){
    $id = $_POST["id"];
    $events = array();
    echo json_encode($events);
}

function post(){
    $name = $_POST["name"];
    $deviceId = $_POST["deviceId"];
    $description = $_POST["description"];
    $status = $_POST["status"];
    echo json_encode('true');
}

function put(){
    $id = $_POST["id"];
    $name = $_POST["name"];
    $deviceId = $_POST["deviceId"];
    $description = $_POST["description"];
    $status = $_POST["status"];
    echo json_encode('true');
}

function delete(){
    $id = $_POST["id"];
    echo json_encode('true');
}
