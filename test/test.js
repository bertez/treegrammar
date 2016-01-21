'use strict';

const expect = require('chai').expect;
const TreeGrammar = require('../');

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

describe('TreeGrammar', () => {
    describe('Instantiating', () => {
        it('should not throw an error when instantiating without arguments', () => {
            expect(() => new TreeGrammar()).to.not.throw(Error);
        });

        it('should get a ruleSet argument', () => {
            const g = new TreeGrammar(rules);

            expect(g.grammar.size).to.equal(4);
        });

        it('should read external json rules', () => {
            const g = new TreeGrammar(__dirname + '/test-rules.json');

            expect(g.grammar.size).to.equal(5);
            expect(g.grammar.get('<verb>')).to.be.instanceof(Array);
        });

        it('should should throw an error if the file does not exists', () => {
            expect(() => new TreeGrammar(__dirname + '/does-not-exists.json')).to.throw(Error);
        });
    });

    describe('Generating', () => {
        it('should generate random strings', () => {
            const g = new TreeGrammar(rules);

            expect(g.generate()).to.be.a('string');
        });

        it('should generate string according the rules', () => {
            const g = new TreeGrammar(rules);

            const generated = [
                'the house is green',
                'the house is big',
                'the cat is green',
                'the cat is big',
                'A green house',
                'A big house',
                'A green cat',
                'A big cat'
            ];

            expect(generated.indexOf(g.generate())).to.be.at.least(0);
            expect(generated.indexOf(g.generate())).to.be.at.least(0);
            expect(generated.indexOf(g.generate())).to.be.at.least(0);
            expect(generated.indexOf(g.generate())).to.be.at.least(0);
            expect(generated.indexOf(g.generate())).to.be.at.least(0);
        });

        it('should start in a different rule than <start>', () => {
            const g = new TreeGrammar(rules);

            expect(rules['<adj>'].indexOf(g.generate('<adj>'))).to.be.at.least(0);
        });

        it('should throw an error if the grammar is empty', () => {
            expect(() => new TreeGrammar().generate()).to.throw(Error);
        });
    });

    describe('API', () => {
        it('should add rules', () => {
            const g = new TreeGrammar();

            g.addRule('<start>', ['<template>'])
            .addRule('<template>', ['foo']);

            expect(g.generate()).to.equal('foo');
        });

        it('should throw error if the rule name is not well formed', () => {
            const g = new TreeGrammar();

            expect(() => g.addRule('foo', 'bar')).to.throw(Error);
        });

        it('should throw error if the rule content is not an array', () => {
            const g = new TreeGrammar();

            expect(() => g.addRule('<foo>', 'bar')).to.throw(Error);
        });

        it('should overwrite rules', () => {
            const g = new TreeGrammar();

            g.addRule('<start>', ['<template>'])
            .addRule('<template>', ['foo'])
            .addRule('<template>', ['bar'], true);

            expect(g.generate()).to.equal('bar');
        });

        it('should throw an error adding a existent rule without the overwrite flag', () => {
            const g = new TreeGrammar();

            g.addRule('<start>', ['<template>'])
            .addRule('<template>', ['foo']);

            expect(() => g.addRule('<template>', ['bar'])).to.throw(Error);

        });

        it('should delete rules', () => {
            const g = new TreeGrammar();

            g.addRule('<start>', ['<template>'])
            .addRule('<template>', ['foo'])
            .deleteRule('<template>')
            .addRule('<template>', ['bar']);

            expect(g.generate()).to.equal('bar');

        });
    });
});