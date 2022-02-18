<?php
namespace Core;

class MysqlHelper{
	public $db_url;  //连接地址
	public $db_username;  //连接名
	public $db_userpassword;  //连接密码
	public $db_name;  //数据库名
	public $db_tablename;  //表名
	public $db_conn;  //数据库连接
	public $db_order;
	public $db_limit;
	
	public function db_getconn(){  //连接数据库
		$this->db_conn= mysql_connect($this->db_url,$this->db_username,$this->db_userpassword);
		if (!$this->db_conn)
		{
			die('Could not connect: ' . mysql_error());
		}
		mysql_select_db($this->db_name, $this->db_conn);
	}
	
	public function __construct($db_url,$db_username,$db_userpassword,$db_name){  //构造方法赋值
		$this->db_url=$db_url;
		$this->db_username=$db_username;
		$this->db_userpassword=$db_userpassword;
		$this->db_name=$db_name;
		$this->db_order="";
		$this->db_limit="";
		$this->db_getconn();
	}
	
	public function db_settablename($db_tablename){  //设置表名
		$this->db_tablename=$db_tablename;
	}	
	
	public function  db_setorder($str){  //排序操作
		$this->db_order="order by $str";	
	}
	
	public function  db_setlimit($start,$end){  //分页操作
	  $this->db_limit="limit $start,$end";
	}
	
	public function db_select($typearr="",$where=""){  //查询操作
		if(empty($typearr)){			
			$typearr="*";
		}		
		else{			
			$typearr=implode(",",$typearr);			
		}
		if(empty($where)){			
			$where="";
		}else{			
			$where="where ".$where;
		}		
		$arr=array();
		$sql="select $typearr from $this->db_tablename  $where $this->db_order $this->db_limit ";
		$result = mysql_query($sql);		
		while($row = mysql_fetch_row($result))		{
			
			$arr[]=$row;
		}
		return $arr;
	}
	
	public function db_update($typearr,$valuearr,$where=""){ //更新操作
        $sql="";
		if(empty($where)){
			$where="";
		}else{
			$where=" where ".$where;
		}
		$sql.="update $this->db_tablename set ";
		 foreach ($typearr as $key=>$value){
		 	if(count($typearr)-1==$key){
		 		
		 		$sql.=$value."='".$valuearr[$key]."'";
		 	}else{
		 		
		 		$sql.=$value."='".$valuearr[$key]."'".",";
		 	}
		 }
		$sql.=$where;
		mysql_query($sql);	
	}
	
	public function db_delete($typestr,$valuestr){  //删除操作
        $sql="delete from $this->db_tablename WHERE $typestr=$valuestr";
        mysql_query($sql);
	}
	
	public function db_insert($typearr,$valuearr){  //插入操作
		$sql="insert into $this->db_tablename(".implode(",", $typearr).") values(".implode(",", $valuearr).")";
		mysql_query($sql);
	}
	
	public function __destruct(){  //析构方法关闭连接
		mysql_close($this->db_conn);
	}
}

