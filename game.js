let enemy = {
  name: "Grog",
  health: 100,
  maxHealth: 100,
  attackCount: 0,
  modifiers: [],
}

let items = {
  fire: { name: "Fire", modifier: 2, description: "IT BURNS!", imgUrl: "flame.png", multiplier: 1, count: 5 },
  armor: { name: "Armor", modifier: -3, description: "My Defense is rock Solid!", imgUrl: "armor.png", multiplier: 1, count: 1 },
  explosive: { name: "Explosive", modifier: 20, description: "Harmless explosive. Hope no sudden vibrations occur", imgUrl: "bomb.png", multiplier: 1, count: 1 }
}

let activeModifierIcons = [];

let itemModal = document.getElementById("ruleBreaker");

let modifierList = document.getElementById("modifiers");

let enemyDead = false;

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
  GiveEnemyModification("fire");
  Update();
}

function GiveArmor() {
  GiveEnemyModification("armor");
  Update();
}

function GiveExplosive() {
  GiveEnemyModification("explosive");
  Update();
}

function Update() {
  document.getElementById("enemyHealth").innerText = enemy.health.toString();
  document.getElementById("healthBar").style.width = CalcHealthBarPercentage();
  document.getElementById("attackCount").innerText = enemy.attackCount.toString();
  document.getElementById("enemyName").innerText = enemy.name;

  if (enemyDead) {
    if (confirm("You have slain Grog. Would you like to fight him again?"))
      Reset();
  }
}

function CalcHealthBarPercentage() {
  const barWidthScale = 0.8;
  let barFillPercent = (enemy.health / enemy.maxHealth) * barWidthScale * 100;
  return `${barFillPercent}%`;
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

  return "\n" + modifiers.join("\n");
}

function addMods() {
  let totalModification = 0;
  let bombsToRemove = []
  for (let i = 0; i < enemy.modifiers.length; i++) {
    let item = enemy.modifiers[i];
    totalModification += item.modifier;
    if (item == items.explosive) {
      bombsToRemove.push(item);
    }
  }

  bombsToRemove.forEach(bomb => {
    let bombIndex = enemy.modifiers.indexOf(bomb)
    enemy.modifiers.splice(bombIndex, 1);
    RemoveModificationToken("explosive");
  })
  return totalModification;
}

function DamageEnemy(damage) {
  enemy.health -= CalculateDamage(damage);
  if (enemy.health <= 0) {
    enemy.health = 0;
    enemyDead = true;
  }

  enemy.attackCount++;
  Update();
}

function Reset() {
  enemy.health = 100;
  enemy.attackCount = 0;
  enemy.modifiers = [];
  enemyDead = false;

  if (itemModal.classList.contains("d-flex")) {
    itemModal.classList.remove("d-flex");
  }

  let modifierLength = modifierList.children.length;

  for (let i = modifierLength - 1; i >= 0; i--) {
    modifierList.removeChild(modifierList.children[i]);
  }

  Update();
}

function UseItem() {
  itemModal.classList.contains("d-flex") ? itemModal.classList.remove("d-flex") : itemModal.classList.add("d-flex");
}

function RemoveModificationToken(mod) {
  let elemToRemove = undefined;

  modifierList.childNodes.forEach(elem => {
    if (elem.firstChild["src"].includes(items[mod].imgUrl)) {
      elemToRemove = elem;
    }
  })

  modifierList.removeChild(elemToRemove);
}

function AddModificationToken(mod) {
  let newTokenElem = document.createElement("div");
  let modImgElem = document.createElement("img");
  let modifierElem = document.createElement("span");

  newTokenElem.classList.add("modifierToken")
  modImgElem.src = items[mod].imgUrl;
  modImgElem.classList.add("modifierImg", `${mod}`);

  let addPlusSign = false;
  if (items[mod].modifier >= 0)
    addPlusSign = true;

  modifierElem.textContent = `${addPlusSign ? "+" : ""}${items[mod].modifier * items[mod].multiplier}`;

  newTokenElem.appendChild(modImgElem);
  newTokenElem.appendChild(modifierElem);
  modifierList.appendChild(newTokenElem);
}

function GiveEnemyModification(mod) {
  enemy.modifiers.push(items[mod]);
  AddModificationToken(mod);
}

Update();