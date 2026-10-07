(function(root){'use strict';const A=root.APP014,T=root.TUTORIAL017,$=id=>document.getElementById(id);
document.querySelector('.eyebrow').textContent='理系ねこラボ / Prototype 0.17';document.body.classList.add('version017');
const replay=document.createElement('label');replay.className='tutorial-replay017';replay.innerHTML='<input type="checkbox" id="tutorial-replay017"> STORY 1でチュートリアルをもう一度見る';$('title-screen').insertBefore(replay,$('start-button'));
function replayVisibility(){replay.hidden=!(root.STORY_ENGINE.progress.clearedStages.includes(1)&&document.querySelector('[data-stage="1"]')?.classList.contains('active'));}new MutationObserver(replayVisibility).observe($('stage-picker'),{childList:true});replayVisibility();
const coach=document.createElement('aside');coach.id='tutorial017';coach.hidden=true;coach.setAttribute('aria-label','チュートリアル');coach.innerHTML='<small>レスキューのコツ</small><p></p><div><button id="tutorial-next017">次へ</button><button id="tutorial-skip017">スキップ</button></div>';document.body.append(coach);
const steps=[['暴走している元素ちゃんを、化合物の力で落ち着かせて救出しよう！','#enemy-panel'],['まずは元素ちゃんを選んでみよう。種類と個数をそろえるよ。','#hand-grid'],['選んだら「組成を完成」を押そう！','#craft-button'],['H₂はHの原子が2つ。小さい数字は原子の個数だよ。','#recipe-list'],['△攻撃、□防御、○回復、☆支援。今ほしい力を選ぼう。','#recipe-list'],['弱点に合う化合物なら効果アップ！ 相性はゲームのルールだよ。','#weakness']];
let active=false,step=0,extras=new Set(),extra=null,wasBattle=false;
function unmark(){document.querySelectorAll('.tutorial-target017').forEach(e=>e.classList.remove('tutorial-target017'));}
function hide(){coach.hidden=true;unmark();}
function show(text,selector,action=false){unmark();coach.hidden=false;coach.querySelector('p').textContent=text;document.querySelector(selector)?.classList.add('tutorial-target017');$('tutorial-next017').hidden=action;coach.dataset.step=extra||String(step);}
function paint(){if(!active||$('game-screen').hidden){hide();return;}if(step<steps.length){show(...steps[step],step===1||step===2);return;}const s=A.state;if(!s){hide();return;}if(s.phase==='boss'&&s.breakHits>0&&!extras.has('break'))extra='break';else if(s.charge>=100&&!extras.has('support'))extra='support';else if(s.specialGauge>=100&&!extras.has('special'))extra='special';else extra=null;
if(extra==='break')show('弱点を当てて印をそろえるとBREAK！ 暴走がゆるんで救出チャンス。','#break-label');else if(extra==='support')show('サポートが準備できたよ！ 仲間の力も借りてみよう。','#special-button');else if(extra==='special')show('SPECIAL READY! 大きな化合物をスタックで作れるよ。','#synthesis-button');else hide();}
function sync(){const battle=!$('game-screen').hidden;if(battle&&!wasBattle&&A.stage===1&&(!T.state.complete||$('tutorial-replay017').checked)){active=true;step=0;extras=new Set();extra=null;$('tutorial-replay017').checked=false;}wasBattle=battle;if(active&&step===1&&A.state?.selected.size>=2)step=2;paint();}
$('tutorial-next017').onclick=()=>{if(extra){extras.add(extra);extra=null;}else step++;paint();};$('tutorial-skip017').onclick=()=>{active=false;T.complete(true);hide();};
const craft=$('craft-button').onclick;$('craft-button').onclick=async()=>{const s=A.state,before=s?.history.length||0;await craft();if(active&&step===2&&(s?.history.length||0)>before){step=3;paint();}};
new MutationObserver(()=>sync()).observe($('hand-grid'),{childList:true});new MutationObserver(()=>sync()).observe($('game-screen'),{attributes:true,attributeFilter:['hidden']});
const oldRender=root.UI015.render;root.UI015.render=function(){oldRender();sync();};const result=root.UI015.result;root.UI015.result=function(){result();if(active&&A.stage===1&&A.state?.result==='win'){active=false;T.complete();hide();A.toast('1人目を救出！','救出した元素ちゃん 1 / 118');}};
const reset=A.reset;A.reset=function(all){reset(all);if(all)T.reset();active=false;hide();};const title=A.returnTitle;A.returnTitle=function(){title();active=false;hide();};
root.UI017={sync,get tutorial(){return{active,step,extra,extras:[...extras],complete:T.state.complete}}};
})(window);
