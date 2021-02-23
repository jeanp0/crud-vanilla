<?php

require_once "inc/config.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $_POST = json_decode(file_get_contents("php://input"), true);

    function permises()
    {
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            header("Access-Control-Allow-Origin: *");
            header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
            header("Access-Control-Allow-Headers: Origin, Authorization, X-Requested-With, Content-Type, Accept");
            header('Access-Control-Allow-Credentials: true');
        }
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
                header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                header("Access-Control-Allow-Headers: Origin, Authorization, X-Requested-With, Content-Type, Accept");
            exit(0);
        }
    }
    permises();

    $option = (isset($_POST['option'])) ? $_POST['option'] : "";
    $CI = (isset($_POST['CI'])) ? $_POST['CI'] : "";
    $name = (isset($_POST['name'])) ? $_POST['name'] : "";
    $email = (isset($_POST['email'])) ? $_POST['email'] : "";
    $age = (isset($_POST['age'])) ? $_POST['age'] : "";
    $zone = (isset($_POST['zone'])) ? $_POST['zone'] : "";
    $city = (isset($_POST['city'])) ? $_POST['city'] : "";

    if (isset($option)) {
        switch ($option) {
            case 1:
                $query = "SELECT CI, name, email, age, zone, city FROM clients";
                $result = $con->prepare($query);
                $result->execute();
                $data = $result->fetchAll(PDO::FETCH_ASSOC);
                break;
            case 2:
                $query = "INSERT INTO clients (CI, name, email, age, zone, city) VALUES('$CI', '$name', '$email', $age, '$zone', '$city')";
                $result = $con->prepare($query);
                $result->execute();

                if ($result->rowCount() > 0) {
                    $data = "Client created correctly.";
                }
                break;
            case 3:
                $query = "UPDATE clients SET CI='$CI', name='$name', email='$email', age=$age, zone='$zone', city='$city' WHERE CI='$CI'";
                $result = $con->prepare($query);
                $result->execute();

                if ($result->rowCount() > 0) {
                    $data = "Client updated correctly.";
                }
                break;
            case 4:
                $query = "DELETE FROM clients WHERE CI='$CI'";
                $result = $con->prepare($query);
                $result->execute();

                if ($result->rowCount() > 0) {
                    $data = "Client removed correctly.";
                }
                break;
            case 5:
                $query = "SELECT CI, name, email, age, zone, city FROM clients WHERE CI='$CI'";
                $result = $con->prepare($query);
                $result->execute();
                $data = $result->fetch(PDO::FETCH_ASSOC);
                break;
            default:
                break;
        }
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    } else {
        exit();
    }
} else {
    exit();
}
