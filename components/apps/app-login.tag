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
          localStorage.setItem("auth", JSON.stringify({
              headers: {
                  'advanced-auth': self.name.value + ':' + md5(self.name.value + self.password.value)
              }
          }));
          RC.trigger('app', 'home');
        }
    </script>
</app-login>
