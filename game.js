let enemy = {
  name: "Grog",
  health: 100,
  attackCount: 0,
  modifiers: [],
}

let items = {
  fire: { name: "Fire", modifier: 2, description: "IT BURNS!" },
  armor: { name: "Armor", modifier: -3, description: "My Defense is rock Solid!" },
  oil: { name: "Oil", modifier: 20, description: "All oily, I better stay away from any flames!" }
}

function Slap() {
  DamageEnemy(1);
}

function SwordSlash() {
  DamageEnemy(5);
}

function FireBall() {
  DamageEnemy(10);
}

function GiveFire() {
  enemy.modifiers.push(items.fire);
  Update();
}

function GiveArmor() {
  enemy.modifiers.push(items.armor);
  Update();
}

function GiveOil() {
  enemy.modifiers.push(items.oil);
  Update();
}

function Update() {
  document.getElementById("enemyHealth").innerText = enemy.health.toString();
  document.getElementById("attackCount").innerText = enemy.attackCount.toString();
  let modificationString = CreateModsList();
  document.getElementById("modifiers").innerText = modificationString;
  document.getElementById("enemyName").innerText = enemy.name;
}

function CalculateDamage(damage) {
  let moddedDamage = damage += addMods();
  return moddedDamage <= 0 ? 0 : moddedDamage;
}

function CreateModsList() {
  let modifiers = [];

  enemy.modifiers.forEach(item => {
    modifiers.push(`${item.name} Modification: ${item.modifier}`)
  });

  return modifiers.join("\n");
}

function addMods() {
  let totalModification = 0;

  for (let i = 0; i < enemy.modifiers.length; i++) {
    let item = enemy.modifiers[i];
    totalModification += item.modifier;
  }
  return totalModification;
}

function DamageEnemy(damage) {
  enemy.health -= CalculateDamage(damage);
  if (enemy.health < 0) {
    enemy.health = 0;
  }

  enemy.attackCount++;
  Update();
}

function Reset() {
  enemy.health = 100;
  enemy.attackCount = 0;
  enemy.modifiers = [];
  Update();
}

Update();