riot.tag2('app-home', '<p>This is the main app</p> <ul> <li each="{users}"> {} </li> </ul>', '', '', function(opts) {
        var self = this;
        RC.addStore(self);

        self.users = {};

        fetchival('/api/users').get().then(function (json) {
            console.log('res ', json);
            self.users = json;
        })
});

riot.tag2('app-login', '<div class="row"> <form class="form col-2 col-left-4"> <div class="form_group"> <label for="name">Username</label> <input id="name" type="text"> </div> <div class="form_group"> <label for="password">Password</label> <input id="password" type="password"> </div> <button type="button" onclick="{submit}" class="button button-blue" style="text-align: center">Login</button> </form> </div>', 'button, input { width: 100%; }', '', function(opts) {
        var self = this;
        RC.addStore(self);

        this.submit = function() {
            fetchival('/api/login').post({
              username: self.name.value,
              password: self.password.value
            }).then(function (json) {
                console.log('res ', json);
            })
        }.bind(this)
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
