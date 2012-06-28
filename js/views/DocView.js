window.DocView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html("<div class='docWrapper'><iframe src='doc/" + this.options.api + ".html' frameborder='0' width='100%' height='100%'></iframe></div>");
        return this;
    }

});
