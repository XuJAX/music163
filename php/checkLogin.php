<?php
    include('linkDba.php');

    class Arr{
        public $id;
        public $psw;
        public $vip;
    }
    $a=array();
    $json="";

    $userId=$_REQUEST["userId"];
    $sql="SELECT `userID`, `userPSW`, `VIP` FROM `usersinfo` WHERE `userID`='$userId'";
    $result=$conn->query($sql);
    if ($result->num_rows>0) {
        while($row = $result->fetch_assoc()) {
           $j=new Arr();
           $j->id=$row["userID"];
           $j->psw=$row["userPSW"];
           $j->vip=$row["VIP"];
           $a[]=$j;
       }   
   } else { 
        echo 0;
   }
   $json=json_encode($a);
   echo $json;    
?>