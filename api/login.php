<?php
header('Access-Control-Allow-Origin:*');
spl_autoload_register(function($className){
    $arr = explode('\\',$className);
    include $arr[0].'/'.$arr[1].'.php';
});

use Core\Common;
//use Core\RedisService;
//use Core\MysqlHelper;
/**
if(!isset($_SERVER['HTTP_REFERER']) || $_SERVER['HTTP_REFERER']!='www.shuju.show'){
    Common::outJson(-1,'非法访问');
	exit;
}*/
//获取IP，及该IP第一次访问的时间戳，特定时间间隔内访问超过5次，锁定IP一分钟；
//创建token并存入redis，token对应的值为用户的id
/**
$config = Common::getConfig('redis');
$redis = RedisService::getInstance($config);
Common::outJson(-1,'请输入用户名和密码');
$ip=get_real_ip();
Common::outJson(-1,'请输入用户名和密码'.$ip);
if($redis->get($ip)){
	$pnum=$redis->get($ip);
	$redis->set($ip,$pnum+1,60);
	if($pnum>50){
		Common::outJson(-1,'访问过于频繁');
		exit;
	}
}else{
	$redis->set($ip,1,60);//过期时间1分钟
}
*/

if(!isset($_POST['username']) || !isset($_POST['password'])  ){
    Common::outJson(-1,'请输入用户名和密码');
}
$username = $_POST['username'];
$pwd = $_POST['password'];
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

$sql = "SELECT * FROM wh_admin WHERE username='".$username."' and password='".$pwd."' and flag=1"; 
$result = $pdo->query($sql); 
if($result->rowCount() <= 0){
	Common::outJson(-1,'用户名或密码错误');
}
$row = $result->fetchAll();
$uid = $row[0]['id'];
$token = Common::createToken($uid);
$key = "token:".$token;
//$redis->set($key,$uid,28800);//过期时间8小时
$data['token'] = $token;
$data['uid'] = $uid;
$data['uname'] = $row[0]['username'];
$pdo=null;
Common::outJson(0,'登录成功',$data); 

//获取客户端IP
function get_real_ip(){
$ip=false;
if(!empty($_SERVER["HTTP_CLIENT_IP"])){
 $ip = $_SERVER["HTTP_CLIENT_IP"];
}
if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
 $ips = explode (", ", $_SERVER['HTTP_X_FORWARDED_FOR']);
 if ($ip) { array_unshift($ips, $ip); $ip = FALSE; }
 for ($i = 0; $i < count($ips); $i++) {
  if (!eregi ("^(10│172.16│192.168).", $ips[$i])) {
   $ip = $ips[$i];
   break;
  }
 }
}
return ($ip ? $ip : $_SERVER['REMOTE_ADDR']);
}