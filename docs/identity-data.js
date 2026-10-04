(function(){
 const D=STAGE_DATA;
 const additions=[
 {id:'carbonic-acid',formula:'H2CO3',name:'炭酸',needs:{H:2,C:1,O:3},compoundType:'special',chemicalClass:'酸',role:'UTILITY',roleEffect:{debuff:.25},base:155,tier:2,family:'acid',effect:'redraw',source:'https://pubchem.ncbi.nlm.nih.gov/compound/Carbonic-Acid'},
 {id:'sodium-bicarbonate',formula:'NaHCO3',name:'炭酸水素ナトリウム',needs:{Na:1,H:1,C:1,O:3},compoundType:'special',chemicalClass:'炭酸水素塩',role:'SHIELD',roleEffect:{shield:16},base:170,tier:2,family:'bicarbonate',effect:'guard',source:'https://chemicalsafety.ilo.org/dyn/icsc/showcard.display?p_card_id=1044&p_lang=ja&p_version=2'},
 {id:'calcium-carbide',formula:'CaC2',name:'炭化カルシウム',needs:{Ca:1,C:2},compoundType:'special',chemicalClass:'炭化物',role:'ATTACK',roleEffect:{attack:22,pierce:true},base:150,tier:1,family:'carbide',effect:'pierce',source:'https://anzeninfo.mhlw.go.jp/anzen/gmsds/1385.html'}
 ];
 additions.forEach(r=>r.note='戦闘効果は創作です。実験手順・人体作用は再現しません。現実で混ぜたり飲食したりしないでください。');
 D.compounds.push(...additions);
 D.stageDefinitions[0].pool.push('CaC2');D.stageDefinitions[1].pool.push(...additions.map(r=>r.formula));D.stageDefinitions[2].pool.push(...additions.map(r=>r.formula),'MgCO3');
 D.stageDefinitions[0].mob='いたずらバグ';D.stageDefinitions[1].mob='あばれバグ';D.stageDefinitions[2].mob='こんらんバグ';
 const gimmicks={Li:{name:'火花ためこみ',hint:'守り・支援でためこみ停止',rule:'力をためるで暴走＋8。防御/防壁/支援で次の増加を止める。'},K:{name:'弱点チェンジ',hint:'次の弱点を見て技を選ぼう',rule:'予告された弱点切替で相性が変わる。BREAKで切替行動も止められる。'},Ag:{name:'銀の防壁',hint:'盾には貫通技が便利',rule:'銀の防壁で盾＋8。貫通技は敵の盾を無視。'},Xe:{name:'応援の共鳴',hint:'サポートでさらに−8',rule:'どのサポートでも追加で暴走エネルギー−8。手札ゆらしは保証付き。'}};
 D.bosses.forEach(b=>b.gimmick=gimmicks[b.id]);
 D.supports.push({id:'Ar',symbol:'Ar',element_jp:'アルゴン',atomic_no:18,asset:'assets/bosses/Ar-master.png',portraitClass:'ar-portrait',label:'安心のひかり',starter:true,heal:20,shield:14,defense:.35,emergencyHeal:12,science:'希ガス'});
 const profiles={lab:['守り型','回復＋盾＋軽減'],Li:['攻撃型','大きく暴走をしずめる'],K:['立て直し型','回復＋手札を整理'],Ag:['防壁型','大きな盾を張る'],Xe:['連鎖支援型','次の攻撃を強化'],Ne:['候補発見型','攻守回復を作れる手札へ'],Ar:['緊急救済型','HP35%以下なら追加回復']};
 D.supports.forEach(s=>{[s.supportRole,s.supportHint]=profiles[s.id]});
 D.roleDesign.UTILITY.glyph='☆';D.roleDesign.COMBO_SUPPORT.glyph='☆';
 D.roleDesign.SPECIAL.name='サポート';
 D.additions011=additions;
})();
