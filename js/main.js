var AppRouter = Backbone.Router.extend({

    routes: {
        "api/:name": "api",
        "doc/:name": "doc"
    },

    initialize: function (options) {

        var self = this;

        this.samples = new SampleCollection([
            {id: 1, name: "Accelerometer", view: "AccelerometerView", description: "Get x, y, z device acceleration"},
            {id: 2, name: "Camera", view: "CameraView", description: "Take pictures from your app"},
            {id: 3, name: "Capture", view: "CaptureView", description: "Sound, pictures, and videos"},
            {id: 4, name: "Compass", view: "CompassView", description: "Get compass orientation"},
            {id: 5, name: "Connection", view: "ConnectionView", description: "Get network connection info"},
            {id: 6, name: "Contacts", view: "ContactView", description: "Find and modify contacts"},
            {id: 7, name: "Device", view: "DeviceView", description: "General device information"},
            {id: 8, name: "Events", view: "EventsView", description: "Handle app life cycle events"},
            {id: 9, name: "File", view: "FileView", description: "Read and write local files"},
            {id: 10, name: "Geolocation", view: "GeolocationView", description: "Track your location"},
            {id: 11, name: "Google Maps", view: "GoogleMapsView", description: "Track your location on a map"},
            {id: 12, name: "Notification", view: "NotificationView", description: "Display native alerts"},
            {id: 13, name: "Database", view: "DatabaseView", description: "Access a local database"}
        ]);
        this.sampleList = new SampleListView({model: this.samples, el: $('#sampleList')});

        // Check of browser supports touch events...
        if (document.documentElement.hasOwnProperty('ontouchstart')) {

            document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

            // ... if yes: register touch event listener to change the "selected" state of the item
            $('body').on('touchstart', 'a', function(event) {
                self.selectItem(event);
            });
            $('body').on('touchend', 'a', function(event) {
                self.deselectItem(event);
            });
        } else {
//            ... if not: register mouse events instead
            $('body').on('mousedown', 'a', function(event) {
                self.selectItem(event);
            });
            $('body').on('mouseup', 'a', function(event) {
                self.deselectItem(event);
            });
        }

    },

    api: function (name) {
        var klass = window[name];
        if (klass === undefined) {
            showAlert('API does not exist', 'Error');
            return;
        }
        if (this.currentView) {
            if (this.currentView.close) {
                this.currentView.close();
            }
            this.currentView.undelegateEvents();
            $(this.currentView.el).empty();
        }
        this.currentView = new klass({el: "#content"});
    },

    doc: function (name) {
        if (this.currentView) {
            if (this.currentView.close) {
                this.currentView.close();
            }
            this.currentView.undelegateEvents();
            $(this.currentView.el).empty();
        }
        this.currentView = new DocView({el: "#content", api: name});
    },

    selectItem: function(event) {
        $(event.target).addClass('tappable-active');
    },

    deselectItem: function(event) {
        $(event.target).removeClass('tappable-active');
    }

});

templateLoader.load([   'HeaderView',
                        'SampleListItemView',
                        'GeolocationView',
                        'GoogleMapsView',
                        'CameraView',
                        'DeviceView',
                        'AccelerometerView',
                        'CaptureView',
                        'CompassView',
                        'ConnectionView',
                        'ContactView',
                        'EventsView',
                        'NotificationView',
                        'FileView',
                        'DatabaseView'],
    function () {
        var headerView = new HeaderView({el: '.header'});
        this.app = new AppRouter();
        Backbone.history.start();
});