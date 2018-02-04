const assert = require('chai').assert,
    sinon = require('sinon'),
    Article = require('./Article').Article,
    ArticleDataService = require('./ArticleDataService')(Article);

describe('ArticleDataService', function () {

    describe('getAllCategories', function () {
        beforeEach(() => {
            sinon.stub(Article, 'find')
        });
        afterEach(() => {
            Article.find.restore();
        });

        it('should only yield categories from articles with categories', function () {
            ArticleDataService.getAllCategories(() => false);
            sinon.assert.calledWith(Article.find,
                {
                    category: {$exists: true},
                    draft: false,
                    hidden: false
                });
        });

        it('calls user callback w/ categories and no errors', function () {
            const categories = ['a', 'b'];
            const expectedModels = [{category: categories[0]}, {category: categories[1]}];
            Article.find.yields(null, expectedModels);

            const spy = sinon.spy();
            ArticleDataService.getAllCategories(spy);

            assert.equal(null, spy.getCall(0).args[0]);
            assert.deepEqual(categories, spy.getCall(0).args[1]);
        });

        it('calls user callback w/ error', function () {
            Article.find.yields(new Error(), []);

            const spy = sinon.spy();
            ArticleDataService.getAllCategories(spy);

            assert.notEqual(null, spy.getCall(0).args[0]);
        });

        it('calls user callback with no categories when no article w/ category', function () {
            // Finds no articles w/ categories
            Article.find.yields(null, null);

            const spy = sinon.spy();
            ArticleDataService.getAllCategories(spy);

            assert.deepEqual([], spy.getCall(0).args[1]);
        });
    });

    describe('getArticle', function () {

        it('calls findOne when _id passed', function () {
            const mockQueryObject = {_id: 'mock id'};
            const stub = sinon.stub(Article, "findOne");
            ArticleDataService.getArticle(mockQueryObject);
            assert.isTrue(stub.called, 'Article.findOne should have been called');
        });

        it('calls find when category passed', function () {
            const mockQueryObject = {category: 'mock category'};
            const stub = sinon.stub(Article, "find");
            ArticleDataService.getArticle(mockQueryObject);
            assert.isTrue(stub.called, 'Article.find should have been called');
        });

        it('yields an article', function () {
            const mockQueryObject = {_id: 'mock id'};
            const mockArticle = {
                _id: 'Mock id',
                title: 'Mock title',
                body: 'Mock body',
                category: 'Mock category'
            };
            Article.findOne.yields(null, new Article(mockArticle));

            const spy = sinon.spy();
            ArticleDataService.getArticle(mockQueryObject, spy);

            assert.equal(null, spy.getCall(0).args[0], 'There should be no errors');
            assert.property(spy.getCall(0).args[1], 'draft');
            assert.property(spy.getCall(0).args[1], 'allowComments');
            assert.property(spy.getCall(0).args[1], 'hidden');
            assert.property(spy.getCall(0).args[1], 'author');
            assert.property(spy.getCall(0).args[1], 'title');
            assert.property(spy.getCall(0).args[1], 'body');
            assert.property(spy.getCall(0).args[1], 'category');
        });
    });

    describe('_postFindArticleModification', function () {
        // TODO: write test to check if it does it correctly, these should probably be there own functions w/ own tests
        it('should add timeToReadInMin, excerpt, and articleSlug to article object', function () {
            const mockArticle = {
                _id: 'Mock id',
                title: 'Mock title',
                body: 'Mock body',
                category: 'Mock category'
            };
            const modifiedArticle = ArticleDataService._postFindArticleModification(new Article(mockArticle));
            assert.property(modifiedArticle, 'timeToReadInMin');
            assert.property(modifiedArticle, 'excerpt');
            assert.property(modifiedArticle, 'articleSlug');
        });

        it('should add timeToReadInMin, excerpt, and articleSlug to all articles', function () {
            const mockArticles = [{
                _id: 'Mock id',
                title: 'Mock title',
                body: 'Mock body',
                category: 'Mock category'
            }, {
                _id: 'Mock id',
                title: 'Mock title',
                body: 'Mock body',
                category: 'Mock category'
            }];
            const modifiedArticles = ArticleDataService._postFindArticleModification(
                mockArticles.map((article) => new Article(article))
            );
            modifiedArticles.forEach(function (modifiedArticle) {
                assert.property(modifiedArticle, 'timeToReadInMin');
                assert.property(modifiedArticle, 'excerpt');
                assert.property(modifiedArticle, 'articleSlug');
            });
        });
    });
});