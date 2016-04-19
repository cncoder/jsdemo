//创建ajax引擎
	function getXmlHttpObject(){
		var xmlHttpRequset;
		//不同的浏览器获取对象xmlhttprequest对象的方法不一样
		if(window.ActiveXObject){
			
			xmlHttpRequest=new ActiveXObject("Microsoft.XMLHTTP");


		}else{


			xmlHttpRequest=new XMLHttpRequest();
		}
		return xmlHttpRequest;
	
	}

	var myXmlHttpRequest;

	//验证用户名是否存在
	function checkName(){

		myXmlHttpRequest=getXmlHttpObject();
		//判断创建ok
		if(myXmlHttpRequest){

			
			var url="../register1.php";
			
			var data = "username="+$('username').value
		
			myXmlHttpRequest.open("post",url,true);
			

			myXmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");// 在AJAX往服务器上传数据是，设置了content-type为application/x-www-form-urlencoded，此时是对整个发 送内容作了编码，并不是对名字对应的值做了编码

			
			myXmlHttpRequest.onreadystatechange=chuli;

			
			myXmlHttpRequest.send(data);



		}


	}
	//回调函数

	function chuli(){
		
		if(myXmlHttpRequest.readyState==4){

			var mes=myXmlHttpRequest.responseText;
			
			var mes_obj=eval("("+mes+")");

			$("myres").value=mes_obj.res;

		}



	}

	function $(id){

		return document.getElementById(id);

	}