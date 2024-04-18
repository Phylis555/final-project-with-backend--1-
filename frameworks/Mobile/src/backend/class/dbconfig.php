<?php
    
    $conn = mysqli_connect('localhost', 'root', '', 'onedon');

    // if (!$conn){
    //     echo 'connection error';
    //     exit();
    // }else{
    //     echo "connection success";
    //     exit();
    // }

    $encodedData = file_get_contents('php://input');
    $decodedData = json_decode($encodedData, true);

?>