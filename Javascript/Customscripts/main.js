/**
 * Created by nayantara on 6/22/16.
 */
var i = 1;
jsPlumb.ready(function() {

    jsPlumb.Defaults.Container = $("#container");
    jsPlumb.Defaults.PaintStyle = {strokeStyle: "palevioletred", lineWidth: 2, dashstyle: '3 3',};
    jsPlumb.Defaults.EndpointStyle = {radius: 7, fillStyle: "palevioletred"};
    jsPlumb.importDefaults({Connector: ["Bezier", {curviness: 50}]});
    jsPlumb.setContainer($('#container'));

    // i --> newAgent ID (Dropped Element ID)
    

    // r --> newState ID (Subdivision of the Element)
    var r = 0;

    // q --> Connection source/target area ID
    var q = 0;

    // list --> Array to hold the Source and Target IDs of connections
    var list = [];
    var clickedId = 1;

    /**
     * @function draggable method for the 'import stream' tool
     * @helper clone
     */


    $(".stream").draggable
    ({
        helper: 'clone',
        cursor: 'pointer',
        tolerance: 'fit',
        revert: true

    });

    /**
     * @function draggable method for the 'simple query' tool
     * @helper clone
     */

    $(".squery").draggable
    ({
        helper: 'clone',
        cursor: 'pointer',
        tolerance: 'fit',
        revert: true

    });

    /**
     * @function draggable method for the 'windows query' tool
     * @helper clone
     */

    $(".wquery").draggable
    ({
        helper: 'clone',
        cursor: 'pointer',
        tolerance: 'fit',
        revert: true

    });


    /**
     * @function draggable method for the 'simple query' tool
     * @helper clone
     */

    $(".joquery").draggable
    ({
        helper: 'clone',
        cursor: 'pointer',
        tolerance: 'fit',
        revert: true

    });

    /**
     * @function draggable method for the 'state-machine query' tool
     * @helper clone
     */

    $(".stquery").draggable
    ({
        helper: 'clone',
        cursor: 'pointer',
        tolerance: 'fit',
        revert: true

    });

    /**
     * @function droppable method for the 'stream' & the 'query' tools
     */

    $("#container").droppable
    ({

        accept: '.stream, .squery, .wquery, .joquery, .stquery ',
        containment: 'container',

        /**
         *
         * @param e --> original event object fired/ normalized by jQuery
         * @param ui --> object that contains additional info added by jQuery depending on which interaction was used
         * @helper clone
         */

        drop: function (e, ui) {

            var dropElem = ui.draggable.attr('class');
            droppedElement = ui.helper.clone();
            ui.helper.remove();
            $(droppedElement).removeAttr("class");
            jsPlumb.repaint(ui.helper);

            if (dropElem == "stream ui-draggable") {
                var newAgent = $('<div>').attr('id', i).addClass('streamdrop');
                $("#container").addClass("disabledbutton");
                $("#toolbox").addClass("disabledbutton");
                createStreamForm(newAgent, i, e);
                i++;
            }

            else if (dropElem == "squery ui-draggable") {
                var newAgent = $('<div>').attr('id', i).addClass('squerydrop');
                var droptype = "squerydrop";
                dropQuery(newAgent, i, e,droptype);
                i++;
            }

            else if (dropElem == "wquery ui-draggable") {
                var newAgent = $('<div>').attr('id', i).addClass('wquerydrop');
                var droptype = "wquerydrop";
                dropQuery(newAgent, i, e, droptype);
                i++;
            }

            else if (dropElem == "joquery ui-draggable") {
                var newAgent = $('<div>').attr('id', i).addClass('joquerydrop');
                var droptype = "joquerydrop";
                dropQuery(newAgent, i, e, droptype);
                i++;
            }

            else {
                var newAgent = $('<div>').attr('id', i).addClass('stquerydrop');
                var droptype = "stquerydrop";
                dropQuery(newAgent, i, e, droptype);
                i++;
            }
        }
    });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @function Create a 3D array to store predefined Stream Definitions
 * @returns {Array}
 * @constructor
 * @decomposed Each row stores details of one Stream
 * @rowInfo col1-> Stream name, col2-> subdivided array for attribute names
 * @rowInfo col3-> Subdivided array for attribute type info
 * @rowInfo col4-> Stream definition in a single line
 *
 */


    function PredefinedStreams()
    {
        var StreamArray = new Array(3);
        for (var q = 0; q < 3; q++)
        {
            StreamArray[q] = new Array(4);
            for (var w=1; w<3; w++)
            {
                StreamArray[q][w] = new Array(5);
            }
        }
    
        StreamArray[0][0]="Stream1";
        StreamArray[0][1][0]="1_attr1";
        StreamArray[0][1][1]="1_attr2";
        StreamArray[0][1][2]="1_attr3";
        StreamArray[0][1][3]="1_attr4";
        StreamArray[0][1][4]="1_attr5";
        StreamArray[0][2][0]="1_type1";
        StreamArray[0][2][1]="1_type2";
        StreamArray[0][2][2]="1_type3";
        StreamArray[0][2][3]="1_type4";
        StreamArray[0][2][4]="1_type5";
        StreamArray[0][3] = "define stream Stream1 (1_attr1 1_type1, 1_attr2 1_type2, 1_attr3 1_type3, 1_attr4 1_type4, 1_attr5 1_type5 );";
    
        StreamArray[1][0]="Stream2";
        StreamArray[1][1][0]="2_attr1";
        StreamArray[1][1][1]="2_attr2";
        StreamArray[1][1][2]="2_attr3";
        StreamArray[1][1][3]="2_attr4";
        StreamArray[1][1][4]="2_attr5";
        StreamArray[1][2][0]="2_type1";
        StreamArray[1][2][1]="2_type2";
        StreamArray[1][2][2]="2_type3";
        StreamArray[1][2][3]="2_type4";
        StreamArray[1][2][4]="2_type5";
        StreamArray[1][3] = "define stream Stream2 (2_attr1 2_type1, 2_attr2 2_type2, 2_attr3 2_type3, 2_attr4 2_type4, 2_attr5 2_type5 );";
    
        StreamArray[2][0]="Stream3";
        StreamArray[2][1][0]="3_attr1";
        StreamArray[2][1][1]="3_attr2";
        StreamArray[2][1][2]="3_attr3";
        StreamArray[2][1][3]="3_attr4";
        StreamArray[2][1][4]="3_attr5";
        StreamArray[2][2][0]="3_type1";
        StreamArray[2][2][1]="3_type2";
        StreamArray[2][2][2]="3_type3";
        StreamArray[2][2][3]="3_type4";
        StreamArray[2][2][4]="3_type5";
        StreamArray[2][3] = "define stream Stream3 (3_attr1 3_type1, 3_attr2 3_type2, 3_attr3 3_type3, 3_attr4 3_type4, 3_attr5 3_type5 );";
    
    
        return StreamArray;
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @function Retrieves info from the Predifined array onto individual arrays
 * @type {string}
 *
 */

    var streamDef = streamtypes = PredefinedStreams();
    var stream1_attr = streamtypes = PredefinedStreams();
    var stream1_type = streamtypes = PredefinedStreams();
    var stream2_attr = streamtypes = PredefinedStreams();
    var stream2_type = streamtypes = PredefinedStreams();
    var stream3_attr = streamtypes = PredefinedStreams();
    var stream3_type = streamtypes = PredefinedStreams();
    
    //Array that stores all Import stream data
    var createdImportStreamArray = [];
    for(var x = 0; x < 100; x++){
        createdImportStreamArray[x] = [];
        for(var y = 0; y < 4; y++){
            createdImportStreamArray[x][y] = null;
        }
    }
    
    //Array that stores all Export stream data
    var createdExportStreamArray = [];
    for(var x = 0; x < 100; x++){
        createdExportStreamArray[x] = [];
        for(var y = 0; y < 4; y++){
            createdExportStreamArray[x][y] = null;
        }
    }

    
    //Array that stores all Defined stream data
    var createdDefinedStreamArray = [];
    for(var x = 0; x < 100; x++){
        createdDefinedStreamArray[x] = [];
        for(var y = 0; y < 5; y++){
            createdDefinedStreamArray[x][y] = null
        }
    }
    
    //Array that stores connection related data
    var ConnectionArray = [];
    for(var x = 0; x < 100; x++){
        ConnectionArray[x] = [];
        for(var y = 0; y < 3; y++){
            ConnectionArray[x][y] = null;
        }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @function Displays the selected Stream definition in a single line
 *
 */

    function showStreamDefLine()
    {
            var choice=document.getElementById("streamSelect");

            //var choice=document.getElementById("streamSelectExp");

        var selectedStr = choice.options[choice.selectedIndex].text;

        if(selectedStr == "Select an option")
        {
            alert("Please select a valid Stream from the list");
        }
        else if (selectedStr == "Stream1")
        {
            alert("Stream Definition: \n"+streamDef[0][3]);
        }
        else if(selectedStr=="Stream2")
        {
            alert("Stream Definition: \n"+streamDef[1][3]);
        }
        else
        {
            alert("Stream Definition: \n"+streamDef[2][3]);
        }

    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function showStreamDefLineExp()
    {
        var choice=document.getElementById("streamSelectExp");

        //var choice=document.getElementById("streamSelectExp");

        var selectedStr = choice.options[choice.selectedIndex].text;

        if(selectedStr == "Select an option")
        {
            alert("Please select a valid Stream from the list");
        }
        else if (selectedStr == "Stream1")
        {
            alert("Stream Definition: \n"+streamDef[0][3]);
        }
        else if(selectedStr=="Stream2")
        {
            alert("Stream Definition: \n"+streamDef[1][3]);
        }
        else
        {
            alert("Stream Definition: \n"+streamDef[2][3]);
        }

    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @function detect the id of the element clicked
 * @param sender
 * @returns {*}
 *
 */
    function doclick(sender)
    {
        var clickedelemId=sender.id;
        var selectedStreamim = createdImportStreamArray[clickedelemId-1][1];
        var streamnam = createdImportStreamArray[clickedelemId-1][2];
        var streamDefget;
        if (selectedStreamim == "Stream1")
        {
            streamDefget=streamDef[0][3];
            var res = streamDefget.replace("Stream1", streamnam);
        }
        else if(selectedStreamim=="Stream2")
        {
            streamDefget=streamDef[1][3];
            var res = streamDefget.replace("Stream2", streamnam);
        }
        else
        {
            streamDefget=streamDef[2][3];
            var res = streamDefget.replace("Stream3", streamnam);
        }
        alert("Stream ID: "+sender.id+"\nSelected stream: "+ createdImportStreamArray[clickedelemId-1][1]+"\nStream Type: Import Stream\nStream Definition: "+res);
        clickedId= clickedelemId;
        //createStreamForm();
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function doclickExp(sender)
    {
        var clickedelemId=sender.id;
        var selectedStreamim = createdExportStreamArray[clickedelemId-1][1];
        var streamnam = createdExportStreamArray[clickedelemId-1][2];
        var streamDefy;
        if (selectedStreamim == "Stream1")
        {
            streamDefy=streamDef[0][3];
            var res = streamDefy.replace("Stream1", streamnam);
        }
        else if(selectedStreamim=="Stream2")
        {
            streamDefy=streamDef[1][3];
            var res = streamDefy.replace("Stream2", streamnam);
        }
        else
        {
            streamDefy=streamDef[2][3];
            var res = streamDefy.replace("Stream3", streamnam);
        }
        alert("Stream ID: "+sender.id+"\nSelected stream: "+ createdExportStreamArray[clickedelemId-1][1]+"\nStream Type: Export Stream\nStream Definition: "+res);
        clickedId= clickedelemId;
        //createStreamForm();
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function doclickDefine(sender)
    {
        var clickedelemId=sender.id;
        var streamname = createdDefinedStreamArray[clickedelemId][1];
        var attrnum = createdDefinedStreamArray[clickedelemId][4];
        var tblerows = (table.rows.length)-1;
        var res = "define stream "+ streamname + "(";

        // createdDefinedStreamArray[i][2][r-1][0]=attrNm;
        // createdDefinedStreamArray[i][2][r-1][1]=attrTp;
        
        for( var t=0; t<tblerows; t++)
        {
            for (var y=0; y<2 ;y++)
            {
                res=res+ createdDefinedStreamArray[clickedelemId][2][t][y] + " ";
            }
            if(t==tblerows-1)
            {
                res=res+"";
            }
            else 
            {
                res=res+", ";
            }
            
        }
        res=res+")";
        alert("Stream ID: "+sender.id+"\nCreated stream: "+ streamname+"\nStream Type: Defined Stream\nStream Definition: "+res);
        clickedId= clickedelemId;
        //createStreamForm();
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 * @function Create the combo box
 * @description Stores the Predifined array data onto individual arrays
 *
 */

    function createattr(strval)
    {
        if(strval=="import")
        {
            var streams = '<select id="streamSelect" onchange="showStreamDefLine()"><option value="voidopt">Select an option</option>', streamtypes = PredefinedStreams();
        }
        else
        {
            var streams = '<select id="streamSelectExp" onchange="showStreamDefLineExp()"><option value="voidopt">Select an option</option>', streamtypes = PredefinedStreams();
        }
        var PredefinedStreamComboDiv=document.createElement('div');
        for (var q = 0; q < 3; q++)
        {
            streams += "<option value='"+streamtypes[q][0]+"'>"+streamtypes[q][0]+"</option>";
            //streamDef = streamtypes[q][3];
            for (var w=0; w<3; w++)
            {
                for(var r=0; r<5;r++)
                {
                    if(q==0 && w==1)
                    {
                        stream1_attr[r] = streamtypes[q][w][r];
                    }
                    if(q==0 && w==2)
                    {
                        stream1_type[r] = streamtypes[q][w][r];
                    }

                    if(q==1 && w==1)
                    {
                        stream2_attr[r]= streamtypes[q][w][r];
                    }
                    if(q==1 && w==2)
                    {
                        stream2_type [r]= streamtypes[q][w][r];
                    }
                    if(q==2 && w==1)
                    {
                        stream3_attr [r]= streamtypes[q][w][r];
                    }
                    if(q==2 && w==2)
                    {
                        stream3_type [r]= streamtypes[q][w][r];
                    }
                }
            }


        }
        streams += '</select>';
        PredefinedStreamComboDiv.className="attr-combobox-style";
        PredefinedStreamComboDiv.innerHTML= streams;
        return PredefinedStreamComboDiv;
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * @function Create the Stream Property Form dynamically
 */

    var importDiv, iStreamtype,headingimport, br, istreamlbl, istreamtypelbl, iPredefStreamdiv, istreamDefLineDiv, istreamDefDivx, istreamName, importbtn;
    var exportDiv,eStreamtype,headingexport, estreamlbl, estreamtypelbl, ePredefStreamdiv, estreamDefLineDiv, estreamDefDivx, estreamName, exportbtn;
    var streamDiv, streambtn, headingstream;
    var definestreamdiv,inputval,input, attrDiv,newDiv,addenteredattr ;
    var inputLbl,streamnameLbl,StreamNameInput,attrName,attNam,attrTypecomboDiv,addAttrBtn,showAttrDivision,endStreamDefBtn;


    function createStreamForm(newAgent,i,e)
    {
        //For the Import Form
        importDiv = document.createElement("div");
        iStreamtype = document.createElement("div");
        headingimport = document.createElement("h3");
        br = document.createElement("br");
        istreamlbl = document.createElement("label");
        istreamtypelbl = document.createElement("label");
        iPredefStreamdiv = document.createElement("div");
        istreamDefLineDiv = document.createElement("div");
        istreamDefDivx = document.createElement("div");
        istreamName = document.createElement("input");
        importbtn = document.createElement("button");

        importDiv.className = "importdiv";
        importDiv.id = "importdiv";
        istreamlbl.className = "istreamlbl";
        headingimport.innerHTML ="Import Stream";        
        headingimport.className = "headingimport";
        br.className = "br-div";
        istreamlbl.innerHTML = "Stream:";
        iPredefStreamdiv.id = "iPredefStreamdiv";
        iPredefStreamdiv.className = "iPredefStreamdiv";
        istreamDefDivx.className = "streamDefDiv";
        istreamDefDivx.id = "streamDefLineDiv";
        istreamName.className = "istreamName";
        istreamName.id = "istreamName";
        istreamName.placeholder = "as : ";
        importbtn.type = 'button';
        importbtn.innerHTML = "Import";
        importbtn.className = "btn-import";
        var kind="import";
        importbtn.onclick = function() {
            storeImportStreamInfo(newAgent,i,e,kind);
        };
        
        importDiv.appendChild(headingimport);
        importDiv.appendChild(iStreamtype);
        importDiv.appendChild(istreamlbl);
        importDiv.appendChild(istreamtypelbl);
        var str="import";
        var predef1=createattr(str);
        iPredefStreamdiv.appendChild(predef1);
        importDiv.appendChild(iPredefStreamdiv);
        importDiv.appendChild(br);
        importDiv.appendChild(istreamDefLineDiv);
        importDiv.appendChild(istreamDefDivx);
        importDiv.appendChild(br);
        importDiv.appendChild(istreamName);
        importDiv.appendChild(br);
        importDiv.appendChild(importbtn);
        importDiv.appendChild(br);
        

        //For the Export Form
        exportDiv = document.createElement("div");
        eStreamtype = document.createElement("div");
        headingexport = document.createElement("h3");
        br = document.createElement("br");
        estreamlbl = document.createElement("label");
        estreamtypelbl = document.createElement("label");
        ePredefStreamdiv = document.createElement("div");
        estreamDefLineDiv = document.createElement("div");
        estreamDefDivx = document.createElement("div");
        estreamName = document.createElement("input");
        exportbtn = document.createElement("button");

        exportDiv.className = "exportdiv";
        exportDiv.id = "exportdiv";
        estreamlbl.className = "estreamlbl";
        headingexport.innerHTML ="Export Stream";
        headingexport.className = "headingexport";
        estreamlbl.innerHTML = "Stream:";
        ePredefStreamdiv.id = "ePredefStreamdiv";
        ePredefStreamdiv.className = "ePredefStreamdiv";
        estreamDefDivx.className = "streamDefDiv";
        estreamDefDivx.id = "streamDefLineDiv";
        estreamName.className = "estreamName";
        estreamName.id = "estreamName";
        estreamName.placeholder = "as : ";
        exportbtn.type = 'button';
        exportbtn.innerHTML = "Export";
        exportbtn.className = "btn-export";
        var typek = "export";
        exportbtn.onclick = function() {
            storeExportStreamInfo(newAgent,i,e,typek);
        };

        exportDiv.appendChild(headingexport);
        exportDiv.appendChild(estreamlbl);
        exportDiv.appendChild(estreamtypelbl);
        var str1="export";
        var predef2=createattr(str1);
        ePredefStreamdiv.appendChild(predef2);
        exportDiv.appendChild(ePredefStreamdiv);
        exportDiv.appendChild(br);
        exportDiv.appendChild(estreamDefLineDiv);
        exportDiv.appendChild(estreamDefDivx);
        exportDiv.appendChild(br);
        exportDiv.appendChild(estreamName);
        exportDiv.appendChild(br);
        exportDiv.appendChild(exportbtn);
        exportDiv.appendChild(br);
        
        //For the Stream Form

        streamDiv = document.createElement("div");
        streambtn =  document.createElement("button");
        headingstream = document.createElement("h3");
        definestreamdiv = document.createElement("div");
        inputval = document.createElement("div");
        streambtn.type = 'button';
        streambtn.className = "streambtn";
        streambtn.id = "streambtn";

        
        
        inputval.className = "inputvalDiv";
        streamDiv.className = "streamDiv";
        streamDiv.id = "streamdiv";

        headingstream.innerHTML ="Define Stream";
        headingstream.className = "headingstream";
        streambtn.innerHTML = "Start Defining";
        endStreamDefBtn = document.createElement("button");
        endStreamDefBtn.type = "button";
        endStreamDefBtn.id = "endStreamDefBtn";
        endStreamDefBtn.className = "endStreamDefBtn";
        endStreamDefBtn.innerHTML = "Create Event Stream";
        var kindt = "defined";
        endStreamDefBtn.onclick = function() {
            storeDefinedStreamInfo(newAgent,i,e,kindt);
        };
        streambtn.setAttribute("onclick","newStreamDef()");
        streamDiv.appendChild(headingstream);
        streamDiv.appendChild(streambtn);
        streamDiv.appendChild(inputval);

        lot.appendChild(importDiv);
        lot.appendChild(exportDiv);
        streamDiv.appendChild(definestreamdiv);
        lot.appendChild(streamDiv);
        

        $(".toolbox-titlex").show();
        $(".panel").show();

    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @function Create a form to add the Stream Name, Attribute name & type
 */


    function newStreamDef()
    {
        var linebreak = document.createElement("br");
        $("#streambtn").addClass("disabledbutton");
        $("#importdiv").addClass("disabledbutton");
        $("#exportdiv").addClass("disabledbutton");
        
        inputLbl = document.createElement("label");
        streamnameLbl = document.createElement("label");
        StreamNameInput =  document.createElement("input");
        attrName = document.createElement("label");
        attNam = document.createElement("input");
        attrTypecomboDiv = document.createElement("div");
        addAttrBtn = document.createElement("button");
        showAttrDivision = document.createElement("div");

        newDiv=document.createElement('div');
        var html = '<select id="attrTypefromCombo">', attrtypes = typeGenerate(), i;
        for(i = 0; i < attrtypes.length; i++) {
            html += "<option value='"+attrtypes[i]+"'>"+attrtypes[i]+"</option>";
        }
        html += '</select>';
        newDiv.className="attr-combobox-stylediv";
        newDiv.id="type"+attrID;
        newDiv.innerHTML= html;
        inputLbl.className = "inputLbl";
        inputLbl.innerHTML = "Provide a Stream name and add attribute-type pairs";
        streamnameLbl.innerHTML = "Stream Name: ";
        streamnameLbl.className = "streamnameLbl";
        StreamNameInput.className = "StreamNameInput";
        StreamNameInput.id = "StreamNameInput";
        StreamNameInput.placeholder = "Stream Name";
        attrName.innerHTML = "Attribute Name: ";
        attrName.className = "attrName";
        attNam.className = "attNam";
        attNam.placeholder = "Attribute Name";
        attNam.id = "attNam";
        showAttrDivision.id ="showAttrDivision";
        showAttrDivision.className = "showAttrDivision";
        
        attrTypecomboDiv.className = "attrTypecomboDiv";
        attrTypecomboDiv.id = "attrTypecomboDiv";
        addAttrBtn.type = "button";
        addAttrBtn.className = "addAttrBtn";
        addAttrBtn.id = "addAttrBtn";
        addAttrBtn.innerHTML = "Add";
        addAttrBtn.setAttribute("onclick", "showAttributes()");
        
        inputval.appendChild(inputLbl);
        inputval.appendChild(streamnameLbl);
        inputval.appendChild(StreamNameInput);
        inputval.appendChild(showAttrDivision);
        inputval.appendChild(attrName);
        inputval.appendChild(attNam);
        attrTypecomboDiv.appendChild(newDiv);
        inputval.appendChild(attrTypecomboDiv);
        inputval.appendChild(addAttrBtn);
        definestreamdiv.appendChild(inputval);
        showAttrDivision.appendChild(endStreamDefBtn);
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @function Generate attribute types for the combobox
 * @returns {Array}
 */

    function typeGenerate() {
        var typeArray = new Array();
        typeArray[0] = "int";
        typeArray[1] = "long";
        typeArray[2] = "double";
        typeArray[3] = "float";
        typeArray[4] = "string";
        typeArray[5] = "bool";
        return typeArray;
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var attrName = document.createElement("label");
    var attrType= document.createElement("label");
    var closeattr= document.createElement("button");
    var rowID=0;
    var table = document.createElement('table');
    table.id = "attrtable";
    table.className = "attrtable";
    var tr = document.createElement('tr');
    var attrNameHeader= document.createElement('td');
    var attrtypeHeader = document.createElement('td');
    var attrDeleteHeader   = document.createElement('td');
    attrNameHeader.innerHTML = "Attribute Name";
    attrtypeHeader.innerHTML = "Attribute Type";
    attrDeleteHeader.innerHTML = "Delete Row";
    tr.appendChild(attrNameHeader);
    tr.appendChild(attrtypeHeader);
    tr.appendChild(attrDeleteHeader);
    table.appendChild(tr);
    
    

/**
 * @function Append Added attributes to the display table
 */

    function showAttributes()
    {
        var tr = document.createElement('tr');
        var attributeName = document.getElementById("attNam").value;
        var choice=document.getElementById("attrTypefromCombo");
        var attrTypeCombo = choice.options[choice.selectedIndex].text;

        showAttrDivision.appendChild(attrName);
        showAttrDivision.appendChild(attrType);
        showAttrDivision.appendChild(closeattr);

        var tdAttrName = document.createElement('td');
        var tdAttrType = document.createElement('td');
        var tdDelete   = document.createElement('td');

        var text1 = document.createTextNode(attributeName);
        var text2 = document.createTextNode(attrTypeCombo);
        var deletebtn =  document.createElement("button");
        deletebtn.type="button";
        deletebtn.id ="deletebtn";
        var text3= "<img src='../Images/Delete.png'>";
        deletebtn.innerHTML = text3;
        deletebtn.onclick = function() {
            deleteRow(this);
        };

        tdAttrName.appendChild(text1);
        tdAttrType.appendChild(text2);
        tdDelete.appendChild(deletebtn);
        tr.appendChild(tdAttrName);
        tr.appendChild(tdAttrType);
        tr.appendChild(tdDelete);
        table.appendChild(tr);
        showAttrDivision.appendChild(table);

    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @function Delete a row from the table
 * @param row
 */
    function deleteRow(row)
    {
        var i=row.parentNode.parentNode.rowIndex;
        document.getElementById('attrtable').deleteRow(i);
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @function Create attribute + type pairs dynamically
 */
    var attrID=1;
    function createattribute() {

        attrDiv = document.createElement("div");
        attrDiv.className = "attrDiv";
        attrDiv.id = "attrDiv";
        input = document.createElement("input");
        input.type = "text";
        input.placeholder="Attribute name";
        input.id="attr"+attrID;
        input.className = "attr-textfield-stylepair";
        

        //Display the drop down menu

        newDiv=document.createElement('div');
        var html = '<select >', attrtypes = typeGenerate(), i;
        for(i = 0; i < attrtypes.length; i++) {
            html += "<option value='"+attrtypes[i]+"'>"+attrtypes[i]+"</option>";
        }
        html += '</select>';
        newDiv.className="attr-combobox-stylediv";
        newDiv.id="type"+attrID;
        newDiv.innerHTML= html;
        
        addenteredattr = document.createElement("button");
        addenteredattr.type = "button";
        addenteredattr.innerHTML = "Add";
        addenteredattr.className = "addenteredattr";
        addenteredattr.id = "addenteredattr";
        attrID++;
        attrDiv.appendChild(input);
        attrDiv.appendChild(newDiv);
        attrDiv.appendChild(addenteredattr);
        inputval.appendChild(attrDiv);
        
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @function Store Import Stream info to array
 */

    function storeImportStreamInfo(newAgent,i,e,kind)
    {
        var choice=document.getElementById("streamSelect");
        var selectedStream = choice.options[choice.selectedIndex].text;
        var asName= document.getElementById("istreamName").value;
        var StreamElementID = i;
        //alert("Stream ID: "+StreamElementID+"\nSelected Stream: "+selectedStream);
        
        createdImportStreamArray[i-1][0]=StreamElementID;
        createdImportStreamArray[i-1][1]=selectedStream;
        createdImportStreamArray[i-1][2]=asName;
        createdImportStreamArray[i-1][3]="Import";
        
        var prop = $('<a class="streamproperty" onclick="doclick(this)"><b><img src="../Images/settings.png"></b></a> ').attr('id', (i));
        var showIcon = $('<img src="../Images/Import.png"></b></a> ').attr('id', (i));
        newAgent.text(asName).append('<a class="boxclose" id="boxclose"><b><img src="../Images/Cancel.png"></b></a> ').append(showIcon).append(prop);
        dropCompleteElement(newAgent,i,e,kind);
        
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Store Export stream info to array
 */
    function storeExportStreamInfo(newAgent,i,e,kind)
    {
        var choice=document.getElementById("streamSelectExp");
        var selectedStream = choice.options[choice.selectedIndex].text;
        var asName= document.getElementById("estreamName").value;
        var StreamElementID = i;
        //alert("Stream ID: "+StreamElementID+"\nSelected Stream: "+selectedStream);

        createdExportStreamArray[i-1][0]=StreamElementID;
        createdExportStreamArray[i-1][1]=selectedStream;
        createdExportStreamArray[i-1][2]=asName;
        createdExportStreamArray[i-1][3]="Export";

        var prop = $('<a class="streamproperty" onclick="doclickExp(this)"><b><img src="../Images/settings.png"></b></a> ').attr('id', (i));
        var showIcon = $('<img src="../Images/Export.png"></b></a> ').attr('id', (i));
        newAgent.text(asName).append('<a class="boxclose" id="boxclose"><b><img src="../Images/Cancel.png"></b></a> ').append(showIcon).append(prop);
        dropCompleteElement(newAgent,i,e,kind);
    
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Store Defined stream info to array
 */
var DefAttrArray = new Array(100);

    function storeDefinedStreamInfo(newAgent,i,e,kind)
    {
        var StrName= document.getElementById("StreamNameInput").value;
        var StreamElementID = i;
        var table = document.getElementById('attrtable');
        var tblerows = (table.rows.length);
        createdDefinedStreamArray[i][2]=new Array(tblerows);
        
        
        for (r = 1; r < tblerows; r++) {
            for(var c=0; c<1;c++) {
                var attrNm = table.rows[r].cells[c].innerHTML;
                var attrTp = table.rows[r].cells[1].innerHTML;
                createdDefinedStreamArray[i][2][r-1]= new Array(2);
                createdDefinedStreamArray[i][2][r-1][0]=attrNm;
                createdDefinedStreamArray[i][2][r-1][1]=attrTp;
            }

        }

        createdDefinedStreamArray[i][0]=StreamElementID;
        createdDefinedStreamArray[i][1]=StrName;
        createdDefinedStreamArray[i][3]="Defined Stream";
        createdDefinedStreamArray[i][4]= tblerows;
        
        
        
        var prop = $('<a class="streamproperty" onclick="doclickDefine(this)"><b><img src="../Images/settings.png"></b></a> ').attr('id', (i));
        var showIcon = $('<img src="../Images/Defined.png"></b></a> ').attr('id', (i));
        newAgent.text(StrName).append('<a class="boxclose" id="boxclose"><b><img src="../Images/Cancel.png"></b></a> ').append(showIcon).append(prop);
        dropCompleteElement(newAgent,i,e,kind);
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    var q=0;
    var r=0;
    
    function dropCompleteElement(newAgent,i,e,kind)
    {
        $(droppedElement).draggable({containment: "container"});

        var finalElement =  newAgent;
        r++; q++;

        //var connection = $('<div>').attr('id', i+"-i" ).addClass('connection');

        if(kind=="import")
        {
            var connection = $('<div>').attr('id', i+"-import" ).addClass('connection');
        }
        else if (kind=="export")
        {
            var connection = $('<div>').attr('id', i+"-export" ).addClass('connection');
        }
        else
        {
            var connection = $('<div>').attr('id', i+"-defined" ).addClass('connection');
        }


        finalElement.css({
            'top': e.pageY,
            'left': e.pageX
        });


        finalElement.append(connection);

        $('#container').append(finalElement);

        jsPlumb.draggable(finalElement, {
            containment: 'parent'
        });

        jsPlumb.makeTarget(connection, {
            anchor: 'Continuous'
        });

        jsPlumb.makeSource(connection, {
            parent:finalElement,
            anchor: 'Continuous'
        });

        $("#container").removeClass("disabledbutton");
        $("#toolbox").removeClass("disabledbutton");

        var myNode = document.getElementById("lot");
        var fc = myNode.firstChild;

        while( fc ) {
            myNode.removeChild( fc );
            fc = myNode.firstChild;
        }

        $(".toolbox-titlex").hide();
        $(".panel").hide();

    
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    function dropQuery(newAgent, e, i,droptype)
    {
        var el=newAgent;
        var le=e;


        //Instead of calling createQueryForm() method onclick, have to first call getConnectionDetails(newAgent,i,e) and then from within this method call createQueryForm()

        if(droptype=="squerydrop")
        {
            var prop = $('<a class="streamproperty" onclick="createQueryForm()"><b><img src="../Images/settings.png"></b></a> ').attr('id', (i));
        }

        else if(droptype=="wquerydrop")
        {
            var prop = $('<a class="streamproperty" onclick="createWindowQueryForm()"><b><img src="../Images/settings.png"></b></a> ').attr('id', (i));
        }
        else if(droptype=="joquerydrop")
        {
            var prop = $('<a class="streamproperty" onclick="createJoinQueryForm()"><b><img src="../Images/settings.png"></b></a> ').attr('id', (i));
        }
        else
        {
            var prop = $('<a class="streamproperty" onclick="createWindowQueryForm()"><b><img src="../Images/settings.png"></b></a> ').attr('id', (i));
        }



        newAgent.text("Empty Query").append('<a class="boxclose" id="boxclose"><b><img src="../Images/Cancel.png"></b></a> ').append(prop);
        dropCompleteQueryElement(newAgent,i,e);
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function dropCompleteQueryElement(newAgent,i,e)
    {
        $(droppedElement).draggable({containment: "container"});

        var finalElement =  newAgent;
        r++; q++;

        var connectionIn = $('<div class="connectorIn">').attr('id', i + '-in').addClass('connection').text("in");
        var connectionOut = $('<div class="connectorOut">').attr('id', i + '-out').addClass('connection').text('out');

            finalElement.css({
                'top': e.pageY,
                'left': e.pageX
            });

            finalElement.append(connectionIn);
            finalElement.append(connectionOut);

            $('#container').append(finalElement);

        jsPlumb.draggable(finalElement, {
            containment: 'parent'
        });

        jsPlumb.makeTarget(connectionIn, {
            anchor: 'Continuous'
        });

        jsPlumb.makeSource(connectionOut, {
            parent:finalElement,
            anchor: 'Continuous'
        });

        // $("#container").removeClass("disabledbutton");
        // $("#toolbox").removeClass("disabledbutton");

        var myNode = document.getElementById("lot");
        var fc = myNode.firstChild;

        while( fc ) {
            myNode.removeChild( fc );
            fc = myNode.firstChild;
        }

    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function getConnectionDetails(newAgent,i,e)
    {
        var s,t;

        jsPlumb.bind("jsPlumbConnection", function(newAgent) { // ci is connection info.
            s=newAgent.sourceId;
            t=newAgent.targetId;
        });
        alert("Source ID of connection: "+ s+ "\nTarget ID of connection: "+t);

    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var queryDiv;
    var simpleQueryLabel, simpleQueryName,queryNameInput, fromStreamLabel, fromStream, filterLabel,filterInput, selectLabel, insertIntoLabel, insertIntoStream;
    var input1, input2, input3;
    var input1Label, input2Label, input3Label;
    var queryFomButton;



    function createQueryForm()
    {
        $("#container").addClass("disabledbutton");
        $("#toolbox").addClass("disabledbutton");
        
        var tableQueryForm = document.createElement('table');
        tableQueryForm.id = "tableQueryForm";
        tableQueryForm.className = "tableQueryForm";

        queryDiv=document.createElement("div");
        queryDiv.className="queryDiv";
        queryDiv.id="queryDiv";

        simpleQueryLabel= document.createElement("label");
        simpleQueryLabel.className="simpleQueryLabel";
        simpleQueryLabel.id="simpleQueryLabel";
        simpleQueryLabel.innerHTML='Simple Query';

        simpleQueryName= document.createElement("label");
        simpleQueryName.id ="simpleQueryName";
        simpleQueryName.className ="simpleQueryName";
        simpleQueryName.innerHTML = "Query name";

        queryNameInput= document.createElement("input");
        queryNameInput.id = "queryNameInput";
        queryNameInput.className = "queryNameInput";

        fromStreamLabel= document.createElement("label");
        fromStreamLabel.className="fromStreamLabel";
        fromStreamLabel.id="fromStreamLabel";
        fromStreamLabel.innerHTML= "from: ";

        fromStream= document.createElement("label");
        fromStream.id ="fromStream";
        fromStream.className = "fromStream";
        fromStream.innerHTML = "from Stream";

        filterLabel= document.createElement("label");
        filterLabel.className="filterLabel";
        filterLabel.id="filterLabel";
        filterLabel.innerHTML = "Filter: ";

        filterInput= document.createElement("input");
        filterInput.id = "filterInput";
        filterInput.className = "filterInput";

        selectLabel= document.createElement("label");
        selectLabel.className="selectLabel";
        selectLabel.id="selectLabel";
        selectLabel.innerHTML= "Select : ";

        input1= document.createElement("input");
        input1.className="input1";
        input1.id="input1";
        input2= document.createElement("input");
        input2.className="input2";
        input2.id="input2";
        input3= document.createElement("input");
        input3.className="input3";
        input3.id="input3";

        asLabel1=document.createElement("label");
        asLabel1.innerHTML=" as ";
        asLabel2=document.createElement("label");
        asLabel2.innerHTML=" as ";
        asLabel3=document.createElement("label");
        asLabel3.innerHTML=" as ";

        input1Label=document.createElement("label");
        input1Label.className="input1Label";
        input1Label.id="input1Label";
        input1Label.innerHTML="attr1";
        input2Label=document.createElement("label");
        input2Label.className="input2Label";
        input2Label.id="input2Label";
        input2Label.innerHTML="attr2";
        input3Label=document.createElement("label");
        input3Label.className="input3Label";
        input3Label.id="input3Label";
        input3Label.innerHTML="attr3";

        insertIntoLabel=document.createElement("label");
        insertIntoLabel.className="insertIntoLabel";
        insertIntoLabel.id="insertIntoLabel";
        insertIntoLabel.innerHTML="insert into: ";

        insertIntoStream=document.createElement("label");
        insertIntoStream.className="insertIntoStream";
        insertIntoStream.id="insertIntoStream";
        insertIntoStream.innerHTML="into Stream name";

        queryFomButton=document.createElement("button");
        queryFomButton.type="button";
        queryFomButton.className="queryFormButton";
        queryFomButton.id="queryFormButton";
        queryFomButton.innerHTML="Submit Query";

        queryFomCloseButton=document.createElement("button");
        queryFomCloseButton.type="button";
        queryFomCloseButton.className="queryFomCloseButton";
        queryFomCloseButton.id="queryFomCloseButton";
        queryFomCloseButton.innerHTML="Cancel";
        queryFomCloseButton.onclick = function() {
            closeForm();
        };


        queryDiv.appendChild(simpleQueryLabel);

        //Row 1

        var tr1 = document.createElement('tr');
        var td1=document.createElement('td');
        var td2=document.createElement('td');

        td1.appendChild(simpleQueryName);
        tr1.appendChild(td1);
        td2.appendChild(queryNameInput);
        tr1.appendChild(td2);
        tableQueryForm.appendChild(tr1);

        //Row 2

        var tr2 = document.createElement('tr');
        var td3=document.createElement('td');
        var td4=document.createElement('td');

        td3.appendChild(fromStreamLabel);
        tr2.appendChild(td3);
        td4.appendChild(fromStream);
        tr2.appendChild(td4);
        tableQueryForm.appendChild(tr2);

        //Row 3

        var tr3 = document.createElement('tr');
        var td5=document.createElement('td');
        var td6=document.createElement('td');

        td5.appendChild(filterLabel);
        tr3.appendChild(td5);
        td6.appendChild(filterInput);
        tr3.appendChild(td6);
        tableQueryForm.appendChild(tr3);

        //Row 4

        var tr4 = document.createElement('tr');
        var td7=document.createElement('td');

        td7.appendChild(selectLabel);
        tr4.appendChild(td7);
        tableQueryForm.appendChild(tr4);

        //Row 5

        var tr5= document.createElement('tr');
        var td8 = document.createElement('td');
        var td9 = document.createElement('td');
        var td10 = document.createElement('td');

        td8.appendChild(input1);
        tr5.appendChild(td8);
        td9.appendChild(asLabel1);
        tr5.appendChild(td9);
        td10.appendChild(input1Label);
        tr5.appendChild(td10);
        tableQueryForm.appendChild(tr5);

        //Row 6

        var tr6= document.createElement('tr');
        var td11 = document.createElement('td');
        var td12 = document.createElement('td');
        var td13 = document.createElement('td');

        td11.appendChild(input2);
        tr6.appendChild(td11);
        td12.appendChild(asLabel2);
        tr6.appendChild(td12);
        td13.appendChild(input2Label);
        tr6.appendChild(td13);
        tableQueryForm.appendChild(tr6);

        //Row 7

        var tr7= document.createElement('tr');
        var td14 = document.createElement('td');
        var td15 = document.createElement('td');
        var td16 = document.createElement('td');

        td14.appendChild(input3);
        tr7.appendChild(td14);
        td15.appendChild(asLabel3);
        tr7.appendChild(td15);
        td16.appendChild(input3Label);
        tr7.appendChild(td16);
        tableQueryForm.appendChild(tr7);

        //Row 8


        var tr8= document.createElement('tr');
        var td17 = document.createElement('td');
        var td18 = document.createElement('td');

        td17.appendChild(insertIntoLabel);
        tr8.appendChild(td17);
        td18.appendChild(insertIntoStream);
        tr8.appendChild(td18);
        tableQueryForm.appendChild(tr8);

        //Row 9


        var tr9= document.createElement('tr');
        var td19 = document.createElement('td');
        var td20 = document.createElement('td');

        td19.appendChild(queryFomButton);
        tr9.appendChild(td19);
        td20.appendChild(queryFomCloseButton);
        tr9.appendChild(td20);
        tableQueryForm.appendChild(tr9);


        queryDiv.appendChild(tableQueryForm);

        lot.appendChild(queryDiv);

        $(".toolbox-titlex").show();
        $(".panel").show();

    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function closeForm()
    {
        var myNode = document.getElementById("lot");
        var fc = myNode.firstChild;

        while( fc ) {
            myNode.removeChild( fc );
            fc = myNode.firstChild;
        }

        $(".toolbox-titlex").hide();
        $(".panel").hide();

        $("#container").removeClass("disabledbutton");
        $("#toolbox").removeClass("disabledbutton");
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var wqueryDiv;
    var windowQueryLabel, windowQueryName,wqueryNameInput, wfromStreamLabel, wfromStream, wfilterLabel1,wfilterInput1, wselectLabel, winsertIntoLabel, winsertIntoStream;
    var windowLabel, windowInput, wfilterLabel2,wfilterInput2;
    var winput1, winput2, winput3;
    var winput1Label, winput2Label, winput3Label;
    var wqueryFomButton;

    function createWindowQueryForm()
    {
        $("#container").addClass("disabledbutton");
        $("#toolbox").addClass("disabledbutton");
        
        var tableWindowQueryForm = document.createElement('table');
        tableWindowQueryForm.id = "tableWindowQueryForm";
        tableWindowQueryForm.className = "tableWindowQueryForm";

        wqueryDiv=document.createElement("div");
        wqueryDiv.className="wqueryDiv";
        wqueryDiv.id="wqueryDiv";

        windowQueryLabel= document.createElement("label");
        windowQueryLabel.className="windowQueryLabel";
        windowQueryLabel.id="windowQueryLabel";
        windowQueryLabel.innerHTML='Window Query';

        windowQueryName= document.createElement("label");
        windowQueryName.id ="windowQueryName";
        windowQueryName.className ="windowQueryName";
        windowQueryName.innerHTML = "Query name";

        wqueryNameInput= document.createElement("input");
        wqueryNameInput.id = "wqueryNameInput";
        wqueryNameInput.className = "wqueryNameInput";

        wfromStreamLabel= document.createElement("label");
        wfromStreamLabel.className="wfromStreamLabel";
        wfromStreamLabel.id="wfromStreamLabel";
        wfromStreamLabel.innerHTML= "from: ";

        wfromStream= document.createElement("label");
        wfromStream.id ="wfromStream";
        wfromStream.className = "wfromStream";
        wfromStream.innerHTML = "from Stream";

        wfilterLabel1= document.createElement("label");
        wfilterLabel1.className="wfilterLabel1";
        wfilterLabel1.id="wfilterLabel1";
        wfilterLabel1.innerHTML = "Filter 1: ";

        wfilterInput1= document.createElement("input");
        wfilterInput1.id = "wfilterInput1";
        wfilterInput1.className = "wfilterInput1";

        windowLabel= document.createElement("label");
        windowLabel.className="windowLabel";
        windowLabel.id="windowLabel";
        windowLabel.innerHTML = "Window: ";

        windowInput= document.createElement("input");
        windowInput.id = "windowInput";
        windowInput.className = "windowInput";

        wfilterLabel2= document.createElement("label");
        wfilterLabel2.className="wfilterLabel2";
        wfilterLabel2.id="wfilterLabel2";
        wfilterLabel2.innerHTML = "Filter 2: ";

        wfilterInput2= document.createElement("input");
        wfilterInput2.id = "wfilterInput2";
        wfilterInput2.className = "wfilterInput2";

        wselectLabel= document.createElement("label");
        wselectLabel.className="wselectLabel";
        wselectLabel.id="wselectLabel";
        wselectLabel.innerHTML= "Select : ";

        winput1= document.createElement("input");
        winput1.className="winput1";
        winput1.id="winput1";
        winput2= document.createElement("input");
        winput2.className="winput2";
        winput2.id="winput2";
        winput3= document.createElement("input");
        winput3.className="winput3";
        winput3.id="winput3";

        wasLabel1=document.createElement("label");
        wasLabel1.innerHTML=" as ";
        wasLabel2=document.createElement("label");
        wasLabel2.innerHTML=" as ";
        wasLabel3=document.createElement("label");
        wasLabel3.innerHTML=" as ";

        winput1Label=document.createElement("label");
        winput1Label.className="winput1Label";
        winput1Label.id="winput1Label";
        winput1Label.innerHTML="attr1";
        winput2Label=document.createElement("label");
        winput2Label.className="winput2Label";
        winput2Label.id="winput2Label";
        winput2Label.innerHTML="attr2";
        winput3Label=document.createElement("label");
        winput3Label.className="winput3Label";
        winput3Label.id="winput3Label";
        winput3Label.innerHTML="attr3";

        winsertIntoLabel=document.createElement("label");
        winsertIntoLabel.className="winsertIntoLabel";
        winsertIntoLabel.id="winsertIntoLabel";
        winsertIntoLabel.innerHTML="insert into: ";

        winsertIntoStream=document.createElement("label");
        winsertIntoStream.className="winsertIntoStream";
        winsertIntoStream.id="winsertIntoStream";
        winsertIntoStream.innerHTML="into Stream name";

        wqueryFomButton=document.createElement("button");
        wqueryFomButton.type="button";
        wqueryFomButton.className="wqueryFomButton";
        wqueryFomButton.id="wqueryFomButton";
        wqueryFomButton.innerHTML="Submit Query";

        wqueryFomCloseButton=document.createElement("button");
        wqueryFomCloseButton.type="button";
        wqueryFomCloseButton.className="wqueryFomCloseButton";
        wqueryFomCloseButton.id="wqueryFomCloseButton";
        wqueryFomCloseButton.innerHTML="Cancel";
        wqueryFomCloseButton.onclick = function() {
            closeForm();
        };

        wqueryDiv.appendChild(windowQueryLabel);

        //Row 1

        var tr1 = document.createElement('tr');
        var td1=document.createElement('td');
        var td2=document.createElement('td');

        td1.appendChild(windowQueryName);
        tr1.appendChild(td1);
        td2.appendChild(wqueryNameInput);
        tr1.appendChild(td2);
        tableWindowQueryForm.appendChild(tr1);

        //Row 2

        var tr2 = document.createElement('tr');
        var td3=document.createElement('td');
        var td4=document.createElement('td');

        td3.appendChild(wfromStreamLabel);
        tr2.appendChild(td3);
        td4.appendChild(wfromStream);
        tr2.appendChild(td4);
        tableWindowQueryForm.appendChild(tr2);

        //Row 3-1

        var tr31 = document.createElement('tr');
        var td5=document.createElement('td');
        var td6=document.createElement('td');

        td5.appendChild(wfilterLabel1);
        tr31.appendChild(td5);
        td6.appendChild(wfilterInput1);
        tr31.appendChild(td6);
        tableWindowQueryForm.appendChild(tr31);

        //Row 3-2

        var tr32 = document.createElement('tr');
        var td20=document.createElement('td');
        var td21=document.createElement('td');

        td20.appendChild(windowLabel);
        tr32.appendChild(td20);
        td21.appendChild(windowInput);
        tr32.appendChild(td21);
        tableWindowQueryForm.appendChild(tr32);

        //Row 3-3

        var tr33 = document.createElement('tr');
        var td22=document.createElement('td');
        var td23=document.createElement('td');

        td22.appendChild(wfilterLabel2);
        tr33.appendChild(td22);
        td23.appendChild(wfilterInput2);
        tr33.appendChild(td23);
        tableWindowQueryForm.appendChild(tr33);

        //Row 4

        var tr4 = document.createElement('tr');
        var td7=document.createElement('td');

        td7.appendChild(wselectLabel);
        tr4.appendChild(td7);
        tableWindowQueryForm.appendChild(tr4);

        //Row 5

        var tr5= document.createElement('tr');
        var td8 = document.createElement('td');
        var td9 = document.createElement('td');
        var td10 = document.createElement('td');

        td8.appendChild(winput1);
        tr5.appendChild(td8);
        td9.appendChild(wasLabel1);
        tr5.appendChild(td9);
        td10.appendChild(winput1Label);
        tr5.appendChild(td10);
        tableWindowQueryForm.appendChild(tr5);

        //Row 6

        var tr6= document.createElement('tr');
        var td11 = document.createElement('td');
        var td12 = document.createElement('td');
        var td13 = document.createElement('td');

        td11.appendChild(winput2);
        tr6.appendChild(td11);
        td12.appendChild(wasLabel2);
        tr6.appendChild(td12);
        td13.appendChild(winput2Label);
        tr6.appendChild(td13);
        tableWindowQueryForm.appendChild(tr6);

        //Row 7

        var tr7= document.createElement('tr');
        var td14 = document.createElement('td');
        var td15 = document.createElement('td');
        var td16 = document.createElement('td');

        td14.appendChild(winput3);
        tr7.appendChild(td14);
        td15.appendChild(wasLabel3);
        tr7.appendChild(td15);
        td16.appendChild(winput3Label);
        tr7.appendChild(td16);
        tableWindowQueryForm.appendChild(tr7);

        //Row 8


        var tr8= document.createElement('tr');
        var td17 = document.createElement('td');
        var td18 = document.createElement('td');

        td17.appendChild(winsertIntoLabel);
        tr8.appendChild(td17);
        td18.appendChild(winsertIntoStream);
        tr8.appendChild(td18);
        tableWindowQueryForm.appendChild(tr8);

        //Row 9


        var tr9= document.createElement('tr');
        var td19 = document.createElement('td');
        var td20 = document.createElement('td');

        td19.appendChild(wqueryFomButton);
        tr9.appendChild(td19);
        td20.appendChild(wqueryFomCloseButton);
        tr9.appendChild(td20);
        tableWindowQueryForm.appendChild(tr9);


        wqueryDiv.appendChild(tableWindowQueryForm);

        lot.appendChild(wqueryDiv);

        $(".toolbox-titlex").show();
        $(".panel").show();

    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var jqueryDivLeft, jqueryDivRight, jqueryDivAttrMap;


    function createJoinQueryForm()
    {
        $("#container").addClass("disabledbutton");
        $("#toolbox").addClass("disabledbutton");
        
        var tableJoinLeftQueryForm = document.createElement('table');
        tableJoinLeftQueryForm.id = "tableJoinLeftQueryForm";
        tableJoinLeftQueryForm.className = "tableJoinLeftQueryForm";

        var tableJoinRightQueryForm = document.createElement('table');
        tableJoinRightQueryForm.id = "tableJoinRightQueryForm";
        tableJoinRightQueryForm.className = "tableJoinRightQueryForm";

        var tableJoinAttrMapQueryForm = document.createElement('table');
        tableJoinAttrMapQueryForm.id = "tableJoinAttrMapQueryForm";
        tableJoinAttrMapQueryForm.className = "tableJoinAttrMapQueryForm";

        jqueryDiv=document.createElement("div");
        jqueryDiv.className="jqueryDiv";
        jqueryDiv.id="jqueryDiv";

        jqueryDivLeft=document.createElement("div");
        jqueryDivLeft.className="jqueryDivLeft";
        jqueryDivLeft.id="jqueryDivLeft";

        jqueryDivRight=document.createElement("div");
        jqueryDivRight.className="jqueryDivRight";
        jqueryDivRight.id="jqueryDivRight";

        jqueryDivAttrMap=document.createElement("div");
        jqueryDivAttrMap.className="jqueryDivAttrMap";
        jqueryDivAttrMap.id="jqueryDivAttrMap";

        joinQueryLabel= document.createElement("label");
        joinQueryLabel.className="joinQueryLabel";
        joinQueryLabel.id="joinQueryLabel";
        joinQueryLabel.innerHTML='Join Query';

        ///////////////////////////////////////////////////////////////////////
        //Div 1-->

        joinLeftStreamLabel= document.createElement("label");
        joinLeftStreamLabel.className="joinLeftStreamLabel";
        joinLeftStreamLabel.id="joinLeftStreamLabel";
        joinLeftStreamLabel.innerHTML='Left Stream Details';

        leftStreamLabel= document.createElement("label");
        leftStreamLabel.className="leftStreamLabel";
        leftStreamLabel.id="leftStreamLabel";
        leftStreamLabel.innerHTML='Left Stream: ';

        leftStreamDropdown= document.createElement("div");
        leftStreamDropdown.id = "leftStreamDropdown";
        leftStreamDropdown.className = "leftStreamDropdown";

        var leftStreamOpt = '<select id="leftStreamCombo">', leftStreamOptions = leftStreamGenerate(), i;
        for(i = 0; i < leftStreamOptions.length; i++) {
            leftStreamOpt += "<option value='"+leftStreamOptions[i]+"'>"+leftStreamOptions[i]+"</option>";
        }
        leftStreamOpt += '</select>';
        leftStreamDropdown.innerHTML = leftStreamOpt;
        
        jfilterLabel1= document.createElement("label");
        jfilterLabel1.className="jfilterLabel1";
        jfilterLabel1.id="jfilterLabel1";
        jfilterLabel1.innerHTML = "Filter 1: ";

        jfilterInput1= document.createElement("input");
        jfilterInput1.id = "jfilterInput1";
        jfilterInput1.className = "jfilterInput1";

        jwindowLabel= document.createElement("label");
        jwindowLabel.className="jwindowLabel";
        jwindowLabel.id="jwindowLabel";
        jwindowLabel.innerHTML = "Window: ";

        jwindowInput= document.createElement("input");
        jwindowInput.id = "jwindowInput";
        jwindowInput.className = "jwindowInput";

        jfilterLabel2= document.createElement("label");
        jfilterLabel2.className="jfilterLabel2";
        jfilterLabel2.id="jfilterLabel2";
        jfilterLabel2.innerHTML = "Filter 2: ";

        jfilterInput2= document.createElement("input");
        jfilterInput2.id = "jfilterInput2";
        jfilterInput2.className = "jfilterInput2";

        ///////////////////////////////////////////////////////////////////////
        //Div 2-->

        joinRightStreamLabel= document.createElement("label");
        joinRightStreamLabel.className="joinRightStreamLabel";
        joinRightStreamLabel.id="joinRightStreamLabel";
        joinRightStreamLabel.innerHTML='Right Stream Details';

        rightStreamLabel= document.createElement("label");
        rightStreamLabel.className="rightStreamLabel";
        rightStreamLabel.id="rightStreamLabel";
        rightStreamLabel.innerHTML='Right Stream: ';

        rightStreamDropdown= document.createElement("div");
        rightStreamDropdown.id = "rightStreamDropdown";
        rightStreamDropdown.className = "rightStreamDropdown";

        var rightStreamOpt = '<select id="rightStreamCombo">', rightStreamOptions = leftStreamGenerate(), i;
        for(i = 0; i < rightStreamOptions.length; i++) {
            rightStreamOpt += "<option value='"+rightStreamOptions[i]+"'>"+rightStreamOptions[i]+"</option>";
        }
        rightStreamOpt += '</select>';
        rightStreamDropdown.innerHTML = rightStreamOpt;

        jrfilterLabel1= document.createElement("label");
        jrfilterLabel1.className="jrfilterLabel1";
        jrfilterLabel1.id="jrfilterLabel1";
        jrfilterLabel1.innerHTML = "Filter 1: ";

        jrfilterInput1= document.createElement("input");
        jrfilterInput1.id = "jrfilterInput1";
        jrfilterInput1.className = "jrfilterInput1";

        jrwindowLabel= document.createElement("label");
        jrwindowLabel.className="jrwindowLabel";
        jrwindowLabel.id="jrwindowLabel";
        jrwindowLabel.innerHTML = "Window: ";

        jrwindowInput= document.createElement("input");
        jrwindowInput.id = "jrwindowInput";
        jrwindowInput.className = "jrwindowInput";

        jrfilterLabel2= document.createElement("label");
        jrfilterLabel2.className="jrfilterLabel2";
        jrfilterLabel2.id="jrfilterLabel2";
        jrfilterLabel2.innerHTML = "Filter 2: ";

        jrfilterInput2= document.createElement("input");
        jrfilterInput2.id = "jrfilterInput2";
        jrfilterInput2.className = "jrfilterInput2";

        ///////////////////////////////////////////////////////////////////////
        //Div 3-->

        jselectLabel= document.createElement("label");
        jselectLabel.className="jselectLabel";
        jselectLabel.id="jselectLabel";
        jselectLabel.innerHTML= "Select : ";

        jinput1= document.createElement("input");
        jinput1.className="jinput1";
        jinput1.id="jinput1";
        jinput2= document.createElement("input");
        jinput2.className="jinput2";
        jinput2.id="jinput2";
        jinput3= document.createElement("input");
        jinput3.className="jinput3";
        jinput3.id="jinput3";
        jinput4= document.createElement("input");
        jinput4.className="jinput4";
        jinput4.id="jinput4";
        jinput5= document.createElement("input");
        jinput5.className="jinput5";
        jinput5.id="jinput5";
        jinput6= document.createElement("input");
        jinput6.className="jinput6";
        jinput6.id="jinput6";

        jasLabel1=document.createElement("label");
        jasLabel1.innerHTML=" as ";
        jasLabel2=document.createElement("label");
        jasLabel2.innerHTML=" as ";
        jasLabel3=document.createElement("label");
        jasLabel3.innerHTML=" as ";
        jasLabel4=document.createElement("label");
        jasLabel4.innerHTML=" as ";
        jasLabel5=document.createElement("label");
        jasLabel5.innerHTML=" as ";
        jasLabel6=document.createElement("label");
        jasLabel6.innerHTML=" as ";

        jinput1Label=document.createElement("label");
        jinput1Label.className="jinput1Label";
        jinput1Label.id="jinput1Label";
        jinput1Label.innerHTML="attr1";
        jinput2Label=document.createElement("label");
        jinput2Label.className="jinput2Label";
        jinput2Label.id="jinput2Label";
        jinput2Label.innerHTML="attr2";
        jinput3Label=document.createElement("label");
        jinput3Label.className="jinput3Label";
        jinput3Label.id="jinput3Label";
        jinput3Label.innerHTML="attr3";
        jinput4Label=document.createElement("label");
        jinput4Label.className="jinput4Label";
        jinput4Label.id="jinput4Label";
        jinput4Label.innerHTML="attr4";
        jinput5Label=document.createElement("label");
        jinput5Label.className="jinput5Label";
        jinput5Label.id="jinput5Label";
        jinput5Label.innerHTML="attr5";
        jinput6Label=document.createElement("label");
        jinput6Label.className="jinput6Label";
        jinput6Label.id="jinput6Label";
        jinput6Label.innerHTML="attr6";

        winsertIntoLabel=document.createElement("label");
        winsertIntoLabel.className="winsertIntoLabel";
        winsertIntoLabel.id="winsertIntoLabel";
        winsertIntoLabel.innerHTML="insert into: ";

        winsertIntoStream=document.createElement("label");
        winsertIntoStream.className="winsertIntoStream";
        winsertIntoStream.id="winsertIntoStream";
        winsertIntoStream.innerHTML="into Stream name";

        ///////////////////////////////////////////////////////////////////////

        jqueryFomButton=document.createElement("button");
        jqueryFomButton.type="button";
        jqueryFomButton.className="jqueryFomButton";
        jqueryFomButton.id="jqueryFomButton";
        jqueryFomButton.innerHTML="Submit Query";

        jqueryFomCloseButton=document.createElement("button");
        jqueryFomCloseButton.type="button";
        jqueryFomCloseButton.className="jqueryFomCloseButton";
        jqueryFomCloseButton.id="jqueryFomCloseButton";
        jqueryFomCloseButton.innerHTML="Cancel";
        jqueryFomCloseButton.onclick = function() {
            closeForm();
        };


        jqueryDiv.appendChild(joinQueryLabel);

        ///////////////////////////////////////////////////////////////////////
        //Div 1 Table

        //Row 1

        var tr1 = document.createElement('tr');
        var td1=document.createElement('td');

        td1.appendChild(joinLeftStreamLabel);
        tr1.appendChild(td1);
        tableJoinLeftQueryForm.appendChild(tr1);

        //Row 2

        var tr2 = document.createElement('tr');
        var td2=document.createElement('td');
        var td3=document.createElement('td');

        td2.appendChild(leftStreamLabel);
        tr2.appendChild(td2);
        td3.appendChild(leftStreamDropdown);
        tr2.appendChild(td3);
        tableJoinLeftQueryForm.appendChild(tr2);

        //Row 3

        var tr3 = document.createElement('tr');
        var td4=document.createElement('td');
        var td5=document.createElement('td');

        td4.appendChild(jfilterLabel1);
        tr3.appendChild(td4);
        td5.appendChild(jfilterInput1);
        tr3.appendChild(td5);
        tableJoinLeftQueryForm.appendChild(tr3);

        //Row 4

        var tr4 = document.createElement('tr');
        var td6=document.createElement('td');
        var td7=document.createElement('td');

        td6.appendChild(jwindowLabel);
        tr4.appendChild(td6);
        td7.appendChild(jwindowInput);
        tr4.appendChild(td7);
        tableJoinLeftQueryForm.appendChild(tr4);

        //Row 5

        var tr5 = document.createElement('tr');
        var td8=document.createElement('td');
        var td9=document.createElement('td');

        td8.appendChild(jfilterLabel2);
        tr5.appendChild(td8);
        td9.appendChild(jfilterInput2);
        tr5.appendChild(td9);
        tableJoinLeftQueryForm.appendChild(tr5);

        jqueryDivLeft.appendChild(tableJoinLeftQueryForm);

        ///////////////////////////////////////////////////////////////////////
        //Div 2 Table

        //Row 11

        var tr11 = document.createElement('tr');
        var td19=document.createElement('td');

        td19.appendChild(joinRightStreamLabel);
        tr11.appendChild(td19);
        tableJoinRightQueryForm.appendChild(tr11);
        
        //Row 6

        var tr6 = document.createElement('tr');
        var td10=document.createElement('td');

        td10.appendChild(joinRightStreamLabel);
        tr6.appendChild(td10);
        tableJoinRightQueryForm.appendChild(tr6);

        //Row 7

        var tr7 = document.createElement('tr');
        var td11=document.createElement('td');
        var td12=document.createElement('td');

        td11.appendChild(rightStreamLabel);
        tr7.appendChild(td11);
        td12.appendChild(rightStreamDropdown);
        tr7.appendChild(td12);
        tableJoinRightQueryForm.appendChild(tr7);

        //Row 8

        var tr8 = document.createElement('tr');
        var td13=document.createElement('td');
        var td14=document.createElement('td');

        td13.appendChild(jrfilterLabel1);
        tr8.appendChild(td13);
        td14.appendChild(jrfilterInput1);
        tr8.appendChild(td14);
        tableJoinRightQueryForm.appendChild(tr8);

        //Row 9

        var tr9 = document.createElement('tr');
        var td15=document.createElement('td');
        var td16=document.createElement('td');

        td15.appendChild(jrwindowLabel);
        tr9.appendChild(td15);
        td16.appendChild(jrwindowInput);
        tr9.appendChild(td16);
        tableJoinRightQueryForm.appendChild(tr9);

        //Row 10

        var tr10 = document.createElement('tr');
        var td17=document.createElement('td');
        var td18=document.createElement('td');

        td17.appendChild(jrfilterLabel2);
        tr10.appendChild(td17);
        td18.appendChild(jrfilterInput2);
        tr10.appendChild(td18);
        tableJoinRightQueryForm.appendChild(tr10);

        jqueryDivRight.appendChild(tableJoinRightQueryForm);
        
        ///////////////////////////////////////////////////////////////////////
        //Div 3 Table

        //Row 12

        var tr12 = document.createElement('tr');
        var td20=document.createElement('td');
        var td21=document.createElement('td');
        var td22=document.createElement('td');

        td20.appendChild(jinput1);
        tr12.appendChild(td20);
        td21.appendChild(jasLabel1);
        tr12.appendChild(td21);
        td22.appendChild(jinput1Label);
        tr12.appendChild(td22);
        tableJoinAttrMapQueryForm.appendChild(tr12);

        //Row 13

        var tr13 = document.createElement('tr');
        var td23=document.createElement('td');
        var td24=document.createElement('td');
        var td25=document.createElement('td');

        td23.appendChild(jinput2);
        tr13.appendChild(td23);
        td24.appendChild(jasLabel2);
        tr13.appendChild(td24);
        td25.appendChild(jinput2Label);
        tr13.appendChild(td25);
        tableJoinAttrMapQueryForm.appendChild(tr13);

        //Row 14

        var tr14 = document.createElement('tr');
        var td26=document.createElement('td');
        var td27=document.createElement('td');
        var td28=document.createElement('td');

        td26.appendChild(jinput3);
        tr14.appendChild(td26);
        td27.appendChild(jasLabel3);
        tr14.appendChild(td27);
        td28.appendChild(jinput3Label);
        tr14.appendChild(td28);
        tableJoinAttrMapQueryForm.appendChild(tr14);

        //Row 15

        var tr15 = document.createElement('tr');
        var td29=document.createElement('td');
        var td30=document.createElement('td');
        var td31=document.createElement('td');

        td29.appendChild(jinput4);
        tr15.appendChild(td29);
        td30.appendChild(jasLabel4);
        tr15.appendChild(td30);
        td31.appendChild(jinput4Label);
        tr15.appendChild(td31);
        tableJoinAttrMapQueryForm.appendChild(tr15);

        //Row 16

        var tr16 = document.createElement('tr');
        var td32=document.createElement('td');
        var td33=document.createElement('td');
        var td34=document.createElement('td');

        td32.appendChild(jinput5);
        tr16.appendChild(td32);
        td33.appendChild(jasLabel5);
        tr16.appendChild(td33);
        td34.appendChild(jinput5Label);
        tr16.appendChild(td34);
        tableJoinAttrMapQueryForm.appendChild(tr16);

        //Row 17

        var tr17 = document.createElement('tr');
        var td35=document.createElement('td');
        var td36=document.createElement('td');
        var td37=document.createElement('td');

        td35.appendChild(jinput6);
        tr17.appendChild(td35);
        td36.appendChild(jasLabel6);
        tr17.appendChild(td36);
        td37.appendChild(jinput6Label);
        tr17.appendChild(td37);
        tableJoinAttrMapQueryForm.appendChild(tr17);
        
        //Row 18

        var tr18= document.createElement('tr');
        var td38 = document.createElement('td');
        var td39 = document.createElement('td');

        td38.appendChild(winsertIntoLabel);
        tr18.appendChild(td38);
        td39.appendChild(winsertIntoStream);
        tr18.appendChild(td39);
        tableJoinAttrMapQueryForm.appendChild(tr18);

        jqueryDivAttrMap.appendChild(tableJoinAttrMapQueryForm);

        var tr20= document.createElement('tr');
        var td41 = document.createElement('td');
        var td42 = document.createElement('td');

        td41.appendChild(jqueryFomButton);
        tr20.appendChild(td41);
        td42.appendChild(jqueryFomCloseButton);
        tr20.appendChild(td42);
        
        jqueryDiv.appendChild(jqueryDivLeft);
        jqueryDiv.appendChild(jqueryDivRight);
        jqueryDiv.appendChild(jqueryDivAttrMap);
        jqueryDiv.appendChild(tr20);

        lot.appendChild(jqueryDiv);

        $(".toolbox-titlex").show();
        $(".panel").show();

    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /**
     * @function Generate the Streams to be selected when a Join query's left and right join streams are selected
     * @returns {Array}
     */
    
    function leftStreamGenerate() {
        var StreamArray = new Array();
        StreamArray[0] = "Stream1";
        StreamArray[1] = "Stream2";
        return StreamArray;
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////








































