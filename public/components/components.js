riot.tag2('main-home', '<p>This is the main app</p>', '', '', function(opts) {
        var self = this;
        RiotControl.addStore(self);

        self.on('updateAll', function (test) {
            self.update();
        })
});

riot.tag2('navbar-top', '<div class="navbar"> <nav> <ul> <li each="{left}"> <a href="#">{title}</a> </li> </ul> <ul> <li each="{right}"> <a href="#">{title}</a> </li> </ul> </nav> </div>', '', '', function(opts) {
        var self = this;
        RiotControl.addStore(self);

        self.left = [
            {
                title: 'Home'
            }
        ];
        self.right = [
            {
                title: 'Login'
            }
        ];

        self.on('addMenu', function (test) {
            console.log('test ', test);
            self.left.push(test);
            self.update();
        })
        self.on('updateAll', function (test) {
            self.update();
        })
});

riot.tag2('app-skeleton', '<navbar-top></navbar-top> <div class="wrapper wrapper-fixed"> <section class="row"> <aside class="col-2"> <side-bar></side-bar> </aside> <main class="col-9"> <main-home></main-home> </main> </section> </div>', '', '', function(opts) {
        var self = this;
        RiotControl.addStore(self);

        self.on('updateAll', function (test) {
            self.update();
        })
});
