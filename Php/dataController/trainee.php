<?php
//http://stackoverflow.com/questions/4360182/call-php-function-from-url
if (isset($_GET['action']) && function_exists($_GET['action'])){
    $_GET['action']();
} else {
    throw new Exception('Function not Found;');
}

function all(){
    $eventId = $_POST["eventId"];

    $trainees = array();
    echo json_encode($trainees);}

function get(){
    $id = $_POST["id"];

    $trainees = array();
    echo json_encode($trainees);

}

function post(){
    $name = $_POST["name"];
    $email = $_POST["email"];
    $contactNo = $_POST["contactNo"];
    $eventId = $_POST["eventId"];
    $status = $_POST["status"];
    echo json_encode('true');
}

function put(){
    $id = $_POST["id"];
    $name = $_POST["name"];
    $email = $_POST["email"];
    $contactNo = $_POST["contactNo"];
    $eventId = $_POST["eventId"];
    $status = $_POST["status"];
    echo json_encode('true');
}

function delete(){
    $id = $_POST["id"];
    echo json_encode('true');
}