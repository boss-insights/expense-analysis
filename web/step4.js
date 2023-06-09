const url = 'step4.php?transactions';

fetch(url, {
  method: 'GET',
})
  .then(response => response.json())
  .then(data => {

    console.log(data);

    let chargebeeCounter = 0;
    let recurlyCounter = 0;

    let chargebeeAmountTotal = 0;
    let recurlyAmountTotal = 0;


    for (transaction of data) {
        if (transaction["integration"] == "chargebee") {
            chargebeeCounter++;
            chargebeeAmountTotal += parseInt(transaction["amount"]);
        }
        if (transaction["integration"] == "recurly") {
            recurlyCounter++;
            recurlyAmountTotal += parseInt(transaction["amount"]);
        }
    }

    let savingsInsightAmount = Math.round((chargebeeAmountTotal + recurlyAmountTotal) * 0.04)/100;

    let savingsInsight = document.querySelector("#savingsInsight");

    savingsInsight.innerHTML = `<h3>Savings Opportunity</h3><p>By consolidating your payments to us we can save you $${savingsInsightAmount} in monthly fees.`;

    console.log(chargebeeCounter);
    console.log(chargebeeAmountTotal);
    console.log(recurlyCounter);
    console.log(recurlyAmountTotal);

    var amountOptions = {
        series: [chargebeeAmountTotal, recurlyAmountTotal],
        colors:['rgba(0,143,251,1)', 'rgba(0,227,150,1)'],
        chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['ChargeBee','Recurly'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
      };

      var amountTotalChart = new ApexCharts(document.querySelector("#amountTotalChart"), amountOptions);
      amountTotalChart.render();


      var txnOptions = {
        series: [chargebeeCounter, recurlyCounter],
        colors:['rgba(0,143,251,1)', 'rgba(0,227,150,1)'],
        chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['ChargeBee','Recurly'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
      };

      var numberOfTxnChart = new ApexCharts(document.querySelector("#numberOfTxnChart"), txnOptions);
      numberOfTxnChart.render();
        
    });

   