/*!
 * Start Bootstrap - SB Admin v6.0.2 (https://startbootstrap.com/template/sb-admin)
 * Copyright 2013-2020 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
 */
$(document).ready(() => {
    "use strict";
    // Add active state to sidebar nav links
    const path = window.location.href; // because the 'href' property of the DOM element is the absolute path
    $("#layoutSidenav_nav .sb-sidenav a.nav-link").each((index, element) => {
        if (element.href === path) {
            $(element).addClass("active");
            $(element).parent().parent().addClass("show");
        }
    });

    // Toggle the side navigation
    $("#sidebarToggle").on("click", e => {
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
    });
});