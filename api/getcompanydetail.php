<?php
//header('Access-Control-Allow-Origin:*');
spl_autoload_register(function($className){
    $arr = explode('\\',$className);
    include $arr[0].'/'.$arr[1].'.php';
});

use Core\Common;

if(!isset($_GET['id'])){
    Common::outJson(-1,'参数错误');
}
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
$page = $_GET['page'];//当前页
$psize = $_GET['limit'];//每页条数
$offset = ($page - 1)*$psize;//计算偏移量
$total=0;//总条数
$sql = "SELECT * FROM wh_company_attr WHERE com_id=".$_GET['id']; 
$result = $pdo->query($sql);
$total=$result->rowCount();
$sql = "SELECT * FROM wh_company_attr WHERE com_id=".$_GET['id']." limit $offset,$psize"; 
$result = $pdo->query($sql); 
$rows = $result->fetchAll();
$pdo=null;
Common::outJson2(0,'操作成功',$total,$rows); 