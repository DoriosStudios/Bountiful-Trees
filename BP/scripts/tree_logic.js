import { system, BlockPermutation, world, ItemStack } from '@minecraft/server';

/**
 * Places a block only if the target block is air or a liquid.
 * @param {Dimension} dimension
 * @param {Vector3} pos
 * @param {BlockPermutation} permutation
 */
function tryPlaceBlock(dimension, pos, permutation) {
  const block = dimension.getBlock(pos);
  if (!block) return;

  if (block.isAir || block.isLiquid) {
    block.setPermutation(permutation);
  }
}

/**
 * Generates a small custom tree with a vertical trunk and layered canopy.
 * - Trunk: 2–4 blocks tall
 * - Leaves:
 *   - Base: 5x5x2
 *   - Middle: 3x3 (centered on top)
 *   - Top: cross shape
 *
 * @param {Block} block The sapling or origin block where the tree should generate.
 * @param {{ log: string, leaves: string }} [params] Configuration object for block types.
 */
function generateTree(block, { log, leaves }) {
  const dimension = block.dimension
  const { x, y, z } = block.location;
  const logPerm = BlockPermutation.resolve(log);
  const leafPerm = BlockPermutation.resolve(leaves);

  const height = Math.floor(Math.random() * 3) + 2; // 2–4 blocks tall

  block.setPermutation(logPerm)

  // Trunk
  for (let i = 0; i <= height; i++) {
    tryPlaceBlock(dimension, { x, y: y + i, z }, logPerm);
  }

  const leafYStart = y + height - 1;

  // Layer 1 & 2: 5x5
  for (let dy = 0; dy < 2; dy++) {
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        const dist = Math.abs(dx) + Math.abs(dz);
        const chance = Math.random();

        if (dist >= 4 && chance < 0.4) continue;
        if (dist >= 3 && chance < 0.15) continue;

        tryPlaceBlock(dimension, { x: x + dx, y: leafYStart + dy, z: z + dz }, leafPerm);
      }
    }
  }

  // Layer 3: 3x3
  const midY = leafYStart + 2;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dz = -1; dz <= 1; dz++) {
      if (Math.random() < 0.2 && Math.abs(dx) === 1 && Math.abs(dz) === 1) continue;
      tryPlaceBlock(dimension, { x: x + dx, y: midY, z: z + dz }, leafPerm);
    }
  }

  // Layer 4: Cross
  const topY = midY + 1;
  tryPlaceBlock(dimension, { x, y: topY, z }, leafPerm); // center
  for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    if (Math.random() > 0.25) {
      tryPlaceBlock(dimension, { x: x + dx, y: topY, z: z + dz }, leafPerm);
    }
  }
}

system.beforeEvents.startup.subscribe(e => {
  e.blockComponentRegistry.registerCustomComponent('bountiful_trees:custom_tree', {
    onRandomTick({ block }, { params }) {
      if (Math.random() > 0.2) return
      generateTree(block, params)
    },
    onPlayerInteract({ block, player, dimension }, { params }) {
      const equippable = player.getComponent("minecraft:equippable")
      const mainhand = equippable.getEquipment('Mainhand')
      if (!mainhand || mainhand.typeId != "minecraft:bone_meal") return;

      if (player.getGameMode() != "Creative") {
        if (mainhand.amount > 1) {
          mainhand.amount--
          equippable.setEquipment('Mainhand', mainhand)
        } else mainhand.setItem(undefined);
      }
      dimension.playSound("item.bone_meal.use", block.center());
      dimension.spawnParticle(
        "minecraft:crop_growth_emitter",
        block.center()
      );
      if (Math.random() > 0.2) return;
      generateTree(block, params);
    }
  })
  // e.itemComponentRegistry.registerCustomComponent('bountiful_trees:special_sapling', {
  //   onUseOn({ blockFace, block, itemStack, source }, { params }) {
  //     if (blockFace !== 'Up') return;

  //     const { sapling, soils } = params;
  //     if (!soils.includes(block.typeId)) return;

  //     const above = block.above(1);
  //     block.dimension.setBlockType(above.location, sapling);

  //     const gamemode = source.getGameMode();
  //     if (gamemode !== "creative" && itemStack.amount > 0) {
  //       const container = source.getComponent("minecraft:inventory")?.container;
  //       const slot = source.selectedSlotIndex;

  //       if (itemStack.amount > 1) {
  //         itemStack.amount--;
  //         container.setItem(slot, itemStack); // update with reduced amount
  //       } else {
  //         container.setItem(slot, undefined); // remove the item completely
  //       }
  //     }
  //   }
  // })
})





