<?php
//header('Access-Control-Allow-Origin:*');
spl_autoload_register(function($className){
    $arr = explode('\\',$className);
    include $arr[0].'/'.$arr[1].'.php';
});

use Core\Common;

//连接数据库，验证身份
$pdo=NULL;
$ini= parse_ini_file("wh.ini");
$severname=$ini["servername"];
$dbname=$ini["dbname"];
$dbuser=$ini["username"];
$dbpwd=$ini["password"];
try {
	$pdo = new PDO("mysql:host=$severname;dbname=$dbname","$dbuser","$dbpwd");
} catch (Exception $e) {
	Common::outJson(-1,'连接DB失败'); 
}
if(!isset($_POST['id'])){
	$pdo=null;
    Common::outJson(-1,'参数错误');
}
	$id=$_POST['id'];
	$sql = "SELECT * FROM wh_admin WHERE id=".$id;
	$result = $pdo->query($sql); 
	$row = $result->fetchAll();
	$pdo=null;
	Common::outJson(0,'操作成功',$row);