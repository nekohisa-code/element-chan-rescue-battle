(function(root){
 const d=root.GAME_DATA;
 d.roles={ATTACK:'攻撃',HEAL:'回復',DEFENSE:'防御',SHIELD:'シールド',UTILITY:'支援',COMBO_SUPPORT:'連鎖支援'};
 const difficulty={beginner:{...d.difficulties.beginner,jp:'初級',playerHp:120,bossHp:160,damageScale:.75,shuffles:5},normal:{...d.difficulties.normal,jp:'中級',playerHp:112,bossHp:220,damageScale:1.25,shuffles:4},expert:{...d.difficulties.expert,jp:'上級',playerHp:110,bossHp:280,damageScale:1.7,shuffles:3}};
 const bosses=[
 {id:'Li',atomic_no:3,symbol:'Li',element_jp:'リチウム',asset:'assets/bosses/Li.png',behavior:'高火力型',actions:[{name:'火花の一撃',damage:7},{name:'力をためる',damage:0},{name:'予告の強打',damage:16}],support_unlock:'Li'},
 {id:'K',atomic_no:19,symbol:'K',element_jp:'カリウム',asset:'assets/bosses/K.png',behavior:'変化型',actions:[{name:'揺らぎの波',damage:8},{name:'弱点切替',damage:5,shift:true},{name:'連続の火花',damage:9,hits:3}],support_unlock:'K'},
 {id:'Ag',atomic_no:47,symbol:'Ag',element_jp:'銀',asset:'assets/bosses/Ag.png',behavior:'高防御型',actions:[{name:'銀の防壁',damage:5,guard:8},{name:'きらめく打撃',damage:10},{name:'力をためる',damage:0}],support_unlock:'Ag'},
 {id:'Xe',atomic_no:54,symbol:'Xe',element_jp:'キセノン',asset:'assets/bosses/Xe.png',behavior:'妨害型',actions:[{name:'星の波動',damage:8},{name:'手札ゆらし',damage:5,swap:1},{name:'光の連撃',damage:12,hits:3}],support_unlock:'Xe'}
 ];
 const supports=[{id:'lab',symbol:'He',element_jp:'ヘリウム',atomic_no:2,asset:'assets/bosses/He.png',label:'ヘリウムの応援',attack:24,heal:16,shield:8,starter:true},...bosses.map(b=>({...b,label:{Li:'火花のエール',K:'立て直しの風',Ag:'銀のまもり',Xe:'星の連鎖'}[b.id],...({Li:{attack:38},K:{heal:28,redraw:true},Ag:{shield:28,attack:12},Xe:{attack:24,boost:1.3}}[b.id])}))];
 root.STAGE_DATA={elements:d.elements,compounds:d.recipes,bosses,supports,difficulty,typeChart:d.typeChart,stages:['warmup','boss'],beats:{oxide:'chloride',chloride:'hydroxide',hydroxide:'sulfide',sulfide:'oxide'},mainTypes:['oxide','chloride','hydroxide','sulfide']};
})(typeof window!=='undefined'?window:globalThis);
