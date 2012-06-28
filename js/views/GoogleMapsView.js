window.GoogleMapsView = Backbone.View.extend({

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
        var myOptions = {
                  center: new google.maps.LatLng(-34.397, 150.644),
                  zoom: 8,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
                };
        this.map = new google.maps.Map(document.getElementById("map_canvas"),
            myOptions);
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
            this.watchId = navigator.geolocation.watchPosition(this.successHandler, this.errorHandler);
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
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.map.setCenter(latLng);
        new google.maps.Marker({map: this.map, position: latLng});
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