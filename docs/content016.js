(function(root){'use strict';
const D=root.STAGE_DATA,T=root.STORY_DATA;
const order=['S','Cl','K','Mn','B','Si','Zn','Sn','Ga','In'];
const oldOrder=T.rescueOrder.slice(),oldStories={...T.stories};
const definitions=[
 ['S','硫黄',16,'#ffe6a0','私','ひとつずつ確かめよう',{name:'説明を抱えこむ光',hint:'守りも使って落ち着かせよう'},[{name:'ゆっくり広がる波',damage:7},{name:'説明をためこむ',damage:0,guard:5},{name:'抱えこんだ光',damage:13}]],
 ['Cl','塩素',17,'#d8ffb3','私','短く確認しましょう',{name:'確認が止まらない',hint:'次の行動を見て守ろう'},[{name:'確認の波',damage:7},{name:'見回りの構え',damage:3,guard:7},{name:'念入りな確認',damage:14}]],
 ['K','カリウム',19,'#e8d0ff','俺','俺も手を貸す！',{name:'先へ駆けすぎる',hint:'弱点切替はBREAKで止めよう'},[{name:'駆けだす波',damage:8},{name:'次へ急ぐ',damage:5,shift:true},{name:'勢いの一撃',damage:15}]],
 ['Mn','マンガン',25,'#e9d5ff','自分','自分もここを整える',{name:'仕事を抱えこむ',hint:'盾を通す技で助けよう'},[{name:'作業の波',damage:8},{name:'まだ整えようとする',damage:3,guard:8},{name:'抱えすぎの波',damage:16}]],
 ['B','ホウ素',5,'#d5ffe4','私','私も、少し工夫してみる',{name:'工夫が止まらない',hint:'回復と守りで力を合わせよう'},[{name:'工夫の光',damage:8},{name:'もう一度見直す',damage:5,shift:true},{name:'積みかさなる光',damage:16}]]
];
for(const [symbol,name,atomicNumber,tint,firstPerson,assist,gimmick,actions] of definitions){const image=`assets/characters016/${symbol}.png`;D.elements[symbol]={symbol,name,atomicNumber,tint,image};T.profiles[symbol]={firstPerson,core:{S:'堅実・辛抱・生活密着',Cl:'規律・責任・文脈',K:'瞬発・豪快・面倒見',Mn:'多能・調整・粘り',B:'工夫・粘り・控えめ'}[symbol]};root.GAME_PERSONALITY015[symbol]={firstPerson,phase:assist+'。……まだ止まれない。',assist};
 const boss={id:symbol,symbol,element_jp:name,atomic_no:atomicNumber,asset:image,behavior:gimmick.name,actions,support_unlock:symbol,gimmick:{...gimmick,rule:'ゲーム上の固有ルール。実際の化学的性質ではありません。'}};const previous=D.bosses.findIndex(b=>b.id===symbol);if(previous<0)D.bosses.push(boss);else D.bosses[previous]=boss;
 const support={id:symbol,symbol,element_jp:name,atomic_no:atomicNumber,asset:image,label:assist,supportRole:symbol==='Cl'?'防御型':symbol==='K'?'回復型':'支援型',supportHint:symbol==='Cl'?'盾で仲間を守る':symbol==='K'?'HPと手札を立て直す':'次の技を助ける',...(symbol==='Cl'?{shield:24,defense:.25}:symbol==='K'?{heal:28,redraw:true}:{attack:18,boost:1.2})};const p=D.supports.findIndex(s=>s.id===symbol);if(p<0)D.supports.push(support);else D.supports[p]=support;
}
T.stories={};oldOrder.forEach((symbol,i)=>T.stories[order.indexOf(symbol)+1]=oldStories[i+1]);
// Keep the accepted Ga/In/Sn stories; edit only references to allies who are not rescued yet.
T.stories[8]={before:T.stories[8].before.map(([s,line])=>[s==='Ga'?'Si':s==='In'?'Zn':s,line]),after:T.stories[8].after.map(([s,line])=>[s==='Ga'?'Si':s==='In'?'Zn':s,line.replace('ボクたち','僕たち')])};
T.stories[6]={before:T.stories[6].before.map(([s,line])=>[s==='Sn'?'Mn':s,s==='Sn'?line.replace('俺たち','自分たち'):line]),after:T.stories[6].after};
T.stories[7]={before:T.stories[7].before.map(([s,line])=>[s==='Ga'?'B':s==='In'?'Si':s==='Sn'?'Mn':s,line]),after:T.stories[7].after.map(([s,line])=>[s==='Ga'?'B':s==='In'?'Si':s==='Sn'?'Mn':s,line.replace('ボク','私')])};
const intros={S:'Sちゃん、ずっと一人で説明しているよ。',Cl:'Clちゃん、何度も見回っているね。',K:'Kちゃん、どんどん先へ行っちゃう！',Mn:'Mnちゃん、仕事を抱えすぎているみたい。',B:'Bちゃん、ずっと工夫を続けているよ。'};
const trouble={S:'私、ひとつずつ説明しないと……。まだ終わっていなくて。',Cl:'私が確認します。ここも、向こうも、もう一度……。',K:'俺が先に行く！ まだ止まれねえ！',Mn:'自分が整える。こっちも、あっちも、まだ残っている。',B:'私がもう少し工夫すれば……。主役はみんなだから。'};
const relief={S:'ありがとう。私、少しずつでよかったのね。',Cl:'助かりました。私も、みんなと確認していきます。',K:'助かった！ 俺、先に走りすぎたな。',Mn:'ありがとう。自分も、みんなに手伝ってもらおう。',B:'ありがとう。私、一人で工夫し続けなくてもよかったんだね。'};
definitions.forEach(([s],i)=>T.stories[i+1]={before:[['H',intros[s]],['O','声をかけても、落ち着かないみたい。'],[s,trouble[s]],['H','僕たちで助けよう！'],['O','うん。慌てず、力を合わせよう。']],after:[[s,relief[s]],['H','戻ってよかった！ 一緒に行こう！'],[s,'うん。一緒に行こう。'],['O','これからは、みんなで助け合おうね。']]});
// K uses its canonical brisk everyday speech rather than a generic soft response.
T.stories[3].after[2]=['K','おう！ 俺も付き合うぞ！'];
T.elementScience.Mn='マンガンは金属元素です。鉄を主成分とする合金などに使われます。';T.elementScience.B='ホウ素はガラスなどの材料に含まれる元素です。';
const rows=[
 ['KCl','塩化カリウム',{K:1,Cl:1},'chloride','塩化物','ATTACK',{attack:21},'https://fujifilmbiosciences.fujifilm.com/us/potassium-chloride.html'],
 ['KOH','水酸化カリウム',{K:1,O:1,H:1},'hydroxide','水酸化物','SHIELD',{shield:21},'https://labchem-wako.fujifilm.com/jp/product/detail/W01W0116-2181.html'],
 ['KNO3','硝酸カリウム',{K:1,N:1,O:3},'nitrate','硝酸塩','COMBO_SUPPORT',{chainBoost:.15,charge:15},'https://www.famic.go.jp/ffis/fert/sub6_data/bunshikiryotable.html'],
 ['KClO3','塩素酸カリウム',{K:1,Cl:1,O:3},'special','その他','ATTACK',{attack:29},'https://labchem-wako.fujifilm.com/jp/product/detail/W01W0116-1705.html'],
 ['KMnO4','過マンガン酸カリウム',{K:1,Mn:1,O:4},'special','その他','ATTACK',{attack:32},'https://labchem-wako.fujifilm.com/jp/product/detail/W01W0116-0419.html'],
 ['MnO2','二酸化マンガン',{Mn:1,O:2},'oxide','酸化物','DEFENSE',{defense:.4},'https://www.nies.go.jp/kisplus/dtl/chem/SJS00072'],
 ['H3BO3','ホウ酸',{H:3,B:1,O:3},'neutral','その他','UTILITY',{charge:24,boost:1.2},'https://labchem-wako.fujifilm.com/jp/product/spec_02-0219.pdf?jeAttribute=J'],
 ['NaBH4','水素化ホウ素ナトリウム',{Na:1,B:1,H:4},'special','その他','ATTACK',{attack:31},'https://www.tcichemicals.com/JP/ja/p/S0480'],
 ['H3NO·HCl','塩化ヒドロキシルアンモニウム',{H:4,N:1,O:1,Cl:1},'chloride','塩化物','UTILITY',{charge:25,boost:1.2},'https://www.tcichemicals.com/JP/ja/p/H1581']
];
const added=rows.filter(([f])=>!D.compounds.some(r=>r.formula===f)).map(([formula,name,needs,compoundType,chemicalClass,role,roleEffect,source])=>({id:'016-'+formula,formula,name,needs,compoundType,chemicalClass,role,roleEffect,source,tier:1,base:180,family:chemicalClass,effect:'rescue',science:`式は ${Object.entries(needs).map(([s,n])=>s+' ×'+n).join(' / ')} の原子の数比を表します。`+(formula==='H3NO·HCl'?'「·」の両側を合わせ、水素は合計4個です。':''),note:'戦闘効果はゲームのルールです。実際に混ぜたり飲食したりしないでください。'}));
D.compounds.push(...added);D.additions012.push(...added);D.additions016=added;
const initial=['H','C','N','O','Na','Mg','Al','Ca','Fe','Cu'];const basePool=D.compounds.filter(r=>!r.specialOnly&&Object.keys(r.needs).every(s=>initial.includes(s))).map(r=>r.formula);
T.rescueOrder=order;T.previousRescueOrder=oldOrder;
D.stageDefinitions=order.map((symbol,i)=>({id:i+1,name:symbol+'ちゃんをすくおう',description:'みんなで助けよう',baseSymbols:initial.slice(),symbols:initial.slice(),basePool:basePool.slice(),pool:basePool.slice(),bosses:[symbol],hpFactor:Math.min(1.4,1+i*.05),mob:'いたずらバグ'}));
root.CONTENT016={order,oldOrder,added};
})(window);
