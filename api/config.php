<?php

return [
    //redis的配置
    'redis' => [
        'host' => '127.0.0.1',
        'port' => '6379',
        'auth' => '',
        'db_id' => 0,//redis的第几个数据库仓库
    ],
    //是否开启接口校验，true开启，false，关闭
    'checkApi'=>false,
    //加密sign的盐值
    'apiSerect'=>'wfc_redis'
];