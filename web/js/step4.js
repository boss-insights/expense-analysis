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

    savingsInsight.innerHTML = `<p class="px-5">By consolidating your payments, you'll save <strong>$${savingsInsightAmount.toLocaleString("en-US")}</strong> in monthly fees. Find out more.</p><button id="secondary-button" class="w-100 btn btn-primary btn-md">Find Out More</button>`;

    savingsInsight.style.display = "unset";

    let savingsOpportunity = document.querySelector("#savingsOpportunity");
    savingsOpportunity.innerHTML = '<h3 class="mt-5">Savings Opportunity</h3>'

    let savingsOpportunitySub = document.querySelector("#savingsOpportunitySub");
    savingsOpportunitySub.innerHTML = '<h6 class ="mt-1 mb-5">Last 12 Months Transaction Data</h6>';

    // pre-set colour palettes for up to three connections
    let bossMuted = ['#E9C6FF', '#9CEED0', '#5AA0DA'];
    let bossHighlight= ['#CA76F6', '#3ECF8E', '#00B4FF'];
    let bossBlueMonochrome= ['#ADD8E6', '#4F98D5', '#092243'];
    let bossOrangeAccent=['#FF9800', '#00B4FF', '#092243'];
    let bossGreenAccent=['#3ECF8E', '#00B4FF', '#092243'];

// apex charts
    var amountOptions = {
      dataLabels: {
        style:{
          fontSize:'16px',
          colors:['#ffffff', '#ffffff', '#ffffff']
        },
      },
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
        colors:bossGreenAccent,
        chart: {
        width: 450,
        type: 'donut',
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
      }],
      plotOptions: {
        pie: {
          donut: {
            size: '45%'
          }
        }
      }
      };

      var amountTotalChart = new ApexCharts(document.querySelector("#amountTotalChart"), amountOptions);
      amountTotalChart.render();

      var txnOptions = {
        dataLabels: {
          style:{
            fontSize:'16px',
            colors:['#ffffff', '#ffffff', '#ffffff']
          },
        },
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
        colors:bossGreenAccent,
        chart: {
        width: 450,
        type: 'donut',
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
      }],
      plotOptions: {
        pie: {
          donut: {
            size: '45%'
          }
        }
      }
      };

      var numberOfTxnChart = new ApexCharts(document.querySelector("#numberOfTxnChart"), txnOptions);
      numberOfTxnChart.render();
      
      // spinner
      
      let loadingSpinner = document.getElementById("custom-loader");
      loadingSpinner.remove();

        
    });

   