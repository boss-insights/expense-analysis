<?php

require __DIR__ . '/../common.php';

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

if ($_GET) {
    $selfSigned = (bool)getenv('SELF_SIGNED_CERT');
	$client = new Client(['verify' => !$selfSigned]);
    try {
        $response = $client->request('GET', $commonData['ADMIN_URL'] . '/app/api.php?action=connection_health', [
            'auth'    => [$commonData['API_KEY'], $commonData['API_SECRET']],
            'headers' => [
                'User-Agent'  => 'BossInsightsApiClient/1.0',
                'Accept'      => 'application/json',
                'Account-Key' => $commonData['ACCOUNT_KEY']
            ]
        ]);
        
    } catch (Exception $e) {
        throw new Exception('failed to communicate with admin api to provision a customer account');
    }
    $result = [];
    if ($response->getStatusCode() === 200) {
        $result = json_decode($response->getBody()->getContents(), true, 512, JSON_THROW_ON_ERROR);
        
        $integrations = [];
        foreach ($result["connections"] as $connection) {
            if ($connection["account_key"] == $_SESSION['account_key']) {
                array_push($integrations,$connection);
            }
        }

        $latestIntegration = $integrations["0"];

        foreach($integrations as $integration) {
            if (strtotime($integration["created"]) > strtotime($latestIntegration["created"])) {
                $latestIntegration = $integration;
            }
        }

        echo json_encode($latestIntegration["integration"]);

        if ($result === null) {
            throw new Exception('invalid admin api response');
        }
    } else {
        throw new Exception('unable to communicate with admin api, unexpected response code');
    }
} else {
    header('Location: step3_connectMore.html');
}