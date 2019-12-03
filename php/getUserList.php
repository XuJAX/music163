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

    $Id=$_REQUEST["userId"];
    $tbl="u".$Id;
    $sql="SELECT `m_Id`, `m_Src`, `m_Name`, `m_By` FROM $tbl";
    $result=$conn->query($sql);
    if ($result->num_rows>0) {
        while($row = $result->fetch_assoc()) {
           $j=new Arr();
           $j->mId=$row["m_Id"];
           $j->mSrc=$row["m_Src"];
           $j->mName=$row["m_Name"];
           $j->mBy=$row["m_By"];
           $a[]=$j;
       }   
   } else { 
        echo 0;
   }
   $json=json_encode($a);
   echo $json;    
?>