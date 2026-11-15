import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const questions = JSON.parse(readFileSync('public/questions.json', 'utf8'));
assert.equal(questions.length, 300, 'The initial release bank target is 300.');
assert.equal(new Set(questions.map(q => q.id)).size, questions.length, 'Unique IDs');
assert.equal(new Set(questions.map(q => q.text.trim().toLowerCase())).size, questions.length, 'Unique complete stems');
assert.equal(new Set(questions.map(q=>q.type)).size,7,'All seven objective answer schemas are represented.');
for (const [subject, topics] of [['english',17],['mathematics',20],['science',25]]) {
  const group = questions.filter(q => q.subject === subject);
  assert.equal(group.length, 100, subject);
  assert.equal(new Set(group.map(q => q.topic)).size, topics, `${subject} topic coverage`);
}
for (const q of questions) {
  for (const key of ['id','subject','topic','subtopic','text','explanation','learningObjective','alignment','language','reviewNote']) assert.ok(typeof q[key] === 'string' && q[key].trim(), `${q.id}: ${key}`);
  assert.ok(['mcq','reading','true_false','fill_blank','short_answer','numerical','calculation'].includes(q.type), q.id);
  assert.ok(Number.isInteger(q.difficulty) && q.difficulty >= 1 && q.difficulty <= 5, q.id);
  assert.ok(q.estimatedSeconds > 0 && Array.isArray(q.tags) && q.tags.length, q.id);
  assert.ok(q.version >= 1 && ['primary','bridge'].includes(q.stage), q.id);
  if (q.options?.length) {
    assert.equal(new Set(q.options.map(o => o.id)).size, q.options.length, q.id);
    assert.equal(new Set(q.options.map(o => o.text.trim().toLowerCase())).size, q.options.length, q.id);
    assert.equal(q.options.filter(o => o.id === q.answer).length, 1, `${q.id}: one answer`);
  } else assert.notEqual(q.answer, undefined, q.id);
}
console.log('PASS: 300 questions, 100 per subject; all 62 topic categories; unique IDs/stems/options; valid keys and complete metadata. See docs/content/QUESTION_BANK_REVIEW.md for educational validation limits.');
