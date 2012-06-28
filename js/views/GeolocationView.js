window.GeolocationView = Backbone.View.extend({

    initialize: function () {
        _.bindAll(this);
        this.render();
    },

    events: {
        "click .getBtn":            "getPosition",
        "click .watchBtn":          "watchPosition",
        "click .clearBtn":          "clearHandler",
        "change #watchFrequency":   "changeFrequency"
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },

    getPosition: function() {
        navigator.geolocation.getCurrentPosition(this.successHandler, this.errorHandler);
        return false;
    },

    watchPosition: function() {
        if (this.watchId) {
            showAlert('You are already watching', 'Geolocation')
        } else {
            this.watchId = navigator.geolocation.watchPosition(this.successHandler, this.errorHandler, { frequency: $('#watchFrequency').val() });
        }
        return false;
    },

    clearHandler: function () {
        if (this.watchId) {
            navigator.geolocation.clearWatch(this.watchId);
            delete(this.watchId);
        } else {
            showAlert('Nothing to clear', 'Geolocation');
        }
        return false;
    },

    changeFrequency: function () {
        if (this.watchId) {
            navigator.geolocation.clearWatch(this.watchId);
            delete(this.watchId);
            this.watchPosition();
        }
        return false;
    },

    successHandler: function(position) {
        $('#latitude').html(position.coords.latitude);
        $('#longitude').html(position.coords.longitude);
        $('#altitude').html(position.coords.altitude);
        $('#accuracy').html(position.coords.accuracy);
        $('#altitudeAccuracy').html(position.coords.altitudeAccuracy);
        $('#heading').html(position.coords.heading);
        $('#speed').html(position.coords.speed);
        $('#timestamp').html(new Date(position.timestamp));
    },

    errorHandler: function(error) {
        navigator.notification.alert(
            "Can't get your current location. Make sure the geolocation service is enabled for this app.",
            null,
            'Geolocation',
            'OK'
        );
    },

    close: function() {
        if (this.watchId) {
            navigator.geolocation.clearWatch(this.watchId);
        }
    }


});