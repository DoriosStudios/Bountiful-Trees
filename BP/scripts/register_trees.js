import { system, world } from "@minecraft/server"

const treesData = {
    'bountiful_trees:coal_tree': {
        sapling: "bountiful_trees:coal_sapling",
        entity: "bountiful_trees:coal_tree",
        cost: 64_000,
        drops: [
            { item: 'bountiful_trees:coal_log', amount: [6, 8], chance: 1 },
            { item: 'bountiful_trees:coal_leaves', amount: [0, 2], chance: 1 },
            { item: 'bountiful_trees:coal_sapling', amount: 1, chance: 0.05 },
            { item: 'minecraft:stick', amount: [6, 10], chance: 1 }
        ]
    },

    'bountiful_trees:copper_tree': {
        sapling: "bountiful_trees:copper_sapling",
        entity: "bountiful_trees:copper_tree",
        cost: 64_000,
        drops: [
            { item: 'bountiful_trees:copper_log', amount: [6, 8], chance: 1 },
            { item: 'bountiful_trees:copper_leaves', amount: [0, 2], chance: 1 },
            { item: 'bountiful_trees:copper_sapling', amount: 1, chance: 0.05 },
            { item: 'minecraft:stick', amount: [6, 10], chance: 1 }
        ]
    },

    'bountiful_trees:iron_tree': {
        sapling: "bountiful_trees:iron_sapling",
        entity: "bountiful_trees:iron_tree",
        cost: 128_000,
        drops: [
            { item: 'bountiful_trees:iron_log', amount: [6, 8], chance: 1 },
            { item: 'bountiful_trees:iron_leaves', amount: [0, 2], chance: 1 },
            { item: 'bountiful_trees:iron_sapling', amount: 1, chance: 0.05 },
            { item: 'minecraft:stick', amount: [6, 10], chance: 1 }
        ]
    },

    'bountiful_trees:redstone_tree': {
        sapling: "bountiful_trees:redstone_sapling",
        entity: "bountiful_trees:redstone_tree",
        cost: 128_000,
        drops: [
            { item: 'bountiful_trees:redstone_log', amount: [6, 8], chance: 1 },
            { item: 'bountiful_trees:redstone_leaves', amount: [0, 2], chance: 1 },
            { item: 'bountiful_trees:redstone_sapling', amount: 1, chance: 0.05 },
            { item: 'minecraft:stick', amount: [6, 10], chance: 1 }
        ]
    },

    'bountiful_trees:gold_tree': {
        sapling: "bountiful_trees:gold_sapling",
        entity: "bountiful_trees:gold_tree",
        cost: 128_000,
        drops: [
            { item: 'bountiful_trees:gold_log', amount: [6, 8], chance: 1 },
            { item: 'bountiful_trees:gold_leaves', amount: [0, 2], chance: 1 },
            { item: 'bountiful_trees:gold_sapling', amount: 1, chance: 0.05 },
            { item: 'minecraft:stick', amount: [6, 10], chance: 1 }
        ]
    },

    'bountiful_trees:lapis_tree': {
        sapling: "bountiful_trees:lapis_sapling",
        entity: "bountiful_trees:lapis_tree",
        cost: 128_000,
        drops: [
            { item: 'bountiful_trees:lapis_log', amount: [6, 8], chance: 1 },
            { item: 'bountiful_trees:lapis_leaves', amount: [0, 2], chance: 1 },
            { item: 'bountiful_trees:lapis_sapling', amount: 1, chance: 0.05 },
            { item: 'minecraft:stick', amount: [6, 10], chance: 1 }
        ]
    },

    'bountiful_trees:diamond_tree': {
        sapling: "bountiful_trees:diamond_sapling",
        entity: "bountiful_trees:diamond_tree",
        cost: 512_000,
        drops: [
            { item: 'bountiful_trees:diamond_log', amount: [6, 8], chance: 1 },
            { item: 'bountiful_trees:diamond_leaves', amount: [0, 2], chance: 1 },
            { item: 'bountiful_trees:diamond_sapling', amount: 1, chance: 0.05 },
            { item: 'minecraft:stick', amount: [6, 10], chance: 1 }
        ]
    },

    'bountiful_trees:emerald_tree': {
        sapling: "bountiful_trees:emerald_sapling",
        entity: "bountiful_trees:emerald_tree",
        cost: 512_000,
        drops: [
            { item: 'bountiful_trees:emerald_log', amount: [6, 8], chance: 1 },
            { item: 'bountiful_trees:emerald_leaves', amount: [0, 2], chance: 1 },
            { item: 'bountiful_trees:emerald_sapling', amount: 1, chance: 0.05 },
            { item: 'minecraft:stick', amount: [6, 10], chance: 1 }
        ]
    },

    'bountiful_trees:quartz_tree': {
        sapling: "bountiful_trees:quartz_sapling",
        entity: "bountiful_trees:quartz_tree",
        cost: 512_000,
        drops: [
            { item: 'bountiful_trees:quartz_log', amount: [6, 8], chance: 1 },
            { item: 'bountiful_trees:quartz_leaves', amount: [0, 2], chance: 1 },
            { item: 'bountiful_trees:quartz_sapling', amount: 1, chance: 0.05 },
            { item: 'minecraft:stick', amount: [6, 10], chance: 1 }
        ]
    },

    'bountiful_trees:netherite_tree': {
        sapling: "bountiful_trees:netherite_sapling",
        entity: "bountiful_trees:netherite_tree",
        disableTimeBonus: true,
        disableYieldBonus: true,
        cost: 1_024_000,
        drops: [
            { item: 'bountiful_trees:netherite_log', amount: [6, 8], chance: 1 },
            { item: 'bountiful_trees:netherite_leaves', amount: [0, 2], chance: 1 },
            { item: 'bountiful_trees:netherite_sapling', amount: 1, chance: 0.05 },
            { item: 'minecraft:stick', amount: [6, 10], chance: 1 }
        ]
    },

    'bountiful_trees:energized_iron_tree': {
        sapling: "bountiful_trees:energized_iron_sapling",
        entity: "bountiful_trees:energized_iron_tree",
        cost: 512_000,
        drops: [
            { item: 'bountiful_trees:energized_iron_log', amount: [6, 8], chance: 1 },
            { item: 'bountiful_trees:energized_iron_leaves', amount: [0, 2], chance: 1 },
            { item: 'minecraft:stick', amount: [6, 10], chance: 1 }
        ]
    },

    'bountiful_trees:steel_tree': {
        sapling: "bountiful_trees:steel_sapling",
        entity: "bountiful_trees:steel_tree",
        cost: 1_024_000,
        drops: [
            { item: 'bountiful_trees:steel_log', amount: [6, 8], chance: 1 },
            { item: 'bountiful_trees:steel_leaves', amount: [0, 2], chance: 1 },
            { item: 'bountiful_trees:steel_sapling', amount: 1, chance: 0.05 },
            { item: 'minecraft:stick', amount: [6, 10], chance: 1 }
        ]
    }

}

world.afterEvents.worldLoad.subscribe(() => {
    system.sendScriptEvent("utilitycraft:register_bonsai", JSON.stringify(treesData))
})

