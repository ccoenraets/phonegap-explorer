window.NotificationView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    events: {
        "click .jsAlertBtn"   : "jsAlertHandler",
        "click .alertBtn"   : "alertHandler",
        "click .confirmBtn" : "confirmHandler",
        "click .beepBtn"    : "beepHandler",
        "click .vibrateBtn" : "vibrateHandler"
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },

    jsAlertHandler: function() {
        alert('This is a default JavaScript alert');
        return false;
    },

    alertHandler: function() {
        var self = this;
        navigator.notification.alert(
            'You are the winner!',  // message
            function() {            // callback
                self.log("Alert dismissed");
            },
            'Game Over',            // title
            'Done'                  // button label
        );
        return false;
    },

    confirmHandler: function() {
        var self = this;
        navigator.notification.confirm(
            'You are the winner!',  // message
            function(button) {
                self.log("Confirm dismissed. You pressed button #: " + button);
            },
            'Game Over',            // title
            'Restart,Exit'          // buttons
        );
        return false;
    },

    beepHandler: function() {
        navigator.notification.beep(1);
        return false;
    },

    vibrateHandler: function() {
        navigator.notification.vibrate(1000);
        return false;
    },

    log: function(msg) {
        $('#log').val($('#log').val() + msg + "\r\n");
    }

});