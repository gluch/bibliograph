/* global describe, it */
const 
  config = require('./config'),
  assert = require('assert'),
  raptor = require('raptor-client'),
  equals = require('array-equal');

describe('The JSON-RPC server', async function() {
  this.timeout(config.timeout);
  const client = raptor(config.url + "access");

  it('should not allow access jsonrpc method without authentication', async () => {
    let response = await client.send('username');
    assert.equal( response, null );
  }); 

  var token = null;

  it('should allow to login anonymously', async () => {
    let response = await client.send('authenticate');
    assert( equals( Object.keys(response), ['message','token','sessionId'] ) );
    token = response.token;
    response = await client.send('username', null, token );
    assert( response.startsWith('guest') );
  });

  it('should maintain the session', async () => {
    assert.equal( 1, await client.send('count', null, token ) );
    assert.equal( 2, await client.send('count', null, token ) );
    assert.equal( 3, await client.send('count', null, token ) );
  });

  it('should allow to authenticate as Administrator with a password', async () => {
    let response = await client.send('authenticate',['admin','admin']);
    assert( equals( Object.keys(response), ['message','token','sessionId'] ) );
    token = response.token;
    response = await client.send('username', null, token );
    assert.equal( response, 'admin' );
  }); 

  it('should maintain the session', async () => {
    assert.equal( 1, await client.send('count', null, token ) );
    assert.equal( 2, await client.send('count', null, token ) );
    assert.equal( 3, await client.send('count', null, token ) );
  });
});