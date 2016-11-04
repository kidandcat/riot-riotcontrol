<app-home>
    <p>This is the main app</p>
    <ul>
        <li each={users}>
            {}
        </li>
    </ul>

    <script>
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
    </script>
</app-home>
