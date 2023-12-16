<?php
include("include/dbcon.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST["delete"])) {
        $_pid = $_POST["_pid"];
        $delete = "DELETE FROM account WHERE `account`.`_aid` = $_pid";
        if ($conn->query($delete) === true) {
            echo "---------------------> Data Deleted <---------------------";
        }
    } else {
        $lastName = $_POST["lastName"];
        $firstName = $_POST["firstName"];
        $birthday = $_POST["birthday"];
        $gender = $_POST["gender"];
        $address = $_POST["address"];
        $emailAddress = $_POST["emailAddress"];
        $contactNumber = $_POST["contactNumber"];

        if (isset($_POST["saveChanges"])) {
            $sql = "INSERT INTO account (lastName, firstName, birthday, gender, address, emailAddress, contactNo) VALUES ";
            $sql .= "('$lastName', '$firstName', '$birthday', '$gender', '$address', '$emailAddress', '$contactNumber')";
            if ($conn->query($sql) === TRUE) {
                echo "---------------------> Data Added <---------------------";
            }
        } else if (isset($_POST["edit"])) {
            $_aid = $_POST["_aid"];
            $update = "UPDATE account SET lastName='$lastName' , firstName='$firstName', birthday='$birthday', gender='$gender', address='$address', emailAddress='$emailAddress', contactNo='$contactNumber' WHERE _aid=$_aid";
            if ($conn->query($update) === true) {
                echo "---------------------> Data Updated <---------------------";
            }
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

        <div style="display: flex;">
            <button class="btn btn-primary px-5" id="addData">Add data</button>

            <div class="search-container">
                <input id="search" placeholder="Search anything..." type="text" name="q"
                    value="<?php if (isset($_GET["q"]) && !empty($_GET["q"])) { echo $_GET["q"]; } ?>">
                <i class="fa-solid fa-magnifying-glass" id="but"></i>
            </div>
        </div>
       
        <?php
        $page = '<div class="row mt-5" data-masonry="{\'percentPosition\': true }" >';


        $query = "SELECT * FROM account ";

        if (isset($_GET["q"]) && !empty($_GET["q"])) {
            $val = $_GET["q"];
            $query .= " WHERE lastName LIKE '%$val%' OR";
            $query .= " firstName LIKE '%$val%' OR";
            $query .= " birthday LIKE '%$val%' OR";
            $query .= " gender LIKE '%$val%' OR";
            $query .= " address LIKE '%$val%' OR";
            $query .= " emailAddress LIKE '%$val%' OR";
            $query .= " contactNo LIKE '%$val%' ";
        }

        $query .= "ORDER BY _aid DESC";

        $read = mysqli_query($conn, $query);
        $count = 0;
        if (mysqli_num_rows($read) > 0) {
            while ($row = mysqli_fetch_assoc($read)) {
                if ($count % 5 === 0) {
                    $page .= '</div>';
                    $page .= '<div class="row" data-masonry="{\'percentPosition\': true }" >';
                }
                $page .= '<div class="col">';

                $cardContent = '
                    <b>Last Name:</b> ' . $row["lastName"] . '
                    <br><b>First Name:</b> ' . $row["firstName"] . '
                    <br><b>Birthday:</b> ' . $row["birthday"] . '
                    <br><b>Gender:</b> ' . $row["gender"] . '
                    <br><b>Address:</b> ' . $row["address"] . '
                    <br><b>Email Address:</b> ' . $row["emailAddress"] . '
                    <br><b>Contact Number:</b> ' . $row["contactNo"];

                $json = '{"lastName": "' . $row["lastName"] . '",
                    "firstName": "' . $row["firstName"] . '",
                    "birthday": "' . $row["birthday"] . '",
                    "gender": "' . $row["gender"] . '",
                    "address": "' . $row["address"] . '",
                    "emailAddress": "' . $row["emailAddress"] . '",
                    "contactNumber": ' . $row["contactNo"] . '}';

                $page .= str_replace("%JSON%", base64_encode($json), str_replace("%ID%", $row["_aid"], str_replace("%CONTENT%", $cardContent, getCard())));
                $page .= '</div>';
                $count += 1;
            }
        } else {
            if (isset($_GET["q"]) && !empty($_GET["q"])) {
                $page .= "<h1>No search result for <u>" . $_GET["q"] . "</u>.</h1>";
            } else {
                $page .= "<h1>No data found!</h1>";
            }
        }


        $page .= '</div>';

        function getCard()
        {
            return '<div class="card">
            <div class="card-body" data-id="%JSON%">
                <p class="card-text">
                    %CONTENT%
                </p>
                <small class="text-muted"><i class="fa-solid fa-pen-to-square edit" data-id="%ID%"></i> &nbsp;Edit</small>
                    &nbsp;&nbsp;&nbsp;&nbsp; <small class="text-muted"><i class="fa-solid fa-trash-can delete" data-id="%ID%"></i> &nbsp;Delete</small>
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