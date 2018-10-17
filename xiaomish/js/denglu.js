
var login = (function(){
    return {
        init: function(ele) {
            // 获取form表单
            this.$ele = document.querySelector(ele);
            // 获取提交按钮
            this.$usernameInp =this.$ele['username'];
            this.$passwordInp =this.$ele['password'];
            this.$loginBtn = this.$ele['btn'];
            this.event();
        },
        event: function() {
            var _this = this;
            // 提交按钮
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
                sendAjax('http://localhost:8088/xiaomish/php/denglu.php', params);
            }
        },
        loginSuccess: function(data) {
            if(data.code == 200) {
            	console.log(data);
                document.cookie = "user-id=" + data.data.id;
                document.cookie = "token=" + data.data.token;
                localStorage.userImg = data.data.ataver;
                location.href = 'shouye.html';
            } else {
                alert(data.msg);
            }
        }
    }

}())
