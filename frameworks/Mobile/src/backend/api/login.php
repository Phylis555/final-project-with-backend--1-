<?php

    require('../class/dbconfig.php');


    function message($msg, $status) {
        $msgArr = array('message'=>$msg, 'status'=>$status);
        return $msgArr;
    }

    $email = $decodedData['email'];
    $pass = $decodedData['password'];


    // Authentication
    if (empty($email) || empty($pass)) {
        message('All fields required', 'error');
    }


    $SQL = "SELECT * FROM users WHERE email = '$email'";
    $exeSQL = mysqli_query($conn, $SQL);
    $checkEmail =  mysqli_num_rows($exeSQL);

    if ($checkEmail != 0) {
        $arrayu = mysqli_fetch_array($exeSQL);
        if ($arrayu['UserPw'] != $UserPW) {
            $Message = "pw WRONG";
        } else {
            $Message = "Success";
        }
    } else {
        $Message = "No account yet";
    }

    $response[] = array("Message" => $Message);
    echo json_encode($response);

    // $checker = substr($email, 0, 3);
    // if ($checker == '100' || $checker == '101' || $checker == '102') {
    //     if (strlen($email) != 9){
    //         message('Incorrect login ID', 'error');
    //     }else{
            
    //         if ($pass == '123456') {
    //             message('Login Successful', 'success');
    //         }
    //         // Logic function

    //     }

    // }else {

    //     // Student Email: NetID@UNM.edu
    //     $new_email = explode('@', $email)[-1];
    //     if (strtolower($new_email) != 'unm.edu') {
    //         message('Incorrect login ID', 'error');
    //     }else{

    //         // Logic function

    //     }
    // }


    




?>