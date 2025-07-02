sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History"
], (Controller, UIComponent, History) => {
    "use strict";
    
    return Controller.extend("ojt.controller.NotFound", {
        onInit: function() {
            // Nothing special to initialize
        },
        
        // Navigate back to previous page or to home page if no history exists
        onNavBack: function() {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();
            
            if (sPreviousHash !== undefined) {
                window.history.go(-1); // Go back in browser history
            } else {
                // No history - navigate to default route
                UIComponent.getRouterFor(this).navTo("EmployeeList", {}, true);
            }
        },
        
        // Navigate to Employee List
        onNavToEmployeeList: function() {
            UIComponent.getRouterFor(this).navTo("EmployeeList");
        }
    });
});