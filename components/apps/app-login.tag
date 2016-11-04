<app-login>
    <div class="row">
        <form class="form col-2 col-left-4">
            <div class="form_group">
                <label for="name">Username</label>
                <input id="name" type="text"/>
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


        submit() {
            fetchival('/api/login').post({
              username: self.name.value,
              password: self.password.value
            }).then(function (json) {
                console.log('res ', json);
            })
        }
    </script>
</app-login>
