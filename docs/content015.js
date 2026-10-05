(function(root){'use strict';
const D=root.STAGE_DATA,T=root.STORY_DATA;
// Game-derived lines only. Authoritative 2026-10-05 records were inspected;
// unknown personality fields remain unknown. The source itself is read-only.
T.profiles.Zn={...T.profiles.Zn,firstPerson:'僕',secondPerson:'きみ',core:'献身・現実・保全'};
const rows=[
 ['acetic','C2H4O2','酢酸',{C:2,H:4,O:2},'ATTACK',{attack:38,debuff:.4},'カルボン酸','Acetic-Acid','カルボン酸の一つです。同じ分子式を持つ別の物質もあり、式だけで構造は決まりません。'],
 ['citric','C6H8O7','クエン酸',{C:6,H:8,O:7},'UTILITY',{charge:35,boost:1.3},'カルボン酸','311','分子一つに炭素6、水素8、酸素7の原子を含む有機化合物です。'],
 ['caffeine','C8H10N4O2','カフェイン',{C:8,H:10,N:4,O:2},'COMBO_SUPPORT',{charge:20,chainBoost:.2},'その他','2519','分子一つに炭素8、水素10、窒素4、酸素2の原子を含みます。ゲームの連鎖効果は実際の健康効果ではありません。'],
 ['urea','CH4N2O','尿素',{C:1,H:4,N:2,O:1},'SHIELD',{shield:30,charge:15},'その他','1176','炭素1、水素4、窒素2、酸素1の原子からなる分子です。'],
 ['benzene','C6H6','ベンゼン',{C:6,H:6},'ATTACK',{attack:58},'芳香族炭化水素','241','炭素6と水素6の原子を持つ有機化合物です。発がん性のある危険な物質です。ゲームの技を実際の使用法と結びつけないでください。']
];
for(const [id,formula,name,needs,role,roleEffect,chemicalClass,cid,science] of rows){const r={id:'015-special-'+id,formula,name,needs,role,roleEffect,chemicalClass,compoundType:'special',specialOnly:true,base:300,science,source:'https://pubchem.ncbi.nlm.nih.gov/compound/'+cid,note:'戦闘効果はゲーム上のルールです。実際の物質を混ぜたり、飲食したりしないでください。'};D.specialRecipes.push(r);D.compounds.push(r);}
D.specialRecipes.forEach((r,i)=>{r.unlockStage=[0,1,2,3,4,5,3,4][i];r.technique=['glucose','ethanol','sucrose','acetic','citric','caffeine','urea','benzene'][i];r.bonus=i>=6;});
root.GAME_PERSONALITY015={
 Ga:{firstPerson:'ボク',phase:'ボク、まだ試したいことがいっぱいあるんだ！',assist:'ボクも手伝うよ！'},
 In:{firstPerson:'僕',phase:'僕がもう少し頑張れば……。',assist:'僕もここを支えるね。'},
 Sn:{firstPerson:'俺',phase:'俺が直せば、まだ大丈夫だ。',assist:'俺も手を貸すぞ。'},
 Si:{firstPerson:'僕',phase:'この道なら……次は切り替えてみよう。',assist:'僕が道を整えるよ。'},
 Zn:{firstPerson:'僕',phase:'僕が守れば、みんな安心できるよね。',assist:'僕も一緒に守るよ。'}
};
})(window);
