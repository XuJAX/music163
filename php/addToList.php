<?php
    include('linkDba.php');

    $mId=$_REQUEST["mId"];
    $mSrc=$_REQUEST["mSrc"];
    $mName=$_REQUEST["mName"];
    $mBy=$_REQUEST["mBy"];

    $sql="INSERT INTO `playlist`(`mId`, `mSrc`, `mName`, `mBy`) VALUES ('$mId','$mSrc','$mName','$mBy');";
    if($conn->query($sql) === TRUE){
        echo 0;
    }else{
        echo 1;
    }
    $conn->close()
?>