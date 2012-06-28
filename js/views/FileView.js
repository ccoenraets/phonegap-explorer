window.FileView = Backbone.View.extend({

    initialize: function () {
        _.bindAll(this);
        this.render();

    },

    events: {
        "click .loadBtn"    : "loadHandler",
        "click .saveBtn"    : "saveHandler"
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },

    fileSystemSuccess: function(fileSystem) {
        this.fileSystem = fileSystem;
        fileSystem.root.getDirectory("Music", {create: false, exclusive: false}, getDirSuccess, fail);
    },

    fileSystemError: function() {

    },

    loadHandler: function() {
        var fileName = $('#fileName').val();
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
            function(fileSystem) {
                fileSystem.root.getFile(fileName, {create: false, exclusive: false},
                    function(file) {
                        var reader = new FileReader();
                        reader.onload = function(event) {
                            $('#fileContent').val(event.target.result);
                        };
                        reader.onerror = function(event) {
                            showAlert('Error loading file');
                        };
                        reader.readAsText(file);
                    },
                    function() {
                        navigator.notification.alert(
                            'The file does not exist. Press Save As to create it.',  // message
                            null,
                            'File Open',            // title
                            'OK'                  // button label
                        );
                    });
            },
            function(error) {
                showAlert('FileSystem Error');
            });
        return false;
    },

    saveHandler: function() {
        var fileName = $('#fileName').val();
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
            function(fileSystem) {
                fileSystem.root.getFile(fileName, {create: true, exclusive: false},
                    function(file) {
                        file.createWriter(
                            function(writer) {
                                writer.onwrite = function(event) {
                                    navigator.notification.alert(
                                        'The file was saved successfully',  // message
                                        null,
                                        'File Save',            // title
                                        'OK'                  // button label
                                    );
                                };
                                writer.onerror = function(event) {
                                    navigator.notification.alert(
                                        'An error occurred while saving the file',  // message
                                        null,
                                        'File Save',            // title
                                        'OK'                  // button label
                                    );
                                };
                                writer.write($('#fileContent').val());
                            },
                            function() {
                                showAlert('An error has occurred', 'createWriter');
                            }
                        );

                    },
                    function() {
                        showAlert('An error has occurred', 'getFile')
                    });
            },
            function(error) {
                showAlert('An error has occurred', 'File');
            });
        return false;
    }

});