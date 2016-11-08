<app-skeleton>
    <navbar-top></navbar-top>
    <div class="wrapper wrapper-fixed">
        <section class="row">
            <div class="col-1">
                <side-bar></side-bar>
            </div>
            <div class="col-11">
                <main id="app"></main>
            </div>
        </section>
    </div>

    <script>
        var self = this;
        RC.addStore(self);

        self.on('app', function (app) {
            self.render(app.name || app, app.config || null);
            self.update();
        })

        render(appName, config) {
            if (!localStorage.getItem("auth")) {
                appName = 'login';
            }

            appName = 'app-' + appName;
            document.querySelector('#app').innerHTML = '<' + appName + '></' + appName + '>';
            riot.mount(appName, config);
        }

        window.later = function (func) {
            setTimeout(func, 100);
        }
    </script>
</app-skeleton>
