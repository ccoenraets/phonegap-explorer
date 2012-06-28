window.CaptureView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    events: {
        "click .audioBtn":  "captureAudio",
        "click .imgBtn":    "captureImage",
        "click .videoBtn":  "captureVideo"
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },

    captureAudio: function() {
        var self = this;
        navigator.device.capture.captureAudio(function(files) {
            $('#capturedVideo, #capturedImg').hide();
            $('#capturedAudio').show();
            $('#capturedAudio').attr('controls', 'controls');
            self.loadMedia(files, "#capturedAudio");
        }, this.errorHandler)
        return false;
    },

    captureImage: function() {
        var self = this;
        navigator.device.capture.captureImage(function(files) {
            $('#capturedVideo, #capturedAudio').hide();
            $('#capturedAudio').removeAttr('controls');
            $('#capturedImage').show();
            self.loadMedia(files, "#capturedImage");
        }, this.errorHandler)
        return false;
    },

    captureVideo: function() {
        var self = this;
        navigator.device.capture.captureVideo(function(files) {
            $('#capturedImage, #capturedAudio').hide();
            $('#capturedAudio').removeAttr('controls');
            $('#capturedVideo').show();
            self.loadMedia(files, "#capturedVideo");
        }, this.errorHandler)
        return false;
    },

    loadMedia: function(files, target) {
        var i, path, len;
        for (i = 0, len = files.length; i < len; i += 1) {
            path = files[i].fullPath;
            $(target).attr('src', path);
        }
    },

    errorHandler: function(error) {
        showAlert(error, "Capture");
    }

});
