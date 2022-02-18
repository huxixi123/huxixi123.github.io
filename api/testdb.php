<?php

$db = new PDO('mysql:host=rm-uf6507931vxyjxb02ko.mysql.rds.aliyuncs.com;dbname=tlu_whcy', 'tluwfc', '@tlxydsj2020');

try {

    foreach ($db->query('select * from wh_companyinfo') as $row){

    print_r($row);

    }

    $db = null; //关闭数据库

} catch (PDOException $e) {

    echo $e->getMessage();

}
?>