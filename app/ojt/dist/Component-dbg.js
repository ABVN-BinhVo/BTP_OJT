sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "sap/ui/model/json/JSONModel"
], function(UIComponent, Device, JSONModel) {
    "use strict";

    return UIComponent.extend("ojt.Component", {
        metadata: {
            manifest: "json"
        },

        init: function() {
            // 1. Call base component initialization first
            UIComponent.prototype.init.apply(this, arguments);

            // 2. Set models
            const oDeviceModel = new JSONModel(Device);
            oDeviceModel.setDefaultBindingMode("OneWay");
            this.setModel(oDeviceModel, "device");

            const oDataModel = new JSONModel({
                employeeId: "",
                name: "",
                position: "",
                employees: [
                    { department: "IT",id: "001", name: "Binh Vo", level: "1", email: "bvo@test.com", gender: "Male", dateOfBirth: "2004-04-25", workingFrom: "2025-01-06" },
                ]
            });
            this.setModel(oDataModel);

            // 3. Initialize router
            this.getRouter().initialize();

            // 4. Safe debugging - check router exists before calling methods
            const oRouter = this.getRouter();
            console.log("Router instance:", oRouter);
            
            if (oRouter && typeof oRouter.getRoutes === "function") {
                console.log("Available routes:", oRouter.getRoutes());
            } else {
                console.error("Router not properly initialized");
            }
        }
    });
});