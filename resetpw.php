<?php
require_once('db.php');

/*
 * 传递的参数
 * resetname=&resetmail=&resetphone=&resetpw1=&resetpw2=
 */
if(isset($_POST["resetname"])){
    $username=$_POST["resetname"];
    $email=$_POST["resetmail"];
    $pws=$_POST["resetpw2"];
    $phone=$_POST["resetphone"];
    echo $phone;
    echo $email."<br>";
    if(isrightdb($username,$email,$phone)){
            if(updatadb($username,$pws)){
                echo "恭喜您，重设密码成功!"."<br>";
                echo "登陆账号是：".$username."<br>";
                echo "密码是：".$pws."<br>";
            }
            else
                echo  "网络繁忙，数据提交失败！请返回再试！。";}
    else{
        echo "数据验证失败！！请重新尝试其他邮箱或手机！";
    }
}

function isrightdb($username,$email,$phone)
{
    $sql = "SELECT `tel`,`email` FROM `usertable` WHERE `uname`='$username'";
    $query = mysql_query($sql);
    $rows = mysql_num_rows($query);
    //var_dump($rows);
    if ($rows > 0) {
        //echo "用户名已存在";
        $row = mysql_fetch_array($query, MYSQL_NUM);
        $dbmail=$row[1];
        $dbphone=$row[0];
        echo $dbphone;
        echo $dbmail."<br>";

        if(($dbmail==$email)&&($dbphone==$phone))
        return TRUE;
        else return false;
    } else
        return false;
}

function updatadb($username,$pws){
    $sql="UPDATE `usertable` SET `password`='$pws' WHERE `uname`='$username'";
    $query=mysql_query($sql);
    //echo $sql."<br>";
    if(mysql_affected_rows()) {
        return true;
    }
    else
        return false;
}