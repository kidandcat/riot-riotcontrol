<main-home>
    <p>This is the main app</p>

    <script>
        var self = this;
        RiotControl.addStore(self);

        self.on('updateAll', function (test) {
            self.update();
        })
    </script>
</main-home>
