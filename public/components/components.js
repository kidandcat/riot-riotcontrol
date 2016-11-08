riot.tag2('app-contacts', '<p>Contacts</p> <ul> <li each="{contacts}"> {_id} - {ticketId} - {authorName} - {message} </li> </ul>', '', '', function(opts) {
        var self = this;
        RC.addStore(self);

        self.contacts = {};

        fetchival('/api/contact', JSON.parse(localStorage.getItem("auth"))).get().then(function (json) {
            console.log('res ', json);
            self.contacts = json;
            self.update();
        }).catch(function (err) {
            console.log(err)
        })
});

riot.tag2('app-home', '<p>Admin V4 Users</p> <ul> <li each="{users}"> {username} </li> </ul>', '', '', function(opts) {
        var self = this;
        RC.addStore(self);

        self.users = {};

        fetchival('/api/users', JSON.parse(localStorage.getItem("auth"))).get().then(function (json) {
            console.log('res ', json);
            self.users = json;
            self.update();
        }).catch(function (err) {
            console.log(err)
        });
});

riot.tag2('app-login', '<div class="row"> <form class="form col-2 col-left-4"> <div class="form_group"> <label for="name">Username</label> <input id="name" type="text" autofocus> </div> <div class="form_group"> <label for="password">Password</label> <input id="password" type="password"> </div> <button type="button" onclick="{submit}" class="button button-blue" style="text-align: center">Login</button> </form> </div>', 'button, input { width: 100%; }', '', function(opts) {
        var self = this;
        RC.addStore(self);

        self.message = opts.msg || null;

        later(function () {
            document.querySelector('#password').addEventListener('keypress', function (event) {
                if (event.keyCode == 13) {
                    self.submit();
                }
            });

            if (self.message) {
                k$.status({text: 'Invalid Credentials', type: 'status-red'})
            }

            document.querySelector('side-bar').style.display = 'none';
        });

        this.submit = function() {
            localStorage.setItem("auth", JSON.stringify({
                headers: {
                    'advanced-auth': self.name.value + ':' + md5(self.name.value + self.password.value)
                }
            }));
            fetchival('/api/checkcredentials', JSON.parse(localStorage.getItem("auth"))).get().then(function (json) {
                document.querySelector('side-bar').style.display = 'block';
                RC.trigger('app', 'home');
            }).catch(function (err) {
                localStorage.removeItem("auth");
                RC.trigger('app', {
                    name: 'login',
                    config: {
                        msg: 'bad pass'
                    }
                });
            })
        }.bind(this)
});

riot.tag2('app-logout', '', '', '', function(opts) {
        var self = this;
        RC.addStore(self);

        localStorage.removeItem("auth");
        later(function(){
          RC.trigger('app', 'home');
        });
});

riot.tag2('app-tickets', '<p>Tickets</p> <ul> <table class="table table-zebra table-blank"> <thead> <tr> <th>Date</th> <th>Ticket ID</th> <th>Status</th> <th>Admin</th> <th>User</th> <th>Lang</th> <th>Visible</th> <th>Type</th> <th>Category</th> <th>Message</th> <th>Actions</th> </tr> </thead> <tbody> <tr each="{msg}"> <td name="date">{moment(date).format(\'lll\')}</td> <td name="ticketId">{ticketId}</td> <td name="status" onclick="{updateValue}">{status}</td> <td name="adminId" onclick="{updateValue}">{adminId}</td> <td name="userId" onclick="{updateValue}">{userId}</td> <td name="language" onclick="{updateValue}">{language}</td> <td name="visible" onclick="{updateValue}">{visible}</td> <td name="type">{type}</td> <td name="category" onclick="{updateValue}">{category}</td> <td name="message" onclick="{updateValue}">{message}</td> <td> <div class="row"> <button class="col-6" onclick="{deleteMessage}">Del</button> <button class="col-6" onclick="{closeMessage}">Close</button> </div> </td> </tr> </tbody> </table> </ul>', '', '', function(opts) {
        var self = this;
        RC.addStore(self);

        self.msg = {};

        later(function(){
          window.updating = false;
        });

        this.updateValue = function(event) {
            if (!window.updating) {
                var data = event.target.innerHTML;
                event.target.innerHTML = '<input class="col-9" name="' + event.target.getAttribute('name') + '" type="text" value="' + data + '"><button onclick="RC.trigger(\'app\', \'tickets\')" class="col-3">Cancel</button>';
                event.target.classList.add('row');
                window.updating = true;
                var target = event.target;
                var item = event.item;
                target.addEventListener('keypress', function (event) {
                    if (event.keyCode == 13) {
                        item[event.target.getAttribute('name')] = event.target.value;
                        window.updating = false;
                        self.updateMessage(item);
                        target.innerHTML = '<td>' + event.target.value + '</td>';
                        target.classList.remove('row');
                    }
                });
            }
        }.bind(this)

        this.fetchData = function() {
            fetchival('/api/message', JSON.parse(localStorage.getItem("auth"))).get().then(function (json) {
                console.log('res ', json);
                self.msg = json;
                self.update();
            }).catch(function (err) {
                console.log(err)
            });
        }.bind(this)

        this.deleteMessage = function(event) {
            fetchival('/api/message/' + event.item._id, JSON.parse(localStorage.getItem("auth"))).delete().then(function (json) {
                self.fetchData();
                self.update();
            }).catch(function (err) {
                console.log(err)
            });
        }.bind(this)

        this.updateMessage = function(item) {
            fetchival('/api/message/' + item._id, JSON.parse(localStorage.getItem("auth"))).put(item).then(function (json) {
                self.fetchData();
                self.update();
            }).catch(function (err) {
                console.log(err)
            });
        }.bind(this)

        self.fetchData();
});

riot.tag2('app-skeleton', '<navbar-top></navbar-top> <div class="wrapper wrapper-fixed"> <section class="row"> <div class="col-1"> <side-bar></side-bar> </div> <div class="col-11"> <main id="app"></main> </div> </section> </div>', '', '', function(opts) {
        var self = this;
        RC.addStore(self);

        self.on('app', function (app) {
            self.render(app.name || app, app.config || null);
            self.update();
        })

        this.render = function(appName, config) {
            if (!localStorage.getItem("auth")) {
                appName = 'login';
            }

            appName = 'app-' + appName;
            document.querySelector('#app').innerHTML = '<' + appName + '></' + appName + '>';
            riot.mount(appName, config);
        }.bind(this)

        window.later = function (func) {
            setTimeout(func, 100);
        }
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

riot.tag2('side-bar', '<div class="navbar"> <div class="sidebar" each="{menu}" if="{eval(condition)}" onclick="{navigate}"> <span>{title}</span> </div> </div>', 'side-bar .sidebar,[riot-tag="side-bar"] .sidebar,[data-is="side-bar"] .sidebar{ cursor: pointer; height: 2.5em; } side-bar .sidebar:hover,[riot-tag="side-bar"] .sidebar:hover,[data-is="side-bar"] .sidebar:hover{ background-color: white; } side-bar .sidebar span,[riot-tag="side-bar"] .sidebar span,[data-is="side-bar"] .sidebar span{ display: inline-block; margin-left: 10px; margin-top: 0.5em; }', '', function(opts) {
    var self = this;
    RC.addStore(self);
    this.navigate = function(app) {
        RC.trigger('app', app.item.app);
    }.bind(this)

    self.menu = [];

    self.on('side-bar:addMenu', function (test) {
        test.condition = test.condition || true;
        self.menu.push(test);
        self.update();
    })

    self.on('side-bar:clear', function (test) {
        self.menu = [];
        self.update();
    })
});
