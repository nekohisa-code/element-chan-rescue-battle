(function(){
 const E=STAGE_ENGINE,oldApply=E.apply,oldSpecial=E.special;
 // Add a small energy reward, not a new damage multiplier or an Expert rebalance.
 E.apply=function(s,r,isNew=false,rng=Math.random){
  const hadChance=!!s.rescueChance,out=oldApply(s,r,isNew,rng);
  out.chanceBonus=hadChance&&out.mult>1&&r.role==='ATTACK';
  if(out.chanceBonus){s.charge=Math.min(100,s.charge+12);s.rescueChance=false;}
  if(s.phase==='boss'&&(out.broken||(!s.lowEnergyChanceUsed&&s.enemyHp<=s.enemyMaxHp*.35))){s.rescueChance=true;if(s.enemyHp<=s.enemyMaxHp*.35)s.lowEnergyChanceUsed=true;}
  return out;
 };
 E.special=function(s,support,rng=Math.random){const out=oldSpecial(s,support,rng);if(out&&s.phase==='boss'&&!s.lowEnergyChanceUsed&&s.enemyHp>0&&s.enemyHp<=s.enemyMaxHp*.35){s.rescueChance=true;s.lowEnergyChanceUsed=true;}return out;};
})();
