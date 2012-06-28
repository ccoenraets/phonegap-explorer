window.CompassView = Backbone.View.extend({

    initialize: function () {
        _.bindAll(this);
        this.render();
    },

    events: {
        "click .getBtn"             : "getHandler",
        "click .watchBtn"           : "watchHandler",
        "click .clearBtn"           : "clearHandler",
        "change #watchFrequency"    : "changeFrequency"
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },

    getHandler: function () {
        navigator.compass.getCurrentHeading(this.successHandler, this.errorHandler);
        return false;
    },

    watchHandler: function () {
        if (this.watchId) {
            showAlert('You are already watching', 'Compass')
        } else {
            this.geoWatchId = navigator.geolocation.watchPosition();
            this.watchId = navigator.compass.watchHeading(this.successHandler, this.errorHandler, { filter: 1 });
        }
        return false;
    },

    clearHandler: function () {
        if (this.watchId) {
            navigator.geolocation.clearWatch(this.geoWatchId);
            navigator.compass.clearWatch(this.watchId);
            delete(this.geoWatchId);
            delete(this.watchId);
        } else {
            showAlert('Nothing to clear', 'Compass');
        }
        return false;
    },

    changeFrequency: function () {
        if (this.watchId) {
            navigator.compass.clearWatch(this.watchId);
            delete(this.watchId);
            this.watchHandler();
        }
        return false;
    },

    successHandler: function (compassHeading) {
        $('#magneticHeading').html(compassHeading.magneticHeading);
        $('#trueHeading').html(compassHeading.trueHeading);
        $('#headingAccuracy').html(compassHeading.headingAccuracy);
        $('#headingTimestamp').html(compassHeading.timestamp);

        $("#compass").css({
            'transform': 'rotate(' + Math.round(compassHeading.magneticHeading) + 'deg)',
            '-moz-transform': 'rotate(42deg)',
            '-o-transform': 'rotate(42deg)',
            '-webkit-transform': 'rotate(' + Math.round(compassHeading.magneticHeading) + 'deg)'
        });
    },

    errorHandler: function (error) {
        showAlert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n', 'Error');
    },

    close: function() {
        if (this.watchId) {
            navigator.compass.clearWatch(this.watchId);
        }
        if (this.geoWatchId) {
            navigator.geolocation.clearWatch(this.geoWatchId);
        }
    }

});