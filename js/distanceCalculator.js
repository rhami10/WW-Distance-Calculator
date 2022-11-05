let METRIC_UNIT = ['Meters', 'Yards']; // Using a singular array variable to populate the form's Select Element options.

const form = document.querySelector('calculatorForm');

if (form) {

    const calcObj = {
        distanceOneValue: document.getElementById('distanceOneValue'),
        distanceOneMetric: document.getElementById('distanceOneMetric'),
        distanceTwoValue: document.getElementById('distanceTwoValue'),
        distanceTwoMetric: document.getElementById('distanceTwoMetric'),
        finalDistanceMetric: document.getElementById('finalDistanceMetric')
    }
    

	// Populating Select form elements
	METRIC_UNIT.forEach((metricText) => {
		var newOption = document.createElement('option');
		newOption.textContent = metricText;
		newOption.value = metricText;

		calcObj.distanceOneMetric.appendChild(newOption);
		calcObj.distanceTwoMetric.appendChild(newOption);
		calcObj.finalDistanceMetric.appendChild(newOption);
	});

	form.addEventListener('submit', function (evt) {
		evt.preventDefault();
		getFinalDistance();
	});
}

// Call and fetch the final distance result from the PHP function.
getFinalDistance() {
    fetch('//localhost/DistanceCalculator/distances-api', {
        method: 'POST',
        body: JSON.stringify(calcObj),
        header: {
            'Content-type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.success) {
            // Update the results panel with the new value;
            document.getElementById('finalDistanceValue').innerHTML = data.final_distance;
            updateFeedbackPanel(true, null, null);
        }
        else {
            document.getElementById('finalDistanceValue').innerHTML = "";
            updateFeedbackPanel(false, data.feedback_title, data.feedback_description);
        }
    });
}

// Update the Feedback panel.
updateFeedbackPanel(success, title, description) {

    var textColor, panelColor;

    if(success) {
        textColor = "#365E3D";
        panelColor = "#D6F5DB";
    } else {
        textColor = "#660000";
        panelColor = "#F5D9BC";
    }

    document.getElementById('feedbackTitle').innerHTML = title;
    document.getElementById('feedbackText').innerHTML = description;
    document.getElementById('feedback-panel').style.backgroundColor = panelColor;
    document.getElementById('feedbackTitle').style.color = textColor;
    document.getElementById('feedbackText').style.color = textColor;
}
