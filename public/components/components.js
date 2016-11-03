riot.tag2('app-home', '<p>This is the main app</p>', '', '', function(opts) {
        var self = this;
        RC.addStore(self);

});

riot.tag2('app-login', '<p>This is the login app</p>', '', '', function(opts) {
        var self = this;
        RC.addStore(self);

});

riot.tag2('app-skeleton', '<navbar-top></navbar-top> <div class="wrapper wrapper-fixed"> <section class="row"> <aside class="col-2"> <side-bar></side-bar> </aside> <main class="col-9" id="app"> </main> </section> </div>', '', '', function(opts) {
        var self = this;
        RC.addStore(self);

        self.on('app', function (app) {
            self.render(app);
            self.update();
        })

        this.render = function(appName){
          appName = 'app-' + appName;
          document.querySelector('#app').innerHTML = '<' + appName + '></' + appName + '>';
          riot.mount(appName);
        }.bind(this)
});

riot.tag2('navbar-top', '<div class="navbar"> <nav> <ul> <li each="{left}"> <a onclick="{navigate}">{title}</a> </li> </ul> <ul> <li each="{right}"> <a onclick="{navigate}">{title}</a> </li> </ul> </nav> </div>', '', '', function(opts) {
        var self = this;
        RC.addStore(self);

        self.left = [];
        self.right = [];

        this.navigate = function(app){
          RC.trigger('app', app.item.app);
        }.bind(this)

        self.on('navbar-top:addMenuRight', function (test) {
            self.right.push(test);
            self.update();
        })
        self.on('navbar-top:addMenuLeft', function (test) {
            self.left.push(test);
            self.update();
        })

});

riot.tag2('side-bar', '<p>This is the sidebar</p>', '', '', function(opts) {
        var self = this;
        RC.addStore(self);
});
