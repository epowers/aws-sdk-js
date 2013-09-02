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

module.exports = {
  format: 'rest-xml',
  apiVersion: '2008-04-28',
  endpointPrefix: 'ls',
  globalEndpoint: 'ls.amazonaws.com',
  serviceAbbreviation: 'AWS LS',
  serviceFullName: 'AWS License Service',
  signatureVersion: 'v1',
  timestampFormat: 'iso8601',
  xmlnamespace: 'http://ls.amazonaws.com/doc/2008-04-28/',
  operations: {
    activateDesktopProduct: {
      name: 'ActivateDesktopProduct',
      http: {
        method: 'GET',
        uri: '/?ActivationKey={ActivationKey}&ProductToken={ProductToken}&TokenExpiration={TokenExpiration}'
      },
      input: {
        type: 'structure',
        members: {
          ActivationKey: {
            required: true,
            location: 'uri'
          },
          ProductToken: {
            required: true,
            location: 'uri'
          },
          TokenExpiration: {
            location: 'uri'
          }
        }
      },
      output: {
        type: 'structure',
        members: {
          AWSAccessKeyId: {
          },
          SecretAccessKey: {
          },
          UserToken: {
          }
        }
      }
    },
    activateHostedProduct: {
      name: 'ActivateHostedProduct',
      http: {
        method: 'GET',
        uri: '/?ActivationKey={ActivationKey}&ProductToken={ProductToken}&TokenExpiration={TokenExpiration}'
      },
      input: {
        type: 'structure',
        members: {
          ActivationKey: {
            required: true,
            location: 'uri'
          },
          ProductToken: {
            required: true,
            location: 'uri'
          },
          TokenExpiration: {
            location: 'uri'
          }
        }
      },
      output: {
        type: 'structure',
        members: {
          UserToken: {
          },
          PersistentIdentifier: {
          }
        }
      }
    },
    getActiveSubscriptionsByPid: {
      name: 'GetActiveSubscriptionsByPid',
      http: {
        method: 'GET',
        uri: '/?PersistentIdentifier={PersistentIdentifier}'
      },
      input: {
        type: 'structure',
        members: {
          PersistentIdentifier: {
            required: true,
            location: 'uri'
          }
        }
      },
      output: {
        type: 'list',
        members: {
          ProductCode: {
          }
        }
      }
    },
    refreshUserToken: {
      name: 'RefreshUserToken',
      http: {
        method: 'GET',
        uri: '/?UserToken={UserToken}&AdditionalTokens={AdditionalTokens}'
      },
      input: {
        type: 'structure',
        members: {
          UserToken: {
            required: true,
            location: 'uri'
          },
          AdditionalTokens: {
            location: 'uri'
          }
        }
      },
      output: {
        type: 'structure',
        members: {
          UserToken: {
          }
        }
      }
    },
    verifyProductSubscriptionByPid: {
      name: 'VerifyProductSubscriptionByPid',
      http: {
        method: 'GET',
        uri: '/?PersistentIdentifier={PersistentIdentifier}&ProductCode={ProductCode}'
      },
      input: {
        type: 'structure',
        members: {
          PersistentIdentifier: {
            required: true,
            location: 'uri'
          },
          ProductCode: {
            required: true,
            location: 'uri'
          }
        }
      },
      output: {
        type: 'structure',
        members: {
          Subscribed: {
            type: 'boolean'
          }
        }
      }
    },
    verifyProductSubscriptionByTokens: {
      name: 'VerifyProductSubscriptionByTokens',
      http: {
        method: 'GET',
        uri: '/?PersistentIdentifier={PersistentIdentifier}&ProductCode={ProductCode}'
      },
      input: {
        type: 'structure',
        members: {
          ProductToken: {
            required: true,
            location: 'uri'
          },
          UserToken: {
            required: true,
            location: 'uri'
          }
        }
      },
      output: {
        type: 'structure',
        members: {
          Subscribed: {
            type: 'boolean'
          }
        }
      }
    }
  }
};
