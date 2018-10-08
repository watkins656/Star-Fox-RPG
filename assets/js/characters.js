function resetCharacters() {
    enemies = [];
    foxMcCloud.HP = 200;
    foxMcCloud.attackPower = 28;
    foxMcCloud.defeated = false;
    foxMcCloud.hero = false;
    falcoLombardi.HP = 160;
    falcoLombardi.attackPower = 22;
    falcoLombardi.defeated = false;
    falcoLombardi.hero = false;
    peppyHare.HP = 120;
    peppyHare.attackPower = 16;
    peppyHare.defeated = false;
    peppyHare.hero = false;
    slippyToad.HP = 140;
    slippyToad.attackPower = 19;
    slippyToad.defeated = false;
    slippyToad.hero = false;
    console.log("characters reset");
}
