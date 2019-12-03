<?php
    include('linkDba.php');

    $userId=$_REQUEST["userId"];
    $userPsw=$_REQUEST["userPsw"];
    
    $sql="INSERT INTO `usersinfo`(`userID`, `userPSW`, `VIP`) VALUES ('$userId','$userPsw',0);";
    if($conn->query($sql) === TRUE){
        echo 0;
    }else{
        echo 1;
    }
    $conn->close()
?>