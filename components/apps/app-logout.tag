<app-logout>

    <script>
        var self = this;
        RC.addStore(self);

        localStorage.removeItem("auth");
        later(function(){
          RC.trigger('app', 'home');
        });
    </script>
</app-logout>
