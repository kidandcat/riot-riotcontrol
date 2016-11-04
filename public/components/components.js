riot.tag2('app-skeleton', '<navbar-top></navbar-top> <div class="wrapper wrapper-fixed"> <section class="row"> <aside class="col-2"> <side-bar>Sidebar</side-bar> </aside> <main class="col-9" id="app"> </main> </section> </div>', '', '', function(opts) {
        var self = this;
        RC.addStore(self);

        self.on('app', function (app) {
            console.log('app:', app);
            self.render(app);
            self.update();
        })

        this.render = function(appName){
          if (!localStorage.getItem("auth")) {
              appName = 'login';
          }

          appName = 'app-' + appName;
          document.querySelector('#app').innerHTML = '<' + appName + '></' + appName + '>';
          riot.mount(appName);
        }.bind(this)

});

riot.tag2('app-home', '<p>This is the main app</p> <ul> <li each="{users}"> {} </li> </ul>', '', '', function(opts) {
        var self = this;
        RC.addStore(self);

        self.users = {};

        var auth = localStorage.getItem("auth");
        fetchival('/api/users', JSON.parse(auth)).get().then(function (json) {
            console.log('res ', json);
            self.users = json;
        }).catch(function (err) {
            console.log(err)
        })
});

riot.tag2('app-login', '<div class="row"> <form class="form col-2 col-left-4"> <div class="form_group"> <label for="name">Username</label> <input id="name" type="text"> </div> <div class="form_group"> <label for="password">Password</label> <input id="password" type="password"> </div> <button type="button" onclick="{submit}" class="button button-blue" style="text-align: center">Login</button> </form> </div>', 'button, input { width: 100%; }', '', function(opts) {
        var self = this;
        RC.addStore(self);

        this.submit = function() {
          localStorage.setItem("auth", JSON.stringify({
              headers: {
                  'advanced-auth': self.name.value + ':' + md5(self.name.value + self.password.value)
              }
          }));
          RC.trigger('app', 'home');
        }.bind(this)
});

riot.tag2('app-logout', '', '', '', function(opts) {
        var self = this;
        RC.addStore(self);

        localStorage.removeItem("auth");
        setTimeout(function(){
          RC.trigger('app', 'home');
        }, 200);
});

riot.tag2('navbar-top', '<div class="navbar"> <nav> <ul> <li each="{left}"> <a if="{eval(condition)}" onclick="{navigate}">{title}</a> </li> </ul> <ul> <li each="{right}"> <a if="{eval(condition)}" onclick="{navigate}">{title}</a> </li> </ul> </nav> </div>', '', '', function(opts) {
        var self = this;
        RC.addStore(self);

        self.left = [];
        self.right = [];

        this.navigate = function(app){
          RC.trigger('app', app.item.app);
        }.bind(this)

        self.on('navbar-top:addMenuRight', function (test) {
            test.condition = test.condition || true;
            self.right.push(test);
            self.update();
        })
        self.on('navbar-top:addMenuLeft', function (test) {
            test.condition = test.condition || true;
            self.left.push(test);
            self.update();
        })

});

riot.tag2('side-bar', '<yield></yield>', '', '', function(opts) {
        var self = this;
        RC.addStore(self);
});
