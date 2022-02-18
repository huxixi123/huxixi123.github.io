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
if(!isset($_POST['op']) || !isset($_POST['username'])  ){
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
//判断是添加操作
if($_POST['op']=='add'){
	$username = $_POST['username'];
	$password = $_POST['pass'];
	$flag=0;
	if($_POST['flag']=='on'){$flag=1;}
	$sql = "SELECT * FROM wh_admin WHERE username='".$username."'"; 
	$result = $pdo->query($sql); 
	if($result->rowcount()>0){
		$pdo = null;
		Common::outJson(1,'用户名已存在');
	}
	//更新
	$sql = "insert into wh_admin(username,password,realname,phone,flag,addtime,updatetime) values(?,?,?,?,?,?,?)";
	//准备sql模板
	$stmt = $pdo->prepare($sql);
	//绑定参数
	$stmt->bindValue( 1, $username );
	$stmt->bindValue( 2, $password );
	$stmt->bindValue( 3, $_POST['realname'] );
	$stmt->bindValue( 4, $_POST['phone'] );
	$stmt->bindValue( 5, $flag );
	$stmt->bindValue( 6, time() );
	$stmt->bindValue( 7, time() );
	//执行预处理语句
	$stmt->execute();
	$affect_row = $stmt->rowCount();
	//释放查询结果
	$stmt = null;
	//关闭连接
	$pdo = null;
	if ( $affect_row ) {
		Common::outJson(0,'操作成功'); 
	} else {
		Common::outJson(-1,'操作失败'); 
	}
}
//判断是修改操作
if($_POST['op']=='edit'){
	$username = $_POST['username'];
	//$password = $_POST['pass'];
	$flag=0;
	if($_POST['flag']=='on'){$flag=1;}
	//更新
	$sql = "update wh_admin set realname=?,phone=?,flag=?,updatetime=?,password=?  where username=?";
	if(empty($_POST['pass'])){
		$sql = "update wh_admin set realname=?,phone=?,flag=?,updatetime=? where username=?";
	}
	
	//准备sql模板
	$stmt = $pdo->prepare($sql);
	//绑定参数
	$stmt->bindValue( 1, $_POST['realname'] );
	$stmt->bindValue( 2, $_POST['phone'] );
	$stmt->bindValue( 3, $flag );
	$stmt->bindValue( 4, time() );
	if(!empty($_POST['pass'])){
		$stmt->bindValue( 5, $_POST['pass'] );
		$stmt->bindValue( 6, $username );
	}else{
		$stmt->bindValue( 5, $username );
	}
	//执行预处理语句
	$stmt->execute();
	$affect_row = $stmt->rowCount();
	//释放查询结果
	$stmt = null;
	//关闭连接
	$pdo = null;
	if ( $affect_row ) {
		Common::outJson(0,'操作成功'); 
	} else {
		Common::outJson(-1,'操作失败'); 
	}
}