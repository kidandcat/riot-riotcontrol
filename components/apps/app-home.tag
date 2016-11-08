<app-home>
    <p>Admin V4 Users</p>
    <ul>
        <li each={users}>
            {username}
        </li>
    </ul>
    <script>
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
    </script>
</app-home>
