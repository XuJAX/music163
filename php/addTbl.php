<?php
    include('linkDba.php');

    $tblName=$_REQUEST["name"];
    $sql="CREATE TABLE $tblName( m_Id VARCHAR(100) NOT NULL, m_Src VARCHAR(100) NOT NULL, m_Name VARCHAR(100) NOT NULL, m_By VARCHAR(100) NOT NULL, PRIMARY KEY( m_Id ))";
    if($conn->query($sql) === TRUE){
        echo 0;
    }else{
        echo 1;
    }
    $conn->close()
?>