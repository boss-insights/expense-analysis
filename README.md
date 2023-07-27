# Expense Analysis
![Example application screenshot showing insights page](https://github.com/boss-insights/expense-analysis/blob/main/web/images/expense-analysis-insights.PNG "Insights")
## What This Application Does
This is an example expense analysis application. A merchant is able to connect to multiple commerce integrations using Boss Insight's Link Connection Widget. This application can be set up to connect any commerce application listed and pull data from the Boss Insights API. Next, the merchant is able to view insights and savings based on the integrations connected. Currently, the application features two charts using the Apex Charts API to display relevant data. 

> ⚠️ **Disclaimer**: This is an example application and not intended for production use as-is, it lacks code in areas such as logging and security and is provided as a bare-bones example of how to connect and fetch data from the Boss Insights API

### Steps This Application Performs (Condensed)
1. Index Page: The merchant signs up. Provisions private data storage for a merchant using your API credentials
2. Merchant connects to commerce integration with Link Connection Widget. Authorizes access to application.
3. Presents option to connect to more integrations or show insights. `Connect More` redirects to Link Connection Widget and `Show Insights` leads to Step 4.
4. Displays insights and savings information.

![Flow chart of steps application performs](https://github.com/boss-insights/expense-analysis/blob/main/web/images/expense-analysis-flow.png)

### How the example app works (Detailed)
This application involves 4 steps. Each step and its accompanying files will be labelled accordingly (i.e. index.html, index.php, index.js). 

When you first access the application you should be presented with `Index` which is Step 1 and looks like the screenshot below:
![Example application screenshot showing step 1](https://github.com/boss-insights/expense-analysis/blob/main/web/images/expense-analysis.png "Step 1")

At this point only one API call has been performed which is to add the current domain name that the app is being accessed via to an allow-list permitting embedding of the javascript widget. This is provided as an example convenience and typically in a production app you would add this manually yourself via the `Developers > Embed > Allowed URLs` menu option within the administration application. 

Clicking the `Continue` button will use the API to provision a data storage account for a merchant which will provide a unique merchant account identifier that must be passed to the javascript widget on the subsequent step 2 so that it knows for which merchant any connected data will be associated with.

Step 2 will present the javascript widget to allow the merchant to select their preferred application to provide data (the Data Provider). See our documentation on the [embedded javascript widget](https://docs.bossinsights.com/developer/link-connection-widget) for more details on the widget itself. Once the merchant selected an application they are redirected to an authentication & authorization screen where they grant access to share data, with this completed they are redirected to the next step in our example workflow. As part of the authorization process we store a token which will allow subsequent access to the Data Provider. 

Step 3 will display an option to either connect more integrations or continue to view insights. `Connect More` will redirect to Step 2 while `Show Insights` will redirect to Step 4.

Step 4 will present two donut charts. Chart 1: Provider by Value: Based on your connected application, X amount of money went through Y application. (ex. $2000 went through Stripe). Chart 2: Provider by Number: Based on your connected application X amount of transactions went through Y application (ex. 65% of transactions went through Chargebee). Any form of chart or insight can be displayed here. 

The chart colours in Step 4 are set in `step4.js`. This application uses the Apex Charts API api to display charts. We have provided up to 10 base colours to display on the donut charts but this can customized to any amount or colour. Please refer to the [Apex Charts documentation](https://apexcharts.com/docs/colors/) for more details.


## Self Hosting

For testing and development purposes you can run the application from your local development machine. You will need the following installed:

* PHP 8.2 or higher - [https://www.php.net/downloads.php](https://www.php.net/downloads.php)
* Composer 2.2 or higher - [https://getcomposer.org/download/](https://getcomposer.org/download/)

It is assumed these will be added to your system [PATH](https://en.wikipedia.org/wiki/PATH_(variable)), if not you'll need to adjust the commands below to reference their full file system paths

Open a terminal and change your current working directory to the root of the freshly checked out copy of the code.
You will need to run the following commands:

#### Install library dependencies
```shell
composer update
```

#### Start a local webserver
```shell
composer start
```

This command will start a local web server running on port 8080

### Environment Configuration Variables

| Variable           | Required | Description                                                                                                      | Example                             |
|--------------------|----------|------------------------------------------------------------------------------------------------------------------|-------------------------------------|
| ORG_NAME           | yes      | The name of your company that should be shown to users                                                           | Example Capital Corp                |
| ORG_URL            | yes      | Your Boss Insights account url                                                                                   | https://example.myintranetapps.com  |
| API_KEY            | yes      | API Key used to identify API requests for your account                                                           | APIPROJECT3                         |
| ADMIN_URL          | yes      | The URL to your admin app. This is region dependant and will vary depending on your data residency               | https://admin.myintranetapps.com    |
| ACCOUNT_KEY        | yes      | Your Boss Insights account unique identifier                                                                     | 5ff363e48e2a82.98390839             |
| BRAND_ACCENT_COLOR | no       | A HTML hexadecimal color code that will be used in the example app as a bold color for buttons and other accents | CA76F6                              |

> ⚠️ **Note**: Composer will read a start script in the `composer.json` file in the project root folder, inside this are environment configuration variables which you will need to change to suit your account information (see the table above for a list of the variables)

#### Viewing the application
Using your web browser open [http://127.0.0.1:8080](http://127.0.0.1:8080) and you should be presented with Step 1 of the example application.


## Debugging
Two pages are made available to help troubleshoot problems:
 * [http://127.0.0.1:8080/debug.php](http://127.0.0.1:8080/debug.php) - will show all current configuration environment variables
 * [http://127.0.0.1:8080/info.php](http://127.0.0.1:8080/info.php) - will show details of the PHP webserver environment

You may be asked to provide a copy of the output of these pages if logging a support ticket regarding this sample app.

---

The code and above steps should give you an introduction in to how to use the Boss Insights API, For support with this example app or the API in general please use our help center at [bossinsights.com/support](https://bossinsights.com/support)
