/**
 * @fileoverview Require that object properties are accessed through destructuring
 * @author Alex LaFroscia
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-direct-property-access"),

  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-direct-property-access", rule, {

  valid: [
    {
      code: "const { foo } = Ember;",
      parserOptions: { ecmaVersion: 6 }
    },
    {
      code: "Ember.foo = 'bar';",
    },
    {
      code: "const foo = bar.foo;",
      parserOptions: { ecmaVersion: 6 }
    },
    {
      code: "const foo = DS.foo;",
      options: [["Ember"]],
      parserOptions: { ecmaVersion: 6 }
    },
    {
      // Verify that we don't break declaring a variable without assignment
      code: "var foo;",
      options: [["Ember"]],
      parserOptions: { ecmaVersion: 6 }
    }
  ],

  invalid: [
    {
      // Verify that the default config blocks `Ember` access
      code: "const foo = Ember.foo;",
      parserOptions: { ecmaVersion: 6 },
      errors: [{
        message: "Avoid accessing Ember.foo directly",
        type: "MemberExpression"
      }]
    },
    {
      // Verify that the default config blocks `DS` access
      code: "const foo = DS.foo;",
      parserOptions: { ecmaVersion: 6 },
      errors: [{
        message: "Avoid accessing DS.foo directly",
        type: "MemberExpression"
      }]
    },
    {
      // Verify that an empty array uses the default values
      code: "const foo = DS.foo;",
      options: [[]],
      parserOptions: { ecmaVersion: 6 },
      errors: [{
        message: "Avoid accessing DS.foo directly",
        type: "MemberExpression"
      }]
    },
    {
      // Verify that an arbitrary value can be provided
      code: "const foo = Baz.foo;",
      options: [["Baz"]],
      parserOptions: { ecmaVersion: 6 },
      errors: [{
        message: "Avoid accessing Baz.foo directly",
        type: "MemberExpression"
      }]
    },
    {
      // Verify that accessing a property directly to assign to an
      // already-declared variable is also caught
      code: "var foo; foo = Baz.foo;",
      options: [["Baz"]],
      parserOptions: { ecmaVersion: 6 },
      errors: [{
        message: "Avoid accessing Baz.foo directly",
        type: "MemberExpression"
      }]
    }
  ]
});
