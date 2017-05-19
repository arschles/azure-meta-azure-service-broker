/* jshint camelcase: false */
/* jshint newcap: false */

var acsBind = function(params) {
  var provisioningResult = params.provisioning_result || {};
  var resourceGroupName = provisioningResult.resourceGroupName || '';
  var docDbAccountName = provisioningResult.docDbAccountName || '';
  
  this.bind = function(acs, callback) {
    acs.getAccountKey(resourceGroupName, docDbAccountName, function(err, masterKey) {
      callback(err, masterKey);
    });
  };
};

module.exports = docDbBind;
