<?php require __DIR__ . "/../header.php" ?>

<ul>
    <?php foreach ($students as $student) : ?>
        <li><?= $student["name"]  ?></li>
    <?php endforeach ?>
</ul>

<?php require __DIR__ . "/../footer.php" ?>
