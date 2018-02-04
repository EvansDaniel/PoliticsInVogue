const assert = require('chai').assert,
    sinon = require('sinon'),
    Article = require('./Article');

describe('Article', function () {

    describe('defaultSlug', function () {

        it('replaces spaces with - and trims whitespace', function () {
            const start_str = '   hello wor ld   ';
            const expected = 'hello-wor-ld';
            assert.equal(Article.defaultSlug(start_str), expected)
        });

        it('removes non-alpha numeric characters', function () {
            const extra = '(@#$%^&*{}[]|":<>;/,.`~\'';
            const start_str = '   (@#$%^&*{}[]|":<>;/,.`~\'hello wor ld(@#$%^&*{}[]|":<>;/,.`~\'   ';
            const expected = 'hello-wor-ld';
            assert.equal(Article.defaultSlug(extra), '');
            assert.equal(Article.defaultSlug(start_str), expected);
        });
    });

    describe('getArticleSlugCb', function () {
        it('should return default slug when no articles in db', function () {
            // err, articles, cb, title, Article
            const testTitle = 'fake title';
            assert.equal(Article.getArticleSlugCb(false, false, (slug) => slug, testTitle, Article),
                Article.defaultSlug(testTitle))
        });

        it('should add a 1 to end of title slug prefix when there is a single article with slug prefix', function () {
            const articles = [
                {articleSlug: 'test-title', title: 'test title'}
            ];
            const newArticle = {title: 'test title'};
            // err, articles, cb, title, Article
            assert.equal(Article.getArticleSlugCb(false, articles, (slug) => slug, newArticle.title, Article),
                Article.defaultSlug(newArticle.title) + '1')
        });

        it('should add max number + 1 to end of article slug prefix ', function () {
            const maxNum = 10;
            // db articles , gaps in nums simulate deletion of articles
            const articles = [
                {articleSlug: 'test-title', title: 'test title'},
                {articleSlug: 'test-title1', title: 'test title'},
                {articleSlug: 'test-title2', title: 'test title'},
                {articleSlug: 'test-title7', title: 'test title'},
                {articleSlug: 'test-title8', title: 'test title'},
                {articleSlug: 'test-title' + maxNum, title: 'test title'}
            ];
            const newArticle = {title: 'test title'};
            // err, articles, cb, title, Article
            assert.equal(Article.getArticleSlugCb(false, articles, (slug) => slug, newArticle.title, Article),
                Article.defaultSlug(newArticle.title) + (maxNum + 1));
        });
    });
});