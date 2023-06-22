const url = 'step4.php?transactions';

fetch(url, {
  method: 'GET',
})
  .then(response => response.json())
  .then(data => {
    let chargebeeCounter = 0;
    let recurlyCounter = 0;
    let squareCounter = 0;

    let chargebeeAmountTotal = 0;
    let recurlyAmountTotal = 0;
    let squareAmountTotal = 0;

    for (transaction of data) {
        if (transaction["integration"] == "chargebee") {
            chargebeeCounter++;
            chargebeeAmountTotal += parseInt(transaction["amount"]);
        }
        if (transaction["integration"] == "recurly") {
            recurlyCounter++;
            recurlyAmountTotal += parseInt(transaction["amount"]);
        }
        if (transaction["integration"] == "square") {
            squareCounter++;
            squareAmountTotal += parseInt(transaction["amount"]);
        }
    }

    let savingsInsightAmount = Math.round((chargebeeAmountTotal + recurlyAmountTotal + squareAmountTotal) * 0.04)/100;
    let savingsInsight = document.querySelector("#savingsInsight");

    savingsInsight.innerHTML = `<h3>Savings Opportunity</h3><p>By consolidating your payments to us we can save you $${savingsInsightAmount} in monthly fees.`;

    var amountOptions = {
        series: [chargebeeAmountTotal/100, recurlyAmountTotal/100, squareAmountTotal/100],
        title: {
            text: "Total Value of Transactions ($)",
            align: 'center',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize:  '18px',
              fontWeight:  'bold',
              fontFamily:  undefined,
              color:  '#263238'
            },
        },        
        colors:['rgba(0,143,251,1)', 'rgba(0,227,150,1)', '#E55137'],
        chart: {
        width: 450,
        type: 'pie',
      },
      labels: ['ChargeBee','Recurly', 'Square'],
      legend: {
        position: 'bottom',
        fontSize: '16px'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          }
        }
      }]
      };

      var amountTotalChart = new ApexCharts(document.querySelector("#amountTotalChart"), amountOptions);
      amountTotalChart.render();

      var txnOptions = {
        series: [chargebeeCounter, recurlyCounter, squareCounter],
        title: {
            text: "Total Number of Transactions",
            align: 'center',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize:  '18px',
              fontWeight:  'bold',
              fontFamily:  undefined,
              color:  '#263238'
            },
        },     
        colors:['rgba(0,143,251,1)', 'rgba(0,227,150,1)', '#E55137' ],
        chart: {
        width: 450,
        type: 'pie',
      },
      labels: ['ChargeBee','Recurly', 'Square'],
      legend: {
        position: 'bottom',
        fontSize: '16px'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          }
        }
      }]
      };

      var numberOfTxnChart = new ApexCharts(document.querySelector("#numberOfTxnChart"), txnOptions);
      numberOfTxnChart.render();
      
      let loadingSpinner = document.getElementsByClassName("lds-ellipsis");
      loadingSpinner[0].remove();
        
    });

   