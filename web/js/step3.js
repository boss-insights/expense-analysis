const url = 'step3.php?result';

fetch(url, {
  method: 'GET',
})
  .then(response => response.json())
  .then(data => {

    let currentIntegration = data;
    currentIntegration = currentIntegration[0].toUpperCase() + currentIntegration.slice(1);

    let loadingSpinner = document.getElementById("custom-loader");
    loadingSpinner.remove();

    let successContainer = document.getElementById("successContainer");
    let checkmarkContainer = document.getElementById("checkmarkContainer");

    checkmarkContainer.innerHTML = `<div><svg class="checkmark checkmark-success" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
			<circle class="checkmark-circle" cx="25" cy="25" r="25" fill="none" />
			<path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
		</svg></div>`;

    successContainer.innerHTML += `<div id="successMessage" class="d-flex justify-content-center row g-5 text-center" hidden>
      <h2 class="text-success">SUCCESS!</h2>
      <p id="integrationMessage">Connected to <strong>${currentIntegration}</strong>. Connect to another integration?</p>
      <div class="buttonWrapper">
      <a href="step2_integration.html"><button type="button" id="submitForm" class="w-100 btn btn-primary btn-lg">Connect More</button></a>
      <a href="step4.php"><button type="button" id="secondary-button" class="w-100 btn btn-primary btn-lg">Show Insights</button></a>
      </div>
    </div>`

    setTimeout(() => {
      successContainer.style.display = "block";
    }, 2000);
    
        
    });
