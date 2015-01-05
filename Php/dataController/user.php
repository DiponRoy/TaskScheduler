<?php
//http://stackoverflow.com/questions/4360182/call-php-function-from-url
if (isset($_GET['action']) && function_exists($_GET['action'])){
    $_GET['action']();
} else {
    throw new Exception('Function not Found;');
}

function all(){
    $users = array();
    echo json_encode($users);
}

function get(){
    $id = $_POST["id"];
    $users = array();
    echo json_encode($users);
}

function has(){
    $email = $_POST["email"];
    $password = $_POST["password"];
    echo json_encode('lol');
}

function post(){
    $name = $_POST["name"];
    $email = $_POST["email"];
    $contactNo = $_POST["contactNo"];
    $password = $_POST["password"];
    $status = $_POST["status"];
    echo json_encode('true');
}

function put(){
    $id = $_POST["id"];
    $name = $_POST["name"];
    $email = $_POST["email"];
    $contactNo = $_POST["contactNo"];
    $password = $_POST["password"];
    $status = $_POST["status"];
    echo json_encode('true');
}

function delete(){
    $id = $_POST["id"];
    echo json_encode('true');
}