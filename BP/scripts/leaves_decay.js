import { system, BlockPermutation } from "@minecraft/server";

/**
 * Custom Component: bountiful_trees:leaves
 * Handles natural leaf decay when not connected to any of its allowed log blocks.
 */
system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent("bountiful_trees:leaves", {
        /**
         * Handles random ticks for decay logic.
         * @param {import('@minecraft/server').BlockComponentRandomTickEvent} e
         * @param {{ params: { allowed_logs?: string[], max_distance?: number } }} ctx
         */
        onRandomTick(e, { params }) {
            const { block } = e;
            const { x, y, z } = block.location;

            // Default params
            const allowedLogs = params.allowed_logs ?? ["minecraft:log"];
            const maxDistance = params.max_distance ?? 4;

            // Ignore player-placed leaves
            if (block.permutation.getState("bountiful_trees:placed")) return;

            const isPersistent = checkConnection(block, allowedLogs, maxDistance);

            // An incomplete scan means a neighboring chunk is not available yet.
            // Never interpret that as a disconnected leaf or trigger decay.
            if (isPersistent === undefined) return;

            const currentState = block.permutation.getState("bountiful_trees:persistent_bit");

            // Update state only if necessary
            if (isPersistent !== currentState) {
                try {
                    const updated = BlockPermutation.resolve(block.typeId, {
                        ...block.permutation.getAllStates(),
                        "bountiful_trees:persistent_bit": isPersistent,
                    });
                    block.setPermutation(updated);
                } catch {
                    return;
                }
            }

            // If not connected to a valid log and not placed -> decay naturally
            if (!isPersistent) {
                block.dimension.runCommand(`loot spawn ${x} ${y} ${z} mine ${x} ${y} ${z} minecraft:diamond_hoe`);
                block.setType('air')
            }
        },

        /**
         * Marks the block as placed when a player sets it manually.
         * @param {import('@minecraft/server').BlockComponentPlayerPlaceEvent} e
         */
        onPlayerPlace(e) {
            const { block } = e;
            const states = block.permutation.getAllStates();

            if (!states["bountiful_trees:placed"]) {
                const newPerm = BlockPermutation.resolve(block.typeId, {
                    ...states,
                    "bountiful_trees:placed": true,
                });
                block.setPermutation(newPerm);
            }
        },
    });
});

/**
 * Checks if the leaf block is connected to any allowed log within the given distance.
 * Uses a taxicab (Manhattan) distance search for performance.
 * @param {import('@minecraft/server').Block} startBlock
 * @param {string[]} allowed
 * @param {number} maxDist
 * Returns undefined when the scan touches an unavailable block/chunk.
 * @returns {boolean | undefined}
 */
function checkConnection(startBlock, allowed, maxDist) {
    const visited = new Set();
    const queue = [{ block: startBlock, dist: 0 }];
    let startTypeId;

    try {
        if (!startBlock?.isValid) return undefined;
        startTypeId = startBlock.typeId;
    } catch {
        return undefined;
    }

    while (queue.length > 0) {
        const { block, dist } = queue.shift();
        if (dist > maxDist) continue;
        if (!block?.isValid) return undefined;

        let key;
        let typeId;

        try {
            key = `${block.location.x},${block.location.y},${block.location.z}`;
            typeId = block.typeId;
        } catch {
            return undefined;
        }

        if (visited.has(key)) continue;
        visited.add(key);

        // Found a valid log nearby
        if (allowed.includes(typeId)) return true;

        // Only propagate through the same leaf type
        if (typeId === startTypeId && dist < maxDist) {
            let neighbors;

            try {
                neighbors = [
                    block.above(),
                    block.below(),
                    block.north(),
                    block.south(),
                    block.east(),
                    block.west(),
                ];
            } catch {
                return undefined;
            }

            for (const n of neighbors) {
                // Neighbor methods can return undefined when their chunk is not
                // available. Abort this tick instead of treating it as air.
                if (!n?.isValid) return undefined;

                const neighborKey = `${n.location.x},${n.location.y},${n.location.z}`;
                if (!visited.has(neighborKey)) queue.push({ block: n, dist: dist + 1 });
            }
        }
    }

    return false;
}
