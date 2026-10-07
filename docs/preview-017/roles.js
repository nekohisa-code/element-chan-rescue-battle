(function(root){
 const d=root.GAME_DATA;
 const roleEffects={
  H2O:{role:'HEAL',heal:12,label:'LAB HP +12'},
  CaCO3:{role:'SHIELD',shield:14,label:'SHIELD +14'},
  Al2O3:{role:'SHIELD',shield:18,label:'SHIELD +18'},
  MgO:{role:'DEFENSE',defense:.35,label:'次の攻撃35%軽減'},
  CaO:{role:'DEFENSE',defense:.25,shield:5,label:'次の攻撃25%軽減 / SHIELD +5'},
  'Mg(OH)2':{role:'DEFENSE',defense:.30,label:'次の攻撃30%軽減'},
  'Ca(OH)2':{role:'SHIELD',shield:12,defense:.12,label:'SHIELD +12 / 次の攻撃12%軽減'},
  'Al(OH)3':{role:'SHIELD',shield:16,label:'SHIELD +16'},
  NaCl:{role:'UTILITY',reroll:1,label:'手札入替回数 +1（最大5）'},
  MgCl2:{role:'UTILITY',swap:2,drawPool:['H','O','Cl'],label:'2枚をH / O / Cl候補で交換'},
  CaCl2:{role:'UTILITY',drawPool:['H','O','C','Cl'],label:'今回の補充をH / O / C / Clに限定'},
  NH3:{role:'COMBO_SUPPORT',boost:1.15,label:'次のATTACK +15%'},
  CO2:{role:'UTILITY',debuff:.20,label:'敵NEXTの威力20%軽減（1回）'},
  Na2CO3:{role:'UTILITY',shield:8,swap:1,label:'SHIELD +8 / 手札1枚交換'},
  MgCO3:{role:'HEAL',heal:6,shield:5,label:'LAB HP +6 / SHIELD +5'},
  Fe3O4:{role:'DEFENSE',defense:.40,label:'次の攻撃40%軽減'}
 };
 const icons={ATTACK:'M6 19 18 7l-1-4-4 1L2 15m1 4 4 3m-3-1 3-3',HEAL:'M12 20C-5 9 6 0 12 7c6-7 17 2 0 13M9 11h6m-3-3v6',DEFENSE:'M12 2 3 6v7q2 7 9 9 7-2 9-9V6ZM7 12h10',SHIELD:'M12 2 3 6v7q2 7 9 9 7-2 9-9V6ZM12 6v12m-5-6h10',UTILITY:'M4 9a8 8 0 0 1 14-3l3 3m0-6v6h-6M20 15A8 8 0 0 1 6 18l-3-3m0 6v-6h6',COMBO_SUPPORT:'M9 15 15 9M8 16l-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m2 1 2-2a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0'};
 const names={ATTACK:'攻撃',HEAL:'回復',DEFENSE:'軽減',SHIELD:'防壁',UTILITY:'補助',COMBO_SUPPORT:'コンボ'};
 for(const r of d.recipes){
  const old=d.effects[r.effect];
  r.roleEffect=roleEffects[r.formula]||{role:'ATTACK',attack:Math.max(18,old.attack),pierce:!!old.pierce,label:`${Math.max(18,old.attack)}攻撃${old.pierce?' / 敵シールド貫通':''}`};
  r.role=r.roleEffect.role;
  if(['NH3','CaCO3','Na2CO3','MgCO3'].includes(r.formula))r.compoundType='special';
 }
 d.roles=names;d.roleEffects=roleEffects;
 d.difficulties.expert.playerHp=96;d.enemies.expert.maxHp=144;
 d.enemies.normal.maxHp=124;
 const damage={beginner:[6,8,5],normal:[9,15,7,8],expert:[11,18,8,10]};
 for(const id of Object.keys(d.enemies))d.enemies[id].actions.forEach((a,i)=>{a.damage=damage[id][i];if(a.guard)a.guard=id==='expert'?12:8;if(a.swap)a.swap=id==='expert'?2:1;a.detail=`${a.damage}ダメージ${a.guard?`＋敵SHIELD ${a.guard}`:''}${a.swap?`＋${a.swap}枚入替`:''}`});
 d.difficulties.beginner.description='回復・防御と詳細ヒントで、戦闘を覚えよう。';
 d.difficulties.normal.description='敵NEXTとROLEを見て、攻守を選ぼう。';
 d.difficulties.expert.description='12元素・最小ヒント。相性と緊急入替を活用。';
 root.roleBadge=r=>`<span class="role-badge" data-role="${r.role}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${icons[r.role]}"/></svg>${names[r.role]}</span>`;
})(typeof window!=='undefined'?window:globalThis);
