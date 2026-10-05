(function(root){'use strict';
const D=root.STAGE_DATA,S=root.STORY_ENGINE,qa=new URLSearchParams(location.search).has('qa'),key=qa?'element013-qa-collection':'element013-collection';
const array=v=>Array.isArray(v)?v:[],unique=v=>[...new Set(array(v))];
let saved={},legacyRescued=[];try{saved=JSON.parse(localStorage.getItem(key))||{};if(!qa)legacyRescued=array(JSON.parse(localStorage.getItem('element011-rescued')));}catch(_){}
const known=new Map();Object.values(D.elements).forEach(e=>known.set(e.symbol,{symbol:e.symbol,name:e.name,no:e.atomicNumber,asset:e.image}));D.bosses.forEach(e=>known.set(e.symbol,{symbol:e.symbol,name:e.element_jp,no:e.atomic_no,asset:e.asset}));D.supports.forEach(e=>known.set(e.symbol,{symbol:e.symbol,name:e.element_jp,no:e.atomic_no,asset:e.asset}));
const state={discoveredElements:unique([...array(saved.discoveredElements),...S.progress.rescuedElements,...legacyRescued]).filter(s=>known.has(s)),discoveredWeaknesses:saved.discoveredWeaknesses&&typeof saved.discoveredWeaknesses==='object'&&!Array.isArray(saved.discoveredWeaknesses)?saved.discoveredWeaknesses:{},stageMissions:saved.stageMissions&&typeof saved.stageMissions==='object'&&!Array.isArray(saved.stageMissions)?saved.stageMissions:{}};
// A migrated successful compound is evidence of its constituent elements being used.
for(const id of S.progress.discoveredCompounds){const r=D.compounds.find(r=>r.id===id);if(r)for(const s of Object.keys(r.needs))if(!state.discoveredElements.includes(s))state.discoveredElements.push(s);}
function save(){try{localStorage.setItem(key,JSON.stringify(state));return true}catch(_){return false}}
const missionDefs={1:[['support','サポートを1回使おう'],['guard','盾か守りを1回使おう'],['break','BREAKしよう']],2:[['heal','回復を1回使おう'],['support','サポートを1回使おう'],['break','BREAKしよう']],3:[['guard','盾か守りを1回使おう'],['support','サポートを1回使おう'],['break','BREAKしよう']]};
function missions(stage){return missionDefs[stage].map(([id,label])=>({id,label,done:array(state.stageMissions[stage]).includes(id)}));}
function mission(stage,id){if(!missionDefs[stage]?.some(x=>x[0]===id))return false;const a=array(state.stageMissions[stage]);if(a.includes(id))return false;state.stageMissions[stage]=[...a,id];save();return true;}
function register(symbols){const fresh=unique(symbols).filter(s=>known.has(s)&&!state.discoveredElements.includes(s));state.discoveredElements.push(...fresh);save();return fresh;}
function weakness(boss,type){const a=array(state.discoveredWeaknesses[boss]);if(a.includes(type))return false;state.discoveredWeaknesses[boss]=[...a,type];save();return true;}
function knows(boss,type){return array(state.discoveredWeaknesses[boss]).includes(type);}
save();root.COLLECTION013={state,known,register,save,missions,mission,weakness,knows};
})(window);
