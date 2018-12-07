import { importScan } from '../src'

test('import statements', () => {
  expect(
    importScan(`
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
    importScan(`
      let loadFoo = () => import("foo")
      let barPromise = import('bar');
      import(\`event-stream\`)
    `)
  ).toMatchSnapshot()
})

test('require calls', () => {
  expect(
    importScan(`
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
    importScan(`
      import '1';
      require('2');
      import('3');
    `)
  ).toMatchSnapshot()
})

test('"from" identifier in import statement', () => {
  expect(importScan(`import { from } from 'from'`)).toMatchSnapshot()
})

test('shared path between imports', () => {
  expect(
    importScan(`
      import { foo1 } from 'foo'
      import { bar } from 'bar'
      import { foo2 } from 'foo'
    `)
  ).toMatchSnapshot()
})

test('line comments', () => {
  expect(
    importScan(`
      // require('foo')
      // import bar from 'bar'
    `)
  ).toMatchSnapshot()
})

test('block comments', () => {
  expect(
    importScan(`
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
    importScan(`
      /* \\*/ require('1') */
      /* \\\\*/ require('2')
      /* \\\\\\*/ require('3') */
    `)
  ).toMatchSnapshot()
})

test('unclosed block comment', () => {
  expect(importScan('/* import foo from "foo"')).toMatchSnapshot()
})
