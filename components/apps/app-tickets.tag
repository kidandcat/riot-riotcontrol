<app-tickets>
    <p>Tickets</p>
    <ul>
        <table class="table table-zebra table-blank">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Ticket ID</th>
                    <th>Status</th>
                    <th>Admin</th>
                    <th>User</th>
                    <th>Lang</th>
                    <th>Visible</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Message</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr each={msg}>
                    <td name="date">{moment(date).format('lll')}</td>
                    <td name="ticketId" >{ticketId}</td>
                    <td name="status" onclick={updateValue}>{status}</td>
                    <td name="adminId" onclick={updateValue}>{adminId}</td>
                    <td name="userId" onclick={updateValue}>{userId}</td>
                    <td name="language" onclick={updateValue}>{language}</td>
                    <td name="visible" onclick={updateValue}>{visible}</td>
                    <td name="type">{type}</td>
                    <td name="category" onclick={updateValue}>{category}</td>
                    <td name="message" onclick={updateValue}>{message}</td>
                    <td>
                        <div class="row">
                            <button class="col-6" onclick={deleteMessage}>Del</button>
                            <button class="col-6" onclick={closeMessage}>Close</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </ul>
    <script>
        var self = this;
        RC.addStore(self);

        self.msg = {};

        later(function(){
          window.updating = false;
        });

        updateValue(event) {
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
        }

        fetchData() {
            fetchival('/api/message', JSON.parse(localStorage.getItem("auth"))).get().then(function (json) {
                console.log('res ', json);
                self.msg = json;
                self.update();
            }).catch(function (err) {
                console.log(err)
            });
        }

        deleteMessage(event) {
            fetchival('/api/message/' + event.item._id, JSON.parse(localStorage.getItem("auth"))).delete().then(function (json) {
                self.fetchData();
                self.update();
            }).catch(function (err) {
                console.log(err)
            });
        }

        updateMessage(item) {
            fetchival('/api/message/' + item._id, JSON.parse(localStorage.getItem("auth"))).put(item).then(function (json) {
                self.fetchData();
                self.update();
            }).catch(function (err) {
                console.log(err)
            });
        }

        self.fetchData();
    </script>
</app-tickets>
