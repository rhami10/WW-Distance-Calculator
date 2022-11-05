let METRIC_UNIT = ["Meters", "Yards"]; // Using a singular array variable to populate the form's Select Element options.

const form = document.getElementById("calculatorForm");

if (form) {

	// Populating Select form elements
	for (let i = 1; i <= METRIC_UNIT.length; i++) {
		var newOption = document.createElement("option");
		newOption.textContent = METRIC_UNIT[i - 1];
		newOption.value = i;

		document.getElementById("distanceOneMetric").appendChild(newOption);
		document.getElementById("distanceTwoMetric").appendChild(newOption.cloneNode(1));
		document.getElementById("finalDistanceMetric").appendChild(newOption.cloneNode(1));
	}

	form.addEventListener("submit", function (evt) {
		evt.preventDefault();
		getFinalDistance();
	});
}

// Call and fetch the final distance result from the PHP function.
function getFinalDistance() {

	const getSelectedText = (element) => {
		return element.options[element.selectedIndex].text;
	}

	// Build data object to be posted to PHP function
	var data = {
		distanceOneValue: document.getElementById("distanceOneValue").value,
		distanceOneMetric: getSelectedText(document.getElementById("distanceOneMetric")),
		distanceTwoValue: document.getElementById("distanceTwoValue").value,
		distanceTwoMetric: getSelectedText(document.getElementById("distanceTwoMetric")),
		finalDistanceMetric: getSelectedText(document.getElementById("finalDistanceMetric"))
	}

	fetch('//localhost/DistanceCalculator/distances-api.php', {
		method: 'POST',
		body: JSON.stringify(data),
		header: {
			'Content-Type': 'application/json',
		}
	})
	.then((response) => response.json())
	.then((data) => {
		if (data.success) {
			// Update the results panel with the new value;
			document.getElementById("finalDistanceValue").innerHTML = data.final_distance;
		} else {
			document.getElementById("finalDistanceValue").innerHTML = "";
			
		}

		updateFeedbackPanel(
			data.success,
			data.feedback_title,
			data.feedback_description
		);
	})
	.catch((error) => {
		console.error("Error: ", error);
	});
}

// Update the Feedback panel.
function updateFeedbackPanel(success, title, description) {
	var textColor, panelColor;

	if (success) {
		textColor = "#365E3D";
		panelColor = "#D6F5DB";
	} else {
		textColor = "#660000";
		panelColor = "#F5D9BC";
	}

	document.getElementById("feedbackTitle").innerHTML = title;
	document.getElementById("feedbackText").innerText = description;
	document.getElementById("feedbackTitle").style.color = textColor;
	document.getElementById("feedbackText").style.color = textColor;
	document.getElementById("feedback-panel").style.backgroundColor = panelColor;
}
