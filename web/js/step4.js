const url = "step4.php?transactions";
let integrations = [];
let integrationTxns = {};

// pre-set colour palette for three connections
let bossGreenAccent = ["#3ECF8E", "#00B4FF", "#092243"];
//pre-set colour palette for 10 connections
let blueGreenGradient = [
  "#092243",
  "#003359",
  "#00466d",
  "#00597f",
  "#006d8d",
  "#008196",
  "#00959a",
  "#00a99a",
  "#00bc95",
  "#3ecf8e",
];

// Helps return 'series' data for Apex charts.
function getTxnData(property) {
  let output = [];
  for (let integration of integrations) {
    output.push(integrationTxns[integration][property]);
  }
  return output;
}

// Helps return title case 'labels' for Apex charts.
function toTitleCase(wordArray) {
  let output = [];
  for (let word of wordArray) {
    output.push(word[0].toUpperCase() + word.slice(1));
  }
  return output;
}

// Calculates, formats, and returns the savings insight amount.
function getSavingsInsightAmount() {
  let savingsInsightAmount = 0;
  for (let integration of integrations) {
    savingsInsightAmount += integrationTxns[integration]["amountTotal"];
  }
  return Number((savingsInsightAmount * 0.04).toFixed(2));
}

fetch(url, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    // Find each integration and put them in an array.
    for (transaction of data) {
      if (!integrations.includes(transaction["integration"])) {
        integrations.push(transaction["integration"]);
      }
    }
    console.log(integrations);

    // Seperate each integration's transaction info into the integrationTxns object.
    for (integration of integrations) {
      integrationTxns[integration] = { amountTotal: 0, count: 0 };
      for (transaction of data) {
        if (transaction["integration"] == integration) {
          integrationTxns[integration]["amountTotal"] += parseInt(
            transaction["amount"]
          );
          integrationTxns[integration]["count"]++;
        }
      }
      // Convert amount total to dollars.
      integrationTxns[integration]["amountTotal"] =
        integrationTxns[integration]["amountTotal"] / 100;
    }
    console.log(integrationTxns);

    let savingsInsight = document.querySelector("#savingsInsight");
    savingsInsight.innerHTML = `<p class="px-5">By consolidating your payments, you'll save <strong>$${getSavingsInsightAmount().toLocaleString(
      "en-US"
    )}</strong> in monthly fees. Find out more.</p><button id="secondary-button" class="w-100 btn btn-primary btn-md">Find Out More</button>`;
    savingsInsight.style.display = "unset";

    let savingsOpportunity = document.querySelector("#savingsOpportunity");
    savingsOpportunity.innerHTML = '<h3 class="mt-5">Savings Opportunity</h3>';

    let savingsOpportunitySub = document.querySelector(
      "#savingsOpportunitySub"
    );
    savingsOpportunitySub.innerHTML =
      '<h6 class ="mt-1 mb-5">Last 12 Months Transaction Data</h6>';

    // These charts are created using Apex Charts. Please see Apex Charts documentation for more details on customizing charts.
    var amountOptions = {
      dataLabels: {
        style: {
          fontSize: "16px",
          colors: ["#ffffff"],
        },
      },
      series: getTxnData("amountTotal"),
      title: {
        text: "Total Value of Transactions ($)",
        align: "center",
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "18px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "#263238",
        },
      },
      colors: bossGreenAccent,
      chart: {
        width: 450,
        type: "donut",
      },
      labels: toTitleCase(integrations),
      legend: {
        position: "bottom",
        fontSize: "16px",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
          },
        },
      ],
      plotOptions: {
        pie: {
          donut: {
            size: "45%",
          },
        },
      },
    };

    var txnOptions = {
      dataLabels: {
        style: {
          fontSize: "16px",
          colors: ["#ffffff"],
        },
      },
      series: getTxnData("count"),
      title: {
        text: "Total Number of Transactions",
        align: "center",
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "18px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "#263238",
        },
      },
      colors: bossGreenAccent,
      chart: {
        width: 450,
        type: "donut",
      },
      labels: toTitleCase(integrations),
      legend: {
        position: "bottom",
        fontSize: "16px",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
          },
        },
      ],
      plotOptions: {
        pie: {
          donut: {
            size: "45%",
          },
        },
      },
    };

    var amountTotalChart = new ApexCharts(
      document.querySelector("#amountTotalChart"),
      amountOptions
    );
    amountTotalChart.render();

    var numberOfTxnChart = new ApexCharts(
      document.querySelector("#numberOfTxnChart"),
      txnOptions
    );
    numberOfTxnChart.render();

    // spinner
    let loadingSpinner = document.getElementById("custom-loader");
    let loadingMessage = document.getElementById("loadingMessage");
    loadingMessage.remove();
    loadingSpinner.remove();
  });
