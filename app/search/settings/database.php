<?php
	$database="sphider";
	$mysql_user = "webmaster_fgl";
	$mysql_password = "62391j#!j";
	$mysql_host = "http://fgl-sphider-db.cugdpksf2yw1.us-east-1.rds.amazonaws.com:3306";
	$mysql_table_prefix = "";



	$success = mysql_pconnect ($mysql_host, $mysql_user, $mysql_password);
	if (!$success)
		die ("<b>Cannot connect to database, check if username, password and host are correct.</b>");
    $success = mysql_select_db ($database);
	if (!$success) {
		print "<b>Cannot choose database, check if database name is correct.";
		die();
	}
?>

