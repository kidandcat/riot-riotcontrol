<app-skeleton>
    <navbar-top></navbar-top>

    <div class="wrapper wrapper-fixed">
        <section class="row">
            <aside class="col-2">
                <side-bar></side-bar>
            </aside>
            <main class="col-9">
                <main-home></main-home>
            </main>
        </section>
    </div>

    <script>
        var self = this;
        RiotControl.addStore(self);

        self.on('updateAll', function (test) {
            self.update();
        })
    </script>
</app-skeleton>
