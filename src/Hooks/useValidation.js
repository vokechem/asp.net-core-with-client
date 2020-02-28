const useValidation = () => {
    // var priv =fetch user privilages
  const  Validaterole = (rolename, action) => {      
       // let AuditTrailsObj = Privilages.find(obj => obj.RoleName === rolename);
        // if (AuditTrailsObj) {
        //   if (action === "AddNew") {
        //     if (AuditTrailsObj.AddNew) {
        //       return true;
        //     } else {
        //       return false;
        //     }
        //   } else if (action === "View") {
        //     if (AuditTrailsObj.View) {
        //       return true;
        //     } else {
        //       return false;
        //     }
        //   } else if (action === "Edit") {
        //     if (AuditTrailsObj.Edit) {
        //       return true;
        //     } else {
        //       return false;
        //     }
        //   } else if (action === "Export") {
        //     if (AuditTrailsObj.Export) {
        //       return true;
        //     } else {
        //       return false;
        //     }
        //   } else if (action == "Remove") {
        //     if (AuditTrailsObj.Remove) {
        //       return true;
        //     } else {
        //       return false;
        //     }
        //   } else {
        //     return false;
        //   }
        // } else {
        //   return false;
        // }
        return true;
      };
    return {Validaterole}
}
 
export default useValidation;