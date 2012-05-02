<?php
$uid = $_GET['uid'];
$fid = $_GET['fid'];
if(!empty($fid) && !empty($uid)){
include('db.inc.php');
$sql = "SELECT friend_img from friends where uid=".$uid." AND fid=".$fid;
$result = mysql_fetch_array(mysql_query($sql));
if($result){
$sql = "UPDATE friends set friend_img = '' where uid=".$uid." AND fid=".$fid;
mysql_query($sql);
unlink('images/'.$result['uid'].'/'.$result['friend_img']);
header('location:editdetails.php?uid='.$uid.'&fid='.$fid.'&err=Image deleted successfully.');
}


}
die("Page Not Found");
?>