<?php
    include('linkDba.php');
    
    class Arr{
        public $mId;
        public $mSrc;
        public $mName;
        public $mBy;
    }
    $a=array();
    $json="";

    $sql="SELECT * FROM `playlist`";
    $result=$conn->query($sql);
    if ($result->num_rows>0) {
        while($row = $result->fetch_assoc()) {
           $j=new Arr();
           $j->mId=$row["mId"];
           $j->mSrc=$row["mSrc"];
           $j->mName=$row["mName"];
           $j->mBy=$row["mBy"];
           $a[]=$j;
       }   
   } else { 
        echo 0;
   }
   $json=json_encode($a);
   echo $json;    
?>