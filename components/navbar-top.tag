<navbar-top>
    <div class="navbar">
        <nav>
            <ul>
                <li each={left}>
                    <a if={eval(condition)} onclick="{navigate}">{title}</a>
                </li>
            </ul>
            <ul>
                <li each={right}>
                    <a if={eval(condition)} onclick="{navigate}">{title}</a>
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
            test.condition = test.condition || true;
            self.right.push(test);
            self.update();
        })
        self.on('navbar-top:addMenuLeft', function (test) {
            test.condition = test.condition || true;
            self.left.push(test);
            self.update();
        })

    </script>
</navbar-top>
