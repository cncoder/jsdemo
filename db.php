<?php
	$conn = mysql_connect("localhost","root","");
	if(!$conn){
		die('mysql数据库连接失败！'.mysql_error());
	}
	mysql_select_db('user',$conn);
	mysql_query("set names utf8");
?>