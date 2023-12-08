<?php
include("include/dbcon.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST["saveChanges"])) {
        $title = $_POST["title"];
        $content = $_POST["content"];

        $sql = "INSERT INTO post (post_title, post_content) VALUES ";
        $sql .= "('$title', '$content')";
        if ($conn->query($sql) === TRUE) {
            echo "---------------------> Data Added <---------------------";
        }
    } else if (isset($_POST["edit"])) {
        $title = $_POST["title"];
        $content = $_POST["content"];
        $_pid = $_POST["_pid"];
        $update = "UPDATE post SET post_title='$title' , post_content='$content' WHERE _pid=$_pid";
        if ($conn->query($update) === true) {
            echo "---------------------> Data Updated <---------------------";
        }
    } else if (isset($_POST["delete"])) {
        $_pid = $_POST["_pid"];
        $delete = "DELETE FROM post WHERE `post`.`_pid` = $_pid";
        if ($conn->query($delete) === true) {
            echo "---------------------> Data Deleted <---------------------";
        }
    }
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <meta name="theme-color" content="#ffffff">
    <link rel="preload" href="fonts/SourceCodePro-Regular.ttf" as="font" type="font/ttf" crossorigin>
    <link rel="preload" href="fonts/MavenPro.woff2" as="font" type="font/woff2" crossorigin>

    <style>
        @font-face {
            font-family: 'Source Code Pro';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url("fonts/SourceCodePro-Regular.ttf");
        }

        @font-face {
            font-family: 'Maven Pro';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url("fonts/MavenPro.woff2");
        }
    </style>
    <link href="vendor/components/font-awesome/css/fontawesome.min.css" rel="stylesheet">
    <link href="vendor/components/font-awesome/css/brands.min.css" rel="stylesheet">
    <link href="vendor/components/font-awesome/css/solid.min.css" rel="stylesheet">
    <link href="vendor/twbs/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/main.css" rel="stylesheet">

    <title>CRUD PHP</title>

</head>

<body>

    <div class="container mt-3 mb-3 px-5 py-5">
        <div id="modalContainer"></div>
        <button class="btn btn-primary px-5" id="addData">Add data</button>

        <?php
        $page = '<div class="row" data-masonry="{\'percentPosition\': true }" >';

        $read = mysqli_query($conn, "SELECT * FROM post");
        $count = 0;
        if (mysqli_num_rows($read) > 0) {
            while ($row = mysqli_fetch_assoc($read)) {
                if ($count % 5 === 0) {
                    $page .= '</div>';
                    $page .= '<div class="row" data-masonry="{\'percentPosition\': true }" >';
                }
                $page .= '<div class="col">';
                $page .= str_replace("%ID%", $row["_pid"], str_replace("%TITLE%", $row["post_title"], str_replace("%CONTENT%", $row["post_content"], getCard())));
                $page .= '</div>';
                $count += 1;
            }
        }


        $page .= '</div>';

        function getCard()
        {
            return '<div class="card">
            <div class="card-body">
                <h5 class="card-title">%TITLE%</h5>
                <p class="card-text">
                    %CONTENT%
                </p>
                <small class="text-muted"><i class="fa-solid fa-pen-to-square edit" data-id="%ID%"></i> &nbsp;Edit
                    &nbsp;&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-trash-can delete" data-id="%ID%"></i> &nbsp;Delete</small>
            </div>
        </div>';
        }

        echo $page;
        ?>


    </div>

    <script src="vendor/desandro/masonry/dist/masonry.pkgd.min.js"></script>
    <script src="vendor/twbs/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="vendor/components/jquery/jquery.min.js"></script>
    <script src="js/main.js"></script>
</body>

</html>