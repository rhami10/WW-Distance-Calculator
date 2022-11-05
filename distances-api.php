<?php

    ini_set("display_errors",1);
    error_reporting(E_ALL);

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: *');
    header('Content-Type: application/json');

    $fieldIds = ['distanceOneValue', 'distanceOneMetric', 'distanceTwoValue', 'distanceTwoMetric', 'finalDistanceMetric'];

    
    // 
    function initialSetCheck() {
        $isValid;

        $_POST = json_decode(file_get_contents("php://input"), true);

        global $fieldIds;

        foreach ($fieldIds as $fieldId) {
            $isValid = (isset($_POST[$fieldId]) && $_POST[$fieldId]!="");
            if(!$isValid) return false;
        }
        return true;
    }

    //
    function sendResponse($success, $finalDistance, $feedbackTitle, $feedbackDescription) {
        
        $response;

        if($success)
            $response = array('success' => $success, 'final_distance' => $finalDistance, 'feedback_title' => $feedbackTitle, 'feedback_description' => $feedbackDescription);
        else
            $response = array('success' => $success, 'feedback_title' => $feedbackTitle, 'feedback_description' => $feedbackDescription);
        
            echo json_encode($response);
    }

    //
    function calculateFinalDistance($d1_value, $d1_metric, $d2_value, $d2_metric, $final_metric) {
            
        if($final_metric == 'Meters') {
            // Ensuring both values are in Meters
            if($d1_metric != $final_metric) $d1_value = $d1_value * 0.9144;
            if($d2_metric != $final_metric) $d2_value = $d2_value * 0.9144;
        }
        else if ($final_metric == 'Yards'){
            // Ensuring both values are in Yards
            if($d1_metric != $final_metric) $d1_value = $d1_value / 0.9144;
            if($d2_metric != $final_metric) $d2_value = $d2_value / 0.9144;
        }
        else
            return 0;

        return $d1_value + $d2_value;
    }

    // Main program initialising a new Calculator Object and calling all methods required for the calculation.
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        if(initialSetCheck() == true) {

            global $fieldIds;
            
            $distanceOneValue = $_POST[$fieldIds[0]];
            $distanceOneMetric = $_POST[$fieldIds[1]];
            $distanceTwoValue = $_POST[$fieldIds[2]];
            $distanceTwoMetric = $_POST[$fieldIds[3]];
            $finalDistanceMetric = $_POST[$fieldIds[4]];

            if(is_numeric($distanceOneValue) && is_numeric($distanceTwoValue)) { // Checking if both values are valid.
                sendResponse(true, calculateFinalDistance(floatval($distanceOneValue), $distanceOneMetric, floatval($distanceTwoValue), $distanceTwoMetric, $finalDistanceMetric), "Success", "Results generated!");
            } 
            else {
                header("HTTP/1.1 400 Bad Request");
                sendResponse(false, null, "Invalid Inputs", "Distance values are invalid.");
            }

        } else {
            header("HTTP/1.1 400 Bad Request");
            sendResponse(false, null, "Missing Values", "Please make sure all input fields are set.");
            exit();
        }
    }
    
?>
