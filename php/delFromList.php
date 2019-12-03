<?php
    include('linkDba.php');

    $mId=$_REQUEST["id"];
    $sql="DELETE FROM `playlist` WHERE `mId`='$mId'";
    if($conn->query($sql) === TRUE){
        echo 0;
    }else{
        echo 1;
    }
    $conn->close()
?>