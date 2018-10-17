var register = (function(){

    return {
        init: function(ele) {
            // 获取form表单
            this.$ele = document.querySelector(ele);
            // 获取提交按钮
            this.$loginBtn = this.$ele['login-btn'];
            this.$usernameInp = this.$ele['username'];
            this.$passwordInp = this.$ele['password'];
            this.$userH5 = this.$ele.querySelector('.small_font');
            this.$passH5 = this.$ele.querySelector('.big_font');
            this.event();
        },
        event: function() {
            var _this = this;
            this.$passwordInp.onchange = function(){
          		var reg = /^[a-zA-Z0-9]{6,20}$/;
				if(reg.test(_this.$passwordInp.value)){
          		_this.$passH5.style.display = "none";
         	}
          	else{
          		_this.$passH5.style.display = "block";
         	} 
          },
            // 注册按钮
            this.$loginBtn.onclick = function() {
                // 发送ajax，验证用户名和密码
                var params = {
                    method: 'post',
                    data: {
                        username: _this.$usernameInp.value,
                        password: _this.$passwordInp.value
                    },
                    success: function(data) {
                        data = JSON.parse(data);    
                        _this.loginSuccess(data);
                    }
                }
                sendAjax('http://localhost:8088/xiaomish/php/zhuce.php', params);
            }
            this.$usernameInp.onchange = function(){
            	var reg = /^[a-zA-Z0-9]\w{3,9}$/;
				if(reg.test(_this.$usernameInp.value)){
            		_this.$userH5.style.display = "none";
            	}
            	else{
            		_this.$userH5.style.display = "block";
            	}        
                var params = {
                    data: {
                        username: _this.$usernameInp.value
                    },
                    success: function(data) {
                        data = JSON.parse(data);
                        _this.checkName(data);
                    }
                }
                sendAjax('http://localhost:8088/xiaomish/php/zhuceconnect_db.php', params);
            }
        },
        checkName: function(data) {
            if(data.code == 200) {
                // 用户名称不存在
              
            } else {
                // 用户名称存在
            }
        },
        loginSuccess: function(data) {
            if(data.code == 200) {
                location.href = 'denglu.html';
            } else {
                alert(data.msg);
            }
        }
    }

}())
