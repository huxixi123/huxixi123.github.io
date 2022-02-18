<?php
header('Access-Control-Allow-Origin:*');
spl_autoload_register(function($className){
    $arr = explode('\\',$className);
    include $arr[0].'/'.$arr[1].'.php';
});

use Core\Common;

/**
if(!isset($_SERVER['HTTP_REFERER']) || $_SERVER['HTTP_REFERER']!='www.shuju.show'){
    Common::outJson(-1,'非法访问');
	exit;
}*/

if(!isset($_POST['username']) || !isset($_POST['password'])  ){
    Common::outJson(-1,'请输入用户名和密码');
}
$username = $_POST['username'];
$pwd = $_POST['password'];
//连接数据库，验证身份
$ini= parse_ini_file("wh.ini");
$conn=NULL;
try {
	$conn = new PDO('mysql:host=$ini["servername"];dbname=$ini["dbname"]', '$ini["username"]', '$ini["password"]');
} catch (Exception $e) {
	Common::outJson(-1,'连接DB失败'); 
}

$sql = "SELECT * FROM wh_admin WHERE username='".$username."' and password='".$pwd."'"; 
$result = $conn->query($sql); 
if($result->rowcount()<=0){
	Common::outJson(-1,'旧密码错误');
}
//更新
$sql = "update dunling_chat set nicheng=? where id=?";
//准备sql模板
$stmt = $pdo->prepare( $sql );
$name = 'one';
$age = 1;
//绑定参数
$stmt->bindValue( 1, $name );
$stmt->bindValue( 2, $age );
//执行预处理语句
$stmt->execute();
$affect_row = $stmt->rowCount();
if ( $affect_row ) {
echo '更新成功' . '<br>';
} else {
echo '更新失败' . '<br>';
}
//释放查询结果
$stmt = null;
//关闭连接
$pdo = null;

Common::outJson(0,'登录成功',$data); 