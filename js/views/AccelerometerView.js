window.AccelerometerView = Backbone.View.extend({

    initialize: function () {
        _.bindAll(this);
        this.render();
    },

    events: {
        "click .getBtn":            "getHandler",
        "click .watchBtn":          "watchHandler",
        "click .clearBtn":          "clearHandler",
        "change #watchFrequency":   "changeFrequency"
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },

    getHandler: function () {
        navigator.accelerometer.getCurrentAcceleration(this.successHandler, this.errorHandler);
        return false;
    },

    watchHandler: function () {
        if (this.watchId) {
            showAlert("You are already watching", "Accelerometer");
        } else {
            this.watchId = navigator.accelerometer.watchAcceleration(this.successHandler, this.errorHandler, { frequency: $('#watchFrequency').val() });
        }
        return false;
    },

    clearHandler: function () {
        if (this.watchId) {
            navigator.accelerometer.clearWatch(this.watchId);
            delete(this.watchId);
        } else {
            showAlert("Nothing to clear", "Accelerometer");
        }
        return false;
    },

    changeFrequency: function () {
        if (this.watchId) {
            navigator.accelerometer.clearWatch(this.watchId);
            delete(this.watchId);
            this.watchHandler();
        }
        return false;
    },

    successHandler: function (acceleration) {
        $('#accelerationX').html(acceleration.x);
        $('#accelerationY').html(acceleration.y);
        $('#accelerationZ').html(acceleration.z);
        $('#accelerationTime').html(acceleration.timestamp);
    },

    errorHandler: function (error) {
        showAlert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n', 'Error');
    },

    close: function() {
        if (this.watchId) {
            navigator.accelerometer.clearWatch(this.watchId);
        }
    }

});