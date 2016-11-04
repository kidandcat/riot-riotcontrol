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

        fetchival('/api/users').get().then(function (json) {
            console.log('res ', json);
            self.users = json;
        })
    </script>
</app-home>
