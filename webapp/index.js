sap.ui.define([
    "sap/ui/core/ComponentContainer"
], function(ComponentContainer) {
    "use strict";
    
    new ComponentContainer({
        name: "ui5.quickstart",
        settings: {
            id: "ui5quickstart"
        },
        async: true
    }).placeAt("content");
});
