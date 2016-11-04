<app-logout>

    <script>
        var self = this;
        RC.addStore(self);

        localStorage.removeItem("auth");
        setTimeout(function(){
          RC.trigger('app', 'home');
        }, 200);
    </script>
</app-logout>
