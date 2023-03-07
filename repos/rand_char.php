<?php
$config = [
    'length' => 6,
    'repeat' => 20,
];

$seeds = [
    str_split('abcdefghijklmnopqrstuvwxyz'),
    str_split('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
    str_split('1234567890'),
    str_split('abcdefghijklmnopqrstuvwxyz'),
    str_split('1234567890'),
    str_split('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
];

for ($i = 0; $i < $config['repeat']; $i++) {
    $rand = random($config, $seeds);
    print_r($rand);
    echo "\n";
}


function random($config, $seeds)
{
    $seedIdx = 0;
    $rand = '';
    for ($i = 0; $i < $config['length']; $i++) {
        if ($seedIdx >= sizeof($seeds)) {
            $seedIdx = 0;
        }
        $seed = array_rand($seeds[$seedIdx]);
        $rand .= $seeds[$seedIdx][$seed];

        $seedIdx++;
    }
    return $rand;
}


