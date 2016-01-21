# TreeGrammar

Simple context-free grammar text generator.

This module creates random texts based on a set of rules.

```js
const Tg = require('treegrammar');

const rules = {
    '<start>': ['<template>'],
    '<template>': [
        'the <noun> is <adj>', 'A <adj> <noun>'
    ],
    '<noun>': [
        'house', 'cat'
    ],
    '<adj>': [
        'green', 'big'
    ]
};

const generator = new Tg(rules);

generator.generate(); //the house is big
generator.generate(); //A big cat
generator.generate(); //A green house
generator.generate(); //the cat is green
```

## Install

```npm install treegrammar```

## Usage

First, you need to create a grammar based on a set of rules.

The rule name may be any name surrounded by angle brackets, letters, numbers an underscore are allowed. The rule content must be an **Array** of strings, those strings should be any combination of text and/or references to other rules. See example above.

Then create a new generator object with that set of rules or you can add the rules after using the API. The generator object can be used to *.generate()* random strings and it also has some other utility methods documented below.

## API

Method | Description |
---------|---------------|
`generate(startRule)` | Generates a new random string. By default the text will be generated starting from the rule with the name *`<start>`* but you can also define your starting point using the optional parameter startRule.
`addRule(ruleName, ruleContent, overwrite)` | Adds a new rule. The *`<ruleName>`* and `[ruleContent]` are required. If the rule exists it will throw an Error unless the optional overwrite param is set to *true*.
`deleteRule(ruleName) | Deletes the rule *`<ruleName>`*.

# Building


* `git clone https://github.com/bertez/treegrammar`
* `npm install`
* `gulp`

This will lint the code and run the tests.

# License

MIT.

(c) 2016, Berto Yáñez.

The rules syntax is based on the awesome [RitaJS](https://github.com/dhowe/RiTaJS) module