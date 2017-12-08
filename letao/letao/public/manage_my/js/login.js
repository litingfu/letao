$(function () {
    //使用表单校验插件
    $('form').bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-heart',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 20,
                        message: '用户名长度必须在6到20之间'
                    },
                    callback: {
                        message: '用户名错误'
                    }
                }
            },
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 16,
                        message: '用户名长度必须在6到16之间'
                    },
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        }

    }).on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        //console.log('表单格式已经验证成功，准备ajax提交啦！')
        $.ajax({
            url:'/employee/employeeLogin',
            data:$('form').serialize(),
            type:'post',
            success:function(backDate){
                //console.log(backDate);
                //会有1000和1001的error返回
                var validator = $("form").data('bootstrapValidator');  //获取表单校验实例
                if(backDate.success){
                    /*要注意这个js已经引入到login.html页面
                    所以等于在login.html这一级，不用再回到上级*/
                    window.location.href='index.html'
        
                }else{
                    if(backDate.error==1000){
                        validator.updateStatus('username', 'INVALID', 'callback');
                    }else if(backDate.error==1001){
                        validator.updateStatus('password', 'INVALID', 'callback');
                    }
                }
            }
        })
    });


    //3.为重置表单绑定点击事件
    $('button[type=reset]').click(function(){
        //获取验证插件对象
        var validator = $("form").data('bootstrapValidator');  //获取表单校验实例 
        validator.resetForm();//重置表单，并且会隐藏所有的错误提示和图标
    })


})