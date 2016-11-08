<side-bar>
    <div class="navbar">
        <div class="sidebar" each={menu} if={eval(condition)} onclick="{navigate}">
            <span>{title}</span>
        </div>
    </div>

<style scoped>
    .sidebar {
        cursor: pointer;
        height: 2.5em;
    }
    .sidebar:hover {
        background-color: white;
    }
    .sidebar span {
        display: inline-block;
        margin-left: 10px;
        margin-top: 0.5em;
    }

</style>

<script>
    var self = this;
    RC.addStore(self);
    navigate(app) {
        RC.trigger('app', app.item.app);
    }

    self.menu = [];

    self.on('side-bar:addMenu', function (test) {
        test.condition = test.condition || true;
        self.menu.push(test);
        self.update();
    })

    self.on('side-bar:clear', function (test) {
        self.menu = [];
        self.update();
    })
</script>
</side-bar>
