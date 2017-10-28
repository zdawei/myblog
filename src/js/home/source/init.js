import template from './template';

export default function () {
    var $ = jQuery;

    $('#login_home').click(function(evt) {
        $('body').append(template.loginLayer);
        $('.mini.modal').modal({
            onHidden : function() {
                this.remove();
            }
        }).modal('show');;
    });

    $('#register_home').click(function(evt) {
        $('body').append(template.registerLayer);
        $('.mini.modal').modal({
            onHidden : function() {
                this.remove();
            }
        }).modal('show');;
    });

}