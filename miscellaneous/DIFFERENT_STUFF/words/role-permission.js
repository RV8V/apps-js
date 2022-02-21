const roles = {
  admin: {
      id: "admin",
      name: "Admin",
      description: "",
      resource : [
          {
              id : 'blog',
              permissions: ['create', 'read', 'update', 'delete']
          },
          {
              id : 'user',
              permissions: ['create', 'read', 'update', 'delete']
          },
          {
              id : 'journal',
              permissions: ['create', 'read', 'update', 'delete']
          },

      ]
  },
  editor: {
      id: "editor",
      name: "Editor",
      description: "",
      resource : [
          {
              id : 'blog',
              permissions: ['create', 'read', 'update', 'delete']
          },
          {
              id : 'user',
              permissions: ['read']
          },
          {
              id : 'journal',
              permissions: ['create', 'read', 'update']
          },

      ]
  }
}

const getRoles = function (role) {
    console.log({ roleHere: role })

    var rolesArr = [];

    if (typeof role === 'object' && Array.isArray(role)) {

        // Returns selected roles
        for (var i = 0, len = role.length; i < len; i++) {
            rolesArr.push(roles[role[i]]);
        };
        return rolesArr;

    } else if (typeof role === 'string' || !role) {

        // Returns all roles
        if (!role) {
            for (var role in roles) {
                rolesArr.push(roles[role]);
            };
        }

        // Returns single role
        rolesArr.push(roles[role]);
        return rolesArr;

    }
}

const checkRole = function (action, resource, loginRequired) {

    return function(req, isAuth) {

        // If user is required to be logged in & isn't
        if (!isAuth) {
            return next(new Error("You must be logged in to view this area"));
        }

        if (isAuth) {

            var authRole = isAuth ? req.user.role : 'user',
                role =  get(authRole),
                hasPermission = false;

            console.log({ role });

            (function () {
                for (var i = 0, len = role[0].resource.length; i < len; i++){
                    if (role[0].resource[i].id === resource && role[0].resource[i].permissions.indexOf(action) !== -1) {
                        hasPermission = true;
                        return;
                    }
                };
            })();

            if (hasPermission) {
                return { next: hasPermission }
                // next();
            } else {
              return new Error("You are trying to " + action + " a " + resource + " and do not have the correct permissions.");

                // return next(new Error("You are trying to " + action + " a " + resource + " and do not have the correct permissions."));
            }

        }
    }
}

// var permissions = (function () {

//   var getRoles = function (role) {
//
//     var rolesArr = [];
//
//     if (typeof role === 'object' && Array.isArray(role)) {
//
//         // Returns selected roles
//         for (var i = 0, len = role.length; i < len; i++) {
//             rolesArr.push(roles[role[i]]);
//         };
//         return rolesArr;
//
//     } else if (typeof role === 'string' || !role) {
//
//         // Returns all roles
//         if (!role) {
//             for (var role in roles) {
//                 rolesArr.push(roles[role]);
//             };
//         }
//
//         // Returns single role
//         rolesArr.push(roles[role]);
//         return rolesArr;
//
//     }
//
// },
// check = function (action, resource, loginRequired) {
//
//     return function(req, isAuth) {
//
//         // If user is required to be logged in & isn't
//         if (!isAuth) {
//             return next(new Error("You must be logged in to view this area"));
//         }
//
//         if (isAuth) {
//
//             var authRole = isAuth ? req.user.role : 'user',
//                 role =  get(authRole),
//                 hasPermission = false;
//
//             (function () {
//                 for (var i = 0, len = role[0].resource.length; i < len; i++){
//                     if (role[0].resource[i].id === resource && role[0].resource[i].permissions.indexOf(action) !== -1) {
//                         hasPermission = true;
//                         return;
//                     }
//                 };
//             })();
//
//             if (hasPermission) {
//                 return { next: hasPermission }
//                 // next();
//             } else {
//               return new Error("You are trying to " + action + " a " + resource + " and do not have the correct permissions.");
//
//                 // return next(new Error("You are trying to " + action + " a " + resource + " and do not have the correct permissions."));
//             }
//
//         }
//     }
// }

// return {
//     get : function (role) {
//
//         var roles = getRoles(role);
//
//         return roles;
//     },
//     check : function (action, resource, loginRequired) {
//         return check(action, resource, loginRequired);
//     }
// }

// })();

const get = function (role) {

        var roles = getRoles(role);
        console.log({ roles })

        return roles;
    }

const check = function (action, resource, loginRequired) {
        return checkRole(action, resource, loginRequired);
    }

const here = check('read', 'journal');
const result = here({
  user: {
    role: 'editor'
  }
}, true);

console.log({ result })
