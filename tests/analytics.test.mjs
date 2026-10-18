import test from 'node:test';
import assert from 'node:assert/strict';
import {initialJourney,recordJourney,journeyRates} from '../.test-build/services/analytics.js';
test('no observed application or validation attempts displays no rate',()=>{
 assert.deepEqual(journeyRates(initialJourney),{completion:null,validationFailure:null});
});
test('repeat visits and submissions cannot inflate journey conversion',()=>{
 let state=initialJourney;
 for(const event of ['opened','opened','submitted','submitted','opened']) state=recordJourney(state,event);
 assert.equal(journeyRates(state).completion,100);
 assert.equal(Number(state.submitted),1);
 assert.equal(state.personalCompleted,true);
 assert.equal(initialJourney.opened,false);
});
test('unfinished journey is zero completion and records personal milestone',()=>{
 const state=recordJourney(initialJourney,'personal_completed');
 assert.equal(state.opened,true);assert.equal(state.submitted,false);
 assert.equal(journeyRates(state).completion,0);
});
test('validation rate uses failed attempts divided by all validation attempts',()=>{
 let state=initialJourney;
 for(const event of ['validation_failed','validation_passed','validation_passed']) state=recordJourney(state,event);
 assert.equal(state.validationAttempts,3);assert.equal(state.validationFailures,1);
 assert.equal(journeyRates(state).validationFailure,33);
});
