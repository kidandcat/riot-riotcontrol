<app-login>
    <div class="row">
        <form class="form col-2 col-left-4">
            <div class="form_group">
                <label for="name">Username</label>
                <input id="name" type="text" autofocus/>
            </div>
            <div class="form_group">
                <label for="password">Password</label>
                <input id="password" type="password"/>
            </div>
            <button type="button" onclick="{submit}" class="button button-blue" style="text-align: center">Login</button>
        </form>
    </div>

    <style scope>
        button,
        input {
            width: 100%;
        }

    </style>

    <script>
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

        submit() {
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
        }
    </script>
</app-login>
