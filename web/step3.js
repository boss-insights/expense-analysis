const url = 'step3.php?result';

fetch(url, {
  method: 'GET',
})
  .then(response => response.json())
  .then(data => {

    let currentIntegration = data;
    currentIntegration = currentIntegration[0].toUpperCase() + currentIntegration.slice(1);

    let loadingSpinner = document.getElementsByClassName("lds-ellipsis");
    loadingSpinner[0].remove();

    let successContainer = document.getElementById("successContainer");

    successContainer.innerHTML = `<div id="successMessage" class="d-flex justify-content-center row g-5 text-center" hidden>
    <i class="d-flex justify-content-center align-items-center  checkmark">✓</i>
    <h2 class="text-success">SUCCESS!</h2>
    <p id="integrationMessage" class="fs-4 fw-normal text-center my-1">You've successfully connected to ${currentIntegration}.</p>
    <p class="fs-4 fw-normal text-center my-1">Would you like to connect to another integration?</p>
    <a href="step2_integration.html"><button type="button" class="w-100 btn btn-primary btn-lg">Connect Another</button></a>
    <a href="step4.php"><button type="button" class="w-100 btn btn-primary btn-lg">I'm Done</button></a>
</div>`
        
    });
