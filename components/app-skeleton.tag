<app-skeleton>
    <navbar-top></navbar-top>
    <div class="wrapper wrapper-fixed">
        <section class="row">
            <aside class="col-2">
                <side-bar>Sidebar</side-bar>
            </aside>
            <main class="col-9" id="app">
            </main>
        </section>
    </div>

    <script>
        var self = this;
        RC.addStore(self);

        self.on('app', function (app) {
            console.log('app:', app);
            self.render(app);
            self.update();
        })

        render(appName){
          if (!localStorage.getItem("auth")) {
              appName = 'login';
          }

          appName = 'app-' + appName;
          document.querySelector('#app').innerHTML = '<' + appName + '></' + appName + '>';
          riot.mount(appName);
        }

    </script>
</app-skeleton>
