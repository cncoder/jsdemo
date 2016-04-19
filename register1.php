<?php

require_once('db.php');
//获取传递的密码参数
/*
 * signun=eqwe&sgemail=eqwewq%40da.gdf&
 * pw1=dasddasdadasdas&pw2=dasdasdasdasdsa&phone=13800138000&
 * sgaddress=服务方式&vertif=y6m72v#
 */
if(isset($_POST["sgaddress"])){
    $username=$_POST["signun"];
    $email=$_POST["sgemail"];
    $pws=$_POST["pw2"];
    $phone=$_POST["phone"];
    $address=$_POST["sgaddress"];
    echo $address;
    if(insertdb($username,$pws,$phone,$email,$address)){
        echo "恭喜您，注册成功!"."<br>";
        echo "登陆账号是：".$username."<br>";
        echo "密码是：".$pws."<br>";
    }
    else
        echo  "网络繁忙，数据提交失败！请重新注册。";
}

function insertdb($username,$pws,$phone,$email,$address){
    $sql="INSERT INTO `usertable`( `uname`, `password`, `tel`, `email`, `adress`)
            VALUES ('$username','$pws','$phone','$email','$address')";
    $query=mysql_query($sql);
    //echo $sql."<br>";
    if(mysql_affected_rows()) {
        return true;
    }
    else
        return false;
}