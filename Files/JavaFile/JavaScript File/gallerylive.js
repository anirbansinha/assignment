var found = false;
var login_success_url = "";
var popup_win = null;
var max = 5;

var selected_layout = "";

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

const bkg_width=1099;
const bkg_height=550;
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
    "gallery_live_send":true,
    "post_to_fb":true,
    "post_to_f":true,
    "post_to_twitter":true,
    "post_to_tw":true
};

var images_hoverout = {"gallery_live_prev_hover":true,
    "gallery_live_next_hover":true,
    "gallery_live_prev_unselected_hover":true,
    "gallery_live_next_unselected_hover":true,
    "gallery_live_sendmail_hover":true,
    "gallery_live_send_hover":true,
    "post_to_fb_hover":true,
    "post_to_f_hover":true,
    "post_to_tw_hover":true,
    "post_to_twitter_hover":true
};

var t_image_hover = null;

var send_mail_form = null;

var exclude_control_ids = {"message_text" : true};

var last_event = null;

var current_url = "";
var current_title = "";
var uname = "";
var fbuid = "";

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

document.documentElement.addEventListener('mousedown', function(e) {
    window.mouse.isPressed = true;
    processPageLoad(e);
}, true);

document.documentElement.addEventListener('mouseup', function(e) {
    window.mouse.isPressed = false;
    mouseReleased(e);
}, true);

window.mouse = {
    isPressed: false
};

function mouseReleased(event) {
    last_event = event;
    mydocument = event.originalTarget.ownerDocument;
    mouseDown--;
    mouseReleasedTime = new Date().getTime();
    if (t != null) clearTimeout(t);
}

window.addEventListener('scroll', function(e) {
    redraw(e);
}, true);

document.documentElement.addEventListener('mouseover', function(e) {
    processHover(e);
}, true);

document.documentElement.addEventListener('mouseout', function(e) {
    processHoverOut(e);
}, true);

/*
 document.documentElement.addEventListener('dblclick', function(e) {
 processDoubleClick(e);
 }, true);
 */

document.documentElement.addEventListener('keyup', function(e) {
    processKeyUp(e);
}, true);

function getPics_ViewAlbum(req) {
    render_display(req, false);
}

function render_display(req, reset_display) {

    var x = new Array();
    var s_name= req.slice(0);

    $(req).find("image").each(function() {
        x[x.length] = $(this).text();
    });
    var fids			= new Array();
    $(req).find("fid").each(function() {
        fids[fids.length] = $(this).text();
    });
    var myimgs		= new Array();
    $(req).find("myimage").each(function() {
        myimgs[myimgs.length] = $(this).text();
    });
    var myusernames	= new Array();
    $(req).find("myusername").each(function() {
        myusernames[myusernames.length] = $(this).text();
    });
    var friendnames	= new Array();
    $(req).find("friendname").each(function() {
        friendnames[friendnames.length] = $(this).text();
    });



    var friendemails	= new Array();
    $(req).find("friendemail").each(function() {
        friendemails[friendemails.length] = $(this).text();
    });
    var totsentqls	= new Array();
    $(req).find("totsentql").each(function() {
        totsentqls[totsentqls.length] = $(this).text();
    });

    for(i=0;i<x.length;i++){
        var fid = fids[i];

        var dbImgStr = x[i];

        if (dbImgStr.match(/http.*?/)){
            //                
        } else if(x[i]!='NO_IMAGE'){
            dbImgStr = 'http://quiclink.com/extension/images/'+ fbuid + '/' + x[i];
        } else if(x[i]=='NO_IMAGE'){
            dbImgStr = 'http://quiclink.com/extension/images/no_image.gif';
        }

        var title = friendnames[i];
        var email = friendemails[i];

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

function processDoubleClick(element)
{

    if (
            (element instanceof HTMLImageElement && element.id.indexOf("img_selected_friend_")==0)
                    ||
                    (element instanceof HTMLDivElement && element.id.indexOf("name_selected_friend_")==0)
            )
    {
        //Move from selected to unselected

        //Find the id of the div
        var arr = element.id.split("_");
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
            (element instanceof HTMLImageElement && element.id.indexOf("img_unselected_friend_")==0)
                    ||
                    (element instanceof HTMLDivElement && element.id.indexOf("name_unselected_friend_")==0)
            )
    {
        //Move from unselected to selected
        //Find the id of the div
        var arr = element.id.split("_");
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
    //Sugi
    if (send_mail_form!=null) return; //if send mail form is open don't do anything else

    last_event = event;
    mydocument = document;
    /*if (t_image_hover!=null)
     {
     clearTimeout(t_image_hover);
     t_image_hover = null;
     }*/

    if (
            (event.target instanceof HTMLImageElement && event.target.id.indexOf("img_selected_friend_")==0)
                    ||
                    (event.target instanceof HTMLDivElement && event.target.id.indexOf("name_selected_friend_")==0)
            )
    {
        //Find the id of the div
        //mouseout
        var arr = event.target.id.split("_");
        var id = "selected_friend_" + arr[arr.length-1];
        var mparent = mydocument.getElementById(id);
        mparent.setAttribute ("style",old_style[id]);

        var name_element_id="name_"+id;
        var name_element = mydocument.getElementById(name_element_id);
        name_element.style.backgroundColor="#73A8D0";
        //name_element.style.onmouseover="height='300px' width='300px'";
    }
    else if (
            (event.target instanceof HTMLImageElement && event.target.id.indexOf("img_unselected_friend_")==0)
                    ||
                    (event.target instanceof HTMLDivElement && event.target.id.indexOf("name_unselected_friend_")==0)
            )
    {
        //Find the id of the div
        var arr = event.target.id.split("_");
        var id = "unselected_friend_" + arr[arr.length-1];
        var mparent = mydocument.getElementById(id);
        mparent.setAttribute ("style",old_style[id]);

        var name_element_id="name_"+id;
        var name_element = mydocument.getElementById(name_element_id);
        name_element.style.backgroundColor="black";
    }
    else if (event.target instanceof HTMLImageElement) {

        if (images_hoverout[event.target.id]!=undefined && images_hoverout[event.target.id]!=null) {
            var id = event.target.id.replace("_hover", "");

            if (mydocument.getElementById(id) != undefined &&
                    mydocument.getElementById(id) != null)
            {
                mydocument.getElementById(event.target.id).style.display="none";
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
    //Sugi
    if (send_mail_form!=null) return; //if send mail form is open don't do anything else

    last_event = event;
    mydocument = document;

    if (
            (event.target instanceof HTMLImageElement && event.target.id.indexOf("img_selected_friend_")==0)
                    ||
                    (event.target instanceof HTMLDivElement && event.target.id.indexOf("name_selected_friend_")==0)
            )
    {
        //Find the id of the div
        //mouseout
        var arr = event.target.id.split("_");
        var id = "selected_friend_" + arr[arr.length-1];
        var mparent = mydocument.getElementById(id);

        if (mparent.getAttribute ("style").indexOf("webkit-box-shadow")<0)
        {
            old_style[id] = mparent.getAttribute ("style");

            var sel_style_hover=old_style[id] + ";cursor:pointer;-webkit-box-shadow:-3px -3px 0px;-webkit-transform:scale(1.1);'";
            mparent.setAttribute ("style",sel_style_hover);

            var name_element_id="name_"+id;
            var name_element = mydocument.getElementById(name_element_id);
            name_element.style.backgroundColor="black";
        }
        if (t_image_hover != null) clearTimeout(t_image_hover); //clear out previous timeout
        if (event.target instanceof HTMLImageElement)
        {
            last_element = mydocument.getElementById("img_" + id);
        }
        else
        {
            last_element = mydocument.getElementById("name_" + id);
        }
        display_alert("Before setTimeout processHoverAction: current element:" + last_element.id);
        t_image_hover = setTimeout("processHoverAction(true)", 500);
    }

    else if (
            (event.target instanceof HTMLImageElement && event.target.id.indexOf("img_unselected_friend_")==0)
                    ||
                    (event.target instanceof HTMLDivElement && event.target.id.indexOf("name_unselected_friend_")==0)
            )
    {
        //Find the id of the div
        //mouseout
        var arr = event.target.id.split("_");
        var id = "unselected_friend_" + arr[arr.length-1];
        var mparent = mydocument.getElementById(id);
        if (mparent.getAttribute ("style").indexOf("webkit-box-shadow")<0)
        {
            old_style[id] = mparent.getAttribute ("style");

            var sel_style_hover=old_style[id] + ";cursor:pointer;-webkit-box-shadow:-3px -3px 1px;-webkit-transform:scale(1.3);";
            mparent.setAttribute ("style",sel_style_hover);
            mparent.style.height="57";

            var name_element_id="name_"+id;
            var name_element = mydocument.getElementById(name_element_id);
            name_element.style.backgroundColor="#73A8D0";
        }

        if (t_image_hover != null) clearTimeout(t_image_hover); //clear out previous timeout
        if (event.target instanceof HTMLImageElement)
        {
            last_element = mydocument.getElementById("img_" + id);
        }
        else
        {
            last_element = mydocument.getElementById("name_" + id);
        }
        display_alert("Before setTimeout processHoverAction: current element:" + last_element.id);
        t_image_hover = setTimeout("processHoverAction(true)", 1000);
    }
    else if (event.target instanceof HTMLImageElement) {

        if (images_hover[event.target.id]!=undefined && images_hover[event.target.id]!=null) {
            if (mydocument.getElementById(event.target.id + "_hover") != undefined &&
                    mydocument.getElementById(event.target.id + "_hover") != null)
            {
                mydocument.getElementById(event.target.id).style.display="none";
                mydocument.getElementById(event.target.id + "_hover").style.display="block";


                if (t_image_hover != null) clearTimeout(t_image_hover); //clear out previous timeout
                last_element = mydocument.getElementById(event.target.id + "_hover");
                display_alert("Before setTimeout processHoverAction: current element:" + last_element.id);
                t_image_hover = setTimeout("processHoverAction()", 1000);
            }

            for (var e in images_hover)
            {

                if (event.target.id != e)
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

function processHoverAction(flag)
{
    //Sugi
    if (send_mail_form!=null) return; //if send mail form is open don't do anything else

    display_alert("In processHoverAction:");
    if (flag==undefined) flag = false;

    if (!flag)
    {
        processaction(last_element);
    }
    else
    {
        processDoubleClick(last_element);
    }

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

        if (element.id == "gallery_live_send_hover") {
            sendMail1();
            return true;
        }
    }

    return false;
}

function processPageLoad(event) {

    //alert("processPageLoad");
    chrome.extension.sendRequest(
    {
        message: "getCurrentData"
    },
            function(response)
            {
                current_url = response.url;
                current_title = response.title;
                //alert (current_url + "," + current_title);
                uname = response.uname;
                fbuid = response.fbuid;

                if (logged_in()) callOtherDomain(getPics_ViewAlbum, "http://quiclink.com/extension/manage.php?getimages=all&uid=" + fbuid);

                last_event = event;

                display_alert ("processPageLoad - event.target.id="+ event.target.id);
                if (exclude_control_ids[event.target.id]!=undefined && exclude_control_ids[event.target.id]!=null)
                {
                    return;
                }

                if (event.target instanceof HTMLElement) {

                    //_okButton
                    if(event.target.id=="displayMessageQuicLinkId_okButton")
                    {
                        closeMessage("displayMessageQuicLinkId", true);
                        return;
                    }

                    //if (processaction(event.target)) return;

                    //Browser Dependent - Begin
                    mydocument = document;
                    var selObject = mydocument.documentElement;
                    if (selObject==undefined || selObject==null) selObject = mydocument.body; //Sugi

                    //Browser Dependent - End

                    canvasDiv = selObject;


                    if (t != null) clearTimeout(t); //clear out previous timeout
                    t = setTimeout("processMouseDown()", 500);

                } else {
                    //hide_circle();
                }
                mouseDown++;
                mouseDownTime = new Date().getTime();
            });

}

function processMouseDown() {
    if (!circleDrawnFlag && canvasDiv != null && mydocument != null) {
        //alert ("processMouseDown - if stmt");
        drawCircle(1, 1);
        circleDrawnFlag = true;
    } else {
        //alert ("processMouseDown - else stmt");
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
    /*  */
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
    mydocument = document;
    mouseDown--;
    mouseReleasedTime = new Date().getTime();
    if (t != null) clearTimeout(t);
}

function simplify(str) {
    var item = document.createElement("span");
    if (str.length>80) str=str.left(80)+"...";
    item.appendChild(document.createTextNode(str));
    return item.innerHTML;
}


function wrap_around(str, len) {
    var item = document.createElement("span");
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

    calculateXY();

    var left=mouseX;
    var top =mouseY;

    var xmlns= "" ; //" xmlns='http://www.w3.org/1999/xhtml' ";

    var line1 =	"<span " + xmlns + " style='text-align:left;letter-spacing:1px;font-size:12px; font-weight:bold;font-family: Arial, Helvetica, sans-serif;padding-top:10px;padding-left:10px;float:left;display:block;z-index:9999; white-space:pre;text-transform:uppercase;width:" + left_section + "px;'>SHARING:&nbsp;&nbsp;&nbsp;&nbsp; " + simplify(get_current_title()) + "</span>";

    var line9 =  "<img style='float:right;display:block;z-index:9999;width:" + logo_width + "px;height:" + logo_height + "px;' src='" + chrome.extension.getURL("/skin/logo.png") + "' border='0'></img>";

    var line2 = "<span  " + xmlns + " style='text-align:left;font-size:12px; font-weight:bold;font-family: Arial, Helvetica, sans-serif;padding-top:5px;padding-left:10px;float:left;display:block;z-index:9999;width:" + left_section + "px;'>URL:" + simplify(get_current_url()) + "</span>";

    var div_top = 70;

    var line3 = "<span style='position:absolute;top:" + div_top + "px;padding-left:50px;float:left;display:block;z-index:9999;width:" + left_section + "px;height:37px;'>" +
            " <img id='post_to_fb' style='float:left;display:block;z-index:9999;width:200px;height:35px;' src='" + chrome.extension.getURL("/skin/post_to_fb.PNG") + "' border='0'></img>" +
            " <img id='post_to_fb_hover' style='cursor:pointer;float:left;display:none;z-index:9999;width:200px;height:35px;' src='" + chrome.extension.getURL("/skin/post_to_fb-hover.PNG") + "' border='0'></img>" +
            " <img id='post_to_f' style='float:left;display:block;z-index:9999;padding-left:35px;width:200px;height:35px;' src='" + chrome.extension.getURL("/skin/post_to_twitter.PNG") + "' border='0'></img>" +
            " <img id='post_to_f_hover' style='cursor:pointer;float:left;padding-left:35px;display:none;z-index:9999;padding-right:5px;width:200px;height:35px;' src='" + chrome.extension.getURL("/skin/post_to_twitter-hover.PNG") + "' border='0'></img>" +

        //" <img id='post_to_twitter' style='float:left;display:block;z-index:9999;width:150px;height:30px;' src='" + chrome.extension.getURL("/skin/twitter.PNG") + "' border='0'></img>" +
        //" <img id='post_to_twitter_hover' style='cursor:pointer;float:left;display:none;z-index:9999;width:150px;height:30px;' src='" + chrome.extension.getURL("/skin/twitter_hover.PNG") + "' border='0'></img>" +
        ////	" <img id='post_to_tw' style='float:left;display:block;padding-top:1px;z-index:9999;padding-right:5px;width:42px;height:30px;' src='" + chrome.extension.getURL("/skin/t_icon.PNG") + "' border='0'></img>" +
        //" <img id='post_to_tw_hover' style='cursor:pointer;float:left;display:none;z-index:9999;padding-top:1px;padding-right:5px;width:42px;height:30px;' src='" + chrome.extension.getURL("/skin/t_icon_hover.PNG") + "' border='0'></img>" +
            "<a href='www.google.com'> Gooldldldldlldldldld</a>"+
            "<div id='search-top' style='float:left;padding-top:0px;' class='search-box'>"+
            "<form action='/search'>"+

            "<input placeholder='Search'  style='float:left;padding-left:10px;width:'100px;'' type='text' id='top-q' name='q' />"+
            "<input type='submit' style:'font-size:12px;' value=' search ' />"+
            "</form>"+
            "</div>"+


        //"<input alt='Search' onfocus='searchfield_focus(this)' placeholder='Search' style='height:28px;float:right;float:right;display:block;color:#e6e6e6;font-size:10pt;font-weight:bold;width:100px;' type='text' OnClick='doSearch(this.form.Query) name='Sudhakar' Value=''/>"+
            "</span><br/>";


    div_top = 160;

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
    //	var search_alphabets = '';
    //var line12 = "search_alphabets += '<a href='javascript:void(0)' onClick='filterBy('+"'a'"+')'>A</a>|'";
    var line8 = "<span style='position:absolute;padding-top:370px;padding-left:49px;float:left;display:block;z-index:9999;'>" +
            "<input type='lable' Value='Insert Add' style='height:115px; width:1000px; text-align:center;'/><br/>"+

            " <img id='gallery_live_send' style='float:left;display:block;z-index:9999;padding-top:10px;paddiing-left:70px;width:450px;height:35px;' src='" + chrome.extension.getURL("/skin/tosend.PNG") + "' border='0'></img>" +
            " <img id='gallery_live_send_hover' style='cursor:pointer;float:left;display:none;padding-top:10px;paddiing-left:30px;z-index:9999;width:450px;height:35px;' src='" + chrome.extension.getURL("/skin/tosend_hover.PNG") + "' border='0'></img>" +
            " <img id='gallery_live_sendmail' style='float:left;display:block;z-index:9999;padding-top:10px;padding-left:55px;width:500px;height:35px;' src='" + chrome.extension.getURL("/skin/sendtomsg.PNG") + "' border='0'></img>" +
            " <img id='gallery_live_sendmail_hover' style='cursor:pointer;float:left;padding-top:10px;display:none;z-index:9999;padding-left:55px;width:500px;height:35px;border-top-left-radius:50px;' src='" + chrome.extension.getURL("/skin/sendtomsg_hover.PNG") + "' border='0'></img>" +
            "</span><br/>";

    //var line8 =	"<img id='gallery_live_sendmail' style='position:absolute;top:" + sendmail_div_top + "px;padding-top:10px;padding-left:30px;display:block;z-index:9999;width:" + 260 + "px;height:" + 34 + "px;' src='" + chrome.extension.getURL("/skin/tosend.png") + "' border='0'></img>" + "<img id='gallery_live_sendmail_hover' style='cursor:pointer;display:none;position:absolute;top:" + sendmail_div_top + "px;padding-top:10px;padding-left:30px;float:left;z-index:9999;width:" + 260 + "px;height:" + 34 + "px;' src='" + chrome.extension.getURL("/skin/tosend_hover.png") + "' border='0'></img>";

//	var line9 = "<img id='gallery_live_send' style='position:absolute;top:" + sendmail_div_top + "px;padding-top:10px;padding-left:370px;display:block;z-index:9999;width:" + 300 + "px;height:" + 34 + "px;' src='" + chrome.extension.getURL("/skin/sendtomsg.png") + "' border='0'></img>" + "<img id='gallery_live_send_hover' style='cursor:pointer;display:none;position:absolute;top:" + sendmail_div_top + "px;padding-top:10px;padding-left:370px;float:left;z-index:9999;width:" + 300 + "px;height:" + 34 + "px;' src='" + chrome.extension.getURL("/skin/sendtomsg_hover.png") + "' border='0'></img>";

    var line10 = "<div id='gallerylive_form_div' class='mygl_cls' style=\"border: 0px coral solid;left:" + left + "px;top:" + top + "px;display:block;position: absolute; z-index:9999;width:" + bkg_width + "px;height:" + bkg_height + "px;border-top-left-radius:15px;border-top-right-radius:15px;border-bottom-left-radius:15px;border-bottom-right-radius:15px;background-image: url(" + chrome.extension.getURL("/skin/background.png") + ")\">";
    canvasDiv_left = left;
    canvasDiv_top = top;

    new_last_fill = createHTMLElement(line10 + line8 + line9 +
            line1 + line2 +	line3 + line5 + line7 +
            "</div>");

    lastCanvasDiv.replaceChild(new_last_fill, last_fill);
    last_fill = new_last_fill;

}
/*          Search Function                */
function doSearch ( s ) {
    alert("Search working");
    openDbRelativeURL("All?SearchView&Query=" + s.value);
}

function openDbRelativeURL( url, target ){
//Check we have a target window;
    target = (target == null ) ? window : target;
//Work out the path of the database;
    path = location.pathname.split('.nsf')[0] + '.nsf/';
    target.location.href = path + url;
}




/*                   End                     */


function logged_in()
{
    if (fbuid=="")
    {
        return false;
    }
    else
    {
        return true;
    }
}
function drawCircle(unselected_cp, selected_cp) {
    hide_message();
    loadtime = Math.round(new Date().getTime() / 500);
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
    var left=mouseX;
    var top=mouseY;

    canvasDiv_left = left;
    canvasDiv_top = top;

    var xmlns= "" ; //" xmlns='http://www.w3.org/1999/xhtml' ";
    var share = get_current_title();

    var line1 =	"<span " + xmlns + " style='float:left;left-padding:50px;text-align:left;letter-spacing:1px;font-size:12px; font-weight:bold;font-family: Arial, Helvetica, sans-serif;padding-top:10px;padding-left:10px;float:left;display:block;z-index:9999; white-space:pre;text-transform:uppercase;width:" + left_section + "px;'>SHARING:&nbsp;&nbsp;&nbsp;&nbsp; " + simplify(get_current_title()) + "</span>";


    var line9 =  "<img border='' bordercolor='black' style='float:right;z-index:9999;width:" + logo_width + "px;height:" + logo_height + "px;' src='" + chrome.extension.getURL("/skin/logo.png") + "' border='0'></img>";

    /*var line13 =			"<div id='search-top' class='search-box'style='padding-top:7px;float:right;padding-right:145px;z-index:9999;width:30px;'>"+
     "<form action='/search'>"+
     "<input placeholder='Search    ' type='text' id='top-q' name='q' />"+

     "</form>"+
     "</div>";*/
    var line2 = "<span  " + xmlns + " style='float:left;left-padding:50px;padding-top:10px;text-align:left;font-size:12px; font-weight:bold;font-family: Arial, Helvetica, sans-serif;padding-top:5px;padding-left:10px;float:left;display:block;z-index:9999;width:" + left_section + "px;'>URL:" + simplify(get_current_url()) + "</span>";
    if (!logged_in())
    {
        var div_top = 130;
        var line3 = "<span  " + xmlns + " style='text-align:left;font-size:20px; color:red; font-weight:bold;font-family: Arial, Helvetica, sans-serif;padding-top:10px;padding-left:30px;float:left;display:block;z-index:9999;width:" + left_section + "px;'>Please login using Gallery Live extension.</span>";
        last_fill = createHTMLElement("<div id='gallerylive_form_div' class='mygl_cls' style=\"border: 0px coral solid;left:" + (left) + "px;top:" + top + "px;display:block;position: absolute; z-index:9999;width:" + bkg_width + "px;height:" + bkg_height + "px;border-top-left-radius:15px;border-top-right-radius:15px;border-bottom-left-radius:15px;border-bottom-right-radius:15px;background-image: url(" + chrome.extension.getURL("/skin/background.png") + ")\">" +
                line1 + line2 +	line3 +
                "</div>");
    }
    else
    {
        var div_top = 70;

        var line3 = "<span style='position:absolute;top:" + div_top + "px;padding-left:50px;float:left;display:block;z-index:9999;width:" + left_section + "px;height:37px;'>" +
                " <img id='post_to_fb' style='float:left;display:block;z-index:9999;width:200px;height:35px;' src='" + chrome.extension.getURL("/skin/post_to_fb.PNG") + "' border='0'></img>" +
                " <img id='post_to_fb_hover' style='cursor:pointer;float:left;display:none;z-index:9999;width:200px;height:35px;' src='" + chrome.extension.getURL("/skin/post_to_fb-hover.PNG") + "' border='0'></img>" +
                " <img id='post_to_f' style='float:left;display:block;z-index:9999;padding-left:35px;width:200px;height:35px;' src='" + chrome.extension.getURL("/skin/post_to_twitter.PNG") + "' border='0'></img>" +
                " <img id='post_to_f_hover' style='cursor:pointer;float:left;padding-left:35px;display:none;z-index:9999;padding-right:5px;width:200px;height:35px;' src='" + chrome.extension.getURL("/skin/post_to_twitter-hover.PNG") + "' border='0'></img>" +

            //" <img id='post_to_twitter' style='float:left;display:block;z-index:9999;width:150px;height:30px;' src='" + chrome.extension.getURL("/skin/twitter.PNG") + "' border='0'></img>" +
            //" <img id='post_to_twitter_hover' style='cursor:pointer;float:left;display:none;z-index:9999;width:150px;height:30px;' src='" + chrome.extension.getURL("/skin/twitter_hover.PNG") + "' border='0'></img>" +
            ////	" <img id='post_to_tw' style='float:left;display:block;padding-top:1px;z-index:9999;padding-right:5px;width:42px;height:30px;' src='" + chrome.extension.getURL("/skin/t_icon.PNG") + "' border='0'></img>" +
            //" <img id='post_to_tw_hover' style='cursor:pointer;float:left;display:none;z-index:9999;padding-top:1px;padding-right:5px;width:42px;height:30px;' src='" + chrome.extension.getURL("/skin/t_icon_hover.PNG") + "' border='0'></img>" +


            //onClick='filterBy('+"'a'"+')'
                "<div id='search-top' style='float:left;padding-top:0px;' class='search-box'>"+
                "<form action='/search'>"+

                "<input placeholder='Search'  style='float:left;padding-left:10px;width:'100px;'' type='text' id='top-q' name='q' />"+
                "<input type='submit' style:'font-size:12px;' value=' search ' />"+
                "</form>"+




            //"<input alt='Search' onfocus='searchfield_focus(this)' placeholder='Search' style='height:28px;float:right;float:right;display:block;color:#e6e6e6;font-size:10pt;font-weight:bold;width:100px;' type='text' OnClick='doSearch(this.form.Query) name='Sudhakar' Value=''/>"+
                "</span><br/>";


        div_top = 160;

        selected_friends_div_top = div_top;
        var friends = gen_html_selected_friends(selected_cp);
        //display_alert(friends);

        var line5 = "<span style='padding-top:10px;padding-left:10px;float:left;display:block;z-index:9999;width:" + left_section + "px;height:57px;'>" +
                friends +
                "</span>";


        div_top += 90;
        unselected_friends_div_top = div_top;


        var pick_friends = gen_html_unselected_friends(unselected_cp);

        var line7 = "<span id='unselected_friends' style='padding-top:10px;padding-left:50px;float:left;display:block;z-index:9999;width:" + (left_section )+ "px;height:57px;'>" +
                pick_friends +
                "</span>";


        var line8 =
                "<span style='position:absolute;padding-top:370px;padding-left:49px;float:left;display:block;z-index:9999;'>" +
                        "<input type='lable' Value='Insert Add' style='height:115px; width:1000px; text-align:center;'/><br/>"+
                        " <img id='gallery_live_send' style='float:left;display:block;z-index:9999;padding-top:10px;paddiing-left:70px;width:450px;height:35px;' src='" + chrome.extension.getURL("/skin/tosend.PNG") + "' border='0'></img>" +
                        " <img id='gallery_live_send_hover' style='cursor:pointer;float:left;display:none;padding-top:10px;paddiing-left:30px;z-index:9999;width:450px;height:35px;' src='" + chrome.extension.getURL("/skin/tosend_hover.PNG") + "' border='0'></img>" +
                        " <img id='gallery_live_sendmail' style='float:left;display:block;z-index:9999;padding-top:10px;padding-left:55px;width:500px;height:35px;' src='" + chrome.extension.getURL("/skin/sendtomsg.PNG") + "' border='0'></img>" +
                        " <img id='gallery_live_sendmail_hover' style='cursor:pointer;float:left;padding-top:10px;display:none;z-index:9999;padding-left:55px;width:500px;height:35px;border-top-left-radius:50px;' src='" + chrome.extension.getURL("/skin/sendtomsg_hover.PNG") + "' border='0'></img>" +
                        "</span><br/>";







        /*	var line8 = "<span style='position:absolute;padding-left:10px;float:left;display:block;z-index:9999;'>" +
         "<img id='gallery_live_sendmail' style='position:absolute;top:" + sendmail_div_top + "px;padding-top:10px;padding-left:30px;display:block;z-index:9999;width:" + 260 + "px;height:" + 34 + "px;' src='" + chrome.extension.getURL("/skin/tosend.png") + "' border='0'></img>" +
         "<img id='gallery_live_sendmail_hover' style='cursor:pointer;display:none;position:absolute;top:" + sendmail_div_top + "px;padding-left:30px;padding-top:10px;z-index:9999;width:" + 260 + "px;height:" + 34 + "px;' src='" + chrome.extension.getURL("/skin/tosend_hover.png") + "' border='0'></img>" +
         "</span>";

         var line9 =	"<span style='position:absolute;padding-left:10px;float:left;display:block;z-index:9999;'>" +
         "<img id='gallery_live_send' style='position:absolute;top:" + sendmail_div_top + "px;padding-top:10px;display:block;z-index:9999;width:" + 300 + "px;height:" + 34 + "px;' src='" + chrome.extension.getURL("/skin/sendtomsg.png") + "' border='0'></img>" +
         "<img id='gallery_live_send_hover' style='cursor:pointer;display:none;position:absolute;top:" + sendmail_div_top + "px;padding-top:10px;z-index:9999;width:" + 300 + "px;height:" + 34 + "px;' src='" + chrome.extension.getURL("/skin/tosend_hover.png") + "' border='0'></img>" +
         "</span>";

         */
        var line15 = "</div>"+
                "<a href='www.google.com'> A|</a>"+
                "<a href='www.google.com'> B|</a>"+
                "<a href='www.google.com'> C|</a>"+
                "<a href='www.google.com'> D|</a>"+
                "<a href='www.google.com'> E|</a>"+
                "<a href='www.google.com'> F|</a>"+
                "<a href='www.google.com'> G|</a>"+
                "<a href='www.google.com'> H|</a>"+
                "<a href='www.google.com'> I|</a>"+
                "<a href='www.google.com'> J|</a>"+
                "<a href='www.google.com'> K|</a>"+
                "<a href='www.google.com'> L|</a>"+
                "<a href='www.google.com'> M|</a>"+
                "<a href='www.google.com'> N|</a>"+
                "<a href='www.google.com'> O|</a>"+
                "<a href='www.google.com'> P|</a>"+
                "<a href='www.google.com'> Q|</a>"+
                "<a href='www.google.com'> R|</a>"+
                "<a href='www.google.com'> S|</a>"+
                "<a href='www.google.com'> T|</a>"+
                "<a href='www.google.com'> U|</a>"+
                "<a href='www.google.com'> V|</a>"+
                "<a href='www.google.com'> W|</a>"+
                "<a href='www.google.com'> X|</a>"+
                "<a href='www.google.com'> Y|</a>"+
                "<a href='www.google.com'> Z|</a>";
        var line10 = "<div id='gallerylive_form_div' class='mygl_cls' style=\"border: 0px coral solid;left:" + left + "px;top:" + top + "px;display:block;position: absolute; z-index:9999;width:" + bkg_width + "px;height:" + bkg_height + "px;border-top-left-radius:15px;border-top-right-radius:15px;border-bottom-left-radius:15px;border-bottom-right-radius:15px;background-image: url(" + chrome.extension.getURL("/skin/background.png") + ");\">";

        last_fill = createHTMLElement(line10 + line8 + line9 +
                line1 + line2 + line3 + line5 + line7 + line15 +
                "</div>");
    }
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
    var rel_left = 200;


    //sugi - 11/Jul - begin
    var display_left_nav = false;
    var display_right_nav = false;
    if (pageNo>1) display_left_nav = true;
    if (pageNo<unselected_max_pages) display_right_nav = true;
    //sugi - 11/Jul - end

    for (var i = 0; i < (upper_bound - lower_bound); i++)
    {
        var idx = lower_bound + i - 1;

        var unselected_friend = unselected_friends_copy[idx];

        if (unselected_friend == undefined || unselected_friend == null) continue;

        var div_width=112;
        var div_height=57;

        var padding=50;

        var curr_left = ((i%max)*120+padding)+rel_left;

        if  (i > 0 && i%max==0)
        {
            //take to next line
            div_top += 70;
        }
        var friend_template = '<div id="unselected_friend_' + idx + '" ' +
                ' style="left:' + (curr_left + 20) + 'px;top:' + div_top + 'px; display:block;z-index:9999;width:' + (div_width + 50 )+ 'px;height:' + div_height + 'px;position:absolute;" >' +
                '<div style="margin-right:12px;">' +
                '<img border="0" id="img_unselected_friend_' + idx + '" style="float:left;padding-left:0px;display:block;z-index:9999;width:50px;height:37px;" src="' + unselected_friend["image"] + '"></img>' +
                '<div style="float:left;display:block;z-index:9999;background-color:black;width:60px;height:37px;color:#ffffff;font-size:11px; font-weight:bold;font-family: Arial, Helvetica, sans-serif;"> ' +
                '<div id="name_unselected_friend_' + idx + '" style="text-align:left;height:90%;padding-left:5px;padding-top:5px;padding-right:1px;width:90%;letter-spacing:1px;overflow:hidden;">' + wrap_around(unselected_friend["name"],10) + '</div>'+
                '</div>' +
                '</div>'+
                '</div>';


        /*'<div id="unselected_friend_' + idx + '" ' +
         ' style="left:' + curr_left + 'px;top:' + div_top + 'px; display:block;z-index:9999;width:' + div_width + 'px;height:' + div_height + 'px;position:absolute;" >' +

         '<div><table border="1">'+	'<tr><td rowspan="2"><img border="0" id="img_unselected_friend_' + idx + '" style="float:left;display:block;z-index:9999;width:50px;height:37px;border-bottom-left-radius:10px;border-top-left-radius:10px;" src="' + unselected_friend["image"] + '"></img>' +

         '<div style="float:left;display:block;z-index:9999;background-color:black;width:61px;height:37px;color:white;font-size:11px;border-top-right-radius:10px;border-bottom-right-radius:10px; font-weight:bold;font-family: Arial, Helvetica, sans-serif;"> ' +

         '<div id="name_unselected_friend_' + idx + '" style="text-align:left;height:90%;padding-left:0px;padding-top:0px;width:90%;letter-spacing:0px;overflow:hidden;">' + wrap_around(unselected_friend["name"],10) + '</div></div></td>'
         '<td><img border="0" style="float:right;display:block;z-index:9999;width:12px;align:rightContext top;border-top-right-radius:10px;height:12px;" src="' + chrome.extension.getURL("/skin/ff.PNG") + '"></img></td></tr>'+

         '<tr><td><img border="0" style="float:right;display:block;z-index:9999;width:12px;height:12px;border-bottom-right-radius:10px;" src="' +chrome.extension.getURL("/skin/tt.PNG") + '"></img></td>'+
         '</tr></table></div>'+




         '</div>';


         */









        if (i==0)
        {
            var line6 = "<span style='left:" + (curr_left-rel_left) + "px;letter-spacing:3px;top:" + (div_top-18) + "px; position:absolute;text-align:left;font-size:12px; font-weight:bold;font-family: Arial, Helvetica, sans-serif;float:left;display:block;z-index:9999;width:" + left_section + "px;'>PICK FRIENDS:</span>";
            var prev= '<img border="0" id="gallery_live_prev_unselected" style="left:' + (curr_left-rel_left) + 'px;top:' + (div_top) + 'px; position:absolute;float:left;display:block;z-index:9999;width:40px;height:107px;" src="' + chrome.extension.getURL("/skin/prev.png") + '"></img>';
            var prev_hover= '<img border="0" id="gallery_live_prev_unselected_hover" style="cursor:pointer;left:' + (curr_left-rel_left) + 'px;top:' + (div_top) + 'px; position:absolute;float:left;display:none;z-index:9999;width:40px;height:107px;" src="' + chrome.extension.getURL("/skin/prev-hover.png") + '"></img>';
            var next= '<img border="0" id="gallery_live_next_unselected" style="left:' + (curr_left+rel_left -15 + max*div_width) + 'px;top:' + (div_top) + 'px; position:absolute;float:left;display:block;z-index:9999;width:40px;height:107px;" src="' + chrome.extension.getURL("/skin/next.png") + '"></img>';
            var next_hover= '<img border="0" id="gallery_live_next_unselected_hover" style="cursor:pointer;left:' + (curr_left+rel_left -15+ max*div_width) + 'px;top:' + (div_top) + 'px; position:absolute;float:left;display:none;z-index:9999;width:40px;height:107px;" src="' + chrome.extension.getURL("/skin/next-hover.png") + '"></img>';

            pick_friends = 	line6 + (display_left_nav?prev+prev_hover:"") + (display_right_nav?next+next_hover:"") + friend_template;
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
    var rel_selected_left = 200;

    //sugi - 11/Jul - begin
    var display_left_nav = false;
    var display_right_nav = false;
    if (pageNo>1) display_left_nav = true;
    if (pageNo<max_pages) display_right_nav = true;
    //sugi - 11/Jul - end

    for (var i = 0; i < (upper_bound - lower_bound); i++)
    {
        var idx = lower_bound + i - 1;

        var selected_friend = selected_friends_copy[idx];

        if (selected_friend == undefined || selected_friend == null || selected_friend["name"] == undefined || selected_friend["name"] == null) continue;

        var div_width=112;
        var div_height=57;

        var padding=50;

        var curr_left = ((i%max)*120+padding)+rel_selected_left;

        if  (i > 0 && i%max==0)
        {
            //take to next line
            div_top += 100;
        }
        var friend_template = '<div id="selected_friend_' + idx + '" ' +
                ' style="left:' + (curr_left + 20)+ 'px;top:' + div_top + 'px; display:block;z-index:9999;width:' + div_width + 'px;height:' + div_height + 'px;position:absolute;" >' +
                '<div style="margin-right:12px;">' +
                '<img border="0" id="img_selected_friend_' + idx + '" style="float:left;display:block;z-index:9999;width:50px;height:37px; " src="' + selected_friend["image"] + '"></img>' +
                '<div style="float:left;display:block;z-index:9999;background-color:#73A8D0;width:60px;height:37px;color:#ffffff;font-size:11px;font-weight:bold;font-family: Arial, Helvetica, sans-serif;"> ' +
                '<div id="name_selected_friend_' + idx + '" style="text-align:center;height:90%;padding-left:5px;padding-top:5px;width:90%;letter-spacing:1px;overflow:hidden;">' + wrap_around(selected_friend["name"],10) + '</div> ' +
                '</div>' +
                '</div>' +
                '</div>';
        /*'<div id="selected_friend_' + idx + '" ' +
         ' style="left:' + curr_left + 'px;top:' + div_top + 'px; display:block;z-index:9999;width:' + div_width + 'px;height:' + div_height + 'px;position:absolute;" >' +
         '<div>' +
         '<img border="0" id="img_selected_friend_' + idx + '" style="float:left;display:block;z-index:9999;width:44px;height:57px;" src="' + selected_friend["image"] + '"></img>' +
         '<div style="float:right;display:block;z-index:9999;background-color:#73A8D0;width:68px;height:57px;color:white;font-size:11px; font-weight:bold;font-family: Arial, Helvetica, sans-serif;"> ' +
         '<div id="name_selected_friend_' + idx + '" style="text-align:center;height:90%;padding-left:5px;padding-top:5px;width:90%;letter-spacing:1px;overflow:hidden;">' + wrap_around(selected_friend["name"],8) + '</div> ' +
         '</div>' +
         '</div>'
         '</div>';*/


        if (i==0)
        {
            var line4 = "<span style='left:" + (curr_left-rel_selected_left) + "px;letter-spacing:3px;top:" + (div_top) + "px; position:absolute;text-align:left;font-size:12px; font-weight:bold;font-family: Arial, Helvetica, sans-serif;float:left;display:block;z-index:9999;width:" + left_section + "px;'>SELECTED FRIENDS:</span>";
            var prev= '<img border="0" id="gallery_live_prev" style="left:' + (curr_left-rel_selected_left) + 'px;top:' + (div_top) + 'px; position:absolute;float:left;display:block;z-index:9999;width:40px;height:37px;" src="' + chrome.extension.getURL("/skin/prev_selected.png") + '"></img>';
            var prev_hover= '<img border="0" id="gallery_live_prev_hover" style="cursor:pointer;left:' + (curr_left-rel_selected_left) + 'px;top:' + (div_top) + 'px; position:absolute;float:left;display:none;z-index:9999;width:40px;height:37px;" src="' + chrome.extension.getURL("/skin/prev_selected-hover.png") + '"></img>';
            var next= '<img border="0" id="gallery_live_next" style="left:' + (curr_left+rel_selected_left -15 + max*div_width) + 'px;top:' + (div_top) + 'px; position:absolute;float:left;display:block;z-index:9999;width:40px;height:37px;;" src="' + chrome.extension.getURL("/skin/next_selected.png") + '"></img>';
            var next_hover= '<img border="0" id="gallery_live_next_hover" style="cursor:pointer;left:' + (curr_left+rel_selected_left -15 + max*div_width) + 'px;top:' + (div_top) + 'px; position:absolute;float:left;display:none;z-index:9999;width:40px;height:37px;" src="' + chrome.extension.getURL("/skin/next_selected-hover.png") + '"></img>';

            friends = 	line4 + (display_left_nav?prev+prev_hover:"") + (display_right_nav?next+next_hover:"") + friend_template;
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

    return (mouseY - bkg_height + (row * 50) - 20 );
}

function createHTMLElement(html) {
    /* Browser Dependent Function */
    var item = document.createElement("span");
    item.innerHTML = html;
    /*
     element.appendChild(document.createTextNode('2007-11-22'));
     */
    item.style.zindex = "9999";

    return item;
}

function redraw()
{
    if (last_fill!=null)
    {
        drawCircle(unselected_current_page, current_page);
    }
}

function callOtherDomain(callback, url) {
    chrome.extension.sendRequest(
    {
        message: "callOtherDomain",
        url: url
    },
            function(response)
            {
                //alert(response);
                xmlDoc = $.parseXML( response ),
                        $xml = $( xmlDoc ),
                        callback($xml);
            }
            );


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

function calculateXY() {
    mouseX = (screen.width/2) + 10 - (bkg_width/2)+document.body.scrollLeft;
    mouseY = (screen.height/2)- 40 -(bkg_height/2)+document.body.scrollTop;
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
// nisha

function sendMail1() {


    var emailToId = getEmailList();

    //Checkforgroup

    if (emailToId == '' && (send_to_group_selected == null || send_to_group_selected == 0)) {
        displayMessage('displayMessageQuicLinkId', 'QuicLink Error', 'No friend selected.');

    } else {
        if (send_mail_form==null)
        {
            display_send_mail_form1();
        }
    }

}
function display_send_mail_form1()
{
    var div_left = canvasDiv_left + 147;
    var div_top = canvasDiv_top + 147;
    var div_width = 430;
    var div_height = 170;


    var elem = createHTMLElement("<div id='send_mail_form' class='mygl_cls' style=\"border: 0px coral solid;)\">" +
            "<span style='padding-top:10px;padding-left:10px;float:left;display:block;overflow:hidden;z-index:9999;width:90%;height:57px;font-size:12px; font-weight:bold;font-family: Arial, Helvetica, sans-serif;'>" +
        //"ENTER MESSAGE HERE, PLEASE ENTER TO SEND, ESCAPE TO CLOSE" +
        //"<textarea id='message_text' rows='2' cols='76' wrap='hard'>" +
            message_text +
        //	"</textarea>" +
            "</span>" +
            "</div>");
    /*if (lastCanvasDiv!=null)
     {
     if (send_mail_form==null)
     {
     send_mail_form = currentBrowser;

     lastCanvasDiv.appendChild(send_mail_form);
     }
     else
     {
     new_send_mail_form = currentBrowser;

     lastCanvasDiv.replaceChild(new_send_mail_form, send_mail_form);
     send_mail_form = new_send_mail_form;
     }
     var gallerylive_form_div = mydocument.getElementById("gallerylive_form_div");
     if (gallerylive_form_div!=undefined && gallerylive_form_div!=null)
     {
     //gallerylive_form_div.style.backgroundImage = "url(" + chrome.extension.getURL("/skin/background_gray.png)";
     //transparent xx
     gallerylive_form_div.style.backgroundImage = "none";
     gallerylive_form_div.style.backgroundColor="#D1D2D1";
     }

     mydocument.getElementById("message_text").focus();
     }*/

    var emailToId = getEmailList();

    if (send_to_group_selected==null) send_to_group_selected = 0;

    var mod_message_text = escape(message_text.replaceAll("\n","<br>"));

    var clicktime = Math.round(new Date().getTime() / 1000);
    processing('processingQuicLinkId', 'Please wait', 'Sending...');
    var url = "http://quiclink.com/extension/manage.php?action=sendmail&tofid=" +
            emailToId + "&groupid=" + send_to_group_selected +
            "&uid=" + fbuid + '&pagetitle=' +
            escape(get_current_title()) +
            '&pagelink=' + escape(get_current_url()) +
            '&message=' + mod_message_text +
            '&clicktime=' + clicktime + '&loadtime=' + loadtime;

    display_alert(url);

    callOtherDomain(getPics_sendMail, url);


    return;

}

/////


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
    var div_left = canvasDiv_left + 147;
    var div_top = canvasDiv_top + 147;
    var div_width = 430;
    var div_height = 170;

    var elem = createHTMLElement("<div id='send_mail_form' class='mygl_cls' style=\"border: 0px coral solid;left:" + div_left + "px;top:" + div_top + "px;display:block;position: absolute; z-index:9999;width:" + div_width + "px;height:" + div_height + "px;background-image: url(" + chrome.extension.getURL("/skin/background.png") + ")\">" +
            "<span style='padding-top:10px;padding-left:10px;float:left;display:block;overflow:hidden;z-index:9999;width:90%;height:57px;font-size:12px; font-weight:bold;font-family: Arial, Helvetica, sans-serif;'>" +
            "ENTER MESSAGE HERE, PLEASE ENTER TO SEND, ESCAPE TO CLOSE" +
            "<textarea id='message_text' rows='38' cols='78' wrap='hard'>" +
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
            //gallerylive_form_div.style.backgroundImage = "url(" + chrome.extension.getURL("/skin/background_gray.png)";
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
    var charCode = (event.which) ? event.which : event.keyCode;

    last_event = event;
    mydocument = document;
    display_alert("In processKeyUp: event.target.id=" + event.target.id);

    if (charCode == 27)
    {
        //hide_message();
        //redrawCircle(unselected_current_page, current_page);
        hide_circle(true);
        return;
    }

    if (event.target instanceof HTMLTextAreaElement && event.target.id=="message_text") {
        if (charCode == 40)
        {
            //Down arrow - add a newline
            message_text = event.target.value + "\n";
            mydocument.getElementById("message_text").value = message_text;
            return;
        }
        else if (charCode == 13)
        {
            message_text = event.target.value;
            //send message

            var emailToId = getEmailList();

            if (send_to_group_selected==null) send_to_group_selected = 0;

            var mod_message_text = escape(message_text.replaceAll("\n","<br>"));

            var clicktime = Math.round(new Date().getTime() / 1000);
            processing('processingQuicLinkId', 'Please wait', 'Sending...');
            var url = "http://quiclink.com/extension/manage.php?action=sendmail&tofid=" +
                    emailToId + "&groupid=" + send_to_group_selected +
                    "&uid=" + fbuid + '&pagetitle=' +
                    escape(get_current_title()) +
                    '&pagelink=' + escape(get_current_url()) +
                    '&message=' + mod_message_text +
                    '&clicktime=' + clicktime + '&loadtime=' + loadtime;

            display_alert(url);

            callOtherDomain(getPics_sendMail, url);


            return;
        }

    }

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
                    "<div style='float:left;'><img src='" + chrome.extension.getURL("/skin/spinner.gif") + "'></div>" +
                    "<div style='float:left; padding-left:10px;'>" +
                    msg +
                    "</div>",
    {
        width: 350,
        height: 100
    });


}

function display_alert(message)
{
    /* Comment it out all the times except when debugging needed */
    console.log(new Date() + "::" + message);

}
function get_current_url()
{
    return current_url;
}

function get_current_title()
{

    return current_title;
}