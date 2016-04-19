<?php
/*
验证函数，如果获取到第二个密码，即做写入数据库验证
如果没有，就执行登录验证账号密码一直即可通过
有些基础的已经在前台实现所以后台不需要再验证
*/

	require_once('db.php');
//获取传递的密码参数


	if (isset($_POST["loginpassword"])){
        //echo $loginpassword;
        $loginusername=$_POST["loginusername"];
    $loginpassword=$_POST["loginpassword"];
        if(empty($loginpassword)) {
            if (isrightpw($loginusername, $loginpassword))
                echo TRUE;
            else
                echo FALSE;
        }
    }
    else{
        //echo "right";
    $loginusername=$_POST["loginusername"];}




//判断是否有这个账号

        if ((!isusername($loginusername))||($loginusername == ""))
            echo TRUE;
        else
            echo FALSE;




//检查数据库是否已经存在某个用户名
function isusername($username)
{
    $sql = "SELECT uname FROM usertable WHERE uname='$username'";
    //echo $sql;
    $query = mysql_query($sql);
    $rows = mysql_num_rows($query);
    //var_dump($rows);
    if ($rows > 0) {
        //echo "用户名已存在";
        return TRUE;
    } else
        return FALSE;
}

//check password && username

function isrightpw($username,$password)
{
    $sql="SELECT password FROM usertable WHERE uname='$username'";
         //echo $sql;
            $query=mysql_query($sql);
            $rows = mysql_fetch_row($query);

            if($rows > 0){
                echo "big 0";
                if($rows[0]==$password)
                return TRUE;
            }else{return FALSE;}
}

