/**
 * Copyright 2012-2013 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You
 * may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 */

var AWS = require('../core');

AWS.LS = AWS.Service.defineService('ls', ['2008-04-28'], {
  setupRequestListeners: function setupRequestListeners(request) {
    request.addListener('build', this.populateURI);
    request.removeListener('validate',
      AWS.EventListeners.Core.VALIDATE_REGION);
  },
  populateURI: function populateURI(req) {
    var r = req.httpRequest
      , operation = req.service.api.operations[req.operation]
      , params = {
        Version: req.service.api.apiVersion,
        Action: operation.name
      };

    r.path = AWS.util.appendParamsToURI( r.path, params );
  }
});

module.exports = AWS.LS;
