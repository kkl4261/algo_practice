<?php

class OwnCard {
    public int $id;
    public $level;
    public $seriesId;
    public $star;

    public function __construct(int $id, int $level, int $seriesId, int $star) {
        $this->id = $id;
        $this->level = $level;
        $this->seriesId =$seriesId;
        $this->star = $star;
    }
}

$ownedCards = [new OwnCard(id:1, seriesId:1, level:5, star:1), new OwnCard(id:2, seriesId:1, level:3, star:1), new OwnCard(id:4, seriesId:1, level:1, star:2), new OwnCard(id:3, seriesId:2, level:5, star:1)];


function group(array $ownedCards){
    $map = [];
    foreach($ownedCards as $card) {
        $values = [$card->seriesId, $card->star, range($card->level, 1, -1)];
        $accessor = &$map;
        foreach ($values as $value) {
            if (is_array($value)){
                foreach ($value as $nestedValue) {
                   handleAccessor($accessor, $nestedValue);
                }
                continue;
            }

			handleAccessor($accessor, $value);
            $accessor = &$accessor[$value];
        }
    }
    return $map;
}


function handleAccessor(&$accessor, $value) {
    if (!isset($accessor[$value])){
        $accessor[$value]['count'] = 0;
    }
    $accessor[$value]['count']++;
}

function countCards(string $missionId, array $map):int{
    $conditions = explode(',', $missionId);
    $count = 0;
    $accessor = &$map;
    foreach ($conditions as $condition) {
    	$condition = (int) $condition;
       if (!isset($accessor[$condition])){
        break;
       }
       $count = $accessor[$condition]['count'];
       $accessor = &$accessor[$condition];
    }
    return $count;
}

// function group(array $ownedCards){
//     $map = [];
//     foreach($ownedCards as $card) {
//         if (!isset($map[$card->seriesId])){
//             $map[$card->seriesId] = ['count' => 0];
//         }
//         $map[$card->seriesId]['count']++;
//         if (!isset($map[$card->seriesId][$card->star])){
//             $map[$card->seriesId][$card->star] = ['count' => 0];
//         }
//         $map[$card->seriesId][$card->star]['count']++;
//         foreach(range($card->level, 1, -1) as $level) {
//             if (!isset($map[$card->seriesId][$card->star][$level])) {
//                 $map[$card->seriesId][$card->star][$level]  = ['count' => 0];
//             }
//             $map[$card->seriesId][$card->star][$level]['count']++;
//         }
//     }
//     return $map;
// }
