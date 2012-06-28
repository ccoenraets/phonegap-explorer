window.CameraView = Backbone.View.extend({

    initialize: function () {
        _.bindAll(this);
        this.render();
    },

    events: {
        "click .getBtn":    "getPicture"
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },

    getPicture: function() {
        navigator.camera.getPicture(this.successHandler, this.errorHandler,
            {   quality: parseInt($('#quality').val(), 10),
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: parseInt($('#sourceType').val(), 10),
                encodingType: parseInt($('#encodingType').val(), 10)
            });
        return false;
    },

    successHandler: function(imageData) {
        $('#image').attr('src', "data:image/jpeg;base64," + imageData);
    },

    errorHandler: function(error) {
        showAlert(error, "Camera");
    }

});
