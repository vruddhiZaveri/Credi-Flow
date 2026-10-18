import test from 'node:test';
import assert from 'node:assert/strict';
import { saveDraft, loadDraft, deleteDraft, draftKey } from '../.test-build/services/draftStorage.js';
const form = { name:'Demo', email:'', phone:'', income:'', employment:'Salaried', existingEmi:'0', requested:'300000', tenure:'36', consent:true };
function memory() {
  const map = new Map();
  return {getItem:key=>map.get(key) ?? null,setItem:(key,value)=>map.set(key,value),removeItem:key=>map.delete(key)};
}
test('incomplete drafts round trip with consent reset and edits isolated', () => {
  const store = memory(); const draft = {...form};
  assert.equal(saveDraft(draft,()=>store).ok,true);
  draft.name='Edited';
  const restored=loadDraft(()=>store);
  assert.equal(restored.form.name,'Demo');
  assert.equal(restored.form.consent,false);
  assert.equal(restored.form.email,'');
  assert.equal(JSON.parse(store.getItem(draftKey)).form.consent,undefined);
});
test('explicit saving replaces the previous draft', () => {
  const store=memory();saveDraft(form,()=>store);saveDraft({...form,name:'New'},()=>store);
  assert.equal(loadDraft(()=>store).form.name,'New');
});
test('missing, damaged and incompatible drafts return recoverable errors', () => {
  const store=memory();assert.equal(loadDraft(()=>store).ok,false);
  for (const raw of ['{','null','{"version":2}','{"version":1,"form":{}}',JSON.stringify({version:1,form:{...form,income:12}})]) {
    store.setItem(draftKey,raw);assert.equal(loadDraft(()=>store).ok,false);
  }
});
test('storage denial and quota failures do not crash the application', () => {
  const unavailable=()=>{throw new Error('Denied');};
  for (const result of [saveDraft(form,unavailable),loadDraft(unavailable),deleteDraft(unavailable)]) assert.equal(result.ok,false);
  assert.equal(saveDraft(form,()=>({setItem(){throw new Error('Quota');}})).ok,false);
});
test('delete removes only the saved draft and preserves current details', () => {
  const store=memory();store.setItem('other-project','keep');saveDraft(form,()=>store);
  assert.equal(deleteDraft(()=>store).ok,true);
  assert.equal(loadDraft(()=>store).ok,false);assert.equal(store.getItem('other-project'),'keep');assert.equal(form.name,'Demo');
});
