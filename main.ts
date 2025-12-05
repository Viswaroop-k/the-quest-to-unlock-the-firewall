/**
 * ==========================================
 */
// --- Game Logic ---
function checkWinCondition () {
    // Minor score boost for key
    info.changeScoreBy(1)
    keyCount += 1
    music.baDing.play()
    if (keyCount >= totalKeysNeeded) {
        game.splash("All Keys Collected!", "The Firewall is now ready to open!")
        firewall.sayText("Firewall Ready!", 2000, true)
        game.gameOver(true)
    }
}
// Collision with Firewall (Projectile)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (player2, exit2) {
    if (exit2 == firewall) {
        if (keyCount >= totalKeysNeeded) {
            game.over(true, effects.smiles)
        } else {
            exit2.sayText("Need " + ("" + (totalKeysNeeded - keyCount)) + " more keys!", 500, true)
        }
    }
})
// Collision with Virus (Enemy)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (player22, enemy) {
    info.changeLifeBy(-1)
    music.powerDown.play()
    player22.startEffect(effects.fire, 500)
    // Reset virus position to make dodge easier
    enemy.setPosition(randint(0, 160), randint(0, 120))
})
// Collision with NPC/Mentor (Food)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (player23, npc) {
    // Temporarily stop player movement during dialogue
    controller.moveSprite(hero, 0, 0)
    if (npc == npc1 && !(npc1Solved)) {
        game.showLongText("Mentor Green (Passwords): Use a strong password! Which is the safest?", DialogLayout.Bottom)
        // A: password123 (Bad)  B: MyNameIs1! (Better)
        answer = game.ask("Safest Password?", "A: 'password123'  B: 'MyNameIs1!'")
        if (answer == false) {
            // B is the best of the options
            game.showLongText("Correct! Use a mix of letters, numbers, and symbols!", DialogLayout.Bottom)
            npc1Solved = true
            // Remove NPC after giving key
            npc.destroy()
            checkWinCondition()
        } else {
            game.showLongText("Unsafe. Choose a longer, more complex phrase.", DialogLayout.Bottom)
            info.changeLifeBy(-1)
        }
    } else if (npc == npc2 && !(npc2Solved)) {
        game.showLongText("Mentor Pink (Phishing): An email offers free money, but you don't know the sender.", DialogLayout.Bottom)
        // A: Click the link (Bad)  B: Delete it (Good)
        answer2 = game.ask("What do you do?", "A: Click the link  B: Delete the email")
        if (answer2 == false) {
            // B is correct
            game.showLongText("Correct! Never open links from unknown senders—it could be a scam!", DialogLayout.Bottom)
            npc2Solved = true
            npc.destroy()
            checkWinCondition()
        } else {
            game.showLongText("Warning! That could be a Phishing attempt. Never click suspicious links.", DialogLayout.Bottom)
            info.changeLifeBy(-1)
        }
    } else if (npc == npc3 && !(npc3Solved)) {
        game.showLongText("Mentor Orange (Kindness): A friend posts something mean about another student.", DialogLayout.Bottom)
        // A: Share it (Bad)  B: Talk to an adult (Good)
        answer3 = game.ask("Best action?", "A: Share the post  B: Tell a parent/teacher")
        if (answer3 == false) {
            // B is correct
            game.showLongText("Correct! Always report cyberbullying and be a kind digital citizen.", DialogLayout.Bottom)
            npc3Solved = true
            npc.destroy()
            checkWinCondition()
        } else {
            game.showLongText("Sharing makes the problem worse. Kindness is key!", DialogLayout.Bottom)
            info.changeLifeBy(-1)
        }
    }
    // Restore player movement
    controller.moveSprite(hero, 100, 100)
})
let answer3 = false
let answer2 = false
let answer = false
let npc3Solved = false
let npc2Solved = false
let npc1Solved = false
let keyCount = 0
let firewall: Sprite = null
let npc3: Sprite = null
let npc2: Sprite = null
let npc1: Sprite = null
let hero: Sprite = null
let totalKeysNeeded = 0
scene.setBackgroundImage(img`
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999966666699969999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999996999999999999969999999999999999999999999966999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999996999999999999999999999996666669
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999996999969999999999999999999999996669
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999996999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999996999
    9999999999999999999999999999999999999999dd9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999dcb999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999699999
    999999999999999999999999999999999999999ddcb999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999669999
    999999999999999999999999999999999999999dbcbb99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999969999999999996999699996
    999999999999999999999999666999999999999dcccc99999999999699999999999999999999999999999999969999999999999999999999999999999999999999999999999999999999999999996999
    99999999999999999999999996699999999999dbccccb9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999699999
    99999999999999999999999996699699999999dbbccbb9999999699999999999999999999999999999999999999999999999999999999999999999969999999999999999969999999999999969999966
    9999999999999999966999996699999999999ddcbcccbb999996999999999999999996999999999999999999999999999999999999999999999999999999699999999999999999999999699999999969
    9999999999999999969999999999999999999dbcccccbb999999999999999999999999999699969999999999999999999999999999999999999999999999999999999999999999999669699969999966
    699969999999999999999999999999666699cdccbcbcccc699999ddddd9969999dbbb9999999699999999999969999999999999999999999999999999999999999999999999696999999969999999996
    999999999999999999999999999999666696dcbbbcbbbccb99999dbbdb99dd999ddbb9999999999999999999999996999999999999999999999999999969669999999999999999699999969999999999
    696999999999999999969999999699999996dccccccccccb99969dcccb9ddcc9ddccb6696999999699999999969999999996999999999999999999999666669999999999999999966669696999699999
    69999699999999999999999999999999669dccccbbbbccccb6966dbcbb9dccc9dbcbb6699999999999999999999999999999999999999999966669966699669999999699999696969996669666669996
    6999999999999999999969969999999966bdbbbbbbbbbbbbbb966dbccb9dbbb6dbbcc6699999999966999999999999999999996999999669966699669996969999999999996666999996699966666666
    9999999999999999999999999999999999dbbcccccccccbbbb666dcccbbdccbbccccc6669669669966999966669999999699996999999999966996969996969996999996666666669666666666666666
    9999999999999999999699999999999999bcccccccccccccbb6666bcbbcccbbccbcbb6666669999666666996969996669999699999999999999999996999699969966699999999666666666666666666
    999999996699999699999669999999999999cccccccccccc666666bccbcccccccccbb66966666996666669669969966969996999999999999999999999996999669ff6999996996666666666666666ff
    999999999969999669966699999999999999ccbbbbbbcccc666666cccbbbbbbcccccc66966999996996669999999999999966996969999999966669999996696999f969966666666666666666666ffff
    999999999999669996966996699999999999bbcbbccbbbbb6666666bbbcbbbccbbbb66666666996669966666999669999966699666999999966966999699669966ff96666669666666666666666fffff
    999996699696669996999999969999999999bbcbbbbbbbbb66666666bccccccccbb666666666666966966966666669666966696699666999669669666996666666f6666666666666666666666fffffff
    666996666666699966999999999699999999bbbbcccbbbbb66666666dccccccccc6666666666666666666666666666666666666666666666669666666666666666f666666666666666666666ffffffff
    666666666666999666696699999966999999bccccccccccb66666666dccbbbbbcc6666666666666666666666666666666666696666666666666666666666666666f66666666666666666666fffffffff
    6666666666666666666669699969999999999cccccccccc966666666dcbbbccbbc6666666666666666666666666666666666666666666666666666666666666666f666666ff66666666666ffffffffff
    66666666666666666666b9699999969999b696bcccccccb6f6666666ccbbbbcccc666666666666ff6666666666666666666666666666666666666666666666ff66ff66666ff666666666ffffffffffff
    666666666666666666dddbbb9dddd699ddb9bb9ccbbbbbfbbddddb666bbccbbbbcbb66666666666f66666666666666666666666666666666666666666666666ff66f666666f66666666fffffffffffff
    666666666666666666dbbbbfdbbdbbbbbbbb64bccbbbbccdddbbbbbbbcbbbbbbbcc66bbbbbb6666f69666666666666666666666666666666666666666666666fff6ff66666f6f6666fffffffffffffff
    b6666666b6b6b66666dbbbbfbbbbbbb6bbbb64bbbbbbbccbbcbbcbbcccbbbccbbccbb6b44466666f66666666666666666666666666666f6666666666666666666f66ff6666fff66fffffffffffffffff
    b6666666b6b6bb66b6dccccbfcccccbbcccb444bbcbccbcbbbbbcbbbccbbbccbbc4bb66bbb444b6666666666666666666666666666666ff6666666666666666666f66f6666ff66ffffffffffffffffff
    bb6b66bb64bb64bb66dbbbbbbbbbbbbbbcbb444bccbbbccbbcccbbbbccbbbbbbbc44464444bb4b6f66bf6666666666666666666666666ff6666666666666666666ffff6666f66fffffffffffffffffff
    444466bb44464446b6bccbbbbcbcccbbccbc444bbbbbbcccccccccbbbcbbbbcccc444444bb44bbbfbb6f6666666666666666666666666f666f66666666666666666fff666bffffffffffffffffffffff
    44b6b4b4b4b6b4444b4bcccccccccccccccc44bcbbbbbcccc4b4cccbbbbcbbcccc4444446644444fbb6f6bbb666666666666666666666f66ff66666666666666666fff6bbfffffffffffffffffffffff
    444444b4444444444464cbbbbbbcbbbbbbcb444ccbbbbccc44f44ecbbcbbbbbbcc444444b444464f44ffbbbbbb666666666ffff666666f66f6666b666666666666bbff646fffffffffffffffffffffff
    4444446444444444446bccbccbbccbbbccc4ff4ccbccbcc444ff44ccbcbbbbbbcc4444444444446f44ff46bbbb66666666bfbbfff6666f6f6666666666666666b664ff44ffffffffffffffffffffffff
    4444b66b4444446664644ccbbbbbbbbccc4ff46ccbbbbcc444444bdbbccbbcbbccff44464444444f44f44466bb4b66b66b6fb4bff6bbbff66666666666666666b444ff4fffffffffffffffffffffffff
    4444466b44444466644444cccccccccccddddbbccbbbbcc44444dfdbbccbbcbbccffff464464644f44f4b4bbbbbbb666b4ff444fff44ff66bb6666666ff66b6bb4bfffffffffffffffffffffffffffff
    4444446644444444464464cccccccccccddbbbbccbbbbcc44bb4dfdbbccbbbbbcc44f4664444644fff4444b4b6666666bff646b4ff4ff6b44bb666666f666b44b64fffffffffffffffffffffffffffff
    4444444444444f44444466ddbbbbbbbbcbbccccccbbbbbcd44ddffdbbccbbbbbcc44444dd44db44fff444444bb6b66664ff44444fffffddbbb444b6b6fb6bbdbdb3ffffffffffffffffffffffffffffc
    4444464444444f444d4444dbbbccbbbbcbcccccccccbbccd3ddd4ffbbccccccbccddddd4dd3443fff34444bb6bd4d966444444ddffff463d4bd4dd6dff6666dfb4ffffffffffffffffffffffffffffcc
    4444464444444ff44ff4b4dccbccbbcccbcc44ccbbbbbbccdccccccccccbcbbbccddddd4ddd4ddfffbdddd4dd3ddbddddbd446ddffff444d44bdddddff4669dfddffffffffffffffffffffffffffffcc
    4444446444444ffddfd344dbcbbbbbcbbbcc4cccbbccbbcbbcccccccccbbbcbcccdd434ddddffdffdddddfddddd3dddddbddddddffff46d444d4ddddffd9dddfdfffffffffffffffffffffffffffffcc
    44444444444444f3bf44ffdbbbbbcbbbbbbccbbbcbccbbcbbbbcbbbcbbccccccccdddddddddfffffdddddffdddddddddddd444ddffffddddb4ddddddffd66ddfdffffffffffffffffffffffffffffccc
    44444444ddd444ff4f33ffcbbbbbccbbccbccbbbcbbbbbcbbcccbccccbccbbbbccdddd44ddd4fffdd4dddffd4dddddddddddddddffffddd44b4dddddffdddddffffffffffffffffffffffffffffffccc
    44444444dddddddfdf44f4bbccbbbbbbccbbbbbbbbbbbbbbbbccbbbcbbbbbbcbccd4ddddddddfffd4dddddffddddddddddddd6bdfffffdd44444dd4ddfdddddffffffffffffffffffffffffffffffccc
    44444444ddddddd4ff4ff4bbbbbbbcccbbbbbbbbccbbcccbbbbbbbbbcccbbccbccdd4dddddddfffddddddddfddd4ddddddddddddfffffdd44b4ddddddffdddffffffffffffffffffffffffffffffcccc
    6444444ddd3dd44dff6ff4bbbcbbcccccbbcccbbccbbccbbbcccbbbcccccbccbccddfdddddddfffdddd4dddffdffddddddddddddfffffddddddddddddffddfffffffffffffffffffffffffffffffcccc
    4344ddddddddd4ddff4fddcbbcbbccbccbbbcbbbbbbbbbbbbcccbccccbccbbbbccdfffddddddfffddddddddffdfdddddddffddddfffffdddddddddddffffffffffffffffffffffffffffffffffffcccc
    4444ddddb4ddddddfddfd4ccbcbbcccccbbbbbbbbbbbcccbbbbbbcccccccbccbccdffdddddddffffddddddddfffddddd4dffddddfffffddddddddfdfffffffffffffffffffffffffffffffffffffcccc
    4444deedebd4434efffdd4ccbbbbcccccbbbcccccbccccccbbbbbbbcccccbbbcccdffdddddddffffddddddddfffdddddddfdddddfffffddddfdddfdffffffffffffffffffffffffffffffffffffccccc
    4444befeebe4d4beff4444ccbcbbcccccbbccbbbbcccbcbccbbbbbbcccccbbccccddfffdddddffffdddddddddffddddddffdddddfffffdddffdddffffffffffffffffffffffffffffffffffffffccccc
    444eeeefeeeed4e4ff4444ccccbbcccccbbbbbbbccbcbcbcccbccbbcccccbcbbcc44dffdddddffffdddd44dddffddddddffdddddfffffdddffdddfffffffffffffffffffffffffffffffffffffdccccc
    fffeeffffeeeeeffffeffeccbbbbcccccbbbccbcccbcbcbccccccbbcccccbccbccdddffddddfffffddddd4dddfffdddddffdddddfffffdddffdfffffffffffffffffffffffffffffffffffffffdccccf
    effeffedeeffffffffffffccbccbcccccbbbbbbcccbcbcbcbccbcbbbccccbccbccdddffddd4fffffdddddddddfffdddbdffd4dddffffffddffffffffffffffffffffffffffffffffffffffffffdccccc
    beffffedffffffffffffffccbccbbbbbbcccbbccbcbcbcbcbccbbbcbbbbbbbbbbcdddfdddddffffffdddddddbfffdddbcffddddfffffffdfffffffffffffffffffffffffffffffffffffffffffcccccc
    dfffffffffffffffffffffccbbbbbbbbbccbbbccbcbcbcbcbccbbbccccbbbbbbccdddffdddffffffffdddd4dbffffddddffdddffffffffffffffffffffffffffffffffffffffffffffffffffffcccccc
    ffffffffffffffffffffffccbbbbbccbbbbbbbccbcbcbcbcbccbbbbbccbbcbbcccffdffdffffffffffffddccdffffdbddffd4fffffffffffffffffffffffffffffffffffffffffffffffffffffbbfccc
    efffffffffffffffffffffccbcbbcccbbbbbbcccbcbcbcbcbcccbbbbbbbbccbcccfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccdbbbbbbbc
    ffffffffffffffffffffffccbccbccbbbbbcbcccbcbcbcbcbcccbbbbbcccbccbbccfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcfcbcbbbbbbb
    ffffffffffffffffffffffccccbbbbbbbbccccccbcbcbcbcbcccbccbbbccbbcbbcccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcddbbcccbbbccc
    ffffffffffffffffffffffccccbbbbbcbbcbbcccbcbcbcbcbcccbbbbbbbbbbbbbcccfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccbcbbbbccccbbccc
    fffffffffffffffffffffcccccbbbbbcccbbbcccbcbcbcbcbcccbbbbcccbbbbccccccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdbccccbbbbccccbcccc
    ffffffffffffffffffffffccccbbccbbccbbbcccbcbcbcbcbcccbccbcccbbcccbcccccccfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccbbcccbbbbbcccbbccc
    fffffffffffffffffffffbccbbccbbbbbbbbbcccbcbcbcbcbccccccbbbbbbbbbbcccbcccccfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccfccbbbbbccccbbccbbbcc
    fffffffffffffffffffffbcbbbcbbbbbbbbbbcccbcbcbcbcbcccbcbbbbbbbbbbbccccccbccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccbbcccccbbbbbbccbbccbbccc
    ffffffffffffffffffffccbbbbbccbcbbbccbcccbcbcbcbcbccccccbbbcccbbbbcccccbbbcfcbcccffffffffffffffffffffffffffffffffffffffffffffffffffffffcdbbcccccbbbbbbcccccbbbccc
    fffffffffcfffffffffccccccbbccbccbcccbcccbcbcbcbcbcccbcbbbcccbbbbbcccccccbbcccccbcfffcccffffffffffffffffffffffffffffffffffffffffffffffcdcbbbcccbbbbbbbbcccbbbbbcc
    ddcccffffffffffffcccccbcccbbcbbbbbbbbcccbcbcbcbcbcccbbbbbbbbbbbbbcccccccbbcccccccccccbbcfcffffffffffffffffffffffffffffffffffffffffffcdbbbbbcccbbbbbbccbccccbbbbc
    bdddfcbffffffffcccccccbbbcccbbbbbbccbcccbcbcbcbcbcccbbbbbbbbbbbccccccccccbcbbcccccccbbbfcbfcffffffffffffffffffffffffffffffffffffffffcdbbbcccccbbbbbbcbcccccbbbbc
    bbbddbbcffffccccccccccbbcbbcccbbbccbbcccbcbcbcbcbcccbbcbbbbbbbbccccccccccccccccccccccccccbbbbcffffffffffffffffffffffffffffffffffffffcbbbcbccccbbbbbccbccccccbbbc
    bbbbdbbbbcccccccbccbcccccbbbbbbbbcbcccccbcbcbcbcbcccbbcbbbbbbccccccccccccccccccccccccccccccccccffffffffffffffffffffffffffffffffffffffcbccbccccbbbbccbbcccbbccccc
    bbbbccccccccccbbbccccccccccccccccccccbbbbbbbbbbbbcccbbcbbbcccccccccbcccccccccccccccccccccccbbcbccbccccfffffffffffffffffffffffffffccffbbcbbcccccbbbccbccccbbbccbc
    bbbbbbbbccccccbbcccccbcccccccccccccbbcccccccccccbccccbbcbbccccccccccccccbcbcccccccccccccbbbbbbbccccbbbbbfccccccffffffffffffffffcfccccbbbbbbbcccbbccbbccbbbbbbccc
    bbbccccccbcccccccccbbbbbcccccccccccbbccccccccccccccccccccccccccccccccccccbcccccccccccccbccbbbbbbbccccbcbbbbbbbcccccffffffffcfcccfccccccbcccccccbccbbbbcbbbbbcccb
    bbccccccbbbbbcccccbbccbbbcccccccbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccccccccccccccccccbbcccccbccbbbbbbbdbbbcfcccffcbbbbbbccccccbbcccccbbbbbbbccbbbbcccbb
    ccbddddbbbbbbbcccccbcccccccbccbcbcccccccccccccccbcccccccccbbcccccccccbccccccccccccccccccccbbbccccccbbbcccccccbdbbbbcccccccbbbbbbbbbcccbbbbbbbbbbbbbbccbbbbbbbbbb
    ddbbbbccbbbbbbbbbbcccbbcccccccccbcccccccccccccccbcccccccccbccccccccccccccccccccccccccccccccccccccbbbbbbbcccccbbbcccccccbccccbbbbbbcccccbbbbbbbbbbbbbbcccbbbbbbbb
    cbbbbbbbbbbbbbbbbbbcccbbbbccccccccccccccccccccccccccccccccccccccccccccccccccccccbcccbccccccccccccccbbbbbbcccccccccbbbbbbbbccbbbbbbccccccccccbbbbbbbbbbcccccbbbbb
    cbbbccccccccccccbbbbbcbcccccbbccccccccccccbbbbbccccccccccccccccccccccccccccccbbcccbccccccccccccccccbbbbbcccccbbbbbbbbbbbbbbbccccbbbcccccccccccbbbbbbbcccccccbbbb
    bbbbccccccccbbbbbbbbbbbccbbbbbbbbccccccccbbbcccccbcccccccccccccbbccccccccccccccccccccccccccbcccccccbbbbbbbbbbbbbbbbbbbbbbbcccccccbbbbbbbbbcccccbbbbbccccccccbbcc
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccbbbbbbbccccccccccccbbccccccccccccccccccccccbbbbbbbbbccccbbbccbbbbbbbbbccccccbbbbbbbbbbbbbbbbcbbbbbcccbcc
    bbbbbbcccccccbbbbbbbbbbbcccccccccccccccccccccccccccccccccccccccccccccccbcccccccccbbcccbcccccccccccbccccccbcccccccccccbbbbbbbbbbccccccccbbbbbbbbbbbbcccbbccccccbc
    bbbccbbbccccccccccbbbbbbbccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbcccccbccccbbbbbcccccccbbccccccbbbbbbbbccccccccbccccccbbbbbbbbbbbccbbcccbbbbc
    bbbcdddddbbbbcccccccccccccbbbbbccccbbcbccccccccccccbcccccccccccccccccccccbcbbbbbbbcccccccccccccccccbbbbbbcccccbbbbbbbbbbcccccccccccccccccccbbbbbbbbbbbbbbbbbbbbb
    bbbdcbbbbbbbbbbbbbbbbccccbbccccccccccccccccccccccccccccccbbbbbbcccbcccccccccccccbcccccccccccccccccbbbbbbbbcbbbbbbbbcccccccbcccccccccbbccccccccbbbbbbbbbbbbbbbbbb
    bdbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbccccccccbbbbbbccccccbbbbbbbccccbbbbbbbbbbbbbbbbb
    cddbccccbbbbbbbbbbbbbbcccccccccccccbbbbbccccccccccbcccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbccccccbbcccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    cdcccbcccbbbbbbbbbbbbbbcccccccbbbbbbcccccccccccccccbbbbbbbbbccccccccccccccccccccccccccccccbbbbbbcccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    dcbbbbbbbbbbbbbbbbbbccccccbbbbbcccccccccccccccccccccccccccccccccccccbbccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    dbbbbbbbbbbbccccccccccccccbbbbcccccccbbccccccccccbccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbccccccbbbbbbbccccccbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbcccbbcbbbbbbbbccccccbbccccbbccccccccccccccccccccccccccccccccccbbcccccbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbcccccccccccccccccccccccccccc
    bbbbbbbccbbbbbbbbbbbbbbbbbbbbcccbbbccccbbbbbbbccccccccccccbbbbbbbbbbbbbccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccbccccccccccbbbccccccccccccccc
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccbbbccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccbbbbccbbbbbbbbbbbbb
    bbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccccccccccbbbbbccccbbbbbbbbbbbbbbbbbbccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccbbbbbbbbbbbbbbbcccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccbbbbbbbbbbbbbbbbbbbbbcccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    bbbcccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbbbbbbbbbbbbccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccc
    ccccccccccccbbbbbbbbbbbbbbbbdddbbbbbbbbbbbbbbbbbbbccccccccbbbbbbbcbbbbbbbbbcccbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccc
    cccccccccccccccccccccbdddddccccccccccbbbbbbbbbccccccccbbbcccccccccbbbbbbbbbbccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccbccc
    cccccccccbbbbbcccccccccccccccccccccbbbbbbbcccccccbbcccccccccccbbbbbbcccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbccccc
    ccccccccccccbbccccccccccccbbbbbbbbbbbbbccccccbbbbbccccccbbbbbbbbbcbccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccc
    bcccccccccccccccccccccccbbbbbbbbbbbccccccbbbbbbbbbbbbbbbbbbbbbbbbcccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccbbbcccccccbbbbbcccbbbbbbbbbbbbbbbbbbbbbbbcccccccccc
    bccccccccccccccccbbbbbbbbbbbbbbbbeccccbbdbbbbbbbbbbbbbbbbbbbbbbbbbbccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccbbbbbbcccccccbbcccccccccccccbbbbb
    cccccccccccbbbbbbbbbbbbbbbbbbbbbbeeccbbd4bddbbdbbb3b444ddd444bbb344bbddbbcb44bbb44bb3444b444444b4be44ecccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbb
    bddddcbbbbbbbb444b4bbb44bb4b4bb4444dd44d44ddb4d3bddddddddd444ddddd44ddddddb33dd4444ddd44344444444e4e44ecbceeeccccbcccccccccccccccccccccbbccccccccccccccccbbbbbbb
    ddbbdd44b44b444444b444b444443444dddddddd4ddddddddddddddd4dddddddbdddddddddddddd44d44dddddd44dddddbd4dd3dd34b3bbdddccccccbbccccccccccccbbbbbbbbbbbbbbcccccbbbbbbb
    bbeee4b44444444dd4d33ddddddddde4dddddddddddddddddddddddddddddddd4d4ddd4dddddddddddd44ddddddddddddddddddddddd3dddbbbdbbdddbbbbbbcbcccbbbbbbbbbbbbbbbbbbbbbbbbbbbb
    b4b43dd44db4ddddd4d44dddddddddbd4ddddddddddddddddddddddddd4ddddddd4dddddddddddddddd44ddddddddddddddddddddd4ddddd44dddddddddbdbddddbdbbddddbbbbbbbbbbbbbbbbbccbbb
    dddd3ddddd4ddddd44dddd4dddddddddddddddddddddddddddddddddddd3dddddd4ddddddddddddddddddddddddddddddddddddddddddddddd4dddddddddddddddddd334db4d3dd4bbd44b3ddbbcbbbb
    d4dddbddddddddddd4dddd4ddddddddddddddd3dddddddddd444ddddddd4dddddddddddddddddddddddddddddddd4ddddddddddddddddddddd4ddddddddddddddddddddd3bd4ddd4dddd4444444ddddd
    ddddddddddddddddd4ddddddddddddddddddd4ddddddddddddd4ddddddddddddddddddddddddddddddddddddd4dddddddddddddddddd4ddddddddddd4ddddddddddddddddddd4d44ddddd4dd44dddddd
    4ddddddd4d444dd4dd4ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd4ddddddddddddddddddddddddddddddd4ddddddddddddddddddddddddddddd4ddddddddd
    dddddddddd444ddddd3ddddddddddddd4ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd44dddddddddddddddddddddddddddddddddd4ddddddddd
    `)
// --- Configuration ---
totalKeysNeeded = 3
// --- Assets (Simple Colored Boxes) ---
// Player (Blue Guardian)
let heroImg = img`
    . . . . . . . b b . . . . . . . 
    . . . . . . b d d b . . . . . . 
    . . . . . b d 5 5 d b . . . . . 
    . . . . b b 5 5 5 5 b b . . . . 
    . . . . b 5 5 5 5 5 5 b . . . . 
    b b b b b 5 5 5 5 1 1 d b b b b 
    b 5 5 5 5 5 5 5 5 1 1 1 5 5 5 b 
    b d d 5 5 5 5 5 5 1 1 1 5 d d b 
    . b d d 5 5 5 5 5 5 5 5 d d b . 
    . . b b 5 5 5 5 5 5 5 5 b b . . 
    . . c b 5 5 5 5 5 5 5 5 b c . . 
    . . c 5 5 5 5 d d 5 5 5 5 c . . 
    . . c 5 5 d b b b b d 5 5 c . . 
    . . c 5 d b c c c c b d 5 c . . 
    . . c c c c . . . . c c c c . . 
    . . . . . . . . . . . . . . . . 
    `
// Virus (Red)
let virusImg = img`
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    `
// NPC/Key (Green)
let npc1Img = img`
    a a a a a a a a a a a a a a a a 
    a a a a a a a a a a a a a a a a 
    a a a a a a a a a a a a a a a a 
    a a a a a a a a a a a a a a a a 
    a a a a a a a a a a a a a a a a 
    a a a a a a a a a a a a a a a a 
    a a a a a a a a a a a a a a a a 
    a a a a a a a a a a a a a a a a 
    a a a a a a a a a a a a a a a a 
    a a a a a a a a a a a a a a a a 
    a a a a a a a a a a a a a a a a 
    a a a a a a a a a a a a a a a a 
    a a a a a a a a a a a a a a a a 
    a a a a a a a a a a a a a a a a 
    a a a a a a a a a a a a a a a a 
    a a a a a a a a a a a a a a a a 
    `
// NPC/Key (Pink)
let npc2Img = img`
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    `
// NPC/Key (Orange)
let npc3Img = img`
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    `
// Firewall (Exit - Gold)
let firewallImg = img`
    ........................bbbbbbbbbbbbbbbbbbb..................................
    ......................bbb5555555555555555bbbbb...............................
    .....................bb5555555555555555555555bbb......bbc....................
    ....................bb5555555555555555555555555bbb..cbbcc....................
    ...................bb5555555555555555555555555555bccbbccc....................
    ...................b5555555555555555555555555555555ccccc.....................
    ..................bb555b555555555bd55555555555555555cccc.....................
    ..................b5555b555555555bb555555555555555555ccc.....................
    ..................c555555555555555555555555bccc5555555cc.....ccc.............
    ..................c55555bccccc5555555555555ccc1c5555555ccccccbbc.............
    ..................c5555bccccccccb5555555555dcbbc55555555cccbbbcc.............
    ..................c555bddcccccccccb1555555555555555555555ccbccc..............
    ..................c555bcdcccccccccc11b55555555555555555555ccccc..............
    ...................c55ccbcccccccccc11cc5555555555555555555dcccc..............
    ...................c55ccccccccccccc1bccb1555555bb5555555555dcc...............
    ....................c5cccccccccccccccccb1155555b55555555555dcc...............
    ....................c55ccccccccccccccccc1bccccb555555555555ddc...............
    .....................c55cccccccccccccccccccccc555555555555dddccccbbc.........
    ......................c55ccccccb333cc333bcccc555555555555555ddccbbcc.........
    ......................cc55dccc3333bc333333ccb555555555555555ddcccccc.........
    .......................cc555c33333b3333333cc555555555555555dddccccc..........
    ........................ccb533333b33333333c5555555555555555d55dcccc..........
    .........................cb533333b3333333b55d55555555555555555dcccc..........
    .........................cd533333b33b133b55dd5555555555555555dddccc..........
    .................cccc....c5513333333b11355dd55555555555555ddddddcc...........
    ................c55bcc...c5513333333b1155dd5555555555555555dddddcc...........
    ................c55bbc...c5533333333b555dd55555555555555555ddddddccc.........
    ..............ccc55bddc..cb553133133555dd555555555cccc5555dddddddcccccc......
    .............c55bb5bdddc..c55513313555dd5555555555c55ccccddddddddcccccc......
    .............c55dbbbdddcc..cd5555555dbdd5555555555cb5555ccccdddddccccc.......
    .............c555bddbbb5c..cbbbbbbbbbddd5555555ccccbb55bb5dbcddddbccc........
    ..............bbbbddb555ccccddbbbbbddddd5555555c55ccbbbb5555bcddddcc.........
    .............cdd555b555bdbb5dddddddddddd5555555bb5555db5555555cdddc..........
    ...........ccbbb555bbbb5dbb5ddddddddddd555555555bb55ddbccbb555ccddcc.........
    ...........c555bb5555555bb555dddddddddd5555555555bc5ddddddbb555cdddcc........
    ...........c5555b5555555b5555ddddddddd555555555555c55dddbbbb555cbdddc........
    ............cbbb555555dbb555555dddddd5555555555555cc5ddbb5555555bbbddc.......
    .............cbb55555ddb555555555555555555555555555c55db55555555dbbbdcc......
    ..............cccddddddb555555555555555555555555555cc555bbb555555dddddc......
    ................ccddddb55555555555555555555555555555c55555dd555555ddddc......
    .................cddddb5555555555555555555555555555dcc5555dd5555555dddc......
    ..cc.............ccddbd555555555555555555555555555d5dc555dd55555555dddc......
    ..c5bb............ccdbd5555555555555555555555555555ddcc555555555555dddc......
    ..c55b.............ccbd555555555555555555555555555ddddc555555555555ddcc......
    ..cb5bb.............cbdd5555555555555555555555555d5dddcc5555555555dddcc......
    ..cb55b..............cdd555555555555555555555555d55ddddccc5555555dddcc.......
    ..cb55b..............cddd555555555555555555d555d55dddddddccc555ddddcc........
    ..c555b..............cdd55555dd555555555555555dddddddddddddcccccccccc........
    .cb555bb.............cbdd5555dd5555555555555dddddddddddddddddddddddccc.......
    .cb555bb............ccbddd5d55555555dd55555555dddddddddddddddddddddcccc......
    .c55555b...........cccbbddddddd555555555ddd55dddddddddddddddddddddbccc.......
    cb55555b..........cccbbbbdddd55ddd5555ddddddddddddddddddddddddddddbcc........
    cb55555b........bccbbbd5555dd555dd5555d55ddddddddddddddddd55ddddbbbc.........
    c5555555bb....bbbddbb5555555ddddddddddd55dddddddddddddddd55ddddddbbc.........
    c55555555bbbbbbddddc555555555dddddddddddddddddddddddddddd5dd5555ddbc.........
    cd5555555555ddddddc5555555555ddddddddddddddddddddddddddddd55555555dc.........
    cd5555555555dddddcc5555555555dddddddddddddddddddddddddd55d555555555cc........
    cdd55555555ddddddc55555555555dddddddddddddddddddddddddd5555555555555c........
    cddd555555ddddddcc5555555555ddddddddddddddddddddddddddddd55555555555cc.......
    ccddddddddddddddc55555555555ddddddddddddddddddddddddddddd555555555555c.......
    .cddddddddddddddc555555555555dddddddddddddddddddddddddddd555555555555c.......
    .ccddddddddddddcc555555555555ddddddddddddddddddbddddddddd555555555555cc......
    ..ccdddddddddddcc5555555dd55dddddddddddddddddddbdddddddd5d555555555555c......
    ...ccddddddddddccd5555dddddddddddddbbddddddddddbddddddddd5555555555555c......
    ....cccddddddddcddddddddddddddddddbbddddddddddbbbdddddddddd55555555555c......
    ......cccdddddccdddddddddddddddddccccccccccccbbbbddddddddddd555555555dc......
    ........cccccccdddddddddddddddddccc........ccccbbbdddddddddddd5555555dcc.....
    ............ccc555555dddddddddccc.............cccbddddddddddddd55555ddccc....
    .............c55555555ddddddccc..................ccdddddddddddddddddddccc....
    ...........ccdddccd555dddccccc....................ccdddddddddddd5555555dc....
    ..........ccdddccdddddcddcc........................cccddddddddd55555555dcc...
    ..........ccdddcdddccccddc...........................ccccccdddd555ddddccddcc.
    ..........ccccccddcccccdcc...............................ccddddddccddddccddcc
    ...............cdc.....ccc................................cccccdddccddddcddcc
    ...............cc...........................................ccccdddccccdccccc
    ...............................................................ccccc..ccc....
    `
// --- Setup ---
// Dark background (The Server Room)
scene.setBackgroundColor(1)
info.setLife(4)
hero = sprites.create(heroImg, SpriteKind.Player)
controller.moveSprite(hero, 100, 100)
hero.setStayInScreen(true)
// Create Entities
npc1 = sprites.create(npc1Img, SpriteKind.Food)
npc2 = sprites.create(npc2Img, SpriteKind.Food)
npc3 = sprites.create(npc3Img, SpriteKind.Food)
let virus = sprites.create(virusImg, SpriteKind.Enemy)
// Projectile for exit
firewall = sprites.create(firewallImg, SpriteKind.Projectile)
// Set Positions and Behaviors
npc1.setPosition(30, 30)
npc2.setPosition(130, 30)
npc3.setPosition(30, 100)
firewall.setPosition(140, 100)
// Ghost property makes it immovable
firewall.setFlag(SpriteFlag.Ghost, true)
firewall.sayText("Need 3 Keys!", 2000, true)
virus.setPosition(80, 60)
virus.setVelocity(50, 100)
virus.setBounceOnWall(true)
// --- Story Introduction ---
game.showLongText("Guardian, the Central Firewall is locked! You need three Encryption Keys to open it.", DialogLayout.Center)
game.showLongText("Find the three colored Mentors. Answer their Digital Safety questions correctly to earn the Keys!", DialogLayout.Center)
