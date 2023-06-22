<?php
/**
 * @global array $commonData

 */

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

require __DIR__ . '/../common.php';


if ($_POST) {

	$selfSigned = (bool)getenv('SELF_SIGNED_CERT');
	$client = new Client(['verify' => !$selfSigned]);

	/*
	detect if using Heroku Dyno, add dyno url to allow list for CORS
	this would not be used in production but is added as a convenience to accommodate Heroku domain names
	*/
	// if (getenv('DYNO') !== false && !file_exists('allow_url.tmp')) {
	// 	try {
	// 		$response = $client->request('POST', $commonData['ADMIN_URL'] . '/app/api.php', [
	// 			'auth'    => [$commonData['API_KEY'], $commonData['API_SECRET']],
	// 			'headers' => [
	// 				'User-Agent'  => 'BossInsightsApiClient/1.0',
	// 				'Accept'      => 'application/json',
	// 				'Account-Key' => $commonData['ACCOUNT_KEY']
	// 			],
	// 			'body'    => json_encode([
	// 				'action'      => 'allow_url',
	// 				'url'         => $commonData['SITE_URL'],
	// 				'environment' => $commonData['ENVIRONMENT']
	// 			], JSON_THROW_ON_ERROR)
	// 		]);
	// 	} catch (GuzzleException $e) {
	// 		echo $twig->render('error.twig', array_merge($commonData, [
	// 			'errorType'        => 'Error',
	// 			'errorName'        => 'failed to add Dyno domain to allow list',
	// 			'errorDescription' => 'error when communicating with admin api: ' . $e->getMessage()
	// 		]));
	// 		throw new Exception('failed to add Dyno domain to allow list');
	// 	}

	// 	if ($response->getStatusCode() !== 200) {
	// 		echo $twig->render('error.twig', array_merge($commonData, [
	// 			'errorType'        => 'Error',
	// 			'errorName'        => 'failed to add Dyno domain to allow list',
	// 			'errorDescription' => 'received status code ' . $response->getStatusCode() . ' when communicating with admin api'
	// 		]));
	// 		throw new Exception('failed to add Dyno domain to allow list');
	// 	}
	// 	if (!touch('allow_url.tmp')) {
	// 		echo $twig->render('error.twig', array_merge($commonData, [
	// 			'errorType'        => 'Error',
	// 			'errorName'        => 'failed to create file to indicate that allow list has been modified',
	// 			'errorDescription' => 'this may be caused because the script doesnt have filesystem write permissions to the project folder'
	// 		]));
	// 		throw new Exception('failed to create file to indicate that allow list has been modified');
	// 	}
	// }

	// validate input, send an API request to create account, store result in session, redirect to step 2
	$email = filter_var(strtolower(trim($_POST['email'])), FILTER_VALIDATE_EMAIL);
	$legalName = filter_var(preg_replace('/[^a-zA-Z0-9 ]/', '', trim($_POST['legalName']), FILTER_SANITIZE_FULL_SPECIAL_CHARS));
	try {
		$newPassword = bin2hex(random_bytes(32));
	} catch (Exception $e) {
		throw new Exception('failure to generate password');
	}

	// generate a unique account subdomain
	$subdomain = strtolower(substr(filter_var($legalName, FILTER_SANITIZE_URL), 0, 16)) . random_int(1, 99999);
	try {
		$response = $client->request('POST', $commonData['ADMIN_URL'] . '/app/api.php', [
			'auth'    => [$commonData['API_KEY'], $commonData['API_SECRET']],
			'headers' => [
				'User-Agent'  => 'BossInsightsApiClient/1.0',
				'Accept'      => 'application/json',
				'Account-Key' => $commonData['ACCOUNT_KEY']
			],
			'body'    => json_encode([
				'email_admin' => $email,
				'subdomain'   => $subdomain,
				'type'        => 'standard',
				'name'        => $legalName,
				'active'      => 1,
				'datashare'   => 1,
				'password'    => $newPassword
			], JSON_THROW_ON_ERROR)
		]);
	} catch (Exception $e) {
		throw new Exception('failed to communicate with admin api to provision a customer account');
	}
	$result = [];
	if ($response->getStatusCode() === 200) {
		$result = json_decode($response->getBody()->getContents(), true, 512, JSON_THROW_ON_ERROR);
		if ($result === null) {
			throw new Exception('invalid admin api response');
		}
	} else {
		throw new Exception('unable to communicate with admin api, unexpected response code');
	}

    setcookie('account_domain', $result['account_domain'], time() + (86400 * 30), "/");
    setcookie('subdomain', $_result['subdomain'], time() + (86400 * 30), "/");
    setcookie('account_key', $_result['account_key'], time() + (86400 * 30), "/");

	$accountDomain = $result['account_domain'];
	$subdomain = $result['subdomain'];
	$accountKey = $result['account_key'];
	$adminUrl = $result['admin_url'];

	$_SESSION['admin_email'] = $email;
	$_SESSION['legal_name'] = $legalName;
	$_SESSION['password'] = $newPassword;
	$_SESSION['account_domain'] = $accountDomain;
	$_SESSION['subdomain'] = $subdomain;
	$_SESSION['account_key'] = $accountKey;
	$_SESSION['admin_url'] = $adminUrl;

	header('Location: step2.php');
	exit;
}

header('Location: index.html');


