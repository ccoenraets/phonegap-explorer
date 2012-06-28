window.DeviceView = Backbone.View.extend({

    initialize: function () {
        _.bindAll(this);
        this.render();
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    }


});