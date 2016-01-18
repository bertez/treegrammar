'use strict';

const _ = require('lodash');

class TreeGrammar {

    constructor(ruleSet) {
        this.grammar = new Map();
        this.startRule = '<start>';
        this.regex = /(<!?\w+>)/g;

        if(typeof ruleSet === 'string') {
            ruleSet = require(ruleSet);
        }

        for(let rule in ruleSet) {
            this.addRule(rule, ruleSet[rule]);
        }

    }

    generate(start) {
        return this._expand(this.grammar.get(start || this.startRule));
    }

    addRule(ruleName, ruleContent, overwrite) {
        if(!ruleName.match(this.regex)) {
            throw new Error('Malformed rule name. Must be something like <rule_name>, only letters, numbers and underscore');
        }

        if(!(this.grammar.has(ruleName)) || overwrite) {
            this.grammar.set(ruleName, ruleContent);
        } else {
            throw new Error('The rule already exists');
        }

        return this;
    }

    deleteRule(ruleName) {
        delete this.grammar.delete(ruleName);
        return this;
    }

    _expand(rule) {

        if(!rule) {
            throw new Error('Inconsistent rules, check your grammar');
        }

        const chosenRule = _.sample(rule);

        const matches = chosenRule.match(this.regex);

        if(!matches) {
            return chosenRule;
        }

        const replacements = matches.map(r => [r, this._expand(this.grammar.get(r))]);

        return chosenRule.replace(this.regex, m => _.fromPairs(replacements)[m]);

    }
}

module.exports = TreeGrammar;