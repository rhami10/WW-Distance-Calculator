let METRIC_UNIT = ["Meters", "Yards"]; // Using a singular array variable to populate the form's Select Element options.

class DistanceCalculator {
	constructor(
		form,
		distanceOneValue,
		distanceOneMetric,
		distanceTwoValue,
		distanceTwoMetric,
		finalDistanceMetric
	) {
		this.form = form;
		this.distanceOneValue = distanceOneValue;
		this.distanceOneMetric = distanceOneMetric;
		this.distanceTwoValue = distanceTwoValue;
		this.distanceTwoMetric = distanceTwoMetric;
		this.finalDistanceMetric = finalDistanceMetric;
	}

	// Call and fetch the final distance result from the PHP function.

	// Update the Feedback panel.

	// Update the Results panel.
}

const form = document.querySelector("calculatorForm");

if (form) {
	const calcultorObj = new Calculator(
		form,
		document.getElementById("distanceOneValue"),
		document.getElementById("distanceOneMetric"),
		document.getElementById("distanceTwoValue"),
		document.getElementById("distanceTwoMetric"),
		document.getElementById("finalDistanceMetric")
	);

	// Populating Select form elements
	METRIC_UNIT.forEach((metricText) => {
		var newOption = document.createElement("option");
		newOption.textContent = metricText;
		newOption.value = metricText;
		calcultorObj.distanceOneMetric.appendChild(newOption);
		calcultorObj.distanceTwoMetric.appendChild(newOption);
		calcultorObj.finalDistanceMetric.appendChild(newOption);
	});

	form.addEventListener("submit", function (evt) {
		evt.preventDefault();
		calculatorObj.getFinalDistance();
	});
}
