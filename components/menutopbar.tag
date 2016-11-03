<navbar-top>
    <div class="navbar">
        <nav>
            <ul>
                <li each={left}>
                    <a href="#">{title}</a>
                </li>
            </ul>
            <ul>
                <li each={right}>
                    <a href="#">{title}</a>
                </li>
            </ul>
        </nav>
    </div>

    <script>
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
    </script>
</navbar-top>
