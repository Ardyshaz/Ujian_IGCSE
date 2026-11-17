// Practice scheduling only. Uses completed, owner-filtered attempts; no learner data is sent to Analytics or another service.
export const REVIEW_GAP_MS = 24 * 60 * 60 * 1000;

export function questionEvidence(results, studentId) {
  const evidence = new Map();
  const ordered = results.filter(r=>!studentId||r.studentId===studentId)
    .map((r,index)=>({r,index})).sort((a,b)=>Date.parse(a.r.date)-Date.parse(b.r.date)||a.index-b.index);
  for(const {r} of ordered) for(const answer of r.answers||[]) {
    const id=answer.question?.id;
    if(!id)continue;
    const previous=evidence.get(id);
    const observation={...answer,at:Date.parse(r.date)};
    evidence.set(id,{first:previous?.first||observation,latest:observation,count:(previous?.count||0)+1});
  }
  return evidence;
}

export function selectQuestions(pool,{count,results=[],studentId,now=Date.now(),random=Math.random}={}) {
  // Deduplicate IDs defensively, and never relax the caller's subject/topic/Level filters.
  const available=[...new Map(pool.map(q=>[q.id,q])).values()];
  if(!Number.isInteger(count)||count<1||count>available.length)throw new Error(`Hanya ${available.length} soalan sepadan. Kurangkan bilangan soalan.`);
  const evidence=questionEvidence(results,studentId);
  const subjects=[...new Set(available.map(q=>q.subject))];
  const buckets=subjects.map(subject=>({subject,items:available.filter(q=>q.subject===subject),quota:0}));
  // Even subject quotas, redistributing only when a filtered subject runs out.
  for(let slot=0;slot<count;slot++) {
    const eligible=buckets.filter(b=>b.quota<b.items.length),min=Math.min(...eligible.map(b=>b.quota));
    const tied=eligible.filter(b=>b.quota===min);
    tied[Math.min(tied.length-1,Math.floor(random()*tied.length))].quota++;
  }
  const selected=[];
  for(const bucket of buckets) {
    const levels=new Map(),remaining=[...bucket.items];
    const unseen=q=>!evidence.has(q.id);
    const due=q=>{const last=evidence.get(q.id)?.latest;return last&&!last.correct&&Number.isFinite(last.at)&&now-last.at>=REVIEW_GAP_MS;};
    const dueSlots=Math.min(remaining.filter(due).length,bucket.quota>=3?Math.max(1,Math.floor(bucket.quota*0.3)):0);
    function take(candidates) {
      const min=Math.min(...candidates.map(q=>levels.get(q.difficulty)||0));
      const balanced=candidates.filter(q=>(levels.get(q.difficulty)||0)===min);
      const q=balanced[Math.min(balanced.length-1,Math.floor(random()*balanced.length))];
      selected.push(q);levels.set(q.difficulty,(levels.get(q.difficulty)||0)+1);
      remaining.splice(remaining.findIndex(item=>item.id===q.id),1);
    }
    for(let i=0;i<dueSlots;i++)take(remaining.filter(due));
    while(selected.filter(q=>q.subject===bucket.subject).length<bucket.quota) {
      let candidates=remaining.filter(unseen);
      if(!candidates.length)candidates=remaining.filter(due);
      if(!candidates.length) {
        // Small/exhausted banks still work: least recently encountered first, even inside the gap.
        const oldest=Math.min(...remaining.map(q=>evidence.get(q.id)?.latest.at||0));
        candidates=remaining.filter(q=>(evidence.get(q.id)?.latest.at||0)===oldest);
      }
      take(candidates);
    }
  }
  // Mix presentation order without changing the quotas or scheduling decisions.
  for(let i=selected.length-1;i>0;i--){const j=Math.min(i,Math.floor(random()*(i+1)));[selected[i],selected[j]]=[selected[j],selected[i]];}
  return selected;
}

export function learningEvidence(results) {
  const evidence=questionEvidence(results),all=results.flatMap(r=>r.answers||[]);
  const first=[...evidence.values()].map(e=>e.first),latest=[...evidence.values()].map(e=>e.latest);
  const summary=answers=>({count:answers.length,correct:answers.filter(a=>a.correct).length,
    incorrect:answers.filter(a=>!a.correct&&!a.unanswered).length,unanswered:answers.filter(a=>a.unanswered).length,
    percentage:answers.length?answers.filter(a=>a.correct).length/answers.length*100:null});
  const uniqueTopics=[...new Set(latest.map(a=>a.question.topicId))].map(id=>{
    const answers=latest.filter(a=>a.question.topicId===id),s=summary(answers);
    return{topic_id:id,subject_id:answers[0].question.subject,name:answers[0].question.topic,question_count:s.count,correct_count:s.correct,percentage:s.percentage};
  });
  const repeatCount=all.length-first.length,repeatCorrect=all.filter(a=>a.correct).length-first.filter(a=>a.correct).length;
  return{unique:first.length,repeated:repeatCount,first:summary(first),repeat:{count:repeatCount,correct:repeatCorrect,percentage:repeatCount?repeatCorrect/repeatCount*100:null},outcomes:summary(all),uniqueTopics};
}
