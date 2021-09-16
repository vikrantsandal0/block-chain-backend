// Import the dependencies for testing

import chai from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import * as redisHelper from '../../../utils/redis_helper';
import consts from '../../mockdata/constants'
sinon.stub(redisHelper, "connectSingleNode").resolves("client");
redisHelper.connectSingleNode.restore();

const app = require("../../../server");


// Configure chai
chai.use(require("chai-http"));
chai.use(require("chai-uuid"));
chai.should();

describe("GET /api/v1/getBlocks", () => {

    beforeEach(() => {

    });

    after((done) => {
        app.close();
        done();
    });

    afterEach((done) => {
        sinon.restore();
        done();
    });

    it("get blocks - happy flow -  value present in redis", (done) => {
        sinon.stub(redisHelper, "getKey").resolves(consts.mockValueGetBlocks.getBlockDatapresentInRedis);
        chai.request(app)
            .get(`/api/v1/getBlocks`)
            .end((err, res) => {
                console.log('res.body====', res.body);
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.message.should.be.eql("SUCCESS");
                done();
            });
    });
    it.only("get blocks - happy flow -  value not present in redis", (done) => {
        sinon.stub(redisHelper, "getKey").resolves(consts.mockValueGetBlocks.absentInRedis);
        sinon.stub(axios, 'create').returns((() => {
            return (url) => {
                return Promise.resolve({ data: consts.mockValueGetBlocks.getBlocksDataInsertInRedis })
            }
        })());
        sinon.stub(redisHelper, "setKey").resolves([]);
        chai.request(app)
            .get(`/api/v1/getBlocks`)
            .end((_, res) => {
                console.log('res.body====', res.body);
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.message.should.be.eql("SUCCESS");
                res.body.result.itemsCount.should.be.eql(consts.mockValueGetBlocks.getBlocksDataInsertInRedis.length);
                done();
            });
    });
    it("get blocks - incorrect page number - error expected", (done) => {
        chai.request(app)
            .get(`/api/v1/getBlocks?page=abc`)
            .end((err, res) => {
                console.log('res.body====', res.body);
                res.should.have.status(503);
                res.body.should.be.a("object");
                res.body.message.should.be.eql('"page" must be a number');
                done();
            });
    });
});

describe("GET /api/v1/getRawBlock/:block_hash_id", () => {

    beforeEach(() => {

    });

    after((done) => {
        app.close();
        done();
    });

    afterEach((done) => {
        sinon.restore();
        done();
    });

    it("get Raw block - happy flow -  value present in redis", (done) => {
        sinon.stub(redisHelper, "getKey").resolves(consts.mockValueGetBlocks.getRawBlockDataPresentInRedis);
        chai.request(app)
            .get(`/api/v1/getRawBlock/:block_hash_id`)
            .end((err, res) => {
                console.log('res.body====', res.body);
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.message.should.be.eql("SUCCESS");
                done();
            });
    });
    it.only("get Raw block - happy flow -  value not present in redis", (done) => {
        sinon.stub(redisHelper, "getKey").resolves(consts.mockValueGetBlocks.absentInRedis);
        sinon.stub(axios, 'create').returns((() => {
            return (url) => {
                return Promise.resolve({ data: consts.mockValueGetBlocks.getRawBlockDataInsertInRedis })
            }
        })());
        sinon.stub(redisHelper, "setKey").resolves([]);
        chai.request(app)
            .get(`/api/v1/getRawBlock/:block_hash_id`)
            .end((_, res) => {
                console.log('res.body====', res.body);
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.message.should.be.eql("SUCCESS");
                res.body.result.itemsCount.should.be.eql(consts.mockValueGetBlocks.getRawBlockDataInsertInRedis.length);
                done();
            });
    });
    it("get Raw block - incorrect page number - error expected", (done) => {
        chai.request(app)
            .get(`/api/v1/getRawBlock/:block_hash_id?page=abc`)
            .end((err, res) => {
                console.log('res.body====', res.body);
                res.should.have.status(503);
                res.body.should.be.a("object");
                res.body.message.should.be.eql('"page" must be a number');
                done();
            });
    });
});




