<app-skeleton>
    <navbar-top></navbar-top>
    <div class="wrapper wrapper-fixed">
        <section class="row">
            <aside class="col-2">
                <side-bar></side-bar>
            </aside>
            <main class="col-9" id="app">
            </main>
        </section>
    </div>

    <script>
        var self = this;
        RC.addStore(self);

        self.on('app', function (app) {
            self.render(app);
            self.update();
        })

        render(appName){
          appName = 'app-' + appName;
          document.querySelector('#app').innerHTML = '<' + appName + '></' + appName + '>';
          riot.mount(appName);
        }
    </script>
</app-skeleton>
