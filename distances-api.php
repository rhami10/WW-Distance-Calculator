<?php

    http_response_code(200);
    header("Content-Type:application/json");

    $fieldIds = ['distanceOneValue', 'distanceOneMetric', 'distanceTwoValue', 'distanceTwoMetric', 'finalDistanceMetric'];
    $metersSelectOption = 'Meters';
    $yardsSelectOption = 'Yards';
    $conversionYMRate = 0.9144;

    class Calculator {

        global $metersSelectOption;
        global $yardsSelectOption;
        global $conversionYMRate;

        public $distanceOneValue;
        public $distanceOneMetric;
        public $distanceTwoValue;
        public $distanceTwoMetric;
        public $finalDistanceMetric;

        public function __construct($distanceOneValue, $distanceOneMetric, $distanceTwoValue, $distanceTwoMetric, $finalDistanceMetric) {
            $this->$distanceOneValue = $distanceOneValue;
            $this->$distanceOneMetric = $distanceOneMetric;
            $this->$distanceTwoValue = $distanceTwoValue;
            $this->$distanceTwoMetric = $distanceTwoMetric;
            $this->$finalDistanceMetric = $finalDistanceMetric;
        }

        public function validateDistanceValues() {
            return (is_numeric($distanceOneValue) && is_numeric($distanceTwoValue))
        }

        public function calculateFinalDistance() {
            
            if($finalDistanceMetric = $metersSelectOption) {
                // Ensuring both values are in Meters
                if($distanceOneMetric != $finalDistanceMetric) $distanceOneValue = $distanceOneValue * $conversionYMRate
                if($distanceTwoMetric != $finalDistanceMetric) $distanceTwoValue = $distanceTwoValue * $conversionYMRate
            }
            else if ($finalDistanceMetric = $yardsSelectOption){
                // Ensuring both values are in Yards
                if($distanceOneMetric != $finalDistanceMetric) $distanceOneValue = $distanceOneValue / $conversionYMRate
                if($distanceTwoMetric != $finalDistanceMetric) $distanceTwoValue = $distanceTwoValue / $conversionYMRate
            }
            else
                return 0;

            return $distanceOneValue + $distanceTwoValue;
        }
    }
?>
