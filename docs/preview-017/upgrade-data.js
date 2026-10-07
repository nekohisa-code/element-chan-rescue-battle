(function(root){
 const D=root.STAGE_DATA,G=root.GAME_DATA;
 const additions=[
 {id:'carbon-disulfide',formula:'CS2',name:'二硫化炭素',needs:{C:1,S:2},compoundType:'sulfide',role:'ATTACK',roleEffect:{attack:24},base:170,tier:2,family:'sulfide',effect:'blast',source:'https://www.icems.kyoto-u.ac.jp/news/10430/'},
 {id:'sodium-peroxide',formula:'Na2O2',name:'過酸化ナトリウム',needs:{Na:2,O:2},compoundType:'special',role:'ATTACK',roleEffect:{attack:26,pierce:true},base:180,tier:2,family:'peroxide',effect:'pierce',source:'https://anzeninfo.mhlw.go.jp/anzen/gmsds/1313-60-6.html'},
 {id:'copper-i-chloride',formula:'CuCl',name:'塩化銅(I)',needs:{Cu:1,Cl:1},compoundType:'chloride',role:'ATTACK',roleEffect:{attack:19},base:125,tier:3,family:'chloride',effect:'strike',source:'https://www.env.go.jp/content/900411191.pdf'}
 ];
 additions.forEach(r=>r.note='実際の実験・人体作用を再現しません。戦闘効果はゲーム上のルールです。');
 D.compounds.push(...additions);
 D.roleDesign={ATTACK:{glyph:'△',name:'攻撃',color:'#ff716d'},HEAL:{glyph:'○',name:'回復',color:'#58d8b5'},DEFENSE:{glyph:'□',name:'防御',color:'#70b8ff'},SHIELD:{glyph:'□',name:'防御',color:'#70b8ff'},UTILITY:{glyph:'◇',name:'支援',color:'#cf9cff'},COMBO_SUPPORT:{glyph:'◇',name:'支援',color:'#cf9cff'},SPECIAL:{glyph:'☆',name:'特殊',color:'#ffcf65'}};
 const first='H2O CO2 CH4 NH3 NaCl MgO CaO MgCl2 CaCl2 Na2O HCl NaOH CaCO3 CO NO H2O2 Ca(OH)2 Mg(OH)2 NaH MgH2'.split(' ');
 const second=[...first,...'HNO3 NaNO3 NH4Cl NO2 N2O Na2CO3 H2S SO2 CS2 Na2O2'.split(' ')];
 const third=[...second,...'Na2S MgS CaS H2SO4 Al2O3 AlCl3 AlN FeO Fe2O3 FeCl2 FeS CuO CuCl CuS Cu(OH)2'.split(' ')];
 D.stageDefinitions=[
 {id:1,name:'はじめての救出',description:'基本20化合物・たっぷりヒント',pool:first,bosses:['Li','Ag'],hpFactor:1,mob:'反応バグ',symbols:['H','C','N','O','Na','Mg','Cl','Ca']},
 {id:2,name:'タイプと守り',description:'30化合物・盾と強攻撃',pool:second,bosses:['Ag','Li'],hpFactor:1.18,mob:'強襲バグ',symbols:['H','C','N','O','Na','Mg','Cl','Ca','S']},
 {id:3,name:'暴走反応',description:'45化合物・ブレイクと連鎖',pool:third,bosses:['K','Xe'],hpFactor:1.3,mob:'混乱バグ',symbols:Object.keys(D.elements)}
 ];
 D.difficulty.beginner={...D.difficulty.beginner,playerHp:150,bossHp:110,damageScale:.65,shuffles:5};
 D.difficulty.normal={...D.difficulty.normal,playerHp:135,bossHp:150,damageScale:1.05,shuffles:4};
 D.difficulty.expert={...D.difficulty.expert,playerHp:125,bossHp:180,damageScale:1.25,shuffles:4};
 D.supports.find(s=>s.id==='lab').defense=.25;
 D.supports.find(s=>s.id==='lab').attack=12;
 D.supports.find(s=>s.id==='lab').label='守りのエール';
 D.supports.push({id:'Ne',symbol:'Ne',element_jp:'ネオン',atomic_no:10,asset:'assets/bosses/Ne-master.png',portraitClass:'ne-portrait',label:'ひらめきの交換',starter:true,redraw:true,boost:1.2});
 D.supports.forEach(s=>s.science=s.id==='lab'||s.id==='Ne'||s.id==='Xe'?'希ガス':s.id==='Ag'?'金属元素':'アルカリ金属');
 const classOverrides={H2O:'水',H2O2:'過酸化物',Na2O2:'過酸化物',CH4:'炭化水素',NH3:'その他',HNO3:'酸',H2SO4:'酸',Na2CO3:'炭酸塩',MgCO3:'炭酸塩',CaCO3:'炭酸塩',NaNO3:'硝酸塩',Na2SO4:'硫酸塩',MgSO4:'硫酸塩',CaSO4:'硫酸塩',FeSO4:'硫酸塩',CuSO4:'硫酸塩'};
 D.compounds.forEach(r=>r.chemicalClass=classOverrides[r.formula]||(r.family==='hydride'?'水素化物':r.family==='nitride'?'窒化物':G.compoundTypes[r.compoundType].name));
 D.additions=additions;
})(typeof window!=='undefined'?window:globalThis);
