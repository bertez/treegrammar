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
}

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

            expect(generated.indexOf(g.generate())).to.be.at.least(0);
            expect(generated.indexOf(g.generate())).to.be.at.least(0);
            expect(generated.indexOf(g.generate())).to.be.at.least(0);
            expect(generated.indexOf(g.generate())).to.be.at.least(0);
            expect(generated.indexOf(g.generate())).to.be.at.least(0);
        });

        it('should start in a different rule than <start>', () => {

        });
    });

    describe('API', () => {
        it('should add rules', () => {

        });

        it('should overwrite rules', () => {

        });

        it('should delete rules', () => {

        });
    });
});