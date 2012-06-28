window.EventsView = Backbone.View.extend({

    initialize: function () {
        _.bindAll(this);
        var self = this;
        this.render();

        this.logListener("pause");
        document.addEventListener("pause", this.pauseHandler, false);
        this.logListener("resume");
        document.addEventListener("resume", this.resumeHandler, false);
        this.logListener("online");
        document.addEventListener("online", this.onlineHandler, false);
        this.logListener("offline");
        document.addEventListener("offline", this.offlineHandler, false);
        this.logListener("batterystatus");
        document.addEventListener("batterystatus", this.batterystatusHandler, false);
        this.logListener("batterylow");
        document.addEventListener("batterylow", this.batterylowHandler, false);
        this.logListener("batterycritical");
        document.addEventListener("batterycritical", this.batterycriticalHandler, false);
        this.logListener("startcallbutton");
        document.addEventListener("startcallbutton", this.startcallHandler, false);
        this.logListener("endcallbutton");
        document.addEventListener("endcallbutton", this.endcallHandler, false);
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },

    log: function(msg) {
        $('#log').val($('#log').val() + msg + "\r\n");
    },

    logListener: function(name) {
        this.log('Adding event listener "' + name + '"');
    },

    pauseHandler: function() {
        this.log('pause');
    },

    resumeHandler: function() {
        this.log('resume');
    },

    onlineHandler: function() {
        this.log('online');
    },

    offlineHandler: function() {
        this.log('offline');
    },

    batterystatusHandler: function() {
        this.log('batterystatus');
    },

    batterylowHandler: function() {
        this.log('batterylow');
    },

    batterycriticalHandler: function() {
        this.log('batterycritical');
    },

    startcallHandler: function() {
        this.log('startcall');
    },

    endcallHandler: function() {
        this.log('endcall');
    },

    close: function() {
        document.removeEventListener('pause', this.pauseHandler);
        document.removeEventListener('resume', this.resumeHandler);
        document.removeEventListener('online', this.onlineHandler);
        document.removeEventListener('offline', this.offlineHandler);
        document.removeEventListener('batterystatus', this.batterystatusHandler);
        document.removeEventListener('batterylow', this.batterylowHandler());
        document.removeEventListener('batterycritical', this.batterycritical);
        document.removeEventListener('startcall', this.startcall);
        document.removeEventListener('endcall', this.endcall);
    }

});
