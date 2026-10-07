(function (root) {
  "use strict";

  const elements = {
    H:  { symbol:"H",  name:"水素", atomicNumber:1,  image:"assets/H.png",  tint:"#fff1a8" },
    C:  { symbol:"C",  name:"炭素", atomicNumber:6,  image:"assets/C.png",  tint:"#e4e8ef" },
    N:  { symbol:"N",  name:"窒素", atomicNumber:7,  image:"assets/N.png",  tint:"#dce5ff" },
    O:  { symbol:"O",  name:"酸素", atomicNumber:8,  image:"assets/O.png",  tint:"#ffdce4" },
    Na: { symbol:"Na", name:"ナトリウム", atomicNumber:11, image:"assets/Na.png", tint:"#eadcff" },
    Mg: { symbol:"Mg", name:"マグネシウム", atomicNumber:12, image:"assets/Mg.png", tint:"#d8f4ff" },
    Al: { symbol:"Al", name:"アルミニウム", atomicNumber:13, image:"assets/Al.png", tint:"#e7eef7" },
    S:  { symbol:"S",  name:"硫黄", atomicNumber:16, image:"assets/S.png",  tint:"#fff0a0" },
    Cl: { symbol:"Cl", name:"塩素", atomicNumber:17, image:"assets/Cl.png", tint:"#daf5da" },
    Ca: { symbol:"Ca", name:"カルシウム", atomicNumber:20, image:"assets/Ca.png", tint:"#ffe5c8" },
    Fe: { symbol:"Fe", name:"鉄", atomicNumber:26, image:"assets/Fe.png", tint:"#d8dbe4" },
    Cu: { symbol:"Cu", name:"銅", atomicNumber:29, image:"assets/Cu.png", tint:"#ffd3ad" }
  };

  const effects = {
    heal:      { attack:5,  heal:14, shield:0,  draw:0, label:"5攻撃＋HP14回復" },
    strike:    { attack:18, heal:0,  shield:0,  draw:0, label:"18ダメージ" },
    blast:     { attack:25, heal:0,  shield:0,  draw:0, label:"25ダメージ" },
    guard:     { attack:8,  heal:0,  shield:14, draw:0, label:"8攻撃＋シールド14" },
    fortress:  { attack:5,  heal:0,  shield:24, draw:0, label:"5攻撃＋シールド24" },
    recovery:  { attack:8,  heal:10, shield:10, draw:0, label:"8攻撃＋HP10回復＋シールド10" },
    redraw:    { attack:10, heal:0,  shield:0,  draw:2, label:"10攻撃＋手札2枚を入替" },
    focus:     { attack:12, heal:0,  shield:5,  draw:0, focus:1.5, label:"12攻撃＋次の攻撃1.5倍" },
    pierce:    { attack:22, heal:0,  shield:0,  draw:0, pierce:true, label:"敵シールドを無視して22攻撃" }
  };

  const r = (id, formula, name, needs, effect, family, base, tier, note="") =>
    ({ id, formula, name, needs, effect, family, base, tier, note });

  const recipes = [
    r("water","H2O","水",{H:2,O:1},"heal","water",120,1),
    r("carbon-dioxide","CO2","二酸化炭素",{C:1,O:2},"guard","oxide",145,1),
    r("methane","CH4","メタン",{C:1,H:4},"blast","carbon",190,1),
    r("ammonia","NH3","アンモニア",{N:1,H:3},"redraw","nitrogen",175,1),
    r("sodium-chloride","NaCl","塩化ナトリウム",{Na:1,Cl:1},"guard","chloride",105,1),
    r("magnesium-oxide","MgO","酸化マグネシウム",{Mg:1,O:1},"strike","oxide",120,1),
    r("calcium-oxide","CaO","酸化カルシウム",{Ca:1,O:1},"strike","oxide",125,1),
    r("magnesium-chloride","MgCl2","塩化マグネシウム",{Mg:1,Cl:2},"fortress","chloride",155,1),
    r("calcium-chloride","CaCl2","塩化カルシウム",{Ca:1,Cl:2},"recovery","chloride",155,1),
    r("sodium-oxide","Na2O","酸化ナトリウム",{Na:2,O:1},"blast","oxide",160,1),
    r("hydrogen-chloride","HCl","塩化水素",{H:1,Cl:1},"strike","chloride",110,1,"水溶液は塩酸。ここではHCl単体を塩化水素と表記。"),
    r("sodium-hydroxide","NaOH","水酸化ナトリウム",{Na:1,O:1,H:1},"recovery","hydroxide",155,1),
    r("calcium-carbonate","CaCO3","炭酸カルシウム",{Ca:1,C:1,O:3},"fortress","carbon",220,1),
    r("carbon-monoxide","CO","一酸化炭素",{C:1,O:1},"strike","oxide",100,1),
    r("nitric-oxide","NO","一酸化窒素",{N:1,O:1},"strike","nitrogen",105,1),
    r("hydrogen-peroxide","H2O2","過酸化水素",{H:2,O:2},"recovery","water",185,1),

    r("nitric-acid","HNO3","硝酸",{H:1,N:1,O:3},"blast","nitrogen",230,2),
    r("calcium-hydroxide","Ca(OH)2","水酸化カルシウム",{Ca:1,O:2,H:2},"recovery","hydroxide",225,2),
    r("magnesium-hydroxide","Mg(OH)2","水酸化マグネシウム",{Mg:1,O:2,H:2},"recovery","hydroxide",225,2),
    r("sodium-nitrate","NaNO3","硝酸ナトリウム",{Na:1,N:1,O:3},"blast","nitrogen",220,2),
    r("ammonium-chloride","NH4Cl","塩化アンモニウム",{N:1,H:4,Cl:1},"recovery","chloride",250,2),
    r("nitrogen-dioxide","NO2","二酸化窒素",{N:1,O:2},"strike","nitrogen",150,2),
    r("nitrous-oxide","N2O","亜酸化窒素",{N:2,O:1},"focus","nitrogen",155,2),
    r("sodium-carbonate","Na2CO3","炭酸ナトリウム",{Na:2,C:1,O:3},"fortress","carbon",260,2),
    r("magnesium-carbonate","MgCO3","炭酸マグネシウム",{Mg:1,C:1,O:3},"guard","carbon",220,2),
    r("sodium-hydride","NaH","水素化ナトリウム",{Na:1,H:1},"strike","hydride",115,2),
    r("magnesium-hydride","MgH2","水素化マグネシウム",{Mg:1,H:2},"strike","hydride",155,2),
    r("calcium-hydride","CaH2","水素化カルシウム",{Ca:1,H:2},"blast","hydride",160,2),
    r("hydrogen-sulfide","H2S","硫化水素",{H:2,S:1},"redraw","sulfide",155,2),
    r("sulfur-dioxide","SO2","二酸化硫黄",{S:1,O:2},"guard","oxide",165,2),
    r("sulfuric-acid","H2SO4","硫酸",{H:2,S:1,O:4},"pierce","sulfate",295,2),
    r("sodium-sulfate","Na2SO4","硫酸ナトリウム",{Na:2,S:1,O:4},"fortress","sulfate",300,2),
    r("aluminum-oxide","Al2O3","酸化アルミニウム",{Al:2,O:3},"fortress","oxide",235,2),

    r("sulfur-trioxide","SO3","三酸化硫黄",{S:1,O:3},"blast","oxide",205,3),
    r("sodium-sulfide","Na2S","硫化ナトリウム",{Na:2,S:1},"strike","sulfide",165,3),
    r("magnesium-sulfide","MgS","硫化マグネシウム",{Mg:1,S:1},"guard","sulfide",125,3),
    r("calcium-sulfide","CaS","硫化カルシウム",{Ca:1,S:1},"guard","sulfide",125,3),
    r("magnesium-sulfate","MgSO4","硫酸マグネシウム",{Mg:1,S:1,O:4},"recovery","sulfate",260,3),
    r("calcium-sulfate","CaSO4","硫酸カルシウム",{Ca:1,S:1,O:4},"fortress","sulfate",260,3),
    r("aluminum-chloride","AlCl3","塩化アルミニウム",{Al:1,Cl:3},"blast","chloride",205,3),
    r("aluminum-hydroxide","Al(OH)3","水酸化アルミニウム",{Al:1,O:3,H:3},"recovery","hydroxide",300,3),
    r("aluminum-nitride","AlN","窒化アルミニウム",{Al:1,N:1},"strike","nitride",125,3),
    r("aluminum-sulfide","Al2S3","硫化アルミニウム",{Al:2,S:3},"blast","sulfide",235,3),
    r("iron-ii-oxide","FeO","酸化鉄(II)",{Fe:1,O:1},"guard","oxide",130,3),
    r("iron-iii-oxide","Fe2O3","酸化鉄(III)",{Fe:2,O:3},"fortress","oxide",240,3),
    r("iron-ii-iii-oxide","Fe3O4","四酸化三鉄",{Fe:3,O:4},"pierce","oxide",320,3),
    r("iron-ii-chloride","FeCl2","塩化鉄(II)",{Fe:1,Cl:2},"guard","chloride",165,3),
    r("iron-iii-chloride","FeCl3","塩化鉄(III)",{Fe:1,Cl:3},"blast","chloride",205,3),
    r("iron-sulfide","FeS","硫化鉄(II)",{Fe:1,S:1},"strike","sulfide",130,3),
    r("iron-ii-sulfate","FeSO4","硫酸鉄(II)",{Fe:1,S:1,O:4},"guard","sulfate",265,3),
    r("iron-ii-hydroxide","Fe(OH)2","水酸化鉄(II)",{Fe:1,O:2,H:2},"recovery","hydroxide",225,3),
    r("iron-iii-hydroxide","Fe(OH)3","水酸化鉄(III)",{Fe:1,O:3,H:3},"fortress","hydroxide",300,3),
    r("copper-i-oxide","Cu2O","酸化銅(I)",{Cu:2,O:1},"strike","oxide",170,3),
    r("copper-ii-oxide","CuO","酸化銅(II)",{Cu:1,O:1},"strike","oxide",130,3),
    r("copper-ii-chloride","CuCl2","塩化銅(II)",{Cu:1,Cl:2},"guard","chloride",165,3),
    r("copper-ii-sulfide","CuS","硫化銅(II)",{Cu:1,S:1},"strike","sulfide",130,3),
    r("copper-ii-sulfate","CuSO4","硫酸銅(II)",{Cu:1,S:1,O:4},"pierce","sulfate",265,3),
    r("copper-ii-hydroxide","Cu(OH)2","水酸化銅(II)",{Cu:1,O:2,H:2},"recovery","hydroxide",225,3)
  ];

  const enemies = {
    beginner:{ id:"reaction-bug", name:"REACTION BUG", label:"リアクション・バグ", maxHp:92, weakness:"oxide", color:"#42cee8", actions:[
      {type:"attack",name:"ちいさなバグ",damage:7,detail:"7ダメージ"},
      {type:"attack",name:"ノイズ・タップ",damage:10,detail:"10ダメージ"},
      {type:"disrupt",name:"カードかく乱",damage:5,swap:1,detail:"5ダメージ＋1枚入替"}
    ]},
    normal:{ id:"power-bug", name:"POWER BUG", label:"パワー・バグ", maxHp:132, weakness:"chloride", color:"#ff8b46", actions:[
      {type:"attack",name:"パワー・パンチ",damage:11,detail:"11ダメージ"},
      {type:"heavy",name:"オーバーロード",damage:17,detail:"17ダメージ"},
      {type:"guard",name:"バグ・バリア",damage:7,guard:10,detail:"7ダメージ＋敵シールド10"},
      {type:"disrupt",name:"配列かく乱",damage:8,swap:2,detail:"8ダメージ＋2枚入替"}
    ]},
    expert:{ id:"chaos-bug", name:"CHAOS BUG", label:"カオス・バグ", maxHp:168, weakness:"sulfate", color:"#b16cff", actions:[
      {type:"attack",name:"カオス・ビーム",damage:14,detail:"14ダメージ"},
      {type:"heavy",name:"クリティカル・エラー",damage:22,detail:"22ダメージ"},
      {type:"guard",name:"変異バリア",damage:9,guard:16,detail:"9ダメージ＋敵シールド16"},
      {type:"disrupt",name:"元素シャッフル",damage:11,swap:3,detail:"11ダメージ＋3枚入替"}
    ]}
  };

  const difficulties = {
    beginner:{ id:"beginner", name:"BEGINNER", jp:"ビギナー", tier:1, symbols:["H","C","N","O","Na","Mg","Cl","Ca"], shuffles:3, playerHp:92, hintMode:"full", description:"8元素・16レシピ。構成と効果を常時表示。" },
    normal:{ id:"normal", name:"NORMAL", jp:"ノーマル", tier:2, symbols:["H","C","N","O","Na","Mg","Al","S","Cl","Ca"], shuffles:2, playerHp:88, hintMode:"partial", description:"10元素・33レシピ。詳細ヒントは得点補正つき。" },
    expert:{ id:"expert", name:"EXPERT", jp:"エキスパート", tier:3, symbols:Object.keys(elements), shuffles:1, playerHp:84, hintMode:"minimal", description:"12元素・58レシピ。最小ヒントと強い敵行動。" }
  };

  const compoundTypes = {
    oxide:{name:"酸化物",shape:"circle",glyph:"○",color:"#bd2941",background:"#ffe4e8"},
    chloride:{name:"塩化物",shape:"square",glyph:"□",color:"#187b47",background:"#e0f5e7"},
    hydroxide:{name:"水酸化物",shape:"triangle",glyph:"△",color:"#265fc1",background:"#e5eeff"},
    sulfide:{name:"硫化物",shape:"diamond",glyph:"◇",color:"#a25400",background:"#fff0cc"},
    carbonate:{name:"炭酸塩",shape:"pill",glyph:"▭",color:"#6353a3",background:"#eee8ff"},
    nitrate:{name:"硝酸塩",shape:"pill",glyph:"▭",color:"#47677a",background:"#e6f1f5"},
    sulfate:{name:"硫酸塩",shape:"pill",glyph:"▭",color:"#8c536f",background:"#fae9f1"},
    neutral:{name:"中立",shape:"pill",glyph:"▭",color:"#505c72",background:"#eef1f6"},
    special:{name:"特殊",shape:"pill",glyph:"☆",color:"#746048",background:"#f7eee4"}
  };
  const assignments = {
    oxide:["CO2","MgO","CaO","Na2O","CO","NO","NO2","N2O","SO2","SO3","Al2O3","FeO","Fe2O3","Fe3O4","Cu2O","CuO"],
    chloride:["NaCl","MgCl2","CaCl2","HCl","NH4Cl","AlCl3","FeCl2","FeCl3","CuCl2"],
    hydroxide:["NaOH","Ca(OH)2","Mg(OH)2","Al(OH)3","Fe(OH)2","Fe(OH)3","Cu(OH)2"],
    sulfide:["H2S","Na2S","MgS","CaS","Al2S3","FeS","CuS"],
    carbonate:["CaCO3","Na2CO3","MgCO3"],nitrate:["NaNO3"],sulfate:["Na2SO4","MgSO4","CaSO4","FeSO4","CuSO4"],
    neutral:["H2O","CH4","NH3"],special:["HNO3","H2SO4","H2O2","NaH","MgH2","CaH2","AlN"]
  };
  for(const recipe of recipes) recipe.compoundType=Object.keys(assignments).find(type=>assignments[type].includes(recipe.formula));
  for(const el of Object.values(elements)) el.image=`assets/elements/battle/${el.symbol}.png`;
  const mainTypes=["oxide","chloride","hydroxide","sulfide"];
  const beats={oxide:"chloride",chloride:"hydroxide",hydroxide:"sulfide",sulfide:"oxide"};
  const typeChart=Object.keys(compoundTypes).flatMap(attackerType=>Object.keys(compoundTypes).map(defenderType=>({attackerType,defenderType,multiplier:beats[attackerType]===defenderType?1.5:beats[defenderType]===attackerType?.7:1})));
  Object.assign(enemies.beginner,{battleType:"chloride",weakType:"oxide",resistType:"hydroxide"});
  Object.assign(enemies.normal,{battleType:"hydroxide",weakType:"chloride",resistType:"sulfide"});
  Object.assign(enemies.expert,{battleType:"oxide",weakType:"sulfide",resistType:"chloride"});
  const data = { elements, effects, recipes, enemies, difficulties, compoundTypes, typeChart };
  root.GAME_DATA = data;
  if (typeof module !== "undefined" && module.exports) module.exports = data;
}(typeof window !== "undefined" ? window : globalThis));
