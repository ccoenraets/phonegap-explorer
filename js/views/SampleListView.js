SampleListView = Backbone.View.extend({

    initialize: function() {
        this.render();
    },

    events: {
        "click li": "selectItem"
    },

    render: function(eventName) {
        var ul = $('ul', this.el);
        ul.empty();
        _.each(this.model.models, function(api) {
            ul.append(new SampleListItemView({model: api}).render().el);
        }, this);
        if (this.iscroll) {
            console.log('Refresh iScroll');
            this.iscroll.refresh();
        } else {
            console.log('New iScroll');
            this.iscroll = new iScroll(this.el, {hScrollbar: false, vScrollbar: false });
//            setTimeout(function(){
//                self.iscroll = new iScroll(self.el, {hScrollbar: false, vScrollbar: false });
//            }, 1000);
        }
        return this;
    },

    selectItem: function(event) {
        $('li', $(this.el)).removeClass('active');
        $(event.currentTarget).addClass('active');
    }

});

SampleListItemView = Backbone.View.extend({

    tagName: "li",

    render: function(eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});