var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', () => {

  describe('POST /movies', () => {

    it('should add movie with ratings to without errors', (done) => {
      request(server)
        .post('/movies')
        .send({ title: 'Joker' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          should.not.exist(err);
          res.body.message.should.be.exactly("Created.");
          done();
        });
    });

    it('should not add same movie', (done) => {
      request(server)
        .post('/movies')
        .send({ title: 'Joker' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(409)
        .end((err, res) => {
          should.not.exist(err);
          res.body.message.should.be.exactly("Movie already exists in database.");
          done();
        });
    });

    it('should not add movie with no ratings', (done) => {
      request(server)
        .post('/movies')
        .send({ title: 'madagaskar' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          should.not.exist(err);
          res.body.message.should.be.exactly("Created.");
          done();
        });
    });

  });

  describe('GET /movies', () => {

    it('should return all 2 movies', (done) => {
      request(server)
        .get('/movies')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);
          res.body.length.should.be.exactly(2);
          done();
        });
    });

    it('should return only Joker', (done) => {
      request(server)
        .get('/movies?year=2019')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);
          res.body[0].Title.should.be.exactly("Joker");
          done();
        });
    });

  });

  describe('POST /comments', () => {

    it('should return message that movie is fake', (done) => {
      request(server)
        .post('/comments')
        .send({ Comment: "Nie ma mnie w bazie", imdbID: "Nie istniejacy id" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(409)
        .end((err, res) => {
          should.not.exist(err);
          res.body.message.should.be.exactly("ImdbID doesn't exist.");
          done();
        });
    });

    it('should add a comment to madagaskar movie', (done) => {
      request(server)
        .post('/comments')
        .send({ Comment: "I'm in the database", imdbID: "tt0438405" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          should.not.exist(err);
          res.body.message.should.be.exactly("Created.");
          done();
        });
    });

    it('should add a comment to joker movie', (done) => {
      request(server)
        .post('/comments')
        .send({ Comment: "I'm in the database too", imdbID: "tt7286456" })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          should.not.exist(err);
          res.body.message.should.be.exactly("Created.");
          done();
        });
    });

  });

  describe('GET /comments', () => {

    it('should return all 2 comments', (done) => {
      request(server)
        .get('/comments')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);
          res.body.length.should.be.exactly(2);
          done();
        });
    });

    it('should return 0 comments', (done) => {
      request(server)
        .get("/comments?imdbID='d's'")
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(409)
        .end((err, res) => {
          should.not.exist(err);
          res.body.message.should.be.exactly("There are no comments.");
          done();
        });
    });

    it('should return 1 comment', (done) => {
      request(server)
        .get("/comments?imdbID=tt7286456")
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);
          res.body.length.should.be.exactly(1);
          done();
        });
    });

  });

});
