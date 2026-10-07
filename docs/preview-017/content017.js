/* 0.17: exact existing recipes, fresh H/N/O/C pool only. No new unlock condition. */
(function(root){'use strict';const D=root.STAGE_DATA,initial=['H','N','O','C'];
const pool=D.compounds.filter(r=>!r.specialOnly&&Object.keys(r.needs).every(s=>initial.includes(s))).map(r=>r.formula);
for(const def of D.stageDefinitions){def.baseSymbols=initial.slice();def.symbols=initial.slice();def.basePool=pool.slice();def.pool=pool.slice();}
root.CONTENT017={initial,hnocRecipes:D.compounds.filter(r=>Object.keys(r.needs).every(s=>initial.includes(s))),normalHNOC:pool};
})(window);
