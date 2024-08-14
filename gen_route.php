<?php 

function getRandomNullIndex(array $array, int $start, int $end, array $blacklistForEvents = []): int {
    $validKeys = [];
    for ($i = $start; $i <= $end; $i++) {
        if (!isset($array[$i]) && !in_array($i, $blacklistForEvents, true)) {
            $validKeys[] = $i;
        }
    }
    if (empty($validKeys)) {
        echo 'No valid keys found for start: ' . $start . ' end: ' . $end . ' blacklist: ' . implode(',', $blacklistForEvents) . ' section: ' . implode(',', array_slice($array, $start, $end - $start)) . PHP_EOL;
        return -1;
    }
    return $validKeys[array_rand($validKeys)];
}

function generateRoute(int $rewardCount, int $itemCount, array $events, int $shardCount) {
    $totalEvents = 0;
    $eventCountMap = [];
    
    foreach ($events as $event) {
        $totalEvents += $event->quantity;
        $eventCountMap[$event->value] = $event->quantity;
    }

    $routeLength = $rewardCount + $itemCount + $shardCount + $totalEvents;

    $tilePerRewards = $rewardCount ? floor($routeLength / $rewardCount) : 0;
    $tilePerItems = $itemCount ? floor($routeLength / $itemCount) : 0;
    $tilePerEvents = $totalEvents ? floor($routeLength / $totalEvents) : 0;

    $route = array_fill(0, $routeLength, null);
    $blacklistForEvents = [];

        // Place rewards
        for ($i = 0; $i < $routeLength && $rewardCount > 0; $i += $tilePerRewards) {
            $rewardIndex = rand($i, $i + $tilePerRewards - 1);
            $route[$rewardIndex] = 'R';
            $rewardCount--;
        }

        // Place items
        for ($i = 0; $i < $routeLength && $itemCount > 0; $i += $tilePerItems) {
            $itemIndex = getRandomNullIndex($route, $i, $i + $tilePerItems - 1);
            if ($itemIndex !== -1) {
                $route[$itemIndex] = 'I';
                $itemCount--;
            }
        }

        // Place events
        for ($i = 0; $i < $routeLength && $totalEvents > 0; $i += $tilePerEvents) {
            $eventIndex = getRandomNullIndex($route, $i, $i + $tilePerEvents - 1, $blacklistForEvents);
            if ($eventIndex !== -1) {
                //get event with quantity > 0
                $route[$eventIndex] = 'E';
                $eventValue = null;
                foreach ($eventCountMap as $value => $quantity) {
                    if ($quantity > 0) {
                        $eventValue = $value;
                        break;
                    }
                }
                if ($eventValue > 0) {
                    $blacklistForEvents[] = $eventIndex + $eventValue;
                }
                $totalEvents--;
            } else {
                echo 'cannot place event at ' . $eventIndex . ' with blacklist ' . implode(',', $blacklistForEvents) . ' route section: ' . implode(',', array_slice($route, $i, $tilePerEvents)) . PHP_EOL;
            }
        }

        // Place shards
    for ($i = 0; $i < $routeLength && $shardCount > 0; $i++) {
        if (!$route[$i]) {
            $route[$i] = 'S';
            $shardCount--;
        }
    }

    if ($rewardCount !== 0 || $itemCount !== 0 || $shardCount !== 0 || $totalEvents !== 0) {
        echo 'Not all rewards, items, shards, events are placed correctly. Rewards: ' . $rewardCount . ' Items: ' . $itemCount . ' Shards: ' . $shardCount . ' Events: ' . $totalEvents . PHP_EOL;
    }
    return $route;
}

function checkRoute(array $route, int $rewardCount, int $itemCount, int $shardCount, int $eventCount): bool {
    $rewards = 0;
    $items = 0;
    $shards = 0;
    $events = 0;

    for ($i = 0; $i < count($route); $i++) {
        if ($route[$i] === 'R') {
            $rewards++;
        } elseif ($route[$i] === 'I') {
            $items++;
        } elseif ($route[$i] === 'S') {
            $shards++;
        } elseif ($route[$i] === 'E') {
            $events++;
        }
    }

    if ($rewards !== $rewardCount) {
        echo 'Rewards are not placed correctly. Expected: ' . $rewardCount . ' Actual: ' . $rewards . PHP_EOL;
    }

    if ($items !== $itemCount) {
        echo 'Items are not placed correctly. Expected: ' . $itemCount . ' Actual: ' . $items . PHP_EOL;
    }

    if ($shards !== $shardCount) {
        echo 'Shards are not placed correctly. Expected: ' . $shardCount . ' Actual: ' . $shards . PHP_EOL;
    }

    if ($events !== $eventCount) {
        echo 'Events are not placed correctly. Expected: ' . $eventCount . ' Actual: ' . $events . PHP_EOL;
    }

    return $rewards === $rewardCount && $items === $itemCount && $shards === $shardCount && $events === $eventCount;
}

//Test
$events = [
    (object)['value' => 1, 'quantity' => 25],
];
$rewardCount = 25;
$itemCount = 25;
$shardCount = 25;

$eventCount = array_reduce($events, function ($carry, $event) {
    return $carry + $event->quantity;
}, 0);

$failCount = 0;

for ($i = 0; $i < 1000; $i++) {
    $route = generateRoute($rewardCount, $itemCount, $events, $shardCount);
    if (!checkRoute($route, $rewardCount, $itemCount, $shardCount, $eventCount)) {
        $failCount++;
    }
}

echo 'Failed ' . $failCount . ' times';