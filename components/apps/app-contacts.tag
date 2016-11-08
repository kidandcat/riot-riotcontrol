<app-contacts>
    <p>Contacts</p>
    <ul>
        <li each={contacts}>
            {_id} - {ticketId} - {authorName} - {message}
        </li>
    </ul>

    <script>
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
    </script>
</app-contacts>
