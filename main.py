"""

==========================================

"""
# --- Game Logic ---
def checkWinCondition():
    global keyCount
    # Minor score boost for key
    info.change_score_by(1)
    keyCount += 1
    music.ba_ding.play()
    if keyCount >= totalKeysNeeded:
        game.splash("All Keys Collected!", "The Firewall is now ready to open!")
        firewall.say_text("Firewall Ready!", 2000, True)
# Collision with Firewall (Projectile)

def on_on_overlap(player2, exit2):
    if exit2 == firewall:
        if keyCount >= totalKeysNeeded:
            game.over(True, effects.confetti)
        else:
            exit2.say_text("Need " + str((totalKeysNeeded - keyCount)) + " more keys!",
                500,
                True)
sprites.on_overlap(SpriteKind.player, SpriteKind.projectile, on_on_overlap)

# Collision with Virus (Enemy)

def on_on_overlap2(player22, enemy):
    info.change_life_by(-1)
    music.power_down.play()
    player22.start_effect(effects.fire, 500)
    # Reset virus position to make dodge easier
    enemy.set_position(randint(0, 160), randint(0, 120))
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap2)

# Collision with NPC/Mentor (Food)

def on_on_overlap3(player23, npc):
    global answer, npc1Solved, answer2, npc2Solved, answer3, npc3Solved
    # Temporarily stop player movement during dialogue
    controller.move_sprite(hero, 0, 0)
    if npc == npc1 and not (npc1Solved):
        game.show_long_text("Mentor Green (Passwords): Use a strong password! Which is the safest?",
            DialogLayout.BOTTOM)
        # A: password123 (Bad)  B: MyNameIs1! (Better)
        answer = game.ask("Safest Password?", "A: 'password123'  B: 'MyNameIs1!'")
        if answer == False:
            # B is the best of the options
            game.show_long_text("Correct! Use a mix of letters, numbers, and symbols!",
                DialogLayout.BOTTOM)
            npc1Solved = True
            # Remove NPC after giving key
            npc.destroy()
            checkWinCondition()
        else:
            game.show_long_text("Unsafe. Choose a longer, more complex phrase.",
                DialogLayout.BOTTOM)
            info.change_life_by(-1)
    elif npc == npc2 and not (npc2Solved):
        game.show_long_text("Mentor Pink (Phishing): An email offers free money, but you don't know the sender.",
            DialogLayout.BOTTOM)
        # A: Click the link (Bad)  B: Delete it (Good)
        answer2 = game.ask("What do you do?", "A: Click the link  B: Delete the email")
        if answer2 == False:
            # B is correct
            game.show_long_text("Correct! Never open links from unknown senders—it could be a scam!",
                DialogLayout.BOTTOM)
            npc2Solved = True
            npc.destroy()
            checkWinCondition()
        else:
            game.show_long_text("Warning! That could be a Phishing attempt. Never click suspicious links.",
                DialogLayout.BOTTOM)
            info.change_life_by(-1)
    elif npc == npc3 and not (npc3Solved):
        game.show_long_text("Mentor Orange (Kindness): A friend posts something mean about another student.",
            DialogLayout.BOTTOM)
        # A: Share it (Bad)  B: Talk to an adult (Good)
        answer3 = game.ask("Best action?",
            "A: Share the post  B: Tell a parent/teacher")
        if answer3 == False:
            # B is correct
            game.show_long_text("Correct! Always report cyberbullying and be a kind digital citizen.",
                DialogLayout.BOTTOM)
            npc3Solved = True
            npc.destroy()
            checkWinCondition()
        else:
            game.show_long_text("Sharing makes the problem worse. Kindness is key!",
                DialogLayout.BOTTOM)
            info.change_life_by(-1)
    # Restore player movement
    controller.move_sprite(hero, 100, 100)
sprites.on_overlap(SpriteKind.player, SpriteKind.food, on_on_overlap3)

answer3 = False
answer2 = False
answer = False
npc3Solved = False
npc2Solved = False
npc1Solved = False
keyCount = 0
firewall: Sprite = None
npc3: Sprite = None
npc2: Sprite = None
npc1: Sprite = None
hero: Sprite = None
totalKeysNeeded = 0
# --- Configuration ---
totalKeysNeeded = 3
# --- Assets (Simple Colored Boxes) ---
# Player (Blue Guardian)
heroImg = img("""
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
    """)
# Virus (Red)
virusImg = img("""
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    """)
# NPC/Key (Green)
npc1Img = img("""
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
    """)
# NPC/Key (Pink)
npc2Img = img("""
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
    """)
# NPC/Key (Orange)
npc3Img = img("""
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
    """)
# Firewall (Exit - Gold)
firewallImg = img("""
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
    """)
# --- Setup ---
# Dark background (The Server Room)
scene.set_background_color(1)
info.set_life(3)
hero = sprites.create(heroImg, SpriteKind.player)
controller.move_sprite(hero, 100, 100)
hero.set_stay_in_screen(True)
# Create Entities
npc1 = sprites.create(npc1Img, SpriteKind.food)
npc2 = sprites.create(npc2Img, SpriteKind.food)
npc3 = sprites.create(npc3Img, SpriteKind.food)
virus = sprites.create(virusImg, SpriteKind.enemy)
# Projectile for exit
firewall = sprites.create(firewallImg, SpriteKind.projectile)
# Set Positions and Behaviors
npc1.set_position(30, 30)
npc2.set_position(130, 30)
npc3.set_position(30, 100)
firewall.set_position(140, 100)
# Ghost property makes it immovable
firewall.set_flag(SpriteFlag.GHOST, True)
firewall.say_text("Need 3 Keys!", 2000, True)
virus.set_position(80, 60)
virus.set_velocity(50, 50)
virus.set_bounce_on_wall(True)
# --- Story Introduction ---
game.show_long_text("Guardian, the Central Firewall is locked! You need three Encryption Keys to open it.",
    DialogLayout.CENTER)
game.show_long_text("Find the three colored Mentors. Answer their Digital Safety questions correctly to earn the Keys!",
    DialogLayout.CENTER)