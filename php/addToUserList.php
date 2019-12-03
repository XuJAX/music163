<?php
    include('linkDba.php');

    $mId=$_REQUEST["mId"];
    $mSrc=$_REQUEST["mSrc"];
    $mName=$_REQUEST["mName"];
    $mBy=$_REQUEST["mBy"];
    $uId=$_REQUEST["uId"];

    $sql="INSERT INTO `$uId`(`m_Id`, `m_Src`, `m_Name`, `m_By`) VALUES ('$mId','$mSrc','$mName','$mBy')";
    if($conn->query($sql) === TRUE){
        echo 0;
    }else{
        echo 1;
    }
    $conn->close()
?>