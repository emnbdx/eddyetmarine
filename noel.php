<?php

    $wishlist = [
        'Calixte' => [
            [
                "url" => "https://www.lesenfantsdudesign.com/cascade-a-empiler-parme-raduga-grez-p13325.html"
            ],
            [
                "url" => "https://www.lesenfantsdudesign.com/boulier-abaque-arc-en-ciel-multicolore-oyoy-p11928.html"
            ],
            [
                "url" => "https://www.lesenfantsdudesign.com/veilleuse-chat-vieux-rose-liewood-p12983.html"
            ],
            [
                "url" => "https://www.lespetitsraffineurs.com/les-trottineurs/223-animaux-en-bois-a-tirer.html"
            ],
            [
                "url" => "https://www.lesenfantsdudesign.com/bateau-ours-polaire-plan-toys-p11852.html"
            ],
            [
                "url" => "https://fr.smallable.com/parcours-automobile-aiden-gris-fonce-kid-s-concept-199651.html"
            ],
            [
                "url" => "https://fr.smallable.com/bateau-de-sauvetage-flottant-sur-l-eau-plan-toys-167344.html"
            ],
            [
                "url" => "https://fr.smallable.com/chariot-a-roulettes-avec-cubes-en-bois-kid-s-concept-135543.html"
            ],
            [
                "url" => "https://www.amara.com/fr/produits/etagere-de-dinosaures-pour-enfants-lot-de-8"
            ],
            [
                "url" => "https://www.amara.com/fr/produits/jouet-en-bois-gateau-danniversaire-a-la-vanille"
            ],
            [
                "url" => "https://www.amara.com/fr/produits/etagere-danimaux-de-ferme-pour-enfants-lot-de-13"
            ]
        ]
    ];

    $filename = "cache.json";

?>

<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<title>🎄 ☃️ Notre liste de noël 🎁 🎅</title>

	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
</head>
<body>
	<div class="container">
        <h1>🎄 ☃️ Notre liste de noël 🎁 🎅</h1>
        <?php
            foreach ($wishlist as $key => $value) {
                ?>
                    <h2><?php echo $key ?></h2>
                <?php
                $json = json_decode(file_exists($filename) ? file_get_contents($filename) : '', true);
                foreach ($value as $item) {
                    $title = null;
                    $image = null;
                    if(isset($json[$item['url']])) {
                        $title = $json[$item['url']]['title'];
                        $image = $json[$item['url']]['image'];
                    } else {
                        $fp = file_get_contents($item['url']);
                        libxml_use_internal_errors(true);
                        $dom_obj = new DOMDocument();
                        $dom_obj->loadHTML('<?xml encoding="utf-8" ?>' . $fp);
                        $title = $dom_obj->getElementsByTagName('title')[0]->nodeValue;
                        foreach($dom_obj->getElementsByTagName('meta') as $meta) {
                            if($meta->getAttribute('property')=='og:image') {
                                $image = $meta->getAttribute('content');
                            }
                        }
                        if($image == null) {
                            foreach($dom_obj->getElementsByTagName('img') as $img) {
                                if($img->getAttribute('itemprop') == 'image') {
                                    $image = $img->getAttribute('src');
                                }
                            }
                        }

                        $json[$item['url']] = array("title" => $title, "image" => $image);
                        file_put_contents($filename, json_encode($json));
                    }                                  
                    ?>
                        <div class="row">
                            <div class="col-3">
                                <img class="img-responsive" style="max-width: 100%;" src="<?php echo $image ?>" />
                            </div>
                            <div class="col-9">
                                <a href="<?php echo $item['url'] ?>" target="_blank"><?php echo (isset($item['important']) ? '❤️ ' : '') . $title ?></a>
                            </div>
                        </div>
                    <?php
                }
            }
        ?>
	</div>

	<script	src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
</body>
</html>