import { system, world } from "@minecraft/server"

const growthSecondsByTier = Object.freeze({
    basic: 120,
    refined: 180,
    advanced: 300,
    ultimate: 600
})

function createTreeDefinition(entityTypeId, tier, cost, drops) {
    return {
        cost,
        drops,
        bonsai: {
            entityTypeId,
            durationSeconds: growthSecondsByTier[tier]
        }
    }
}

const plantsData = {
    "bountiful_trees:coal_sapling": createTreeDefinition(
        "bountiful_trees:coal_tree",
        "basic",
        64_000,
        [
            { item: "minecraft:coal", amount: [1, 2], chance: 1 },
            { item: "bountiful_trees:coal_leaves", amount: [0, 2], chance: 0.25 },
            { item: "bountiful_trees:coal_sapling", amount: 1, chance: 0.025 },
            { item: "minecraft:stick", amount: [4, 8], chance: 1 }
        ]
    ),

    "bountiful_trees:copper_sapling": createTreeDefinition(
        "bountiful_trees:copper_tree",
        "basic",
        64_000,
        [
            { item: "minecraft:copper_nugget", amount: [2, 4], chance: 1 },
            { item: "bountiful_trees:copper_leaves", amount: [0, 2], chance: 1 },
            { item: "bountiful_trees:copper_sapling", amount: 1, chance: 0.025 },
            { item: "minecraft:stick", amount: [4, 8], chance: 1 }
        ]
    ),

    "bountiful_trees:iron_sapling": createTreeDefinition(
        "bountiful_trees:iron_tree",
        "refined",
        128_000,
        [
            { item: "minecraft:iron_nugget", amount: [6, 8], chance: 1 },
            { item: "bountiful_trees:iron_leaves", amount: [0, 2], chance: 1 },
            { item: "bountiful_trees:iron_sapling", amount: 1, chance: 0.025 },
            { item: "minecraft:stick", amount: [4, 8], chance: 1 }
        ]
    ),

    "bountiful_trees:redstone_sapling": createTreeDefinition(
        "bountiful_trees:redstone_tree",
        "refined",
        128_000,
        [
            { item: "minecraft:redstone", amount: [1, 2], chance: 1 },
            { item: "bountiful_trees:redstone_leaves", amount: [0, 2], chance: 1 },
            { item: "bountiful_trees:redstone_sapling", amount: 1, chance: 0.025 },
            { item: "minecraft:stick", amount: [4, 8], chance: 1 }
        ]
    ),

    "bountiful_trees:gold_sapling": createTreeDefinition(
        "bountiful_trees:gold_tree",
        "refined",
        128_000,
        [
            { item: "minecraft:gold_nugget", amount: [2, 4], chance: 1 },
            { item: "bountiful_trees:gold_leaves", amount: [0, 2], chance: 1 },
            { item: "bountiful_trees:gold_sapling", amount: 1, chance: 0.025 },
            { item: "minecraft:stick", amount: [4, 8], chance: 1 }
        ]
    ),

    "bountiful_trees:lapis_sapling": createTreeDefinition(
        "bountiful_trees:lapis_tree",
        "refined",
        128_000,
        [
            { item: "minecraft:lapis_lazuli", amount: [1, 3], chance: 1 },
            { item: "bountiful_trees:lapis_leaves", amount: [0, 2], chance: 1 },
            { item: "bountiful_trees:lapis_sapling", amount: 1, chance: 0.025 },
            { item: "minecraft:stick", amount: [4, 8], chance: 1 }
        ]
    ),

    "bountiful_trees:diamond_sapling": createTreeDefinition(
        "bountiful_trees:diamond_tree",
        "advanced",
        512_000,
        [
            { item: "utilitycraft:diamond_shard", amount: [2, 6], chance: 1 },
            { item: "bountiful_trees:diamond_leaves", amount: [0, 2], chance: 1 },
            { item: "bountiful_trees:diamond_sapling", amount: 1, chance: 0.025 },
            { item: "minecraft:stick", amount: [4, 8], chance: 1 }
        ]
    ),

    "bountiful_trees:emerald_sapling": createTreeDefinition(
        "bountiful_trees:emerald_tree",
        "advanced",
        512_000,
        [
            { item: "utilitycraft:emerald_shard", amount: [2, 6], chance: 1 },
            { item: "bountiful_trees:emerald_leaves", amount: [0, 2], chance: 1 },
            { item: "bountiful_trees:emerald_sapling", amount: 1, chance: 0.025 },
            { item: "minecraft:stick", amount: [4, 8], chance: 1 }
        ]
    ),

    "bountiful_trees:quartz_sapling": createTreeDefinition(
        "bountiful_trees:quartz_tree",
        "advanced",
        512_000,
        [
            { item: "minecraft:quartz", amount: [1, 3], chance: 1 },
            { item: "bountiful_trees:quartz_leaves", amount: [0, 2], chance: 1 },
            { item: "bountiful_trees:quartz_sapling", amount: 1, chance: 0.025 },
            { item: "minecraft:stick", amount: [4, 8], chance: 1 }
        ]
    ),

    "bountiful_trees:energized_iron_sapling": createTreeDefinition(
        "bountiful_trees:energized_iron_tree",
        "advanced",
        512_000,
        [
            { item: "utilitycraft:energized_iron_nugget", amount: [6, 8], chance: 1 },
            { item: "bountiful_trees:energized_iron_leaves", amount: [0, 2], chance: 1 },
            { item: "minecraft:stick", amount: [4, 8], chance: 1 }
        ]
    ),

    "bountiful_trees:netherite_sapling": createTreeDefinition(
        "bountiful_trees:netherite_tree",
        "ultimate",
        1_024_000,
        [
            { item: "utilitycraft:netherite_nugget", amount: [1, 3], chance: 1 },
            { item: "bountiful_trees:netherite_leaves", amount: [0, 2], chance: 1 },
            { item: "bountiful_trees:netherite_sapling", amount: 1, chance: 0.025 },
            { item: "minecraft:stick", amount: [4, 8], chance: 1 }
        ]
    ),

    "bountiful_trees:steel_sapling": createTreeDefinition(
        "bountiful_trees:steel_tree",
        "ultimate",
        1_024_000,
        [
            { item: "utilitycraft:steel_nugget", amount: [6, 8], chance: 1 },
            { item: "bountiful_trees:steel_leaves", amount: [0, 2], chance: 1 },
            { item: "bountiful_trees:steel_sapling", amount: 1, chance: 0.025 },
            { item: "minecraft:stick", amount: [4, 8], chance: 1 }
        ]
    )
}

world.afterEvents.worldLoad.subscribe(() => {
    system.sendScriptEvent("utilitycraft:register_plant", JSON.stringify(plantsData))
})
