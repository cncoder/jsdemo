jQuery(document).ready(function($){
	var $form_modal = $('.cd-user-modal'),
		$form_login = $form_modal.find('#cd-login'),
		$form_signup = $form_modal.find('#cd-signup'),
		$form_forgot_password = $form_modal.find('#cd-reset-password'),
		$form_modal_tab = $('.cd-switcher'),
		$tab_login = $form_modal_tab.children('li').eq(0).children('a'),
		$tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
		$forgot_password_link = $form_login.find('.cd-form-bottom-message a'),
		$back_to_login_link = $form_forgot_password.find('.cd-form-bottom-message a'),
		$main_nav = $('.main-nav');

	//open modal
	$main_nav.on('click', function(event){

		if( $(event.target).is($main_nav) ) {
			// on mobile open the submenu
			$(this).children('ul').toggleClass('is-visible');
		} else {
			// on mobile close submenu
			$main_nav.children('ul').removeClass('is-visible');
			//show modal layer
			$form_modal.addClass('is-visible');	
			//show the selected form
			( $(event.target).is('.cd-signup') ) ? signup_selected() : login_selected();
		}

	});

	//close modal
	$('.cd-user-modal').on('click', function(event){
		if( $(event.target).is($form_modal) || $(event.target).is('.cd-close-form') ) {
			$form_modal.removeClass('is-visible');
		}	
	});
	//close modal when clicking the esc keyboard button
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$form_modal.removeClass('is-visible');
	    }
    });

	//switch from a tab to another
	$form_modal_tab.on('click', function(event) {
		event.preventDefault();
		( $(event.target).is( $tab_login ) ) ? login_selected() : signup_selected();
	});

	//hide or show password
	$('.hide-password').on('click', function(){
		var $this= $(this),
			$password_field = $this.prev('input');
		
		( 'password' == $password_field.attr('type') ) ? $password_field.attr('type', 'text') : $password_field.attr('type', 'password');
		( 'Hide' == $this.text() ) ? $this.text('Show') : $this.text('Hide');
		//focus and move cursor to the end of input field
		$password_field.putCursorAtEnd();
	});

	//show forgot-password form 
	$forgot_password_link.on('click', function(event){
		event.preventDefault();
		forgot_password_selected();
	});

	//back to login from the forgot-password form
	$back_to_login_link.on('click', function(event){
		event.preventDefault();
		login_selected();
	});

	function login_selected(){
		$form_login.addClass('is-selected');
		$form_signup.removeClass('is-selected');
		$form_forgot_password.removeClass('is-selected');
		$tab_login.addClass('selected');
		$tab_signup.removeClass('selected');
	}

	function signup_selected(){
		$form_login.removeClass('is-selected');
		$form_signup.addClass('is-selected');
		$form_forgot_password.removeClass('is-selected');
		$tab_login.removeClass('selected');
		$tab_signup.addClass('selected');
	}

	function forgot_password_selected(){
		$form_login.removeClass('is-selected');
		$form_signup.removeClass('is-selected');
		$form_forgot_password.addClass('is-selected');
	}

	//show error messages 
                $form_login.find('input[name="sname"]').blur(function(event){
                    event.preventDefault();
                    var text=this.value;
                    $.post("action.php", { loginusername:text},
                    function(data){
                    if(data){
                        $form_login.find('input[name="sname"]').toggleClass('has-error').next('span').toggleClass('is-visible');
                        $form_login.find('input[name="sname"]').focus();}
                        else
                        $form_login.find('input[name="sname"]').removeClas('has-error').next('span').removeClass('is-visible');
            });
                        
            });
            
            //check password
            /*
                    $form_login.find('input[name="spd"]').blur(function(event){
                        event.preventDefault();
                        var log=$form_login.find('input[name="sname"]').value;
                        var pw=$form_login.find('input[name="spd"]').value;
                        $.post("dbhelp.php", { loginusername:log , loginpassword:pw},
                        function(data){
                        if(!data){
                            alert("密码错误！！")}
                            else
                            alert("密码正确，登陆成功！");
                });     
                    });
                */
                
            //sign check username
            $form_signup.find('input[name="signun"]').blur(function(event){
                
                event.preventDefault();
                var text=this.value;
                if (text=="") {
                    $form_signup.find('input[name="signun"]').toggleClass('has-error').next('span').toggleClass('is-visible');
                    //$form_signup.find('input[name="signun"]').focus();
                    return ;
                }
                $.post("action.php", { loginusername:text},
                function(data){
                if(!data){
                    $form_signup.find('input[name="signun"]').toggleClass('has-error').next('span').toggleClass('is-visible');
                    //$form_signup.find('input[name="signun"]').focus();
                    }
                    else
                       $form_signup.find('input[name="signun"]').toggleClass('has-error').next('span').removeClass('is-visible');
            });            
            });
            
            
            //sign check email
            $form_signup.find('input[name="sgemail"]').blur(function(event){
                event.preventDefault();
                var text=this.value;
                var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
                //判断
                if(!reg.test(text)){
                   $form_signup.find('input[name="sgemail"]').toggleClass('has-error').next('span').toggleClass('is-visible');
                   //$form_signup.find('input[name="sgemail"]').focus();
                   }
                    else
                       $form_signup.find('input[name="sgemail"]').removeClass('has-error').next('span').removeClass('is-visible');          
            }); 
            
            //check password length $form_signup.find('input[name="pw1"]').focus();
             $form_signup.find('input[name="pw1"]').blur(function(event){
                event.preventDefault();
                var text=this.value;
                
                //判断
                if(text.length<8){
                    $form_signup.find('input[name="pw1"]').toggleClass('has-error').next('span').toggleClass('is-visible');
                   }
                    else
                       $form_signup.find('input[name="pw1"]').toggleClass('has-error').next('span').removeClass('is-visible');          
            }); 

            //check password is the same  error
            
             $form_signup.find('input[name="pw2"]').blur(function(event){
                event.preventDefault();
                var pw2=this.val();
                
                var pw1=$form_signup.find('input[name="pw1"]:password');
                //判断
                if(!(pw1==pw2)){
                    $form_signup.find('input[name="pw2"]').toggleClass('has-error').next('span').toggleClass('is-visible');
                   }
                    else
                       $form_signup.find('input[name="pw2"]').toggleClass('has-error').next('span').removeClass('is-visible');          
            }); 
            
            
            // check email
            $form_signup.find('input[name="resetmail"]').blur(function(event){
                event.preventDefault();
                var text=this.value;
                var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
                //判断
                if(!reg.test(text)){
                    $form_signup.find('input[name="resetmail"]').toggleClass('has-error').next('span').toggleClass('is-visible');
                   //$form_signup.find('input[name="resetmail"]').focus();
                   }
                    else
                       $form_signup.find('input[name="resetmail"]').toggleClass('has-error').next('span').removeClass('is-visible');          
            }); 
            
            //check phone
            $form_signup.find('input[name="phone"]').blur(function (event) {
                event.preventDefault();
                var text = this.value;
                var mob = $.trim(text);

                if (mob == "") {
                    alert("手机号码不能为空！");
                    return false;
                }
                var reg = /^1[3458]\d{9}$/;

                if (!(reg.test(mob))) {
                    $form_signup.find('input[name="phone"]').toggleClass('has-error').next('span').toggleClass('is-visible');
                    //$form_signup.find('input[name="phone"]').focus();
                }
                else
                    $form_signup.find('input[name="phone"]').toggleClass('has-error').next('span').removeClass('is-visible');
            }); 
            
            
            //check new address
            $form_signup.find('input[name="sgaddress"]').blur(function (event) {
                event.preventDefault();
                var text = this.value;
                if (text == "") {
                    $form_signup.find('input[name="sgaddress"]').toggleClass('has-error').next('span').toggleClass('is-visible');
                    //$form_signup.find('input[name="sgaddress"]').focus();
                }
                else
                    $form_signup.find('input[name="sgaddress"]').toggleClass('has-error').next('span').removeClass('is-visible');
            }); 
            
            //check verit code
            $form_signup.find('input[name="vertif"]').blur(function (event) {
                event.preventDefault();
                var text = this.value;
                if (!validateCode()) {
                    $form_signup.find('input[name="vertif"]').toggleClass('has-error').next('span').toggleClass('is-visible');
                    //$form_signup.find('input[name="vertif"]').focus();
                }
                else
                    $form_signup.find('input[name="vertif"]').toggleClass('has-error').next('span').removeClass('is-visible');
            }); 
	

            //reset password  $form_forgot_password
               //check isset username
               $form_forgot_password.find('input[name="resetname"]').blur(function(event){
                    event.preventDefault();
                    var text=this.value;
                    $.post("action.php", { loginusername:text},
                    function(data){
                    if(data){
                        $form_forgot_password.find('input[name="resetname"]').next('span').toggleClass('is-visible');
                        //$form_forgot_password.find('input[name="resetname"]').focus();
                        }
                        else
                        $form_forgot_password.find('input[name="resetname"]').next('span').removeClass('is-visible');
            });
                        
            });
            
            //check right email
             $form_forgot_password.find('input[name="resetmail"]').blur(function(event){
                event.preventDefault();
                var text=this.value;
                var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
                //判断
                if(!reg.test(text)){
                   $form_forgot_password.find('input[name="resetmail"]').toggleClass('has-error').next('span').toggleClass('is-visible');
                   //$form_forgot_password.find('input[name="resetmail"]').focus();
                   }
                    else
                       $form_forgot_password.find('input[name="resetmail"]').toggleClass('has-error').next('span').removeClass('is-visible');          
            }); 
            
            //check right tel
            $form_forgot_password.find('input[name="resetphone"]').blur(function(event){
                event.preventDefault();
                var text = this.value;
                var mob = $.trim(text);

                if (mob == "") {
                    alert("手机号码不能为空！");
                    return false;
                }
                var reg = /^1[3458]\d{9}$/;

                if (!(reg.test(mob))) {
                    $form_forgot_password.find('input[name="resetphone"]').toggleClass('has-error').next('span').toggleClass('is-visible');
                    $form_forgot_password.find('input[name="resetphone"]').focus();
                }
                else
                    $form_forgot_password.find('input[name="resetphone"]').toggleClass('has-error').next('span').removeClass('is-visible');       
            }); 
            
            //check right password $form_forgot_password.find('input[name="resetpw1"]').focus();
            $form_forgot_password.find('input[name="resetpw1"]').blur(function(event){
                event.preventDefault();
                var text=this.value;
                
                //判断
                if(text.length<8){
                    $form_forgot_password.find('input[name="resetpw1"]').toggleClass('has-error').next('span').toggleClass('is-visible');
                    
                   }
                    else
                       $form_forgot_password.find('input[name="resetpw1"]').toggleClass('has-error').next('span').removeClass('is-visible');         
            }); 
            
});


