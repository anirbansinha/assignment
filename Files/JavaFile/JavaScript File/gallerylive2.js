var found = false;
var login_success_url = "";
var addon_attr = "myextension-myattribute";
var popup_win = null;
var max = 5;
	
var selected_layout = "";
var myStorage = new Array();

var selected_pageNumber = 0;
var selected_friendsPerPage = 0;
var selected_totFriends = 0;
var loaded_count = 0;

var container;
var mydocument;

var last_images = new Array();

var page_div = null;

var selected_friends = new Array();
var selected_friends_copy = new Array();

var unselected_friends = new Array();
var unselected_friends_copy = new Array();

var canvasDiv;
var lastCanvasDiv;
var mouseX = 0;
var mouseY = 0;
var canvasDiv_left = 0;
var canvasDiv_top = 0;

const bkg_width=710;
const bkg_height=450;
const logo_width=160;
const logo_height=55;
const left_section=520;
var sendmail_div_top = bkg_height - 65;
	
const photo_section=(bkg_height-bkg_height/2);
var rowHeight = (photo_section) / 2;

var last_fill = null;
var mouseDown = 0;
var mouseDownTime = 0;
var mouseReleasedTime = 0;

var circleDrawnFlag = false;

var t;
var current_page = 1;
var max_pages = 1;
const page_size = 9;

var unselected_current_page = 1;
var unselected_max_pages = 1;
const unselected_page_size = 10;
const selected_page_size = 5;
	
var send_to_group_selected = null;

var messageNote = "";
//var message_text = "ENTER YOUR MESSAGE HERE...";
var message_text = "";

var loadtime = 0;

var current_friends_list_indexes = new Array();
var current_friends_list_ids = new Array();

var last_criteria = 'all';
var last_pics_response = null;

var prev_flag = true;
var next_flag = true;

var prev_selected_flag = true;
var next_selected_flag = true;

var prev_unselected_flag = true;
var next_unselected_flag = true;

var sel_style="cursor:pointer;-moz-box-shadow:-3px -3px 1px blue;";
var old_style = new Array();
var unselected_friends_div_top = 0;
var selected_friends_div_top = 0;

var mapping_fids_selected = new Array();
var mapping_fids_unselected = new Array();

var images_hover = {"gallery_live_prev":true,
					"gallery_live_next":true,
					"gallery_live_prev_unselected":true,
					"gallery_live_next_unselected":true,
					"gallery_live_sendmail":true,
					"post_to_fb":true,
					"post_to_twitter":true
					};
				
var images_hoverout = {"gallery_live_prev_hover":true,
					"gallery_live_next_hover":true,
					"gallery_live_prev_unselected_hover":true,
					"gallery_live_next_unselected_hover":true,
					"gallery_live_sendmail_hover":true,
					"post_to_fb_hover":true,
					"post_to_twitter_hover":true
					};

var t_image_hover = null;

var send_mail_form = null;

var exclude_control_ids = {"message_text" : true};

var last_event = null;


String.prototype.replaceAll = function(stringToFind,stringToReplace){
                var temp = this;
                var index = temp.indexOf(stringToFind);
                while(index != -1){
                    temp = temp.replace(stringToFind,stringToReplace);
                    index = temp.indexOf(stringToFind);
                }
                return temp;
            }
			
String.prototype.left = function(n){
	var str = this;
	if (n <= 0)
	    return "";
	else if (n > String(str).length)
	    return str;
	else
	    return String(str).substring(0,n);
}
String.prototype.right = function(n){
	var str = this;
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}
var objGalleryLiveToolbar = {

    LoadQuicLink: function (e) {

        if (login_success_url.indexOf("login_success.php") > 0) {
            load_frame(true);

        } else {
			/* Browser Dependent - Begin */
            document.getElementById("gallerylive-dropdown").hidden = true;
            document.getElementById("gallerylive-login").hidden = false;
            openAndReuseOneTabPerAttribute(addon_attr, "http://quiclink.com/extension/login.php");
			/* Browser Dependent - End */
        }

    },


    ////////////////////////////////////////////////////////////////////////////
    // The TrimString() function will trim all leading and trailing whitespace
    // from the incoming string, and convert all runs of more than one whitespace
    // character into a single space. The altered string gets returned.
    ////////////////////////////////////////////////////////////////////////////
    TrimString: function (string) {
        // If the incoming string is invalid, or nothing was passed in, return empty
        if (!string) return "";

        string = string.replace(/^\s+/, ''); // Remove leading whitespace
        string = string.replace(/\s+$/, ''); // Remove trailing whitespace
        // Replace all whitespace runs with a single space
        string = string.replace(/\s+/g, ' ');

        return string; // Return the altered value
    }
};

function processTabRemoved(event) {
	/* Browser Dependent function */
    var browser = gBrowser.getBrowserForTab(event.target);
    // browser is the XUL element of the browser that's been removed
    if (event.target.hasAttribute(addon_attr)) {
        if (browser.currentURI.spec.indexOf("login_success.php") >= 0) {
            login_success_url = browser.currentURI.spec;
			
			var url = login_success_url;

            var objURL = new Object();
            // Use the String::replace method to iterate over each
            // name-value pair in the query string. Location.search
            // gives us the query string (if it exists).
            url.replace(
            new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),

            // For each matched query string pair, add that
            // pair to the URL struct using the pre-equals
            // value as the key.
            function( $0, $1, $2, $3 ){
				objURL[ $1 ] = $3;
            });

            var val = objURL["session"];
            val = val.replaceAll('%22', '"');

            myStorage = JSON.parse(val);
            myStorage["Mysession"] = val;

            var sessionData = myStorage["Mysession"];

            var zeroIndex = sessionData.split('"uid":');
            var zeroIndex = zeroIndex[1].split(',"email":');
            var uid = zeroIndex[0];
            var unameSplit = zeroIndex[1].split(',"name":"');
            var unameSplit = unameSplit[1].split('"}');

            myStorage["uname"] = unameSplit[0];
            myStorage["fbuid"] = uid;
				
			load_frame(false);
	
			callOtherDomain(getPics_ViewAlbum, "http://quiclink.com/extension/manage.php?getimages=all&uid=" + myStorage["fbuid"]);
			
            
        }
    }

}

function getPics_ViewAlbum(req) {
	//last_pics_response=req;
	render_display(req, false);
}

function render_display(req, reset_display) {
    xmlDoc = req.responseXML;
    var x			= xmlDoc.getElementsByTagName("image");
    var fids			= xmlDoc.getElementsByTagName("fid");
    var myimgs		= xmlDoc.getElementsByTagName("myimage");
    var myusernames	= xmlDoc.getElementsByTagName("myusername");
    var friendnames	= xmlDoc.getElementsByTagName("friendname");
    var friendemails	= xmlDoc.getElementsByTagName("friendemail");
    var totsentqls	= xmlDoc.getElementsByTagName("totsentql");

	
	
	for(i=0;i<x.length;i++){
		var fid = fids[i].childNodes[0].nodeValue;
		
        var dbImgStr = x[i].childNodes[0].nodeValue;
                    
        if (dbImgStr.match(/http.*?/)){
            //                
        } else if(x[i].childNodes[0].nodeValue!='NO_IMAGE'){
            dbImgStr = 'http://quiclink.com/extension/images/'+ parent.myStorage["fbuid"] + '/' + x[i].childNodes[0].nodeValue;
        } else if(x[i].childNodes[0].nodeValue=='NO_IMAGE'){
             dbImgStr = 'http://quiclink.com/extension/images/no_image.gif';
        }
                    
        var title = friendnames[i].childNodes[0].nodeValue;
		var email = friendemails[i].childNodes[0].nodeValue;
	
		unselected_friends[fid]={image:dbImgStr, name:title, id:fid, email: email};
		
	}
	refresh_arrays();		
	
}
	
function refresh_arrays()
{
	//Selected Friends
	selected_friends_copy = new Array();
	
    for (var f in selected_friends) {
		
        selected_friends_copy[selected_friends_copy.length] = selected_friends[f];		
    }
    selected_friends_copy.sort(sortfunction);

	mapping_fids_selected = new Array();
	for (var i = 0; i < selected_friends_copy.length; i++)
	{
		var elem = selected_friends_copy[i];
		mapping_fids_selected[elem["id"]] = i;
	}	
    current_page = 1;
	max_pages = Math.floor(selected_friends_copy.length / selected_page_size);
    var residue = (selected_friends_copy.length % selected_page_size);
    if (residue > 0) max_pages++;
    if (max_pages < 1) max_pages = 1;
	
	//Unselected Friends
	unselected_friends_copy = new Array();	
    for (var f in unselected_friends) {	
        unselected_friends_copy[unselected_friends_copy.length] = unselected_friends[f];
    }
    unselected_friends_copy.sort(sortfunction);

	mapping_fids_unselected = new Array();
	for (var i = 0; i < unselected_friends_copy.length; i++)
	{
		var elem = unselected_friends_copy[i];
		mapping_fids_unselected[elem["id"]] = i;
	}
	
    unselected_current_page = 1;
	unselected_max_pages = Math.floor(unselected_friends_copy.length / unselected_page_size);
    residue = (unselected_friends_copy.length % unselected_page_size);
    if (residue > 0) unselected_max_pages++;

    if (unselected_max_pages < 1) unselected_max_pages = 1;
}
// During initialization

function processDoubleClick(event)
{
	last_event = event;
	mydocument = event.originalTarget.ownerDocument; 
	
	if (
		(event.originalTarget instanceof HTMLImageElement && event.originalTarget.id.indexOf("img_selected_friend_")==0) 
		||
		(event.originalTarget instanceof HTMLDivElement && event.originalTarget.id.indexOf("name_selected_friend_")==0) 
	   )
		{
			//Move from selected to unselected
			
			//Find the id of the div			
			var arr = event.originalTarget.id.split("_");
			var id = arr[arr.length-1];	
			var elem = selected_friends_copy[id];

			var fid = elem["id"];

			unselected_friends[fid]={image:elem["image"], name:elem["name"], id:elem["id"], email: elem["email"]};
			delete selected_friends[fid];
			
			var last_current_page = current_page;
			
			refresh_arrays();	
			//redrawCircle(unselected_cp, selected_cp)
			//unselected_current_page
			//current_page
			//Stay on current selected page, move to the unselected page where fid moved
			//If current selected page does not have any elements, display the last selected page

			/*mapping_fids_unselected
			mapping_fids_selected*/
			current_page = last_current_page;
			
			if  (current_page > max_pages) current_page = max_pages;
			var unselected_friend_idx = (mapping_fids_unselected[fid]+1);
			
			//Given an index calculate the page no.
			unselected_current_page = Math.floor(unselected_friend_idx / unselected_page_size);
			var residue = (unselected_friend_idx % unselected_page_size);
			if (residue > 0) unselected_current_page++;
			if (unselected_current_page < 1) unselected_current_page = 1;
	
			redrawCircle(unselected_current_page, current_page);
		}
	   else if (
		(event.originalTarget instanceof HTMLImageElement && event.originalTarget.id.indexOf("img_unselected_friend_")==0) 
		||
		(event.originalTarget instanceof HTMLDivElement && event.originalTarget.id.indexOf("name_unselected_friend_")==0) 
	   )
		{
			//Move from unselected to selected
			//Find the id of the div			
			var arr = event.originalTarget.id.split("_");
			var id = arr[arr.length-1];	
			var elem = unselected_friends_copy[id];

			var fid = elem["id"];

			selected_friends[fid]={image:elem["image"], name:elem["name"], id:elem["id"], email: elem["email"]};
			delete unselected_friends[fid];
			var last_unselected_current_page = unselected_current_page;
			
			refresh_arrays();	
			//redrawCircle(unselected_cp, selected_cp)
			//unselected_current_page
			//current_page
			//Stay on current unselected page, move to the selected page where fid moved
			//If current unselected page does not have any elements, display the last unselected page
			unselected_current_page = last_unselected_current_page;
			
			if  (unselected_current_page > unselected_max_pages) unselected_current_page = unselected_max_pages;
			var selected_friend_idx = (mapping_fids_selected[fid]+1);
			
			//Given an index calculate the page no.
			selected_current_page = Math.floor(selected_friend_idx / selected_page_size);
			var residue = (selected_friend_idx % selected_page_size);
			if (residue > 0) selected_current_page++;
			if (selected_current_page < 1) selected_current_page = 1;
	
			redrawCircle(unselected_current_page, selected_current_page);
		}

}
/** New - begin */
function processHoverOut(event)
{
	last_event = event;
	mydocument = event.originalTarget.ownerDocument; 
	/*if (t_image_hover!=null) 
	{
		clearTimeout(t_image_hover);
		t_image_hover = null;
	}*/
	
	if (
		(event.originalTarget instanceof HTMLImageElement && event.originalTarget.id.indexOf("img_selected_friend_")==0) 
		||
		(event.originalTarget instanceof HTMLDivElement && event.originalTarget.id.indexOf("name_selected_friend_")==0) 
	   )
		{
			//Find the id of the div
			//mouseout
			var arr = event.originalTarget.id.split("_");
			var id = "selected_friend_" + arr[arr.length-1];			
			var mparent = mydocument.getElementById(id);
			mparent.setAttribute ("style",old_style[id]);
			
			var name_element_id="name_"+id;
			var name_element = mydocument.getElementById(name_element_id);
			name_element.style.backgroundColor="#73A8D0";
	}
	else if (
		(event.originalTarget instanceof HTMLImageElement && event.originalTarget.id.indexOf("img_unselected_friend_")==0) 
		||
		(event.originalTarget instanceof HTMLDivElement && event.originalTarget.id.indexOf("name_unselected_friend_")==0) 
	   )
		{
			//Find the id of the div			
			var arr = event.originalTarget.id.split("_");
			var id = "unselected_friend_" + arr[arr.length-1];			
			var mparent = mydocument.getElementById(id);
			mparent.setAttribute ("style",old_style[id]);
			
			var name_element_id="name_"+id;
			var name_element = mydocument.getElementById(name_element_id);
			name_element.style.backgroundColor="black";
	}
	else if (event.originalTarget instanceof HTMLImageElement) {
           
           if (images_hoverout[event.originalTarget.id]!=undefined && images_hoverout[event.originalTarget.id]!=null) {
				var id = event.originalTarget.id.replace("_hover", "");
				
				if (mydocument.getElementById(id) != undefined &&
					mydocument.getElementById(id) != null)
				{
					mydocument.getElementById(event.originalTarget.id).style.display="none";
					mydocument.getElementById(id).style.display="block";
				}
				
				for (var e in images_hoverout)
				{
					var oid = e.replace("_hover", "");
					
					if (id != oid)
					{
						if (mydocument.getElementById(oid) != undefined &&
							mydocument.getElementById(oid) != null)
						{
							mydocument.getElementById(e).style.display="none"; //hover
							mydocument.getElementById(oid).style.display="block";
						}
					}
				}
			}
			
	}
	
}

function processHover(event)
{
	last_event = event;
	mydocument = event.originalTarget.ownerDocument; 
	
	if (
		(event.originalTarget instanceof HTMLImageElement && event.originalTarget.id.indexOf("img_selected_friend_")==0) 
		||
		(event.originalTarget instanceof HTMLDivElement && event.originalTarget.id.indexOf("name_selected_friend_")==0) 
	   )
		{
			//Find the id of the div
			//mouseout
			var arr = event.originalTarget.id.split("_");
			var id = "selected_friend_" + arr[arr.length-1];			
			var mparent = mydocument.getElementById(id);

			if (mparent.getAttribute ("style").indexOf("moz-box-shadow")<0)
			{
				old_style[id] = mparent.getAttribute ("style");
				
				var sel_style_hover=old_style[id] + ";cursor:pointer;-moz-box-shadow:-3px -3px 1px blue;-moz-transform:scale(1.0);";
				mparent.setAttribute ("style",sel_style_hover);

				var name_element_id="name_"+id;
				var name_element = mydocument.getElementById(name_element_id);
				name_element.style.backgroundColor="black";
			}
	}

	else if (
		(event.originalTarget instanceof HTMLImageElement && event.originalTarget.id.indexOf("img_unselected_friend_")==0) 
		||
		(event.originalTarget instanceof HTMLDivElement && event.originalTarget.id.indexOf("name_unselected_friend_")==0) 
	   )
		{
			//Find the id of the div
			//mouseout
			var arr = event.originalTarget.id.split("_");
			var id = "unselected_friend_" + arr[arr.length-1];			
			var mparent = mydocument.getElementById(id);
			if (mparent.getAttribute ("style").indexOf("moz-box-shadow")<0)
			{
				old_style[id] = mparent.getAttribute ("style");
				
				var sel_style_hover=old_style[id] + ";cursor:pointer;-moz-box-shadow:-3px -3px 1px blue;-moz-transform:scale(1.0);";
				mparent.setAttribute ("style",sel_style_hover);
				mparent.style.height="57";
				
				var name_element_id="name_"+id;
				var name_element = mydocument.getElementById(name_element_id);
				name_element.style.backgroundColor="#73A8D0";
			}
	}
	else if (event.originalTarget instanceof HTMLImageElement) {
           
             if (images_hover[event.originalTarget.id]!=undefined && images_hover[event.originalTarget.id]!=null) {
				if (mydocument.getElementById(event.originalTarget.id + "_hover") != undefined &&
					mydocument.getElementById(event.originalTarget.id + "_hover") != null)
				{
					mydocument.getElementById(event.originalTarget.id).style.display="none";
					mydocument.getElementById(event.originalTarget.id + "_hover").style.display="block";
					

					if (t_image_hover != null) clearTimeout(t_image_hover); //clear out previous timeout
					last_element = mydocument.getElementById(event.originalTarget.id + "_hover");
					display_alert("Before setTimeout processHoverAction: current element:" + last_element.id);
					t_image_hover = setTimeout("processHoverAction()", 2000);
				}
				
				for (var e in images_hover)
				{

					if (event.originalTarget.id != e)
					{
						if (mydocument.getElementById(e + "_hover") != undefined &&
							mydocument.getElementById(e + "_hover") != null)
						{
							mydocument.getElementById(e).style.display="block";
							mydocument.getElementById(e + "_hover").style.display="none";
						}
					}
				}
				
			}
	}
	
}

function processHoverAction()
{
	display_alert("In processHoverAction:");
	//if (last_element!=null)
	//{
		processaction(last_element);
	//}
}
function processaction(element)
{
	display_alert("In processaction:");
	if (exclude_control_ids[element.id]!=undefined && exclude_control_ids[element.id]!=null)
	{
		return true;
	}
	if (element instanceof HTMLImageElement) {

            
            if (element.id == "gallery_live_prev_hover") {
                current_page -= 1;
                if (current_page < 1) current_page = 1;
                redrawCircle(unselected_current_page, current_page);
                return true;
            }

			
			if (element.id == "gallery_live_prev_unselected_hover") {
                unselected_current_page -= 1;
                if (unselected_current_page < 1) unselected_current_page = 1;
				redrawCircle(unselected_current_page, current_page);
                return true;
            }
            if (element.id == "gallery_live_next_hover") {
                current_page += 1;
                if (current_page > max_pages) current_page = max_pages;
                redrawCircle(unselected_current_page, current_page);
                return true;
            }

			if (element.id == "gallery_live_next_unselected_hover") {
                unselected_current_page += 1;
                if (unselected_current_page > unselected_max_pages) unselected_current_page = unselected_max_pages;
                redrawCircle(unselected_current_page, current_page);
                return true;
            }

            if (element.id == "gallery_live_sendmail_hover") {
                sendMail();
                return true;
            }
    }

	return false;
}
function processPageLoad(event) {
	last_event = event;
	
	display_alert ("processPageLoad - event.originalTarget.id="+ event.originalTarget.id);
	if (exclude_control_ids[event.originalTarget.id]!=undefined && exclude_control_ids[event.originalTarget.id]!=null)
	{
			return;
	}
		
    if (event.originalTarget instanceof HTMLElement) {
		
		//_okButton
		if(event.originalTarget.id=="displayMessageQuicLinkId_okButton")
		{
			closeMessage("displayMessageQuicLinkId", true);
			return;
		}
		
		//if (processaction(event.originalTarget)) return;
		
		
		/* Browser Dependent - Begin */
        var selObject = event.originalTarget; 
        mydocument = event.originalTarget.ownerDocument; 
		/* Browser Dependent - End */
		
        canvasDiv = selObject;


        if (t != null) clearTimeout(t); //clear out previous timeout
        t = setTimeout("processMouseDown()", 500);		
		
    } else {
        //hide_circle();
    }
    mouseDown++;
    mouseDownTime = new Date().getTime();

}

/** New - end */


function processMouseDown() {
    if (!circleDrawnFlag && canvasDiv != null && mydocument != null) {
		display_alert ("processMouseDown - if stmt");
        drawCircle(1, 1);
        circleDrawnFlag = true;
    } else {
		display_alert ("processMouseDown - else stmt");
        //hide
        hide_circle(false);
    }
}

function hide_circle(forceflag) {
	display_alert ("hide_circle - hide_circle  hide_circle - hide_circle");
	var click_x = last_event.pageX;
	var click_y = last_event.pageY;
	if (click_x < 0){click_x = 0}
	if (click_y < 0){click_y = 0} 
	display_alert ("click_x=" + click_x +",click_y=" + click_y + ",canvasDiv_left=" + canvasDiv_left +
				",canvasDiv_top=" + canvasDiv_top);
	var hideFlag = true;
	
	if (!forceflag)
	{
		if (circleDrawnFlag == false || (
											click_x >= canvasDiv_left && click_x <= (canvasDiv_left+bkg_width)
												&&
											click_y >= canvasDiv_top && click_y <= (canvasDiv_top+bkg_height)
										)
			)
		{
		
					hideFlag = false;
		}
	}
	
	if (hideFlag)
	{
		
		try
		{
			//if (last_fill != null && canvasDiv != null) canvasDiv.removeChild(last_fill);
			if (last_fill != null && lastCanvasDiv != null) 
			{
					if (send_mail_form!=null) lastCanvasDiv.removeChild(send_mail_form);
					send_mail_form = null;
					
					lastCanvasDiv.removeChild(last_fill);
					last_fill = null;
			}
		}
		catch (err)
		{
		
		}
		last_fill = null;
		circleDrawnFlag = false;
		canvasDiv = null;
		mydocument = null;
		if (t != null) clearTimeout(t);
		current_page = 1;
		unselected_current_page = 1;
		page_div = null;
		canvasDiv_left = 0;
		canvasDiv_top = 0;
	}
}


function mouseReleased(event) {
	last_event = event;
	mydocument = event.originalTarget.ownerDocument; 
    mouseDown--;
    mouseReleasedTime = new Date().getTime();
    if (t != null) clearTimeout(t);
}

function simplify(str) {
	var item = document.createElementNS("http://www.w3.org/1999/xhtml", "span");
	if (str.length>80) str=str.left(80)+"...";
	item.appendChild(document.createTextNode(str));    
	return item.innerHTML;
}


function wrap_around(str, len) {
	var item = document.createElementNS("http://www.w3.org/1999/xhtml", "span");
	var arr = str.split(" ");
	var words = "";
	for (i = 0; i < arr.length; i++)
	{
		var elem =  arr[i];
		if (elem.length>len) 
		{
			elem=elem.left(len)+" " + elem.substring(len);
		}
		if (i==0)
		{
			words = elem;
		}
		else
		{
			words += " " + elem;
		}
	}
	item.appendChild(document.createTextNode(words));    
	return item.innerHTML;
}
function redrawCircle(unselected_cp, selected_cp)
{
	hide_message();
	display_alert("In redrawCircle: unselected_cp=" + unselected_cp + ",selected_cp=" + selected_cp);
	
	unselected_current_page = unselected_cp;
	current_page = selected_cp;
	
	var left=(mouseX - bkg_width/2)
	var top = (mouseY - bkg_height/2)

	var xmlns= "" ; //" xmlns='http://www.w3.org/1999/xhtml' ";
	
	var line1 =	"<span " + xmlns + " style='text-align:left;font-size:12px; font-weight:bold;font-family: Arial, Helvetica, sans-serif;padding-top:10px;padding-left:10px;float:left;display:block;z-index:9999;width:" + left_section + "px;'>SHARING: " + simplify(get_current_title()) + "</span>" +
		"<img style='float:right;display:block;z-index:9999;width:" + logo_width + "px;height:" + logo_height + "px;' src='chrome://gallerylive/skin/logo.png' border='0'></img>";
		
	var line2 = "<span  " + xmlns + " style='text-align:left;font-size:10px; font-weight:bold;font-family: Arial, Helvetica, sans-serif;padding-top:10px;padding-left:10px;float:left;display:block;z-index:9999;width:" + left_section + "px;'>URL: " + simplify(get_current_url()) + "</span>";
	
	var div_top = 60;
		
	var line3 = "<span style='position:absolute;top:" + div_top + "px;padding-left:10px;float:left;display:block;z-index:9999;width:" + left_section + "px;height:37px;'>" + 
		" <img id='post_to_fb' style='float:left;display:block;z-index:9999;width:192px;height:37px;' src='chrome://gallerylive/skin/post_to_fb.png' border='0'></img>" + 
		" <img id='post_to_fb_hover' style='cursor:pointer;float:left;display:none;z-index:9999;width:192px;height:37px;' src='chrome://gallerylive/skin/post_to_fb-hover.png' border='0'></img>" + 
		" <img id='post_to_twitter' style='padding-left:20px;display:block;z-index:9999;width:193px;height:35px;' src='chrome://gallerylive/skin/post_to_twitter.png' border='0'></img>" + 
		" <img id='post_to_twitter_hover' style='cursor:pointer;padding-left:20px;display:none;z-index:9999;width:193px;height:35px;' src='chrome://gallerylive/skin/post_to_twitter-hover.png' border='0'></img>" + 		
		"</span>";
	
	
	div_top = 130;
	
	selected_friends_div_top = div_top;
	var friends = gen_html_selected_friends(selected_cp);
	display_alert("selected_friends=" + friends);
	
	var line5 = "<span style='padding-top:10px;padding-left:10px;float:left;display:block;z-index:9999;width:" + left_section + "px;height:57px;'>" + 
					friends +	
				"</span>";

	
	div_top += 90;
	unselected_friends_div_top = div_top;
	
	
	var pick_friends = gen_html_unselected_friends(unselected_cp);
	
	var line7 = "<span id='unselected_friends' style='padding-top:10px;padding-left:10px;float:left;display:block;z-index:9999;width:" + left_section + "px;height:57px;'>" + 
					pick_friends +	
				"</span>";

	
    var line8 =	"<img id='gallery_live_sendmail' style='position:absolute;top:" + sendmail_div_top + "px;padding-top:10px;padding-left:20px;float:left;display:block;z-index:9999;width:" + 670 + "px;height:" + 34 + "px;' src='chrome://gallerylive/skin/send.png' border='0'></img>";
	var line9 =	"<img id='gallery_live_sendmail_hover' style='cursor:pointer;display:none;position:absolute;top:" + sendmail_div_top + "px;padding-top:10px;padding-left:20px;float:left;z-index:9999;width:" + 670 + "px;height:" + 34 + "px;' src='chrome://gallerylive/skin/send-hover.png' border='0'></img>";

	canvasDiv_left = left;
	canvasDiv_top = top;
	
    new_last_fill = createHTMLElement("<div id='gallerylive_form_div' class='mygl_cls' style=\"border: 3px coral solid;left:" + left + "px;top:" + top + "px;display:block;position: absolute; z-index:9999;width:" + bkg_width + "px;height:" + bkg_height + "px;background-image: url(chrome://gallerylive/skin/background.png)\">" +
		line1 + line2 +	line3 + line5 + line7 + line8 + line9 + 
	"</div>");
	
    lastCanvasDiv.replaceChild(new_last_fill, last_fill);
	last_fill = new_last_fill;

}
function drawCircle(unselected_cp, selected_cp) {
	hide_message();
	loadtime = Math.round(new Date().getTime() / 1000);
	try
	{
		//if (last_fill != null && lastCanvasDiv != null) lastCanvasDiv.removeChild(last_fill);
		if (last_fill != null && lastCanvasDiv != null) 
		{
				lastCanvasDiv.removeChild(last_fill);
				last_fill = null;
		}
	}
	catch (err)
	{
	}
    calculateXY();
	var left=(mouseX - bkg_width/2)
	var top = (mouseY - bkg_height/2)

	var xmlns= "" ; //" xmlns='http://www.w3.org/1999/xhtml' ";
	
	var line1 =	"<span " + xmlns + " style='text-align:left;font-size:12px; font-weight:bold;font-family: Arial, Helvetica, sans-serif;padding-top:10px;padding-left:10px;float:left;display:block;z-index:9999;width:" + left_section + "px;'>SHARING: " + simplify(get_current_title()) + "</span>" +
		"<img style='float:right;display:block;z-index:9999;width:" + logo_width + "px;height:" + logo_height + "px;' src='chrome://gallerylive/skin/logo.png' border='0'></img>";
		
	var line2 = "<span  " + xmlns + " style='text-align:left;font-size:10px; font-weight:bold;font-family: Arial, Helvetica, sans-serif;padding-top:10px;padding-left:10px;float:left;display:block;z-index:9999;width:" + left_section + "px;'>URL: " + simplify(get_current_url()) + "</span>";
	
	var div_top = 60;
		
	var line3 = "<span style='position:absolute;top:" + div_top + "px;padding-left:10px;float:left;display:block;z-index:9999;width:" + left_section + "px;height:37px;'>" + 
		" <img id='post_to_fb' style='float:left;display:block;z-index:9999;width:192px;height:37px;' src='chrome://gallerylive/skin/post_to_fb.png' border='0'></img>" + 
		" <img id='post_to_fb_hover' style='cursor:pointer;float:left;display:none;z-index:9999;width:192px;height:37px;' src='chrome://gallerylive/skin/post_to_fb-hover.png' border='0'></img>" + 
		" <img id='post_to_twitter' style='padding-left:20px;display:block;z-index:9999;width:193px;height:35px;' src='chrome://gallerylive/skin/post_to_twitter.png' border='0'></img>" + 
		" <img id='post_to_twitter_hover' style='cursor:pointer;padding-left:20px;display:none;z-index:9999;width:193px;height:35px;' src='chrome://gallerylive/skin/post_to_twitter-hover.png' border='0'></img>" + 		
		"</span>";
	
	
	div_top = 130;
	
	selected_friends_div_top = div_top;
	var friends = gen_html_selected_friends(selected_cp);
	//display_alert(friends);
	
	var line5 = "<span style='padding-top:10px;padding-left:10px;float:left;display:block;z-index:9999;width:" + left_section + "px;height:57px;'>" + 
					friends +	
				"</span>";

	
	div_top += 90;
	unselected_friends_div_top = div_top;
	
	
	var pick_friends = gen_html_unselected_friends(unselected_cp);
	
	var line7 = "<span id='unselected_friends' style='padding-top:10px;padding-left:10px;float:left;display:block;z-index:9999;width:" + left_section + "px;height:57px;'>" + 
					pick_friends +	
				"</span>";

	
    var line8 =	"<img id='gallery_live_sendmail' style='position:absolute;top:" + sendmail_div_top + "px;padding-top:10px;padding-left:20px;float:left;display:block;z-index:9999;width:" + 670 + "px;height:" + 34 + "px;' src='chrome://gallerylive/skin/send.png' border='0'></img>";
	var line9 =	"<img id='gallery_live_sendmail_hover' style='cursor:pointer;display:none;position:absolute;top:" + sendmail_div_top + "px;padding-top:10px;padding-left:20px;float:left;z-index:9999;width:" + 670 + "px;height:" + 34 + "px;' src='chrome://gallerylive/skin/send-hover.png' border='0'></img>";
	
	canvasDiv_left = left;
	canvasDiv_top = top;
	
    last_fill = createHTMLElement("<div id='gallerylive_form_div' class='mygl_cls' style=\"border: 3px coral solid;left:" + left + "px;top:" + top + "px;display:block;position: absolute; z-index:9999;width:" + bkg_width + "px;height:" + bkg_height + "px;background-image: url(chrome://gallerylive/skin/background.png)\">" +
		line1 + line2 +	line3 + line5 + line7 + line8 + line9 + 
	"</div>");
    canvasDiv.appendChild(last_fill);
	last_fill.style.display="block";
	lastCanvasDiv = canvasDiv;
}

function gen_html_unselected_friends(pageNo)
{
	var pick_friends="";
	var lower_bound = (pageNo - 1) * unselected_page_size + 1;
    var upper_bound = lower_bound + unselected_page_size;
	//alert(lower_bound + "," + upper_bound);
	
	var div_top = unselected_friends_div_top;
	var pick_friends = "";
	var rel_left = 0; 

	if (prev_unselected_flag || prev_unselected_flag) 
	{
		rel_left = 50; 
	}
	for (var i = 0; i < (upper_bound - lower_bound); i++)
	{
		var idx = lower_bound + i - 1;
		
		var unselected_friend = unselected_friends_copy[idx];
	
		if (unselected_friend == undefined || unselected_friend == null) continue;
		
		var div_width=112;
		var div_height=57;
		
		var padding=10;

		var curr_left = ((i%max)*120+padding)+rel_left;
	
		if  (i > 0 && i%max==0)
		{
			//take to next line
			div_top += 75;
		}
		var friend_template = '<div id="unselected_friend_' + idx + '" ' +
								' style="left:' + curr_left + 'px;top:' + div_top + 'px; display:block;z-index:9999;width:' + div_width + 'px;height:' + div_height + 'px;position:absolute;" >' +
								  '<div>' +
									'<img border="0" id="img_unselected_friend_' + idx + '" style="float:left;display:block;z-index:9999;width:44px;height:57px;" src="' + unselected_friend["image"] + '"></img>' +						
									'<div style="float:right;display:block;z-index:9999;background-color:black;width:68px;height:57px;color:white;font-size:11px; font-weight:bold;font-family: Arial, Helvetica, sans-serif;"> ' +
											'<div id="name_unselected_friend_' + idx + '" style="text-align:center;height:90%;padding-left:5px;padding-top:5px;width:90%;letter-spacing:1px;overflow:hidden;">' + wrap_around(unselected_friend["name"],8) + '</div> ' +
									'</div>' +
								  '</div>' +
								'</div>';
				
		if (i==0)
		{
			var line6 = "<span style='left:" + (curr_left-rel_left) + "px;top:" + (div_top-20) + "px; position:absolute;text-align:left;font-size:12px; font-weight:bold;font-family: Arial, Helvetica, sans-serif;float:left;display:block;z-index:9999;width:" + left_section + "px;'>PICK FRIENDS:</span>";
			var prev= '<img border="0" id="gallery_live_prev_unselected" style="left:' + (curr_left-rel_left) + 'px;top:' + (div_top) + 'px; position:absolute;float:left;display:block;z-index:9999;width:40px;height:162px;" src="chrome://gallerylive/skin/prev.png"></img>';						
			var prev_hover= '<img border="0" id="gallery_live_prev_unselected_hover" style="cursor:pointer;left:' + (curr_left-rel_left) + 'px;top:' + (div_top) + 'px; position:absolute;float:left;display:none;z-index:9999;width:40px;height:162px;" src="chrome://gallerylive/skin/prev-hover.png"></img>';						
			var next= '<img border="0" id="gallery_live_next_unselected" style="left:' + (curr_left+rel_left - 10 + max*div_width) + 'px;top:' + (div_top) + 'px; position:absolute;float:left;display:block;z-index:9999;width:40px;height:162px;" src="chrome://gallerylive/skin/next.png"></img>';						
			var next_hover= '<img border="0" id="gallery_live_next_unselected_hover" style="cursor:pointer;left:' + (curr_left+rel_left - 10 + max*div_width) + 'px;top:' + (div_top) + 'px; position:absolute;float:left;display:none;z-index:9999;width:40px;height:162px;" src="chrome://gallerylive/skin/next-hover.png"></img>';						

			pick_friends = 	line6 + (prev_unselected_flag?prev+prev_hover:"") + (prev_unselected_flag?next+next_hover:"") + friend_template;	
		}
		else
		{

			pick_friends += 	friend_template;	
		}	
		
	}
	return pick_friends;
}

function gen_html_selected_friends(pageNo)
{
	var friends="";
	var lower_bound = (pageNo - 1) * selected_page_size + 1;
    var upper_bound = lower_bound + selected_page_size;
	display_alert(lower_bound + "," + upper_bound);
	
	var div_top = selected_friends_div_top;
	var pick_friends = "";
	var rel_selected_left = 0; 

	if (prev_selected_flag || prev_selected_flag) 
	{
		rel_selected_left = 50; 
	}
	for (var i = 0; i < (upper_bound - lower_bound); i++)
	{
		var idx = lower_bound + i - 1;
		
		var selected_friend = selected_friends_copy[idx];
	
		if (selected_friend == undefined || selected_friend == null || selected_friend["name"] == undefined || selected_friend["name"] == null) continue;
		
		var div_width=112;
		var div_height=57;
		
		var padding=10;

		var curr_left = ((i%max)*120+padding)+rel_selected_left;
	
		if  (i > 0 && i%max==0)
		{
			//take to next line
			div_top += 75;
		}
		var friend_template = '<div id="selected_friend_' + idx + '" ' +
								' style="left:' + curr_left + 'px;top:' + div_top + 'px; display:block;z-index:9999;width:' + div_width + 'px;height:' + div_height + 'px;position:absolute;" >' +
								  '<div>' +
									'<img border="0" id="img_selected_friend_' + idx + '" style="float:left;display:block;z-index:9999;width:44px;height:57px;" src="' + selected_friend["image"] + '"></img>' +						
									'<div style="float:right;display:block;z-index:9999;background-color:#73A8D0;width:68px;height:57px;color:white;font-size:11px; font-weight:bold;font-family: Arial, Helvetica, sans-serif;"> ' +
											'<div id="name_selected_friend_' + idx + '" style="text-align:center;height:90%;padding-left:5px;padding-top:5px;width:90%;letter-spacing:1px;overflow:hidden;">' + wrap_around(selected_friend["name"],8) + '</div> ' +
									'</div>' +
								  '</div>' +
								'</div>';
				
		if (i==0)
		{
			var line4 = "<span style='left:" + (curr_left-rel_selected_left) + "px;top:" + (div_top-20) + "px; position:absolute;text-align:left;font-size:12px; font-weight:bold;font-family: Arial, Helvetica, sans-serif;float:left;display:block;z-index:9999;width:" + left_section + "px;'>SELECTED FRIENDS:</span>";
			var prev= '<img border="0" id="gallery_live_prev" style="left:' + (curr_left-rel_selected_left) + 'px;top:' + (div_top) + 'px; position:absolute;float:left;display:block;z-index:9999;width:40px;height:57px;" src="chrome://gallerylive/skin/prev_selected.png"></img>';						
			var prev_hover= '<img border="0" id="gallery_live_prev_hover" style="cursor:pointer;left:' + (curr_left-rel_selected_left) + 'px;top:' + (div_top) + 'px; position:absolute;float:left;display:none;z-index:9999;width:40px;height:57px;" src="chrome://gallerylive/skin/prev_selected-hover.png"></img>';						
			var next= '<img border="0" id="gallery_live_next" style="left:' + (curr_left+rel_selected_left - 10 + max*div_width) + 'px;top:' + (div_top) + 'px; position:absolute;float:left;display:block;z-index:9999;width:40px;height:57px;" src="chrome://gallerylive/skin/next_selected.png"></img>';						
			var next_hover= '<img border="0" id="gallery_live_next_hover" style="cursor:pointer;left:' + (curr_left+rel_selected_left - 10 + max*div_width) + 'px;top:' + (div_top) + 'px; position:absolute;float:left;display:none;z-index:9999;width:40px;height:57px;" src="chrome://gallerylive/skin/next_selected-hover.png"></img>';						

			friends = 	line4 + (prev_selected_flag?prev+prev_hover:"") + (next_selected_flag?next+next_hover:"") + friend_template;
		}
		else
		{

			friends += 	friend_template;	
		}	
		
	}
	return friends;
}

function sortfunction(a, b) {
    //Compare "a" and "b" in some fashion, and return -1, 0, or 1
    var name1 = a["name"].toLowerCase();
    var name2 = b["name"].toLowerCase();

    return (name1 < name2 ? -1 : (name1 > name2 ? 1 : 0));

}


function getLeft(row, col) {
    return (mouseX - (rowHeight / 2) - rowHeight + (col * 50) - 20);
}

function getTop(row, col) {

    return (mouseY - bkg_height + (row * 50) - 20);
}

function createHTMLElement(html) {
	/* Browser Dependent Function */
    var item = document.createElementNS("http://www.w3.org/1999/xhtml", "span");
    item.innerHTML = html;
	/*
	element.appendChild(document.createTextNode('2007-11-22'));
	*/
    item.style.zindex = "9999";

    return item;
}


// do not try to add a callback until the browser window has
// been initialised. We add a callback to the tabbed browser
// when the browser's window gets loaded.
window.addEventListener("load", function () {
    // Add a callback to be run every time a document loads.
    // note that this includes frames/iframes within the document
	
	/* Browser Dependent - Begin */
    container = gBrowser.tabContainer; 
    container.addEventListener("TabClose", processTabRemoved, false);

    gBrowser.addEventListener("mousedown", processPageLoad, false);
    gBrowser.addEventListener("mouseup", mouseReleased, true);
	gBrowser.addEventListener("scroll", redraw, false);
	
	gBrowser.addEventListener("mouseover", processHover, false);
	gBrowser.addEventListener("mouseout", processHoverOut, false);
	gBrowser.addEventListener("dblclick", processDoubleClick, false);
/*
		keypress
		keyup*/
	gBrowser.addEventListener("keyup", processKeyUp, false);
	
	/* Browser Dependent - End */
}, false);


function redraw()
{
	if (last_fill!=null)
	{
		drawCircle(unselected_current_page, current_page);
	}
}
function openAndReuseOneTabPerURL(url, focus_flag) {
	/* Browser Dependent Function: Not Used */
    var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
    var browserEnumerator = wm.getEnumerator("navigator:browser");

    // Check each browser instance for our URL
    found = false;
    success_url = "";

    while (!found && browserEnumerator.hasMoreElements()) {
        var browserWin = browserEnumerator.getNext();
        var tabbrowser = browserWin.gBrowser;

        // Check each tab of this browser instance
        var numTabs = tabbrowser.browsers.length;
        for (var index = 0; index < numTabs; index++) {
            var currentBrowser = tabbrowser.getBrowserAtIndex(index);
            //alert(currentBrowser.currentURI.spec);
            //if (url == currentBrowser.currentURI.spec) {
            if (currentBrowser.currentURI.spec.indexOf(url) >= 0) {
                success_url = currentBrowser.currentURI.spec;

                // The URL is already opened. Select this tab.
                tabbrowser.selectedTab = tabbrowser.tabContainer.childNodes[index];

                // Focus *this* browser-window
                if (focus_flag) browserWin.focus();

                found = true;
                break;
            }
        }
    }

    // Our URL isn't open. Open it now.
    if (!found) {
        var recentWindow = wm.getMostRecentWindow("navigator:browser");
        if (recentWindow) {
            // Use an existing browser window
            recentWindow.delayedOpenTab(url, null, null, null, null);
        } else {
            // No browser windows are open, so open a new one.
            window.open(url);
        }
    }
}

function openAndReuseOneTabPerAttribute(attrName, url) {
	/* Browser Dependent function */
    var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
    for (found = false, index = 0, tabbrowser = wm.getEnumerator('navigator:browser').getNext().gBrowser;
    index < tabbrowser.tabContainer.childNodes.length && !found;
    index++) {

        // Get the next tab
        var currentTab = tabbrowser.tabContainer.childNodes[index];

        // Does this tab contain our custom attribute?
        if (currentTab.hasAttribute(attrName)) {

            // Yes--select and focus it.
            tabbrowser.selectedTab = currentTab;

            // Focus *this* browser window in case another one is currently focused
            tabbrowser.ownerDocument.defaultView.focus();
            found = true;
        }
    }

    if (!found) {
        // Our tab isn't open. Open it now.
        var browserEnumerator = wm.getEnumerator("navigator:browser");
        var tabbrowser = browserEnumerator.getNext().gBrowser;

        // Create tab
        var newTab = tabbrowser.addTab(url);
        newTab.setAttribute(attrName, "xyz");

        // Focus tab
        tabbrowser.selectedTab = newTab;

        // Focus *this* browser window in case another one is currently focused
        tabbrowser.ownerDocument.defaultView.focus();
    }
}

function callOtherDomain(callback, url) {
    var invocation = new XMLHttpRequest();
    if (invocation) {
        invocation.open('GET', url, true);
        invocation.onreadystatechange = function () {

            if (invocation.readyState == 4 && invocation.status == 200) {
                if (typeof callback == 'function') {
                    callback(invocation);
                }
            }
        }
        invocation.send(null);
    }
}

function load_frame(load_content_flag) {
	/* Browser Dependent Function */
    rebuild();
    document.getElementById("gallerylive-dropdown").hidden = false;
    document.getElementById("gallerylive-login").hidden = true;
	if (load_content_flag)
	{
		var fullrefresh = (loaded_count == 0);

		loaded_count++;

		document.getElementById('gallerylive-contentdiv').setAttribute('src', "chrome://gallerylive/content/resource/popup.html?fullrefresh=" + fullrefresh + "&ts=" + new Date().getTime());
	}
}
// implement JSON.stringify serialization
JSON.stringify = JSON.stringify ||
function (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
        // simple data type
        if (t == "string") obj = '"' + obj + '"';
        return String(obj);
    } else {
        // recurse array or object
        var n, v, json = [],
            arr = (obj && obj.constructor == Array);
        for (n in obj) {
            v = obj[n];
            t = typeof (v);
            if (t == "string") v = '"' + v + '"';
            else if (t == "object" && v !== null) v = JSON.stringify(v);
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};

function rebuild() {
	/* Browser Dependent Function */
    var old = document.getElementById("gallerylive-PopupMenu-vbox");
    var new_elem = document.getElementById("gallerylive-PopupMenu-vbox").cloneNode(true);
    document.getElementById("gallerylive-PopupMenu").removeChild(old);

    document.getElementById("gallerylive-PopupMenu").appendChild(new_elem);

}

function calculateXY() {
    // First, determine how much the visitor has scrolled 
    var scrolledX = 0;
    var scrolledY = 0;
	
    if (self.pageYOffset) {
        scrolledX = self.pageXOffset;
        scrolledY = self.pageYOffset;
    } else if (mydocument.documentElement && mydocument.documentElement.scrollTop) {
        scrolledX = mydocument.documentElement.scrollLeft;
        scrolledY = mydocument.documentElement.scrollTop;
    } else if (mydocument.body) {

        scrolledX = mydocument.body.scrollLeft;
        scrolledY = mydocument.body.scrollTop;
    }
	
	
    // Next, determine the coordinates of the center of browser's window 
    var centerX, centerY;
	
    if (window.innerHeight) {
        centerX = window.innerWidth;
        centerY = window.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientHeight > 0) {
        centerX = document.documentElement.clientWidth;
        centerY = document.documentElement.clientHeight;
    } else if (document.body) {
        centerX = document.body.clientWidth;
        centerY = document.body.clientHeight;
    }

    // Xwidth is the width of the div, Yheight is the height of the 
    // div passed as arguments to the function: 
    var leftOffset = scrolledX + centerX / 2;
    var topOffset = scrolledY + centerY / 2;

    mouseX = leftOffset;
    mouseY = topOffset - 100;

}

function getEmailList()
{
	var comma = '';
    var emailToId = '';

	for (var f in selected_friends) {
        var elem = selected_friends[f];
		if (emailToId != '') comma = ',';
		emailToId = elem["id"] + comma + emailToId;
    }
	
	return emailToId;
}

function sendMail() {

    
    var emailToId = getEmailList();
	
    //Checkforgroup
    
    if (emailToId == '' && (send_to_group_selected == null || send_to_group_selected == 0)) {
        displayMessage('displayMessageQuicLinkId', 'QuicLink Error', 'No friend selected.');

    } else {
		if (send_mail_form==null)
		{
			display_send_mail_form();
		}
    }

}

function display_send_mail_form()
{
	var div_left = canvasDiv_left + 60;
	var div_top = canvasDiv_top + 60;
	var div_width = 470;
	var div_height = 200;

	var elem = createHTMLElement("<div id='send_mail_form' class='mygl_cls' style=\"border: 3px coral solid;left:" + div_left + "px;top:" + div_top + "px;display:block;position: absolute; z-index:9999;width:" + div_width + "px;height:" + div_height + "px;background-image: url(chrome://gallerylive/skin/background.png)\">" +
			   "<span style='padding-top:10px;padding-left:10px;float:left;display:block;z-index:9999;width:90%;height:57px;font-size:12px; font-weight:bold;font-family: Arial, Helvetica, sans-serif;'>" + 
						"ENTER MESSAGE HERE, PLEASE ENTER TO SEND, ESCAPE TO CLOSE" +	
						"<textarea id='message_text' rows='5' cols='50'>" +
						message_text +
						"</textarea>" +
					"</span>" +
		"</div>");		
	if (lastCanvasDiv!=null)
	{
		if (send_mail_form==null)
		{
			send_mail_form = elem;
			
			lastCanvasDiv.appendChild(send_mail_form);
		}
		else
		{
			new_send_mail_form = elem;
			
			lastCanvasDiv.replaceChild(new_send_mail_form, send_mail_form);
			send_mail_form = new_send_mail_form;		
		}
		var gallerylive_form_div = mydocument.getElementById("gallerylive_form_div");
		if (gallerylive_form_div!=undefined && gallerylive_form_div!=null)
		{
			//gallerylive_form_div.style.backgroundImage = "url(chrome://gallerylive/skin/background_gray.png)";
			//transparent xx
			gallerylive_form_div.style.backgroundImage = "none";
			gallerylive_form_div.style.backgroundColor="#D1D2D1";
		}
		
		mydocument.getElementById("message_text").focus();
	}
}

function hide_message()
{
	if (send_mail_form != null && lastCanvasDiv != null) 
	{
				lastCanvasDiv.removeChild(send_mail_form);
				send_mail_form = null;
	}
}
function processKeyUp(event) {
	last_event = event;
	mydocument = event.originalTarget.ownerDocument; 
	display_alert("In processKeyUp: event.originalTarget.id=" + event.originalTarget.id);
	
    if (event.originalTarget instanceof HTMLTextAreaElement && event.originalTarget.id=="message_text") {
			var charCode = (event.which) ? event.which : event.keyCode;

			if (charCode == 40)
			{
				//Down arrow - add a newline
				message_text = event.originalTarget.value + "\n";
				mydocument.getElementById("message_text").value = message_text;
				return;
			}
			else if (charCode == 13)
			{
				message_text = event.originalTarget.value;
				//send message
				
				var emailToId = getEmailList();
				
				if (send_to_group_selected==null) send_to_group_selected = 0;
				
				var mod_message_text = escape(message_text.replaceAll("\n","<br>"));

				var clicktime = Math.round(new Date().getTime() / 1000);		
				processing('processingQuicLinkId', 'Please wait', 'Sending...');
				var url = "http://quiclink.com/extension/manage.php?action=sendmail&tofid=" + 
				emailToId + "&groupid=" + send_to_group_selected + 
				"&uid=" + myStorage["fbuid"] + '&pagetitle=' + 
				escape(get_current_title()) + 
				'&pagelink=' + escape(get_current_url()) + 
				'&message=' + mod_message_text + 
				'&clicktime=' + clicktime + '&loadtime=' + loadtime;
				
				display_alert(url);
				
				callOtherDomain(getPics_sendMail, url);
	
				
				return;
			}
			else if (charCode == 27)
			{
				//hide_message();
				//redrawCircle(unselected_current_page, current_page);
				hide_circle(true);
				return;
			}
			
	}

}

function get_current_browser()
{
	return (gBrowser.getBrowserForTab(gBrowser.selectedTab));
}
function getPics_sendMail() {	
    closeMessage("processingQuicLinkId", false);
    displayMessage('displayMessageQuicLinkId', 'QuicLink Success', 'Mail sent sucessfully...<br>QuicLink will close automatically');
    setTimeout('closeMessage(\"displayMessageQuicLinkId\", true);', 2000);
	redrawCircle(unselected_current_page, current_page);
}

function closeMessage(id, hideFlag)
{
	ModalPopups.Init(mydocument);
    ModalPopups.Close(id);
	if (hideFlag) hide_circle(true);
}
function displayMessage(id,title,msg){
				ModalPopups.Init(mydocument);
                ModalPopups.Alert(id,
                title,
                "<div style='padding:25px;'>"+ msg +"</div>",
                {
                    width: 350,
                    height: 100
                }
            );


            }

function processing(id,title,msg) {
				ModalPopups.Init(mydocument);
                ModalPopups.Indicator(id,
                title,
                "<div style=''>" +
                    "<div style='float:left;'><img src='chrome://gallerylive/skin/spinner.gif'></div>" +
                    "<div style='float:left; padding-left:10px;'>" +
                    msg +
                    "</div>",
                {
                    width: 350,
                    height: 100
                });


}

function get_current_url()
{
	/* Browser Dependent Function */
	if (gBrowser)
    {
        var currentBrowser = gBrowser.getBrowserForTab(gBrowser.selectedTab);
        return currentBrowser.currentURI.spec;
    }
	else
	{
		return "";
	}
}

function get_current_title()
{

	/* Browser Dependent Function */
	
	if (gBrowser)
    {
		var currentBrowser = gBrowser.getBrowserForTab(gBrowser.selectedTab);
        return currentBrowser.contentTitle;
    }
	else
	{
		return "";
	}
}

function display_alert(message)
{
	/* Browser Dependent Function */
	/* Comment it out all the times except when debugging needed */
	/*
		
	var alertsService =   Components.classes["@mozilla.org/alerts-service;1"].getService(Components.interfaces.nsIAlertsService);
		var title =  "Debug Message";

		alertsService.showAlertNotification(
		  "chrome://gallerylive/skin/gallery_icon.jpg",
		  title, message, true, "", objGalleryLiveToolbar, "Debug Message");
	*/
	var aConsoleService = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);

	aConsoleService.logStringMessage(new Date() + "::" + message);
	
}