/* jshint camelcase: false */
/* jshint newcap: false */

var request = require('request');
var util = require('util');
var HttpStatus = require('http-status-codes');
var crypto = require('crypto');

var common = require('../../common/');
var msRestRequest = require('../../common/msRestRequest');
var resourceGroup = require('../../common/resourceGroup-client');

var azureProperties;
var environment;
var API_VERSIONS;

function acsURLTemplate(acsEndpointURL, subscriptionID, resourceGroupName, containerServiceName) {
    var acsURLTemplate = '%s/subscriptions/%s/resourceGroups/%s/providers/Microsoft.ContainerService/containerServices/%s?api-version=2017-01-31';
    return util.format(
        acsURLTemplate,
        acsEndpointURL,
        subscriptionID,
        resourceGroupName,
        containerServiceName
    );
}

exports.initialize = function (azure) {
    azureProperties = azure;
    API_VERSIONS = common.API_VERSION[azure.environment];
    environment = common.getEnvironment(azure.environment);
};

exports.createResourceGroup = function (resourceGroupName, location, callback) {
    resourceGroup.createOrUpdate(
        'ACS',
        azureProperties,
        resourceGroupName,
        { 'location': location },
        callback
    );
};

exports.getProperties = function (resourceGroupName, containerServiceName, callback) {
    msRestRequest.GET(
        acsURLTemplate(environment.resourceManagerEndpointUrl, azureProperties.subscriptionId, resourceGroupName.containerServiceName),
        common.mergeCommonHeaders('ACS - getProperties', {}),
        API_VERSIONS.ACS,
        callback
    );
}

exports.createContainerService = function(resourceGroupName, containerServiceName, callback) {
    msRestRequest.PUT(
        acsURLTemplate(environment.resourceManagerEndpointUrl, azureProperties.subscriptionId,  resourceGroupName,containerServiceName),
        common.mergeCommonHeaders('ACS - createContainerService', {}),
        API_VERSIONS.ACS,
        callback
    );
};

exports.deleteContainerService = function(resourceGroupName, containerServiceName, callback) {
    msRestRequest.DELETE(
        acsURLTemplate(environment.resourceManagerEndpointUrl, azureProperties.subscriptionId, containerServiceName),
        common.mergeCommonHeaders('ACS - deleteContainerService', {}),
        null,
        API_VERSIONS.ACS,
        callback
    );
};
