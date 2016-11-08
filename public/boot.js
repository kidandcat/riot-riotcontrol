// RC.trigger('navbar-top:addMenuLeft', {
//     title: 'Home',
//     app: 'home'
// });
RC.trigger('navbar-top:addMenuRight', {
    title: 'Login',
    app: 'login',
    condition: '!localStorage.getItem("auth")'
});
RC.trigger('navbar-top:addMenuRight', {
    title: 'Logout',
    app: 'logout',
    condition: 'localStorage.getItem("auth")'
});
RC.trigger('side-bar:addMenu', {
    title: 'Users',
    app: 'home'
});
RC.trigger('side-bar:addMenu', {
    title: 'Contacts',
    app: 'contacts'
});
RC.trigger('side-bar:addMenu', {
    title: 'Tickets',
    app: 'tickets'
});
RC.trigger('app', 'home');
