<?php
/*
验证函数，如果获取到第二个密码，即做写入数据库验证
如果没有，就执行登录验证账号密码一直即可通过
有些基础的已经在前台实现所以后台不需要再验证
sname=ewqeqw&spd=ewqeqw
*/


//获取传递的密码参数
require_once('db.php');




    //echo $loginpassword;
    $loginusername=$_POST["sname"];
    $loginpassword=$_POST["spd"];
    //echo $loginpassword;
    //echo $loginusername;
    if($loginpassword) {
        if (isrightpw($loginusername, $loginpassword))
            echo "密码正确，登陆成功！";
        else{
            echo "密码错误，登陆失败";
            usleep(2000000);
            header("location:loginerror.html");
            }
    }


//check password && username

function isrightpw($username,$password)
{
    $sql="SELECT `password` FROM `usertable` WHERE `uname`='$username'";
    //echo $sql;
    $query=mysql_query($sql);
    $rows = mysql_num_rows($query);
      
    if($rows > 0){
        //echo "big 0";
        $row = mysql_fetch_array($query, MYSQL_NUM);  
        if($row[0]==$password)
            return TRUE;
    }else{return FALSE;}
}