import { getImports } from '../src'

test('import statements', () => {
  expect(
    getImports(`
      import xyz from '1';
      import * as name from \`2\`;
      import { foo } from "3";
      import { foo as bar } from "4";
      import { foo, bar } from "5";
      import { foo, bar as bar2 } from "6";
      import xyz, { foo } from "7";
      import xyz, * as foo from "8";
      import '9';
    `)
  ).toMatchSnapshot()
})

test('import calls', () => {
  expect(
    getImports(`
      let loadFoo = () => import("foo")
      let barPromise = import('bar');
      import(\`event-stream\`)
    `)
  ).toMatchSnapshot()
})

test('require calls', () => {
  expect(
    getImports(`
      let bar = require('bar');
      let foo = require("foo")
      require(\`event-stream\`);

      // False positives
      foo.require('xyz')
      $require('xyz')
      _require('xyz')
    `)
  ).toMatchSnapshot()
})

test('mixed import and require', () => {
  expect(
    getImports(`
      import '1';
      require('2');
      import('3');
    `)
  ).toMatchSnapshot()
})

test('"from" identifier in import statement', () => {
  expect(getImports(`import { from } from 'from'`)).toMatchSnapshot()
})

test('shared path between imports', () => {
  expect(
    getImports(`
      import { foo1 } from 'foo'
      import { bar } from 'bar'
      import { foo2 } from 'foo'
    `)
  ).toMatchSnapshot()
})

test('line comments', () => {
  expect(
    getImports(`
      // require('foo')
      // import bar from 'bar'
    `)
  ).toMatchSnapshot()
})

test('block comments', () => {
  expect(
    getImports(`
      /* require('foo') */
      /* import xyz from 'xyz' */
      /*
      require('bar');
      *//*
      import xyz from 'xyz'; */
    `)
  ).toMatchSnapshot()
})

test('escaped block comment', () => {
  expect(
    getImports(`
      /* \\*/ require('1') */
      /* \\\\*/ require('2')
      /* \\\\\\*/ require('3') */
    `)
  ).toMatchSnapshot()
})

test('unclosed block comment', () => {
  expect(getImports('/* import foo from "foo"')).toMatchSnapshot()
})
