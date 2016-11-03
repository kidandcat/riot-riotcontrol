<navbar-top>
    <div class="navbar">
        <nav>
            <ul>
                <li each={left}>
                    <a onclick="{navigate}">{title}</a>
                </li>
            </ul>
            <ul>
                <li each={right}>
                    <a onclick="{navigate}">{title}</a>
                </li>
            </ul>
        </nav>
    </div>

    <script>
        var self = this;
        RC.addStore(self);

        self.left = [];
        self.right = [];

        navigate(app){
          RC.trigger('app', app.item.app);
        }

        self.on('navbar-top:addMenuRight', function (test) {
            self.right.push(test);
            self.update();
        })
        self.on('navbar-top:addMenuLeft', function (test) {
            self.left.push(test);
            self.update();
        })

    </script>
</navbar-top>
