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
var inherit = AWS.util.inherit;

/**
 * @api private
 */
AWS.Signers.V1 = inherit(AWS.Signers.RequestSigner, {
  addAuthorization: function addAuthorization(credentials, date) {

    if (!date) date = AWS.util.date.getDate();

    var r = this.request
      , params = {
        Timestamp: AWS.util.date.iso8601(date),
        SignatureVersion: '1',
        SignatureMethod: 'HmacSHA1',
        AWSAccessKeyId: credentials.accessKeyId
      };
    r.path = AWS.util.appendParamsToURI( r.path, params );

    var signature = this.sign(credentials.secretAccessKey, this.stringToSign());
    params = { Signature: signature };
    r.path = AWS.util.appendParamsToURI( r.path, params );
  },

  sign: function signature(secret, string) {
    return AWS.util.crypto.hmac(secret, string, 'base64', 'sha1');
  },

  stringToSign: function stringToSign() {
    return this.canonicalizedResource();
  },

  canonicalizedResource: function canonicalizedResource() {

    var r = this.request;

    var parts = r.path.split('?');
    var querystring = parts[1];

    var resource = '';

    if (querystring) {

      // collect a list of query params that need to be signed
      var resources = [];

      AWS.util.arrayEach.call(this, querystring.split('&'), function (param) {
        var name = param.split('=')[0];
        var value = param.split('=')[1];
        var resource = { name: name };
        if (value !== undefined) {
          resource.value = decodeURIComponent(value);
        }
        resources.push(resource);
      });

      if (resources.length) {

        resources.sort(function (a, b) { return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1; });

        querystring = [];
        AWS.util.arrayEach(resources, function (resource) {
          querystring.push(resource.name);
          if (resource.value !== undefined)
            querystring.push(resource.value);
        });

        resource += querystring.join('');
      }

    }

    return resource;
  }
});

module.exports = AWS.Signers.V1;
