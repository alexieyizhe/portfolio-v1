

let _regenerator = require("babel-runtime/regenerator");

let _regenerator2 = _interopRequireDefault(_regenerator);

let _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

let _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

let axios = require(`axios`);
let crypto = require(`crypto`);

let fetch = function fetch(username) {
  let url = `https://medium.com/${username}?format=json`;
  return axios.get(url);
};

let prefix = `])}while(1);</x>`;

let convertTimestamps = function convertTimestamps(nextObj, prevObj, prevKey) {
  if (typeof nextObj === `object`) {
    Object.keys(nextObj).map((key) => {
      return convertTimestamps(nextObj[key], nextObj, key);
    });
  } else if (typeof nextObj === `number` && nextObj >> 0 !== nextObj) {
      var date = new Date(nextObj);
      if (date.getTime() === nextObj) {
        prevObj[prevKey] = date.toISOString().slice(0, 10);
      }
    }
};

let strip = function strip(payload) {
  return payload.replace(prefix, ``);
};

exports.sourceNodes = (function() {
  let _ref3 = (0, _asyncToGenerator3.default)(
    /*#__PURE__ */ _regenerator2.default.mark(function _callee(_ref, _ref2) {
      let boundActionCreators = _ref.boundActionCreators;
      let username = _ref2.username;

      let createNode,
        _Array$prototype,
        result,
        json,
        importableResources,
        posts,
        users,
        collections,
        resources;

      return _regenerator2.default.wrap(
        (_context) => {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                createNode = boundActionCreators.createNode;
                _context.prev = 1;
                _context.next = 4;
                return fetch(username);

              case 4:
                result = _context.sent;
                json = JSON.parse(strip(result.data));
                importableResources = [];
                posts = {}; // because `posts` needs to be in a scope accessible by `links` below

                users = Object.keys(json.payload.references.User).map(function(
                  key
                ) {
                  return json.payload.references.User[key];
                });

                importableResources = importableResources.concat(users);

                if (json.payload.posts) {
                  posts = json.payload.posts;
                  importableResources = importableResources.concat(posts);
                }

                if (json.payload.references.Post) {
                  posts = Object.keys(json.payload.references.Post).map(
                    function(key) {
                      return json.payload.references.Post[key];
                    }
                  );
                  importableResources = importableResources.concat(posts);
                }

                if (json.payload.references.Collection) {
                  collections = Object.keys(
                    json.payload.references.Collection
                  ).map(function(key) {
                    return json.payload.references.Collection[key];
                  });

                  importableResources = importableResources.concat(collections);
                }

                resources = (_Array$prototype = Array.prototype).concat.apply(
                  _Array$prototype,
                  importableResources
                );

                resources.map(function(resource) {
                  convertTimestamps(resource);

                  var digest = crypto
                    .createHash(`md5`)
                    .update(JSON.stringify(resource))
                    .digest(`hex`);

                  var links =
                    resource.type === `Post`
                      ? {
                          author___NODE: resource.creatorId
                        }
                      : resource.type === `User`
                        ? {
                            posts___NODE: posts
                              .filter(function(post) {
                                return post.creatorId === resource.userId;
                              })
                              .map(function(post) {
                                return post.id;
                              })
                          }
                        : {};

                  var node = Object.assign(
                    resource,
                    {
                      id: resource.id ? resource.id : resource.userId,
                      parent: `__SOURCE__`,
                      children: [],
                      internal: {
                        type: `Medium${resource.type}`,
                        contentDigest: digest
                      }
                    },
                    links
                  );

                  createNode(node);
                });
                _context.next = 21;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](1);

                console.error(_context.t0);
                process.exit(1);

              case 21:
              case "end":
                return _context.stop();
            }
          }
        },
        _callee,
        undefined,
        [[1, 17]]
      );
    })
  );

  return function(_x, _x2) {
    return _ref3.apply(this, arguments);
  };
})();
