<?php
header('Access-Control-Allow-Origin:*');
spl_autoload_register(function($className){
    $arr = explode('\\',$className);
    include $arr[0].'/'.$arr[1].'.php';
});

use Core\Common;

/**
if(!isset($_SERVER['HTTP_REFERER']) || $_SERVER['HTTP_REFERER']!='wh.shuju.show'){
    Common::outJson(-1,'非法访问');
	exit;
}*/

if(!isset($_POST['id'])){
    Common::outJson(-1,'参数错误');
}
$cid = $_POST['id'];
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
try{
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$pdo->beginTransaction();
	
	$sql0 = "delete from wh_company_attr where com_id=?";
	$stmt0 = $pdo->prepare($sql0);
	$stmt0->bindValue( 1, $cid );
	$stmt0->execute();
	//删除
	$sql = "delete from wh_companyinfo where id=?";
	//准备sql模板
	$stmt = $pdo->prepare($sql);
	//绑定参数
	$stmt->bindValue( 1, $cid );
	//执行预处理语句
	$stmt->execute();
	//$affect_row = $stmt->rowCount();
	//释放查询结果
	//$stmt = null;
	$pdo->commit();
	$pdo=null;
	Common::outJson(0,'删除成功'); 
} catch (Exception $e) {
	$pdo->rollBack();
	$pdo=null;
	Common::outJson(-1,'删除失败'); 
}