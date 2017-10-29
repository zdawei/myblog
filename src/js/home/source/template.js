var TEMPLATE = {
    loginLayer : 
    '<div class="ui mini modal">'+
        '<div class="header">'+
            '用户登录'+
        '</div>'+
        '<div class="image content">'+
            '<form action="/aj/login" method="post">'+
                '<p>账号：<input name="name"></p>'+
                '<p>密码：<input name="password"></p>'+
                '<input type="submit" class="ui button">'+
            '</form>'+
        '</div>'+
    '</div>',
    registerLayer : 
    '<div class="ui mini modal">'+
        '<div class="header">'+
            '用户注册'+
        '</div>'+
        '<div class="image content">'+
            '<form action="/aj/register" method="post">'+
                '<p>账号：<input name="name"></p>'+
                '<p>密码：<input name="password"></p>'+
                '<input type="submit" class="ui button">'+
            '</form>'+
        '</div>'+
    '</div>'
};

export default TEMPLATE;