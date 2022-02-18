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

if(!isset($_POST['username']) || !isset($_POST['password'])  ){
    Common::outJson(-1,'请输入用户名和密码');
}
$username = $_POST['username'];
$password = $_POST['password'];
$oldpwd = $_POST['oldpwd'];
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

$sql = "SELECT * FROM wh_admin WHERE username='".$username."' and password='".$oldpwd."'"; 
$result = $pdo->query($sql); 
if($result->rowcount()<=0){
	Common::outJson(-1,'旧密码错误');
}
//更新
$sql = "update wh_admin set password=? where username=?";
//准备sql模板
$stmt = $pdo->prepare($sql);
//绑定参数
$stmt->bindValue( 1, $password );
$stmt->bindValue( 2, $username );
//执行预处理语句
$stmt->execute();
$affect_row = $stmt->rowCount();
//释放查询结果
$stmt = null;
//关闭连接
$pdo = null;
if ( $affect_row ) {
	Common::outJson(0,'修改成功'); 
} else {
	Common::outJson(-1,'修改失败'); 
}