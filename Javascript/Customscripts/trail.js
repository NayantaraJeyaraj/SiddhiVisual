    /**
     * Created by nayantara on 6/22/16.
     */

    //TODO Load complete Json output after edition
    /**
     * @description Global variable declarations
     * @type {number}
     */

    // i --> newAgent ID (Dropped Element ID)
    var i = 1;

    //droptype --> Type of query being dropped on the canvas (e.g. droptype = "squerydrop";)
    var droptype;

    // finalElementCount --> Number of elements that exist on the canvas at the time of saving the model
    var finalElementCount=0;

    /**
     * @description jsPlumb function opened
     */

    jsPlumb.ready(function() {
        
        // jsPlumb.Defaults.Container = $("#container");
        jsPlumb.Defaults.PaintStyle = {strokeStyle: "palevioletred", lineWidth: 2, dashstyle: '3 3'}; //Connector line style
        jsPlumb.Defaults.EndpointStyle = {radius: 7, fillStyle: "palevioletred"}; //Connector endpoint/anchor style
        jsPlumb.importDefaults({Connector: ["Bezier", {curviness: 50}]}); //Connector line style
        jsPlumb.setContainer($('#container'));

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
         * @function draggable method for the 'window' tool
         * @helper clone
         */

        $(".wstream").draggable
        ({
            helper: 'clone',
            cursor: 'pointer',
            tolerance: 'fit',
            revert: true
        });

        /**
         * @function draggable method for the 'Pass through query' tool
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
         * @function draggable method for the 'Filter query' tool
         * @helper clone
         */

        $(".filter").draggable
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
         * @function draggable method for the 'Join query' tool
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
         * @function draggable method for the 'Partition' tool
         * @helper clone
         */

        $(".partition").draggable
        ({
            helper: 'clone',
            cursor: 'pointer',
            tolerance: 'fit',
            revert: true

        });

        /**
         * @function droppable method for the 'stream' & the 'query' objects
         */

        $("#container").droppable
        ({
            accept: '.stream, .wstream , .squery, .filter, .wquery, .joquery, .stquery , .partition',
            containment: 'container',

            /**
             *
             * @param e --> original event object fired/ normalized by jQuery
             * @param ui --> object that contains additional info added by jQuery depending on which interaction was used
             * @helper clone
             */

            //Todo Suggested @codeReview 
                // 1. js-tooling-framework  
                // 2. All elements on the canvas should be of the same type(.svg/html5)    
                // 3. Angular schema forms for the form designs    
                // 4. Disable a stream as soon as it's dropped
            
            drop: function (e, ui) {
                
                //mouseTop, mouseLeft - To retrieve the mouse position at the time of drop so that the elements can be placed at the same spot
                var mouseTop = e.pageX;
                var mouseLeft = e.pageY;

                var dropElem = ui.draggable.attr('class');
                //Clone the element in the toolbox in order to drop the clone on the canvas
                droppedElement = ui.helper.clone();
                //To further manipulate the jsplumb element, remove the jquery UI clone helper as jsPlumb doesn't support it
                ui.helper.remove();
                $(droppedElement).removeAttr("class");
                $(droppedElement).draggable({containment: "container"});
                //Repaint to reposition all the elements that are on the canvas after the drop/addition of a new element on the canvas
                jsPlumb.repaint(ui.helper);

                //If the dropped Element is a Stream then->
                if (dropElem == "stream ui-draggable") {
                    var newAgent = $('<div>').attr('id', i).addClass('streamdrop');
                    $("#container").addClass("disabledbutton");
                    $("#toolbox").addClass("disabledbutton");

                    /*Create a stream form where the user can set whether the dropped element is an Import/Export/defined stream
                      Element is not dropped on the canvas before the data is entered in the form as the user shouldn't be able to manipulate the
                    Stream element before it has been initialized*/

                    createStreamForm(newAgent, i, e,mouseTop,mouseLeft);
                    i++;
                    finalElementCount=i;
                }

                //If the dropped Element is a Window(not window query) then->
                else if (dropElem == "wstream ui-draggable") {
                    var newAgent = $('<div>').attr('id', i).addClass('wstreamdrop');
                    //Drop the element instantly since its attributes will be set only when the user requires it
                    dropWindowStream(newAgent, i, e,mouseTop,mouseLeft,"Window");
                    i++;
                    finalElementCount=i;
                }
                    
                //If the dropped Element is a Pass through Query then->
                else if (dropElem == "squery ui-draggable") {
                    var newAgent = $('<div>').attr('id', i).addClass('squerydrop');
                    droptype = "squerydrop";
                    dropQuery(newAgent, i, e,droptype,mouseTop,mouseLeft,"Empty Query");
                    i++;
                    finalElementCount=i;
                }

                //If the dropped Element is a Filter query then->
                else if (dropElem == "filter ui-draggable") {
                    var newAgent = $('<div>').attr('id', i).addClass('filterdrop');
                    droptype = "filterdrop";
                    dropQuery(newAgent, i, e,droptype,mouseTop,mouseLeft,"Empty Query");
                    i++;
                    finalElementCount=i;
                }

                //If the dropped Element is a Window Query then->
                else if (dropElem == "wquery ui-draggable") {
                    var newAgent = $('<div>').attr('id', i).addClass('wquerydrop');
                    droptype = "wquerydrop";
                    dropQuery(newAgent, i, e, droptype,mouseTop,mouseLeft,"Empty Query");
                    i++;
                    finalElementCount=i;
                }

                //If the dropped Element is a Join Query then->
                else if (dropElem == "joquery ui-draggable") {
                    var newAgent = $('<div>').attr('id', i).addClass('joquerydrop');
                    droptype = "joquerydrop";
                    dropQuery(newAgent, i, e, droptype,mouseTop,mouseLeft,"Empty Query");
                    i++;
                    finalElementCount=i;
                }

                //If the dropped Element is a State machine Query(Pattern and Sequence) then->
                else if(dropElem == "stquery ui-draggable") {
                    var newAgent = $('<div>').attr('id', i).addClass('stquerydrop');
                    droptype = "stquerydrop";
                    dropQuery(newAgent, i, e, droptype,mouseTop,mouseLeft,"Empty Query");
                    i++;
                    finalElementCount=i;
                }

                //If the dropped Element is a Partition then->
                else{
                    var newAgent = $('<div>').attr('id', i).addClass('partitiondrop');
                    droptype = "partitiondrop";
                    $(droppedElement).draggable({containment: "container"});
                    dropPartition(newAgent,i,e,droptype);
                    //Todo: Issues in dragging + resizing a partition at the same time.
                    /*Hence, for now, the partition can be dragged and dropped onto the canvas but after that it cannot be dragged within the canvas.
                     It can only be resized and the other elements need to be repositioned as desired
                     Solutions:
                            1. JsPlumb library's Drag + Resize
                            2. Interact.js Drag + Resize
                      But, these implement either one functionality and not both, simultaneously*/

                    // resizePartition(newAgent);
                    // enableDrag(newAgent);
                    i++;
                    finalElementCount=i;
                }
                /*
                @function Delete an element detaching all its connections when the 'boxclose' icon is clicked
                 */
                newAgent.on('click', '.boxclose', function (e) {

                    jsPlumb.detachAllConnections(newAgent.attr('id'));
                    jsPlumb.removeAllEndpoints($(this));
                    jsPlumb.detach($(this));
                    $(newAgent).remove();
                });
                newAgent.on('click', '.boxclosewindow', function (e) {

                    jsPlumb.detachAllConnections(newAgent.attr('id'));
                    jsPlumb.removeAllEndpoints($(this));
                    jsPlumb.detach($(this));
                    $(newAgent).remove();
                });
                newAgent.on('click', '.boxclose1', function (e) {

                    jsPlumb.detachAllConnections(newAgent.attr('id'));
                    jsPlumb.removeAllEndpoints($(this));
                    jsPlumb.detach($(this));
                    $(newAgent).remove();
                });
            }
        });

        //Display the model in Json format in the text area
        $('#saveButton').click(function(){
            saveFlowchart();
        });

        //Export the generated Json output as a text file for storage purposes
        $('#exportButton').click(function(){
            exportFlowChart();
        });

        //Recreate the model based on the Json output provided
        $('#loadButton').click(function(e){
            loadFlowchart(e);
        });
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @function Display info of all the elements dropped on the canvas
     * @jsonOutput
     */

    function saveFlowchart(){
        //node - Array that stores the element related information as objects
        var node = [];
        //matches - Array that stores element IDs of elements that exist on te canvas
        var matches = [];
        /*attrArray - Array that stores the attributes of an element
          Since there maybe multiple attributes for a single element, they need to be related to the element.
          Hence, attrArray is an array within the 'node' array's 'attributes' object*/
        var attrArray = [];
        /*states - Array that stores the different states of a state machine query element
         Since there maybe multiple states for a single element, they need to be related to the element.
         Hence, states is an array within the 'node' array's 'states' object*/
        var states = [];
        //totalElementCount - Number of elements at the time of saving the json for the model
        var totalElementCount=0;
        //Get the element IDs of all the elements existing on the canvas
        var searchEles = document.getElementById("container").children;
        for(var i = 0; i < searchEles.length; i++)
        {
            matches.push(searchEles[i]);
            var idOfEl = searchEles[i].id;
            totalElementCount=idOfEl;
    
            if(searchEles[i].id !=null || searchEles[i].id !="")
            {
                var $element = $("#" + searchEles[i].id);
                var dropElem = $("#" + searchEles[i].id).attr('class');
    
                var position = $element.position();

                var elId = parseInt(idOfEl);

                //If the element is a stream
                if (dropElem == "streamdrop ui-draggable")
                {
                    position.bottom = position.top + $element.height();
                    position.right = position.left + $element.width();

                    /*Check whether the stream is an import, export or a defined stream by checking whether the ID exists in the
                      createdImportStreamArray, createdExportStreamArray or the createdDefinedStreamArray
                      Loop through 100 as these arrays have been initialized to hold 100 records where non-existent element records may be null.
                      Since these were intermediate storage points, objects werent created and arrays were used instead.
                     */
                    for (var count = 0; count < 100; count++) {
                        if (createdImportStreamArray[count][0] == idOfEl) {
                            node.push({
                                id: idOfEl,
                                class: dropElem,
                                position:
                                {
                                    top: position.top,
                                    left: position.left,
                                    bottom: position.bottom,
                                    right: position.right
                                },
                                predefinedStream: createdImportStreamArray[count][1],
                                name: createdImportStreamArray[count][2],
                                kind: "import"
                            });

                        }
                        else if (createdExportStreamArray[count][0] == idOfEl) {
                            node.push({
                                id: idOfEl,
                                class: dropElem,
                                position:
                                {
                                    top: position.top,
                                    left: position.left,
                                    bottom: position.bottom,
                                    right: position.right
                                },
                                predefinedStream: createdExportStreamArray[count][1],
                                name: createdExportStreamArray[count][2],
                                kind: "export"
                            });
                        }
                        else if (createdDefinedStreamArray[count][0] == idOfEl) {
                            var attrNum = createdDefinedStreamArray[count][4];

                            for (var f = 0; f < attrNum-1; f++) {

                                //Loop through the attribute list to retrieve them and store them in attrArray
                                attrArray.push({
                                        attributeName: createdDefinedStreamArray[count][2][f][0],
                                        attributeType: createdDefinedStreamArray[count][2][f][1]
                                });
                            }

                            node.push({
                                id: idOfEl,
                                class: dropElem,
                                position:
                                {
                                    top: position.top,
                                    left: position.left,
                                    bottom: position.bottom,
                                    right: position.right
                                },
                                name: createdDefinedStreamArray[count][1],
                                numberOfAttributes: createdDefinedStreamArray[count][4] - 1,
                                kind: "defined",
                                attributes:attrArray
                            });
                            // console.log(node);
                        }
                    }
                }

                else if (dropElem == "wstreamdrop ui-draggable")
                {
                    position.bottom = position.top + $element.height();
                    position.right = position.left + $element.width();
                    var fromStream = createdWindowStreamArray[idOfEl][2];

                    var attrNum = createdDefinedStreamArray[idOfEl][4];
                    for (var f = 0; f < attrNum; f++) {
                        attrArray.push({
                                        attrname: createdWindowStreamArray[idOfEl][4][f][0],
                                        attrType: createdWindowStreamArray[idOfEl][4][f][1]
                               });
                    }
                    //If the window is defined by the user and not derived from a stream
                    if(fromStream == null)
                    {
                        node.push({
                            id: idOfEl,
                            class: dropElem,
                            position:
                            {
                                top: position.top,
                                left: position.left,
                                bottom: position.bottom,
                                right: position.right
                            },
                            name: createdWindowStreamArray[idOfEl][1],
                            kind: "defined window",
                            attributes: attrArray
                        });
                    }

                    //If the window is derived from a stream
                    else
                    {
                        node.push({
                            id: idOfEl,
                            class: dropElem,
                            position:
                            {
                                top: position.top,
                                left: position.left,
                                bottom: position.bottom,
                                right: position.right
                            },
                            name: createdWindowStreamArray[idOfEl][1],
                            fromStreamIndex: createdWindowStreamArray[idOfEl][2],
                            fromStreamName: createdWindowStreamArray[idOfEl][3],
                            kind: "derived window"
                        });
                    }
                }

                else if (dropElem=="squerydrop ui-draggable")
                {
                    position.bottom = position.top + $element.height();
                    position.right = position.left + $element.width();
                    // var arrlen = createdSimpleQueryArray[elId][4].length;

                    for(var ct=0;ct<createdSimpleQueryArray[elId][4].length;ct++)
                    {
                        attrArray.push({
                            attrName:createdSimpleQueryArray[elId][4][ct][0],
                            attrType:createdSimpleQueryArray[elId][4][ct][1]
                        });
                    }

                    node.push({
                        id:idOfEl,
                        class:dropElem,
                        position:
                        {
                            top: position.top,
                            left: position.left,
                            bottom: position.bottom,
                            right: position.right
                        },
                        name:createdSimpleQueryArray[elId][1],
                        fromStream:
                        {
                            index:createdSimpleQueryArray[elId][2][0],
                            name:createdSimpleQueryArray[elId][2][1]
                        },
                        filter:createdSimpleQueryArray[elId][3],
                        attributes: attrArray,
                        intoStream:
                        {
                            index:createdSimpleQueryArray[elId][5][0],
                            name:createdSimpleQueryArray[elId][5][1]
                        }
                    });
                }

                else if (dropElem=="filterdrop ui-draggable")
                {
                    position.bottom = position.top + $element.height();
                    position.right = position.left + $element.width();
                    // var arrlen = createdSimpleQueryArray[elId][4].length;

                    for(var ct=0;ct<createdSimpleQueryArray[elId][4].length;ct++)
                    {
                        attrArray.push({
                            attrName:createdSimpleQueryArray[elId][4][ct][0],
                            attrType:createdSimpleQueryArray[elId][4][ct][1]
                        });
                    }

                    node.push({
                        id:idOfEl,
                        class:dropElem,
                        position:
                        {
                            top: position.top,
                            left: position.left,
                            bottom: position.bottom,
                            right: position.right
                        },
                        name:createdPassThroughQueryArray[elId][1],
                        fromStream:
                        {
                            index:createdPassThroughQueryArray[elId][2][0],
                            name:createdPassThroughQueryArray[elId][2][1]
                        },
                        filter:createdPassThroughQueryArray[elId][3],
                        attributes: attrArray,
                        intoStream:
                        {
                            index:createdPassThroughQueryArray[elId][5][0],
                            name:createdPassThroughQueryArray[elId][5][1]
                        }
                    });
                }
                else if (dropElem=="wquerydrop ui-draggable")
                {
                    position.bottom = position.top + $element.height();
                    position.right = position.left + $element.width();

                    for(var ct=0;ct<createdWindowQueryArray[elId][6].length;ct++)
                    {
                        attrArray.push({
                            attrName:createdWindowQueryArray[elId][6][ct][0],
                            attrType:createdWindowQueryArray[elId][6][ct][1]
                        });
                    }
    
                    node.push({
                        id:idOfEl,
                        class:dropElem,
                        position:
                        {
                            top:position.top,
                            left: position.left,
                            bottom: position.bottom,
                            right: position.right
                        },
                        name:createdWindowQueryArray[elId][1],
                        fromStream:
                        {
                            index:createdWindowQueryArray[elId][2][0],
                            name:createdWindowQueryArray[elId][2][1]
                        },
                        filter1:createdWindowQueryArray[elId][3],
                        window:createdWindowQueryArray[elId][4],
                        filter2:createdWindowQueryArray[elId][5],
                        attributes:attrArray,
                        intoStream:
                        {
                            index:createdWindowQueryArray[elId][7][0],
                            name:createdWindowQueryArray[elId][7][1]
                        }
                    });
    

                }
    
                else if (dropElem=="joquerydrop ui-draggable")
                {
                    position.bottom = position.top + $element.height();
                    position.right = position.left + $element.width();

                    for(var ct=0;ct<createdJoinQueryArray[elId][4].length;ct++)
                    {
                        attrArray.push({
                            attrName:createdJoinQueryArray[elId][4][ct][0],
                            attrType:createdJoinQueryArray[elId][4][ct][1]
                        });
                    }
    
                    node.push({
                        id: idOfEl,
                        class: dropElem,
                        position: {
                            top: position.top,
                            left: position.left,
                            bottom: position.bottom,
                            right: position.right
                        },
                        name: createdJoinQueryArray[elId][1],
                        leftStream: {
                            name: createdJoinQueryArray[elId][2][0],
                            filter1: createdJoinQueryArray[elId][2][1],
                            window: createdJoinQueryArray[elId][2][2],
                            filter2: createdJoinQueryArray[elId][2][3]
                        },
                        rightStream:
                        {
                            name:createdJoinQueryArray[elId][3][0],
                            filter1:createdJoinQueryArray[elId][3][1],
                            window:createdJoinQueryArray[elId][3][2],
                            filter2:createdJoinQueryArray[elId][3][3]
                        },
                        attributes:attrArray,
                        intoStreamName:createdJoinQueryArray[elId][5]
                    });
                }
    
                else if(dropElem=="stquerydrop ui-draggable")
                {
                    position.bottom = position.top + $element.height();
                    position.right = position.left + $element.width();

                    for(var rec=0;rec<createdStateMachineQueryArray[elId][2].length;rec++)
                    {
                        states.push({
                            stateId:createdStateMachineQueryArray[elId][2][rec][0],
                            stateSelectedStream:createdStateMachineQueryArray[elId][2][rec][1],
                            stateFilter:createdStateMachineQueryArray[elId][2][rec][2]
                        });
                    }

                    for(var lp=0;lp<createdStateMachineQueryArray[elId][4].length;lp++)
                    {
                        attrArray.push({
                            attrName:createdStateMachineQueryArray[elId][4][lp][0],
                            attrType:createdStateMachineQueryArray[elId][4][lp][1]
                        });
                    }
    
                    node.push({
                        id: idOfEl,
                        class: dropElem,
                        position: {
                            top: position.top,
                            left: position.left,
                            bottom: position.bottom,
                            right: position.right
                        },
                        name: createdStateMachineQueryArray[elId][1],
                        processLogic:createdStateMachineQueryArray[elId][3],
                        intoStreamName:createdStateMachineQueryArray[elId][5],
                        state:states,
                        attributes:attrArray
                    });
                }
    
                else if(dropElem=="partitiondrop ui-draggable")
                {
                    position.bottom = position.top + $element.height();
                    position.right = position.left + $element.width();

                    for(var rec=0;rec<createdPartitionConditionArray[elId][2].length;rec++)
                    {
                        attrArray.push({
                            attrName:createdPartitionConditionArray[elId][2][rec][0],
                            attrType:createdPartitionConditionArray[elId][2][rec][1]
                        });
                    }

                    node.push({
                        id: createdPartitionConditionArray[elId][0],
                        partitionName: createdPartitionConditionArray[elId][1],
                        type: createdPartitionConditionArray[elId][3],
                        numberOfConditions: createdPartitionConditionArray[elId][4],
                        subPartitionConditionId: createdPartitionConditionArray[elId][5],
                        attributes:attrArray
                    });
                    
                    
                }
            }

        }

        //connections - Array that stores all connection related info. This is handled by jsPlumb's 'getConnections() method and not done manually
        var connections = [];
        $.each(jsPlumb.getConnections(), function (idx, connection) {
            connections.push({
                connectionId: connection.id,
                pageSourceId: connection.sourceId,
                pageTargetId: connection.targetId
            });
        });
        
        var flowChart = {};
        flowChart.node =node;
        flowChart.connections = connections;

        var flowChartJson = JSON.stringify(flowChart);
        //console.log(flowChartJson);

        $('#jsonOutput').val(flowChartJson);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @description Method to export and download the generated json output as a text file
     */

    function exportFlowChart()
    {
        var textToSave = document.getElementById("jsonOutput").value;
        var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
        var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
        var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;

        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        downloadLink.href = textToSaveAsURL;
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);

        downloadLink.click();
        document.getElementById("inputFileNameToSaveAs").value ='';
        
    }

    function destroyClickedElement(event)
    {
        document.body.removeChild(event.target);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @function Method to load a previously saved model
     * @description After saving the elements even if they are deleted or distorted, loading the model will restore the last saved version
     */
    
    function loadFlowchart(e) {
        
        var flowChartJson = $('#jsonOutput').val();
        var flowChart = JSON.parse(flowChartJson);
        
        var node = flowChart.node;
        $.each(node, function( index, elem ) {
            
            var id = elem.id;
            var classes = elem.class;
            var kind= elem.kind;
            var top = elem.position.top;
            var bottom = elem.position.bottom;
            var left = elem.position.left;
            var right = elem.position.right;
            // alert("elem id: "+id+"\nclass:"+classes+"\nasName:"+asName+"\nPosition:top-"+top+"bottom-"+bottom+"left-"+left+"right-"+right);
            
            droppedElement = document.getElementById(id);
            
            if(id == null || id == "" || id == undefined)
            {
                
            }
            else 
            {
                if(classes == "streamdrop ui-draggable")
                {
                    var asName = elem.name;
                    var selectedStream = elem.predefinedStream;
                    if(kind == "import")
                    {
                        createdImportStreamArray[id-1][0]=id;
                        createdImportStreamArray[id-1][1]=selectedStream;
                        createdImportStreamArray[id-1][2]=asName;
                        createdImportStreamArray[id-1][3]="Import";
                        var newAgent = $('<div style="top:'+top+';bottom:'+bottom+';left:'+left+';right:'+right+'">').attr('id', id).addClass('streamdrop');
                        var prop = $('<a onclick="doclick(this)"><b><img src="../Images/settings.png" class="settingsIconLoc"></b></a> ').attr('id', (id + '-prop'));
                        var showIcon = $('<img src="../Images/Import.png" class="streamIconloc"></b></a> ').attr('id', (id));
                        var conIcon = $('<img src="../Images/connection.png" onclick="connectionShowHideToggle(this)" class="showIconDefined"></b></a> ').attr('id', (id + 'vis'));
                        newAgent.text(asName).append('<a class="boxclose" id="boxclose"><b><img src="../Images/Cancel.png"></b></a> ').append(showIcon).append(conIcon).append(prop);
                        dropCompleteElement(newAgent, id, e, kind,top,left);
                    }
                    else if (kind == "export")
                    {
                        createdExportStreamArray[id-1][0]=id;
                        createdExportStreamArray[id-1][1]=selectedStream;
                        createdExportStreamArray[id-1][2]=asName;
                        createdExportStreamArray[id-1][3]="Export";
                        var newAgent = $('<div style="top:'+top+';bottom:'+bottom+';left:'+left+';right:'+right+'">').attr('id', id).addClass('streamdrop');
                        var prop = $('<a onclick="doclickExp(this)"><b><img src="../Images/settings.png" class="settingsIconLoc"></b></a> ').attr('id', (id+'-prop'));
                        var showIcon = $('<img src="../Images/Export.png" class="streamIconloc"></b></a> ').attr('id', (id));
                        var conIcon = $('<img src="../Images/connection.png" onclick="connectionShowHideToggle(this)" class="showIconDefined"></b></a> ').attr('id', (id+'vis'));
                        newAgent.text(asName).append('<a class="boxclose" id="boxclose"><b><img src="../Images/Cancel.png"></b></a> ').append(showIcon).append(conIcon).append(prop);
                        dropCompleteElement(newAgent,id,e,kind,top,left);
                        
                    }
                    else if(kind == "defined")
                    {
                        var tblerows =elem.numberOfAttributes;
                        createdDefinedStreamArray[id][0]=id;
                        createdDefinedStreamArray[id][1]=asName;
                        createdDefinedStreamArray[id][3]="Defined Stream";
                        createdDefinedStreamArray[id][4]= tblerows;
                        createdDefinedStreamArray[id][2]=new Array(tblerows);


                    
                        for (r = 1; r < tblerows+1; r++)
                        {
                            var attributes = elem.attributes;
                            for(var c=0; c<attributes.length;c++)
                            {
                                createdDefinedStreamArray[id][2][r-1]= new Array(2);
                                createdDefinedStreamArray[id][2][r-1][0]=attributes.attrArray[c].attributeName;
                                createdDefinedStreamArray[id][2][r-1][1]=attributes.attrArray[c].attributeType;
                            }
                        }
                        
                        var newAgent = $('<div style="top:'+top+';bottom:'+bottom+';left:'+left+';right:'+right+'">').attr('id', id).addClass('streamdrop');
                        var prop = $('<a onclick="doclickDefine(this)"><b><img src="../Images/settings.png" class="settingsIconLoc"></b></a> ').attr('id', (id+'-prop'));
                        var conIcon = $('<img src="../Images/connection.png" onclick="connectionShowHideToggle(this)" class="showIconDefined"></b></a> ').attr('id', (id+'vis'));
                        newAgent.text(asName).append('<a class="boxclose" id="boxclose"><b><img src="../Images/Cancel.png"></b></a> ').append(conIcon).append(prop);
                        dropCompleteElement(newAgent,id,e,kind,top,left);
                    }
                    
                }
                    
                else if(classes == "wstreamdrop ui-draggable")
                {
                    var asName = elem.name;
                    createdWindowStreamArray[id][0] = id;
                    createdWindowStreamArray[id][1] = asName;

                    if(kind == "derived window")
                    {
                        createdWindowStreamArray[id][2] = elem.fromStreamIndex;
                        createdWindowStreamArray[id][3] = elem.fromStreamName;
                    }
                    else
                    {
                        createdWindowStreamArray[id][2] = null;
                        createdWindowStreamArray[id][3] = null;
                    }
                    // createdWindowStreamArray[id][4] = new Array(tblerows);
                    //
                    // for (var r = 1; r < tblerows; r++)
                    // {
                    //     for (var c = 0; c < 1; c++)
                    //     {
                    //         var attrNm = table.rows[r].cells[c].innerHTML;
                    //         var attrTp = table.rows[r].cells[1].innerHTML;
                    //         createdWindowStreamArray[elementID][4][r-1] = [];
                    //         createdWindowStreamArray[elementID][4][r-1][0] = attrNm;
                    //         createdWindowStreamArray[elementID][4][r-1][1] = attrTp;
                    //     }
                    // }

                    var newAgent = $('<div>').attr('id', id).addClass('wstreamdrop');
                    dropWindowStream(newAgent, id, e,top,left,asName);
                }
                    
                else if(classes == "squerydrop ui-draggable")
                {
                    createdSimpleQueryArray[id][0] = id;
                    createdSimpleQueryArray[id][1] = elem.name;
                    createdSimpleQueryArray[id][2][0] = elem.fromStream.index;
                    createdSimpleQueryArray[id][2][1] = elem.fromStream.name;
                    createdSimpleQueryArray[id][3] = elem.filter;
                    createdSimpleQueryArray[id][4] = [];
                    // for(var r=0; r<loopCount;r++)
                    // {
                    //     createdSimpleQueryArray[elementID][4][r] =[];
                    //     var inputTextBoxID = "input"+r;
                    //     var attrLabelID = "label" + r;
                    //     createdSimpleQueryArray[elementID][4][r][0] = document.getElementById(inputTextBoxID).value;
                    //     createdSimpleQueryArray[elementID][4][r][1] = document.getElementById(attrLabelID).innerHTML;
                    // }
                    createdSimpleQueryArray[id][5][0] = elem.intoStream.index;
                    createdSimpleQueryArray[id][5][1] = elem.intoStream.name;

                    var newAgent = $('<div>').attr('id', id).addClass('squerydrop');
                    dropQuery(newAgent, id,e,"squerydrop",top,left,elem.name);
                }
                else if(classes == "wquerydrop ui-draggable")
                {
                    createdWindowQueryArray[id][0] = id;
                    createdWindowQueryArray[id][1] = elem.name;
                    createdWindowQueryArray[id][2][0] = elem.fromStream.index;
                    createdWindowQueryArray[id][2][1] = elem.fromStream.name;
                    createdWindowQueryArray[id][3] = elem.filter1;
                    createdWindowQueryArray[id][4] = elem.window;
                    createdWindowQueryArray[id][5] = elem.filter2;
                    createdWindowQueryArray[id][6] = [];
                    // for(var r=0; r<loopCount;r++)
                    // {
                    //     createdWindowQueryArray[elementID][6][r] =[];
                    //     var inputTextBoxID = "winput"+r;
                    //     var attrLabelID = "wlabel" + r;
                    //     createdWindowQueryArray[elementID][6][r][0] = document.getElementById(inputTextBoxID).value;
                    //     createdWindowQueryArray[elementID][6][r][1] = document.getElementById(attrLabelID).innerHTML;
                    //     alert(createdWindowQueryArray[elementID][6][r][0]+"\t"+createdWindowQueryArray[elementID][6][r][1]);
                    // }
                    createdWindowQueryArray[id][7][0] = elem.intoStream.index;
                    createdWindowQueryArray[id][7][1] = elem.intoStream.name;
                    
                    var newAgent = $('<div>').attr('id', id).addClass('wquerydrop');
                    dropQuery(newAgent, id,e,"wquerydrop",top,left,elem.name);
                }
                else if(classes == "joquerydrop ui-draggable")
                {
                    createdJoinQueryArray[id][0] = id;
                    createdJoinQueryArray[id][1] = elem.name;
                    createdJoinQueryArray[id][2][0] = elem.leftStream.name;
                    createdJoinQueryArray[id][2][1] = elem.leftStream.filter1;
                    createdJoinQueryArray[id][2][2] = elem.leftStream.window;
                    createdJoinQueryArray[id][2][3] = elem.leftStream.filter2;
                    createdJoinQueryArray[id][3][0] = elem.rightStream.name;
                    createdJoinQueryArray[id][3][1] = elem.rightStream.filter1;
                    createdJoinQueryArray[id][3][2] = elem.rightStream.window;
                    createdJoinQueryArray[id][3][3] = elem.rightStream.filter2;
                    createdJoinQueryArray[id][4] = [];
                    // for(var r=0; r<loopCount;r++)
                    // {
                    //     createdJoinQueryArray[elementID][4][r] =[];
                    //     var inputTextBoxID = "jinput"+r;
                    //     var attrLabelID = "jlabel" + r;
                    //     createdJoinQueryArray[elementID][4][r][0] = document.getElementById(inputTextBoxID).value;
                    //     createdJoinQueryArray[elementID][4][r][1] = document.getElementById(attrLabelID).innerHTML;
                    //     //alert(createdJoinQueryArray[elementID][4][r][0]+" as "+createdJoinQueryArray[elementID][4][r][1]);
                    // }

                    createdJoinQueryArray[id][5]= elem.intoStreamName;

                    var newAgent = $('<div>').attr('id', id).addClass('joquerydrop');
                    dropQuery(newAgent, id,e,"joquerydrop",top,left,elem.name);
                }
                else if(classes == "stquerydrop ui-draggable")
                {
                    createdStateMachineQueryArray[id][0] = id;
                    createdStateMachineQueryArray[id][1] = elem.name;

                    //Multiple State Info
                    // for(var m = 0; m<=numberOfStateDivs ; m++)
                    // {
                    //     createdStateMachineQueryArray[id][2][m] = [];
                    //     createdStateMachineQueryArray[id][2][m][0] = elem.state.id;
                    //     createdStateMachineQueryArray[id][2][m][1] = elem.state.selectedStream;
                    //     createdStateMachineQueryArray[id][2][m][2] = elem.state.filter;
                    // }

                    createdStateMachineQueryArray[id][3] = elem.processLogic;
                    // for(var r=0; r<loopCount;r++)
                    // {
                    //     createdStateMachineQueryArray[id][4][r] =[];
                    //     var inputTextBoxID = "stinput"+r;
                    //     var attrLabelID = "stlabel" + r;
                    //     createdStateMachineQueryArray[id][4][r][0] = document.getElementById(inputTextBoxID).value;
                    //     createdStateMachineQueryArray[id][4][r][1] = document.getElementById(attrLabelID).innerHTML;
                    //
                    //     //alert(createdJoinQueryArray[elementID][4][r][0]+" as "+createdJoinQueryArray[elementID][4][r][1]);
                    // }

                    createdStateMachineQueryArray[id][5]= elem.intoStreamName;

                    var newAgent = $('<div>').attr('id', id).addClass('stquerydrop');
                    dropQuery(newAgent, id,e,"stquerydrop",top,left,elem.name);
                }
            }
            i = parseInt(id)+1;
        });
                
        // var objFromJson = JSON.parse(flowChartJson);
        // var node = objFromJson.node;
        // $.each(node, function (index, element) {
        //     var id = element.id;
        //     var classes = element.class;
        //     var positionTop = element.position.top
        //     alert("Id of element parsed: " + id + "\nclass: " + classes + "\npositionTop: " + positionTop);
        // });

        
        
        // var elements = flowChart.node;
        // $.each(elements, function( index, elem ) {
        //     if(elem.class === 'streamdrop ui-draggable') {
        //         alert('identified');
        //     //  repositionElement('startpoint', elem.positionX, elem.positionY);
        //     //     }else if(elem.nodetype === 'endpoint'){
        //     //         repositionElement('endpoint', elem.positionX, elem.positionY);
        //     //     }else if(elem.nodetype === 'streamdrop'){
        //     //         var id = addStream(elem.blockId);
        //     //         repositionElement(id, elem.positionX, elem.positionY);
        //     //     }else if(elem.nodetype === 'decision'){
        //     //         var id = addDecision(elem.blockId);
        //     //         repositionElement(id, elem.positionX, elem.positionY);
        //     //     }else{
        //     //   
        //     }
        // });

        var connections = flowChart.connections;
        $.each(connections, function( index, elem ) {
            var connection1 = jsPlumb.connect({
                source: elem.pageSourceId,
                target: elem.pageTargetId,
                anchors: ["BottomCenter", [0.75, 0, 0, -1]]
        
            });
        });
        
        // numberOfElements = flowChart.numberOfElements;
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @function Method to reposition an element using its css properties based on the json file
     * @param id
     * @param posX
     * @param posY
     */
    
    function repositionElement(id, posX, posY){
        $('#'+id).css('left', posX);
        $('#'+id).css('top', posY);
        jsPlumb.repaint(id);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @function Remove an element from the canvas
     * @description Though an element is deleted, its id will still remain unique hence denying any other new elements to take that id
     * @param element
     */
    
    
    function removeElem(element) {
        element.remove();
        // var parentnode = $(element)[0].parentNode.parentNode;
        // jsPlumb.detachAllConnections(parentnode);
        // jsPlumb.removeAllEndpoints(parentnode);
        // $(parentnode).remove();
    }

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

    var attrNumber,streamInd;

    function getAttributes(stream)
    {
        var PredefStreamArr = PredefinedStreams();
        for(var c=0;c<3;c++)
        {
            if(PredefStreamArr[c][0]==stream)
            {
                attrNumber =PredefStreamArr[c][1].length;
                streamInd = c;
            }
        }
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

    //Array that stores all Window stream data
    var createdWindowStreamArray = [];
    for(var x = 0; x < 100; x++){
        createdWindowStreamArray[x] = [];
        for(var y = 0; y < 5; y++){
            createdWindowStreamArray[x][y] = null
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

    //Array that stores Simple query related info
    var createdSimpleQueryArray = [];
    for(var x = 0; x < 100; x++){
        createdSimpleQueryArray[x] = [];
        for(var y = 0; y < 6; y++){
            createdSimpleQueryArray[x][y] = null;
            if(y==2 || y==5)
            {
                createdSimpleQueryArray[x][y]= [];
            }
        }
    }

    //Array that stores Pass-through query related info
    var createdPassThroughQueryArray = [];
    for(var x = 0; x < 100; x++){
        createdPassThroughQueryArray[x] = [];
        for(var y = 0; y < 6; y++){
            createdPassThroughQueryArray[x][y] = null;
            if(y==2 || y==5)
            {
                createdPassThroughQueryArray[x][y]= [];
            }
        }
    }

    //Array that stores Window query related info
    var createdWindowQueryArray = [];
    for(var x = 0; x < 100; x++){
        createdWindowQueryArray[x] = [];
        for(var y = 0; y < 8; y++){
            createdWindowQueryArray[x][y] = null;
            if(y==2 || y==7)
            {
                createdWindowQueryArray[x][y]= [];
            }
        }
    }

    //Array that stores Join query related info
    var createdJoinQueryArray = [];
    for(var x = 0; x < 100; x++){
        createdJoinQueryArray[x] = [];
        for(var y = 0; y < 8; y++){
            createdJoinQueryArray[x][y] = null;
            if(y==2 || y==3)
            {
                createdJoinQueryArray[x][y]= [];
            }
        }
    }


    //Array that stores State Machine query related info
    var createdStateMachineQueryArray = [];
    for(var x = 0; x < 100; x++){
        createdStateMachineQueryArray[x] = [];
        for(var y = 0; y < 6; y++){
            createdStateMachineQueryArray[x][y] = null;
            if(y==2 || y==4)
            {
                createdStateMachineQueryArray[x][y]= [];
            }
        }
    }

    //Array that stores all Partition Condition data
    var createdPartitionConditionArray = [];
    for(var x = 0; x < 100; x++){
        createdPartitionConditionArray[x] = [];
        for(var y = 0; y < 5; y++){
            createdPartitionConditionArray[x][y] = null
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
        clickedelemId = clickedelemId.charAt(0);
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
        alert("Stream ID: "+clickedelemId+"\nSelected stream: "+ createdImportStreamArray[clickedelemId-1][1]+"\nStream Type: Import Stream\nStream Definition: "+res);
        clickedId= clickedelemId;
        //createStreamForm();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function doclickExp(sender)
    {
        var clickedelemId=sender.id;
        clickedelemId = clickedelemId.charAt(0);
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
        alert("Stream ID: "+clickedelemId+"\nSelected stream: "+ createdExportStreamArray[clickedelemId-1][1]+"\nStream Type: Export Stream\nStream Definition: "+res);
        clickedId= clickedelemId;
        //createStreamForm();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function doclickDefine(sender)
    {
        var clickedelemId=sender.id;
        clickedelemId = clickedelemId.charAt(0);
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
        alert("Stream ID: "+clickedelemId+"\nCreated stream: "+ streamname+"\nStream Type: Defined Stream\nStream Definition: "+res);
        clickedId= clickedelemId;
        //createStreamForm();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     *
     * @function Create the combo box
     * @description Stores the Predefined array data onto individual arrays
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


    function createStreamForm(newAgent,i,e,mouseTop, mouseLeft)
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
            storeImportStreamInfo(newAgent,i,e,kind,mouseTop,mouseLeft);
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

        //For the Defined Stream Form

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
        streamFomCloseButton=document.createElement("button");
        streamFomCloseButton.type="button";
        streamFomCloseButton.className="streamFomCloseButton";
        streamFomCloseButton.id="streamFomCloseButton";
        streamFomCloseButton.innerHTML="Cancel";
        streamFomCloseButton.onclick = function() {
            closeForm();
        };
        streambtn.setAttribute("onclick","newStreamDef()");
        streamDiv.appendChild(headingstream);
        streamDiv.appendChild(streambtn);
        streamDiv.appendChild(inputval);

        lot.appendChild(importDiv);
        lot.appendChild(exportDiv);
        streamDiv.appendChild(definestreamdiv);
        lot.appendChild(streamDiv);
        lot.appendChild(streamFomCloseButton);

        $(".toolbox-titlex").show();
        $(".panel").show();

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

        // showAttrDivision.appendChild(attrName);
        // showAttrDivision.appendChild(attrType);
        // showAttrDivision.appendChild(closeattr);

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
     * @function Delete a row from the table
     * @param row
     */
    function deleteRowForWindow(row)
    {
        var i=row.parentNode.parentNode.rowIndex;
        document.getElementById('attrtableForWindow').deleteRow(i);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @function Delete a row from the table
     * @param row
     */
    function deleteRowForVariablePartition(row)
    {
        var i=row.parentNode.parentNode.rowIndex;
        document.getElementById('tableVariablePartitionConditionDisplay').deleteRow(i);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @function Delete a row from the table
     * @param row
     */
    function deleteRowForRangePartition(row)
    {
        var i=row.parentNode.parentNode.rowIndex;
        document.getElementById('tableRangePartitionConditionDisplay').deleteRow(i);
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

    function connectionShowHideToggle(element)
    {
        var clickedId =  element.id;
        var elementID=clickedId = clickedId.charAt(0);
        var ImportCon = elementID+"-import";
        var ExportCon = elementID+"-export";
        var DefinedCon = elementID+"-defined";

        var importConExists = document.getElementById(ImportCon);
        //alert(importConExists);
        var exportConExists = document.getElementById(ExportCon);
        //alert(exportConExists);
        var definedConExists = document.getElementById(DefinedCon);
        //alert(definedConExists);

        if(importConExists != null)
        {
            if(importConExists+ $(':visible').length)
            {
                $(importConExists).hide();
            }
            else
            {
                $(importConExists).show();
            }

        }

        else if(exportConExists != null)
        {
            if(exportConExists+ $(':visible').length)
            {
                $(exportConExists).hide();
            }
            else
            {
                $(exportConExists).show();
            }

        }

        else if(definedConExists != null)
        {
            if(definedConExists+ $(':visible').length)
            {
                $(definedConExists).hide();
            }

            else
            {
                $(definedConExists).show();
            }

        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @function Store Import Stream info to array
     */

    function storeImportStreamInfo(newAgent,i,e,kind,mouseTop,mouseLeft)
    {
        var choice=document.getElementById("streamSelect");
        var selectedStream = choice.options[choice.selectedIndex].text;
        var asName= document.getElementById("istreamName").value;
        var StreamElementID = i;

        createdImportStreamArray[i-1][0]=StreamElementID;
        createdImportStreamArray[i-1][1]=selectedStream;
        createdImportStreamArray[i-1][2]=asName;
        createdImportStreamArray[i-1][3]="Import";

        var prop = $('<a onclick="doclick(this)"><b><img src="../Images/settings.png" class="settingsIconLoc"></b></a> ').attr('id', (i+'-prop'));
        var showIcon = $('<img src="../Images/Import.png" class="streamIconloc"></b></a> ').attr('id', (i));
        var conIcon = $('<img src="../Images/connection.png" onclick="connectionShowHideToggle(this)" class="showIconDefined"></b></a> ').attr('id', (i+'vis'));
        newAgent.text(asName).append('<a class="boxclose" id="boxclose"><b><img src="../Images/Cancel.png"></b></a> ').append(showIcon).append(conIcon).append(prop);
        dropCompleteElement(newAgent,i,e,kind,mouseTop,mouseLeft);

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Store Export stream info to array
     */
    function storeExportStreamInfo(newAgent,i,e,kind,mouseTop,mouseLeft)
    {
        var choice=document.getElementById("streamSelectExp");
        var selectedStream = choice.options[choice.selectedIndex].text;
        var asName= document.getElementById("estreamName").value;
        var StreamElementID = i;
        
        createdExportStreamArray[i-1][0]=StreamElementID;
        createdExportStreamArray[i-1][1]=selectedStream;
        createdExportStreamArray[i-1][2]=asName;
        createdExportStreamArray[i-1][3]="Export";

        var element=document.getElementById(newAgent);

        var prop = $('<a onclick="doclickExp(this)"><b><img src="../Images/settings.png" class="settingsIconLoc"></b></a> ').attr('id', (i+'-prop'));
        var showIcon = $('<img src="../Images/Export.png" class="streamIconloc"></b></a> ').attr('id', (i));
        var conIcon = $('<img src="../Images/connection.png" onclick="connectionShowHideToggle(this)" class="showIconDefined"></b></a> ').attr('id', (i+'vis'));
        newAgent.text(asName).append('<a class="boxclose" id="boxclose"><b><img src="../Images/Cancel.png"></b></a> ').append(showIcon).append(conIcon).append(prop);
        dropCompleteElement(newAgent,i,e,kind,mouseTop,mouseLeft);

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Store Defined stream info to array
     */

    function storeDefinedStreamInfo(newAgent,i,e,kind,mouseTop,mouseLeft)
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
        
        // console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW");
        // console.log(createdDefinedStreamArray);

        var prop = $('<a onclick="doclickDefine(this)"><b><img src="../Images/settings.png" class="settingsIconLoc"></b></a> ').attr('id', (i+'-prop'));
        var conIcon = $('<img src="../Images/connection.png" onclick="connectionShowHideToggle(this)" class="showIconDefined"></b></a> ').attr('id', (i+'vis'));
        newAgent.text(StrName).append('<a class="boxclose" id="boxclose"><b><img src="../Images/Cancel.png"></b></a> ').append(conIcon).append(prop);
        dropCompleteElement(newAgent,i,e,kind,mouseTop,mouseLeft);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var q=0;
    var r=0;

    function dropCompleteElement(newAgent,i,e,kind,ptop,left)
    {
        $(droppedElement).draggable({containment: "container"});

        var finalElement =  newAgent;
        r++; q++;

        if(kind=="import")
        {
            var connection = $('<div>').attr('id', i+"-import" ).addClass('connection');
            str = false;
        }
        else if (kind=="export")
        {
            var connection = $('<div>').attr('id', i+"-export" ).addClass('connection');
            str = false;
        }
        else
        {
            var connection = $('<div>').attr('id', i+"-defined" ).addClass('connection');
            str = false;
        }


        finalElement.css({
            'top': ptop,
            'left': left
        });

       // connection.hide();
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
        $("#attrtable tr").remove();
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function dropWindowStream(newAgent, i, e,topP,left,asName)
    {
        var windowNode = document.createElement("div");
        windowNode.id = i+"-windowNode";
        windowNode.className = "windowNameNode";
        var windowTextnode = document.createTextNode(asName);
        windowTextnode.id = i+"-windowTextnode";
        windowNode.appendChild(windowTextnode);

        var prop = $('<a onclick="getConnectionDetailsForWindow(this)"><b><img src="../Images/settings.png" class="windowSettingIconLoc"></b></a> ').attr('id', (i+('-prop')));
        var conIcon = $('<img src="../Images/connection.png" onclick="connectionShowHideToggle(this)" class="showIconDefinedwindow"></b></a> ').attr('id', (i+'vis'));
        newAgent.append(windowNode).append('<a class="boxclosewindow" id="boxclose"><b><img src="../Images/Cancel.png"></b></a> ').append(conIcon).append(prop);

        $(droppedElement).draggable({containment: "container"});

        var finalElement =  newAgent;
        r++; q++;

        var connectionIn = $('<div class="connectorIn">').attr('id', i + '-in').addClass('connection').text("in");
        var connectionOut = $('<div class="connectorOut">').attr('id', i + '-out').addClass('connection').text('out');

        finalElement.css({
            'top': topP,
            'left': left
        });

        finalElement.append(connectionIn);
        finalElement.append(connectionOut);

        $('#container').append(finalElement);

        jsPlumb.draggable(finalElement, {
            containment: 'parent'
        });

        jsPlumb.makeTarget(connectionIn, {
            anchor: 'Continuous',
            maxConnections:1
        });
        // jsPlumb.makeTarget(connectionOut, {
        //     anchor: 'Continuous'
        // });

        jsPlumb.makeSource(connectionOut, {
            anchor: 'Continuous'
        });

    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    function dropQuery(newAgent, i,e,droptype,topP,left,text)
    {
        var node = document.createElement("div");
        node.id = i+"-nodeInitial";
        node.className = "queryNameNode";
        var textnode = document.createTextNode(text);
        textnode.id = i+"-textnodeInitial";
        node.appendChild(textnode);

        if(droptype=="squerydrop")
        {
            var prop = $('<a onclick="getConnectionDetails(this)"><b><img src="../Images/settings.png" class="querySettingIconLoc"></b></a>').attr('id', (i+('-propsquerydrop')));
            var conIcon = $('<img src="../Images/connection.png" onclick="connectionShowHideToggle(this)" class="showIconDefined1"></b></a> ').attr('id', (i+'vis'));
            newAgent.append(node).append('<a class="boxclose1" id="boxclose"><b><img src="../Images/Cancel.png"></b></a> ').append(conIcon).append(prop);
            dropCompleteQueryElement(newAgent,i,e,topP,left);
        }
        else if(droptype=="wquerydrop")
        {
            var prop = $('<a onclick="getConnectionDetails(this)"><b><img src="../Images/settings.png" class="querySettingIconLoc"></b></a>').attr('id', (i+('-propwquerydrop')));
            var conIcon = $('<img src="../Images/connection.png" onclick="connectionShowHideToggle(this)" class="showIconDefined1"></b></a> ').attr('id', (i+'vis'));
            newAgent.append(node).append('<a class="boxclose1" id="boxclose"><b><img src="../Images/Cancel.png"></b></a> ').append(conIcon).append(prop);
            dropCompleteQueryElement(newAgent,i,e,topP,left);
        }
        if(droptype=="filterdrop")
        {
            var prop = $('<a onclick="getConnectionDetails(this)"><b><img src="../Images/settings.png" class="querySettingIconLoc"></b></a>').attr('id', (i+('-propsfilterdrop')));
            var conIcon = $('<img src="../Images/connection.png" onclick="connectionShowHideToggle(this)" class="showIconDefined1"></b></a> ').attr('id', (i+'vis'));
            newAgent.append(node).append('<a class="boxclose1" id="boxclose"><b><img src="../Images/Cancel.png"></b></a> ').append(conIcon).append(prop);
            dropCompleteQueryElement(newAgent,i,e,topP,left);
        }
            
        else if(droptype=="joquerydrop")
        {
            var prop = $('<a onclick="getJoinConnectionDetails(this)"><b><img src="../Images/settings.png" class="querySettingIconLoc"></b></a> ').attr('id', (i+('-propjoquerydrop')));
            var conIcon = $('<img src="../Images/connection.png" onclick="connectionShowHideToggle(this)" class="showIconDefined1"></b></a> ').attr('id', (i+'vis'));
            newAgent.append(node).append('<a class="boxclose1" id="boxclose"><b><img src="../Images/Cancel.png"></b></a> ').append(conIcon).append(prop);
            dropCompleteJoinQueryElement(newAgent,i,e,topP,left);
        }
        else if(droptype=="stquerydrop")
        {
            var prop = $('<a onclick="getStateMachineConnectionDetails(this)"><b><img src="../Images/settings.png" class="querySettingIconLoc"></b></a> ').attr('id', (i+('-propstquerydrop')));
            var conIcon = $('<img src="../Images/connection.png" onclick="connectionShowHideToggle(this)" class="showIconDefined1"></b></a> ').attr('id', (i+'vis'));
            newAgent.append(node).append('<a class="boxclose1" id="boxclose"><b><img src="../Images/Cancel.png"></b></a> ').append(conIcon).append(prop);
            dropCompleteStateMQueryElement(newAgent,i,e,topP,left);
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     *
     * @param newAgent
     * @param i
     * @param e
     * @description Drops the simple and the window query as their in and out connectors can permit only one connection each
     *
     */

    function dropCompleteQueryElement(newAgent,i,e,topP,left)
    {
        $(droppedElement).draggable({containment: "container"});

        var finalElement =  newAgent;
        r++; q++;

        var connectionIn = $('<div class="connectorIn">').attr('id', i + '-in').addClass('connection').text("in");
        var connectionOut = $('<div class="connectorOut">').attr('id', i + '-out').addClass('connection').text('out');

        finalElement.css({
            'top': topP,
            'left': left
        });

        finalElement.append(connectionIn);
        finalElement.append(connectionOut);

        $('#container').append(finalElement);

        jsPlumb.draggable(finalElement, {
            containment: 'parent'
        });

        jsPlumb.makeTarget(connectionIn, {
            anchor: 'Continuous',
            maxConnections:1
        });

        jsPlumb.makeSource(connectionOut, {
            anchor: 'Continuous',
            maxConnections:1
        });


        var myNode = document.getElementById("lot");
        var fc = myNode.firstChild;

        while( fc ) {
            myNode.removeChild( fc );
            fc = myNode.firstChild;
        }

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @description  Make a partition draggable
     * @param newAgent
     */

    function enableDrag(newAgent)
    {
        interact(newAgent)
            .draggable({
                // enable inertial throwing
                inertia: true,
                // keep the element within the area of it's parent
                restrict: {
                    restriction: "parent",
                    endOnly: true,
                    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
                },
                // enable autoScroll
                autoScroll: true,

                // call this function on every dragmove event
                onmove: dragMoveListener,
                // call this function on every dragend event
                onend: function (event) {
                    var textEl = event.target.querySelector('p');

                    textEl && (textEl.textContent =
                        'moved a distance of '
                        + (Math.sqrt(event.dx * event.dx +
                            event.dy * event.dy)|0) + 'px');
                }
            });

        function dragMoveListener (event) {
            var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            // translate the element
            target.style.webkitTransform =
                target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px)';

            // update the posiion attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     *
     * @param newAgent
     * @param i
     * @param e
     * @description Drops the Partition
     *
     */

    function resizePartition(newAgent)
    {
        interact(newAgent)
            .resizable({
                preserveAspectRatio: true,
                edges: { left: true, right: true, bottom: true, top: true }
            })
            .on('resizemove', function (event) {
        
                var target = event.target,
                    x = (parseFloat(target.getAttribute('data-x')) || 0),
                    y = (parseFloat(target.getAttribute('data-y')) || 0);
        
                // update the element's style
                target.style.width  = event.rect.width + 'px';
                target.style.height = event.rect.height + 'px';
        
                // translate when resizing from top or left edges
                x += event.deltaRect.left;
                y += event.deltaRect.top;
        
                target.style.webkitTransform = target.style.transform =
                    'translate(' + x + 'px,' + y + 'px)';
        
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
                target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
            });
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @description Method that appends the prop to a partition element and calls the method to drop the partition onto the canvas
     * @param newAgent
     * @param i
     * @param e
     * @param droptype
     */
    
    function dropPartition(newAgent, i, e, droptype) 
    {

        var prop = $('<a><b><img src="../Images/settings.png" class="querySettingIconLoc"></b></a>').attr('id', (i+('-propPartition')));
        newAgent.append('<a class="boxclose1" id="boxclose"><b><img src="../Images/Cancel.png"></b></a> ').append(prop);
        dropCompletePartitionElement(newAgent,i,e);
        
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    /**
     * @description 
     * @param newAgent
     * @param i
     * @param e
     */
    var x =1;
    
    function dropCompletePartitionElement(newAgent,i,e)
    {

        $(droppedElement).draggable({containment: "container"});

        var finalElement =  newAgent;

        $(finalElement).on('dblclick',function () {

            var connectionIn = $('<div class="connectorInPart" onclick="getPartitionConnectionDetails(this)">').attr('id', i + '-pc'+ x).addClass('connection').text("pc"+x);
            finalElement.append(connectionIn);

            jsPlumb.makeTarget(connectionIn, {
                anchor: 'Continuous'
            });
            jsPlumb.makeSource(connectionIn, {
                anchor: 'Continuous'
            });
            
            x++;
        });

        finalElement.css({
            'top': e.pageY,
            'left': e.pageX
        });

        $('#container').append(finalElement);
        $(finalElement).resizable({
            resize: function (e, ui) {
                jsPlumb.repaint(ui.helper);
            }
        });
        // jsPlumb.draggable(finalElement, {
        //     containment: 'parent'
        // });

        
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //TODO Json output for Partitions-> Hence regenerating a partition from input

    var tablePartitionConditionTableForm = document.createElement('table');
    tablePartitionConditionTableForm.id = "tablePartitionConditionTableForm";
    tablePartitionConditionTableForm.className = "tablePartitionConditionTableForm";

    function setPartitionConditionform(clickedId,selctedSt,fromStreamName,streamType,fromStreamIndex, defAttrNum, type)
    {
        alert("called");

        $("#container").addClass("disabledbutton");
        $("#toolbox").addClass("disabledbutton");

        var tablePartitionConditionForm = document.createElement('table');
        tablePartitionConditionForm.id = "tablePartitionConditionForm";
        tablePartitionConditionForm.className = "tablePartitionConditionForm";

        var tableVariablePartitionConditionForm = document.createElement('table');
        tableVariablePartitionConditionForm.id = "tableVariablePartitionConditionForm";
        tableVariablePartitionConditionForm.className = "tableVariablePartitionConditionForm";

        var tableRangePartitionConditionForm = document.createElement('table');
        tableRangePartitionConditionForm.id = "tableRangePartitionConditionForm";
        tableRangePartitionConditionForm.className = "tableRangePartitionConditionForm";

        partitionConditionDiv=document.createElement("div");
        partitionConditionDiv.className="partitionConditionDiv";
        partitionConditionDiv.id="partitionConditionDiv";

        variablePartitionTypeTableDiv=document.createElement("div");
        variablePartitionTypeTableDiv.className="partitionTypeTableDiv";
        variablePartitionTypeTableDiv.id="partitionTypeTableDiv";

        variablePartitionTypeTableDisplayDiv=document.createElement("div");
        variablePartitionTypeTableDisplayDiv.className="variablePartitionTypeTableDisplayDiv";
        variablePartitionTypeTableDisplayDiv.id="variablePartitionTypeTableDisplayDiv";

        rangePartitionTypeTableDiv=document.createElement("div");
        rangePartitionTypeTableDiv.className="rangePartitionTypeTableDiv";
        rangePartitionTypeTableDiv.id="rangePartitionTypeTableDiv";

        rangePartitionTypeTableDisplayDiv=document.createElement("div");
        rangePartitionTypeTableDisplayDiv.className="rangePartitionTypeTableDisplayDiv";
        rangePartitionTypeTableDisplayDiv.id="rangePartitionTypeTableDisplayDiv";

        partitionConditionLabel= document.createElement("label");
        partitionConditionLabel.className="partitionConditionLabel";
        partitionConditionLabel.id="partitionConditionLabel";
        partitionConditionLabel.innerHTML='Define Partition Condition';

        variablePartitionIdLabel= document.createElement("label");
        variablePartitionIdLabel.id ="variablePartitionIdLabel";
        variablePartitionIdLabel.className ="variablePartitionIdLabel";
        variablePartitionIdLabel.innerHTML = "Variable Partitioning";

        rangePartitionIdLabel= document.createElement("label");
        rangePartitionIdLabel.id ="rangePartitionIdLabel";
        rangePartitionIdLabel.className ="rangePartitionIdLabel";
        rangePartitionIdLabel.innerHTML = "Range Partitioning";

        rangePartitionTypeInput = document.createElement("input");
        rangePartitionTypeInput.id ="rangePartitionTypeInput";
        rangePartitionTypeInput.className ="rangePartitionTypeInput";

        EmptyLabel= document.createElement("label");
        EmptyLabel.id ="EmptyLabel";
        EmptyLabel.className ="EmptyLabel";
        EmptyLabel.innerHTML = "";

        partitionIdLabel= document.createElement("label");
        partitionIdLabel.id ="partitionIdLabel";
        partitionIdLabel.className ="partitionIdLabel";
        partitionIdLabel.innerHTML = "Partition ID: ";

        partitionIdInput= document.createElement("input");
        partitionIdInput.id ="partitionIdInput";
        partitionIdInput.className ="partitionIdInput";

        rangePartitionTypeLabel= document.createElement("label");
        rangePartitionTypeLabel.id ="rangePartitionTypeLabel";
        rangePartitionTypeLabel.className ="rangePartitionTypeLabel";
        rangePartitionTypeLabel.innerHTML = "Range Partition Type: ";

        variablePartitionTypeLabel= document.createElement("label");
        variablePartitionTypeLabel.id ="variablePartitionTypeLabel";
        variablePartitionTypeLabel.className ="variablePartitionTypeLabel";
        variablePartitionTypeLabel.innerHTML = "Varibale Partition Type: ";

        partitionTypeComboDiv=document.createElement("div");
        partitionTypeComboDiv.className="partitionTypeComboDiv";
        partitionTypeComboDiv.id="partitionTypeComboDiv";

        var html = '<select id="partitionTypeComboForPartition">', attrtypes = partitiontypeGenerate(streamType,selctedSt,fromStreamIndex,defAttrNum, type), i;
        for(i = 0; i < attrtypes.length; i++) {
            html += "<option value='"+attrtypes[i]+"'>"+attrtypes[i]+"</option>";
        }
        html += '</select>';

        partitionTypeComboDiv.innerHTML = html;

        btnAddVariablePartitionType=document.createElement("button");
        btnAddVariablePartitionType.type="button";
        btnAddVariablePartitionType.className="btnAddVariablePartitionType";
        btnAddVariablePartitionType.id="btnAddVariablePartitionType";
        btnAddVariablePartitionType.innerHTML="Add variable partition type";
        btnAddVariablePartitionType.onclick = function () {
            $("#rangePartitionTypeTableDiv").addClass("disabledbutton");
            addVariablePartitionTypeToTable();
        };

        btnAddRangePartitionType=document.createElement("button");
        btnAddRangePartitionType.type="button";
        btnAddRangePartitionType.className="btnAddRangePartitionType";
        btnAddRangePartitionType.id="btnAddRangePartitionType";
        btnAddRangePartitionType.innerHTML="Add range partition type";
        btnAddRangePartitionType.onclick = function () {
            $("#partitionTypeTableDiv").addClass("disabledbutton");
            addRangePartitionTypeToTable();
        };

        btnPartitionCondition=document.createElement("button");
        btnPartitionCondition.type="button";
        btnPartitionCondition.className="btnPartitionCondition";
        btnPartitionCondition.id="btnPartitionCondition";
        btnPartitionCondition.innerHTML="Apply Partition Condition";
        btnPartitionCondition.onclick = function () {
            savePartitionDetailsToStream(clickedId,streamType,fromStreamIndex);
        };

        partitionCloseButton=document.createElement("button");
        partitionCloseButton.type="button";
        partitionCloseButton.className="partitionCloseButton";
        partitionCloseButton.id="partitionCloseButton";
        partitionCloseButton.innerHTML="Cancel";
        partitionCloseButton.onclick = function() {
            $("#tableVariablePartitionConditionDisplay tr").remove();
            $("#tableRangePartitionConditionDisplay tr").remove();
            $("#rangePartitionTypeTableDiv").removeClass("disabledbutton");
            $("#rangePartitionTypeTableDiv").addClass("disabledbutton");
            closeForm();
        };

        //Row 1

        var tr1 = document.createElement('tr');
        var td1=document.createElement('td');

        td1.appendChild(partitionConditionLabel);
        tr1.appendChild(td1);
        tablePartitionConditionForm.appendChild(tr1);

        //Row 2

        var tr2 = document.createElement('tr');
        var td2=document.createElement('td');
        var td3=document.createElement('td');

        td2.appendChild(partitionIdLabel);
        tr2.appendChild(td2);
        td3.appendChild(partitionIdInput);
        tr2.appendChild(td3);
        tablePartitionConditionForm.appendChild(tr2);

        partitionConditionDiv.appendChild(tablePartitionConditionForm);

        ////////////////////////Variable Partitioning Division Specs///////////////////

        variablePartitionTypeTableDiv.appendChild(variablePartitionIdLabel);
        variablePartitionTypeTableDiv.appendChild(variablePartitionTypeTableDisplayDiv);

        //Row 2

        var tr2 = document.createElement('tr');
        var td2=document.createElement('td');
        var td3=document.createElement('td');

        td2.appendChild(variablePartitionTypeLabel);
        tr2.appendChild(td2);
        td3.appendChild(partitionTypeComboDiv);
        tr2.appendChild(td3);
        tableVariablePartitionConditionForm.appendChild(tr2);

        //Row 3

        var tr3 = document.createElement('tr');
        var td4=document.createElement('td');

        td4.appendChild(btnAddVariablePartitionType);
        tr3.appendChild(td4);
        tableVariablePartitionConditionForm.appendChild(tr3);

        variablePartitionTypeTableDiv.appendChild(tableVariablePartitionConditionForm);
        partitionConditionDiv.appendChild(variablePartitionTypeTableDiv);
        $(".variablePartitionTypeTableDisplayDiv").hide();

        ////////////////////////Range Partitioning Division Specs///////////////////

        rangePartitionTypeTableDiv.appendChild(rangePartitionIdLabel);
        rangePartitionTypeTableDiv.appendChild(rangePartitionTypeTableDisplayDiv);

        //Row 2

        var tr2 = document.createElement('tr');
        var td2=document.createElement('td');
        var td3=document.createElement('td');

        td2.appendChild(rangePartitionTypeLabel);
        tr2.appendChild(td2);
        td3.appendChild(rangePartitionTypeInput);
        tr2.appendChild(td3);
        tableRangePartitionConditionForm.appendChild(tr2);

        //Row 3

        var tr3 = document.createElement('tr');
        var td4=document.createElement('td');

        td4.appendChild(btnAddRangePartitionType);
        tr3.appendChild(td4);
        tableRangePartitionConditionForm.appendChild(tr3);

        rangePartitionTypeTableDiv.appendChild(tableRangePartitionConditionForm);
        $(".rangePartitionTypeTableDiv").hide();
        partitionConditionDiv.appendChild(rangePartitionTypeTableDiv);
        partitionConditionDiv.appendChild(btnPartitionCondition);
        partitionConditionDiv.appendChild(partitionCloseButton);

        lot.appendChild(partitionConditionDiv);

        $(".toolbox-titlex").show();
        $(".panel").show();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function savePartitionDetailsToStream(clickedId,streamType,fromStreamIndex) 
    {
        var partitionIdInput = document.getElementById("partitionIdInput").value;
        var partitionConditionElementID = clickedId;
        var elClickedId= clickedId.substr(0, clickedId.indexOf('-')); //1-pc1
        var subPcId= clickedId.substr(clickedId.indexOf("c") + 1);

        if (streamType == "import" || streamType == "export") {
            var tablevar = document.getElementById('tableVariablePartitionConditionDisplay');
            var tableran = document.getElementById('tableRangePartitionConditionDisplay');

            if (tableran == null) {
                var tblerows = (tablevar.rows.length);
                createdPartitionConditionArray[elClickedId][2] = new Array(tblerows);

                for (r = 1; r < tblerows; r++) {
                    for (var c = 0; c < 1; c++) {
                        var attrNm = tablevar.rows[r].cells[c].innerHTML;
                        createdPartitionConditionArray[elClickedId][2][r - 1] = new Array(2);
                        createdPartitionConditionArray[elClickedId][2][r - 1][0] = attrNm;

                        var predefarr = PredefinedStreams();
                        for (var x = 0; x < predefarr.length; x++) {
                            for (var y = 0; y < predefarr[x][1].length; y++) {
                                if (predefarr[x][1][y] == attrNm) {
                                    createdPartitionConditionArray[elClickedId][2][r - 1][1] = predefarr[x][2][y];
                                }
                            }
                        }

                        alert("Attr name: " + createdPartitionConditionArray[elClickedId][2][r - 1][0] + "\nAttr type: " + createdPartitionConditionArray[elClickedId][2][r - 1][1]);
                    }

                }
                createdPartitionConditionArray[elClickedId][4] = tblerows - 1;
            }
            else {
                var tblerowsRange = (tableran.rows.length);
                createdPartitionConditionArray[elClickedId][2] = new Array(tblerowsRange);

                for (r = 1; r < tblerowsRange; r++) {
                    for (var c = 0; c < 1; c++) {
                        var range = tableran.rows[r].cells[c].innerHTML;
                        createdPartitionConditionArray[elClickedId][2][r - 1] = new Array(2);
                        createdPartitionConditionArray[elClickedId][2][r - 1][0] = range;
                        createdPartitionConditionArray[elClickedId][2][r - 1][1] = null;

                        alert("Attr name: " + createdPartitionConditionArray[elClickedId][2][r - 1][0] + "\nAttr type: " + createdPartitionConditionArray[elClickedId][2][r - 1][1]);
                    }
                }
                createdPartitionConditionArray[elClickedId][4] = tblerowsRange - 1;
            }

            createdPartitionConditionArray[elClickedId][0] = elClickedId;
            createdPartitionConditionArray[elClickedId][1] = partitionIdInput;
            createdPartitionConditionArray[elClickedId][3] = "Partition Condition";
            createdPartitionConditionArray[elClickedId][5] = subPcId;


        }

        else if (streamType == "defined") {
            var partitionIdInput = document.getElementById("partitionIdInput").value;
            var partitionConditionElementID = clickedId;

            var tablevar = document.getElementById('tableVariablePartitionConditionDisplay');
            var tableran = document.getElementById('tableRangePartitionConditionDisplay');

            if (tableran == null) {
                var tblerows = (tablevar.rows.length);
                createdPartitionConditionArray[elClickedId][2] = new Array(tblerows);

                for (r = 1; r < tblerows; r++) {
                    for (var c = 0; c < 1; c++) {
                        var attrNm = tablevar.rows[r].cells[c].innerHTML;
                        createdPartitionConditionArray[elClickedId][2][r - 1] = new Array(2);
                        createdPartitionConditionArray[elClickedId][2][r - 1][0] = attrNm;

                        for (var x = 0; x < createdDefinedStreamArray[fromStreamIndex][2].length; x++) {
                            if (createdDefinedStreamArray[fromStreamIndex][2][x][0] == attrNm) {
                                createdPartitionConditionArray[elClickedId][2][r - 1][1] = createdDefinedStreamArray[fromStreamIndex][2][x][1];
                            }

                        }

                        alert("Attr name: " + createdPartitionConditionArray[elClickedId][2][r - 1][0] + "\nAttr type: " + createdPartitionConditionArray[elClickedId][2][r - 1][1]);
                    }

                }
                createdPartitionConditionArray[elClickedId][4] = tblerows - 1;
            }
            else {
                var tblerowsRange = (tableran.rows.length);
                createdPartitionConditionArray[elClickedId][2] = new Array(tblerowsRange);

                for (r = 1; r < tblerowsRange; r++) {
                    for (var c = 0; c < 1; c++) {
                        var range = tableran.rows[r].cells[c].innerHTML;
                        createdPartitionConditionArray[elClickedId][2][r - 1] = new Array(2);
                        createdPartitionConditionArray[elClickedId][2][r - 1][0] = range;
                        createdPartitionConditionArray[elClickedId][2][r - 1][1] = null;

                        alert("Attr name: " + createdPartitionConditionArray[elClickedId][2][r - 1][0] + "\nAttr type: " + createdPartitionConditionArray[elClickedId][2][r - 1][1]);
                    }
                }
                createdPartitionConditionArray[elClickedId][4] = tblerowsRange - 1;
            }


            createdPartitionConditionArray[elClickedId][0] = elClickedId;
            createdPartitionConditionArray[elClickedId][1] = partitionIdInput;
            createdPartitionConditionArray[elClickedId][3] = "Partition Condition";
            createdPartitionConditionArray[elClickedId][4] = createdDefinedStreamArray[fromStreamIndex][2].length;
            createdPartitionConditionArray[elClickedId][5] = subPcId;



        }
        else if (streamType == "window") {

        }
        else {
            alert("This type of element cannot be connected to a partition condition");
        }

        alert("Element Id: " + createdPartitionConditionArray[elClickedId][0] + "\nName: " + createdPartitionConditionArray[elClickedId][1] + "\nDef: " + createdPartitionConditionArray[elClickedId][3] + "\ntable Rows: " + createdPartitionConditionArray[elClickedId][4]+ "\nSub pc id: " + createdPartitionConditionArray[elClickedId][5]);
        $("#container").removeClass("disabledbutton");
        $("#toolbox").removeClass("disabledbutton");
        document.getElementById(clickedId).innerHTML=partitionIdInput;
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

    function partitiontypeGenerate(streamType,selctedSt,fromStreamIndex,defAttrNum, type)
    {
        var attributes = [];
        alert("fromStreamIndex:"+fromStreamIndex);

        if(streamType=="import" || streamType=="export")
        {
            var predefarr = PredefinedStreams();
            for(var x = 0; x<predefarr.length; x++)
            {
                if (predefarr[x][0] == selctedSt)
                {
                    for(var n=0; n<predefarr[x][1].length;n++)
                    {
                        attributes.push(predefarr[x][1][n]);
                    }
                }
            }
        }
        else if(streamType=="defined")
        {
            for(var m=0;m<defAttrNum-1;m++)
            {
                attributes.push(createdDefinedStreamArray[fromStreamIndex][2][m][0]);
            }
        }
        else
        {
            if(type==null) 
            {
                for (var m = 0; m < defAttrNum - 1; m++)
                {
                    attributes.push(createdWindowStreamArray[fromStreamIndex][4][m][0]);
                }
                
            }
            else 
            {
                //alert("Define method");
                for (var m = 0; m < defAttrNum - 1; m++)
                {
                    attributes.push(createdWindowStreamArray[fromStreamIndex][4][m][0]);
                }
            }
        }

        return attributes;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var tableVariablePartitionConditionDisplay = document.createElement('table');
    tableVariablePartitionConditionDisplay.id = "tableVariablePartitionConditionDisplay";
    tableVariablePartitionConditionDisplay.className = "tableVariablePartitionConditionDisplay";
    var tr = document.createElement('tr');
    var tdVarPartitionTypeTitle = document.createElement('td');
    var tdVarPartitionTypeDelete   = document.createElement('td');
    tdVarPartitionTypeTitle.innerHTML = "Partition Type";
    tdVarPartitionTypeDelete.innerHTML = "Delete";
    tr.appendChild(tdVarPartitionTypeTitle);
    tr.appendChild(tdVarPartitionTypeDelete);
    tableVariablePartitionConditionDisplay.appendChild(tr);


    function addVariablePartitionTypeToTable()
    {
        var tr = document.createElement('tr');
        var choice=document.getElementById("partitionTypeComboForPartition");
        var partitionTypeCombo = choice.options[choice.selectedIndex].text;

        var trow = document.createElement('tr');
        var tdPartitionType = document.createElement('td');
        var tdDelete   = document.createElement('td');

        var partitionType = document.createTextNode(partitionTypeCombo);
        var deletebtn =  document.createElement("button");
        deletebtn.type="button";
        deletebtn.id ="deletebtn";
        var text3= "<img src='../Images/Delete.png'>";
        deletebtn.innerHTML = text3;
        deletebtn.onclick = function() {
            deleteRowForVariablePartition(this);
        };

        tdPartitionType.appendChild(partitionType);
        tdDelete.appendChild(deletebtn);
        trow.appendChild(tdPartitionType);
        trow.appendChild(tdDelete);
        tableVariablePartitionConditionDisplay.appendChild(trow);
        variablePartitionTypeTableDisplayDiv.appendChild(tableVariablePartitionConditionDisplay);
        $(".variablePartitionTypeTableDisplayDiv").show();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var tableRangePartitionConditionDisplay = document.createElement('table');
    tableRangePartitionConditionDisplay.id = "tableRangePartitionConditionDisplay";
    tableRangePartitionConditionDisplay.className = "tableRangePartitionConditionDisplay";
    var tr = document.createElement('tr');
    var tdRanPartitionTypeTitle = document.createElement('td');
    var tdRanPartitionTypeDelete   = document.createElement('td');
    tdRanPartitionTypeTitle.innerHTML = "Partition Type";
    tdRanPartitionTypeDelete.innerHTML = "Delete";
    tr.appendChild(tdRanPartitionTypeTitle);
    tr.appendChild(tdRanPartitionTypeDelete);
    tableRangePartitionConditionDisplay.appendChild(tr);


    function addRangePartitionTypeToTable()
    {
        var tr = document.createElement('tr');
        var choice=document.getElementById("rangePartitionTypeInput").value;

        var trow = document.createElement('tr');
        var tdPartitionType = document.createElement('td');
        var tdDelete   = document.createElement('td');

        var partitionType = document.createTextNode(choice);
        var deletebtn =  document.createElement("button");
        deletebtn.type="button";
        deletebtn.id ="deletebtn";
        var text3= "<img src='../Images/Delete.png'>";
        deletebtn.innerHTML = text3;
        deletebtn.onclick = function() {
            deleteRowForRangePartition(this);
        };

        tdPartitionType.appendChild(partitionType);
        tdDelete.appendChild(deletebtn);
        trow.appendChild(tdPartitionType);
        trow.appendChild(tdDelete);
        tableRangePartitionConditionDisplay.appendChild(trow);
        rangePartitionTypeTableDisplayDiv.appendChild(tableRangePartitionConditionDisplay);
        $(".rangePartitionTypeTableDisplayDiv").show();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     *
     * @param newAgent
     * @param i
     * @param e
     * @description Drops the join query element as its in connector can permit 2 connections and its out connector can permit only one connection
     *
     */

    function dropCompleteJoinQueryElement(newAgent,i,e,topP,left)
    {
        $(droppedElement).draggable({containment: "container"});

        var finalElement =  newAgent;
        r++; q++;

        var connectionIn = $('<div class="connectorIn">').attr('id', i + '-in').addClass('connection').text("in");
        var connectionOut = $('<div class="connectorOut">').attr('id', i + '-out').addClass('connection').text('out');

        finalElement.css({
            'top': topP,
            'left': left
        });

        finalElement.append(connectionIn);
        finalElement.append(connectionOut);

        $('#container').append(finalElement);

        jsPlumb.draggable(finalElement, {
            containment: 'parent'
        });

        jsPlumb.makeTarget(connectionIn, {
            anchor: 'Continuous',
            maxConnections:2
        });

        jsPlumb.makeSource(connectionOut, {
            anchor: 'Continuous',
            maxConnections:1
        });

        var myNode = document.getElementById("lot");
        var fc = myNode.firstChild;

        while( fc ) {
            myNode.removeChild( fc );
            fc = myNode.firstChild;
        }

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     *
     * @param newAgent
     * @param i
     * @param e
     * @description Drops the stte machine query element as its in connector can permit multiple connections and its out connector can permit only one connection
     *
     */

    function dropCompleteStateMQueryElement(newAgent,i,e,topP,left)
    {
        $(droppedElement).draggable({containment: "container"});

        var finalElement =  newAgent;
        r++; q++;

        var connectionIn = $('<div class="connectorIn">').attr('id', i + '-in').addClass('connection').text("in");
        var connectionOut = $('<div class="connectorOut">').attr('id', i + '-out').addClass('connection').text('out');

        finalElement.css({
            'top': topP,
            'left': left
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
            anchor: 'Continuous',
            maxConnections:1
        });

        var myNode = document.getElementById("lot");
        var fc = myNode.firstChild;

        while( fc ) {
            myNode.removeChild( fc );
            fc = myNode.firstChild;
        }

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        var fromStreamId, intoStreamId;

        function getConnectionDetails(element)
        {
            var arr = element.id.match(/-prop(.*)/);
            if (arr != null) {
                droptype = arr[1];
            }
            var clickedId =  element.id;
            var elementID=clickedId = clickedId.charAt(0);
            var from = clickedId+"-out";
            var from1 = clickedId;
            clickedId = clickedId+"-in";
            var con=jsPlumb.getAllConnections();
            var list=[];
            for(var i=0;i<con.length;i++)
            {
                if(con[i].targetId==clickedId)
                {
                    list[i] = new Array(2);
                    list[i][0] = con[i].sourceId;
                    fromStreamId =list[i][0];
                    list[i][1] = con[i].targetId;
                }

                if(con[i].sourceId==from || con[i].sourceId==from1 ||true)
                {
                    list[i] = new Array(2);
                    list[i][0] = con[i].sourceId;
                    list[i][1] = con[i].targetId;
                    intoStreamId =list[i][1];
                }
            }
            intoStreamId = intoStreamId.charAt(0);
            getFromStreamName(fromStreamId,intoStreamId,elementID);
        }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    function getConnectionDetailsForWindow(element)
    {
        var fromStreamIdForWindow;
        var clickedId =  element.id;
        var elementIdentity= element.id;
        var elementID=clickedId = clickedId.charAt(0);
        clickedId = clickedId+"-in";
        var con=jsPlumb.getAllConnections();
        var list=[];
        for(var i=0;i<con.length;i++)
        {
            if(con[i].targetId==clickedId)
            {
                list[i] = new Array(2);
                list[i][0] = con[i].sourceId;
                fromStreamIdForWindow =list[i][0];
                list[i][1] = con[i].targetId;
            }
        }
        if(fromStreamIdForWindow==undefined || fromStreamIdForWindow==null)
        {
            createWindowDefinitionForm(elementIdentity);
        }
        else
        {
            // alert(fromStreamIdForWindow);
            fromStreamIdForWindow = fromStreamIdForWindow.charAt(0);
            getFromStreamNameForWindow(fromStreamIdForWindow,elementID);
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var attrName1 = document.createElement("label");
    var attrType1= document.createElement("label");
    var closeattr1= document.createElement("button");

    var table1 = document.createElement('table');
    table1.id = "attrtableForWindow";
    table1.className = "attrtableForWindow";
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
    table1.appendChild(tr);

    /**
     * @function Append Added attributes to the display table
     */

    function showAttributesForWindowInTable()
    {
        var tr = document.createElement('tr');
        var attributeName = document.getElementById("DefForWindowAttrInput").value;
        var choice=document.getElementById("attrTypeComboForWindow");
        var attrTypeCombo = choice.options[choice.selectedIndex].text;

        DefWindowAttrTableDiv.appendChild(attrName1);
        DefWindowAttrTableDiv.appendChild(attrType1);
        DefWindowAttrTableDiv.appendChild(closeattr1);

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
            deleteRowForWindow(this);
        };

        tdAttrName.appendChild(text1);
        tdAttrType.appendChild(text2);
        tdDelete.appendChild(deletebtn);
        tr.appendChild(tdAttrName);
        tr.appendChild(tdAttrType);
        tr.appendChild(tdDelete);
        table1.appendChild(tr);
        DefWindowAttrTableDiv.appendChild(table1);

        DefwindowStreamDiv.appendChild(DefCreateWindow);

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @function Create a form to add the Stream Name, Attribute name & type
     */


    function newStreamDef()
    {
        $("#attrtable").empty();
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
        definestreamdiv.appendChild(endStreamDefBtn);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    function createWindowDefinitionForm(i)
    {
        $("#container").addClass("disabledbutton");
        $("#toolbox").addClass("disabledbutton");

        var tableWindowStreamForm = document.createElement('table');
        tableWindowStreamForm.id = "tableWindowStreamForm";
        tableWindowStreamForm.className = "tableWindowStreamForm";

        var predefarr = PredefinedStreams();

        DefwindowStreamDiv=document.createElement("div");
        DefwindowStreamDiv.className="DefwindowStreamDiv";
        DefwindowStreamDiv.id="DefwindowStreamDiv";

        DefWindowAttrTableDiv=document.createElement("div");
        DefWindowAttrTableDiv.className="DefWindowAttrTableDiv";
        DefWindowAttrTableDiv.id="DefWindowAttrTableDiv";

        DefWindowAttrDiv=document.createElement("div");
        DefWindowAttrDiv.className="DefWindowAttrDiv";
        DefWindowAttrDiv.id="DefWindowAttrDiv";

        DefwindowStreamLabel= document.createElement("label");
        DefwindowStreamLabel.className="DefwindowStreamLabel";
        DefwindowStreamLabel.id="DefwindowStreamLabel";
        DefwindowStreamLabel.innerHTML='Define Window';

        EmptyLabel= document.createElement("label");
        EmptyLabel.id ="EmptyLabel";
        EmptyLabel.className ="EmptyLabel";
        EmptyLabel.innerHTML = "";


        DefForWindowLabel= document.createElement("label");
        DefForWindowLabel.id ="DefForWindowLabel";
        DefForWindowLabel.className ="DefForWindowLabel";
        DefForWindowLabel.innerHTML = "Window Name: ";

        DefNameForWindow= document.createElement("input");
        DefNameForWindow.id ="DefNameForWindow";
        DefNameForWindow.className ="DefNameForWindow";

        DefAddAttributes=document.createElement("button");
        DefAddAttributes.type="button";
        DefAddAttributes.className="DefAddAttributes";
        DefAddAttributes.id="DefAddAttributes";
        DefAddAttributes.innerHTML="Add Atribute";
        DefAddAttributes.onclick = function () {
            addAttributeForWindow();
        };

        DefCreateWindow=document.createElement("button");
        DefCreateWindow.type="button";
        DefCreateWindow.className="DefCreateWindow";
        DefCreateWindow.id="DefCreateWindow";
        DefCreateWindow.innerHTML="Create Window";
        DefCreateWindow.onclick = function () {
            CreateWindow(i);
        };

        // Row 1

        var tr1 = document.createElement('tr');
        var td1=document.createElement('td');

        td1.appendChild(DefwindowStreamLabel);
        tr1.appendChild(td1);
        tableWindowStreamForm.appendChild(tr1);

        // Row 2

        var tr2 = document.createElement('tr');
        var td2=document.createElement('td');
        var td3=document.createElement('td');

        td2.appendChild(DefForWindowLabel);
        tr2.appendChild(td2);
        td3.appendChild(DefNameForWindow);
        tr2.appendChild(td3);
        tableWindowStreamForm.appendChild(tr2);

        // Row 3

        var tr3 = document.createElement('tr');
        var td4=document.createElement('td');
        var td5=document.createElement('td');

        td4.appendChild(EmptyLabel);
        tr3.appendChild(td4);
        td5.appendChild(DefAddAttributes);
        tr3.appendChild(td5);
        tableWindowStreamForm.appendChild(tr3);

        DefwindowStreamDiv.appendChild(tableWindowStreamForm);
        DefwindowStreamDiv.appendChild(DefWindowAttrTableDiv);

        lot.appendChild(DefwindowStreamDiv);

        $(".toolbox-titlex").show();
        $(".panel").show();

    }


    function CreateWindow(elementID)
    {
        elementID = elementID.charAt(0);
        var table = document.getElementById('attrtableForWindow');
        var tblerows = (table.rows.length);

        var windowInput = document.getElementById("DefNameForWindow").value;

        createdWindowStreamArray[elementID][0] = elementID;
        createdWindowStreamArray[elementID][1] = windowInput;
        createdWindowStreamArray[elementID][2] = null;
        createdWindowStreamArray[elementID][3] = null;
        createdWindowStreamArray[elementID][4] = new Array(tblerows);

        for (var r = 1; r < tblerows; r++)
        {
            for (var c = 0; c < 1; c++)
            {
                var attrNm = table.rows[r].cells[c].innerHTML;
                var attrTp = table.rows[r].cells[1].innerHTML;
                createdWindowStreamArray[elementID][4][r-1] = [];
                createdWindowStreamArray[elementID][4][r-1][0] = attrNm;
                createdWindowStreamArray[elementID][4][r-1][1] = attrTp;
            }
        }
        alert("Element ID:"+createdWindowStreamArray[elementID][0]+"\nElement Name:"+createdWindowStreamArray[elementID][1]+"\nSelected Stream Index:"+createdWindowStreamArray[elementID][2]+"\nSelected Stream:"+createdWindowStreamArray[elementID][3]);


        var elIdforNode =  elementID+"-windowNode";
        document.getElementById(elIdforNode).innerHTML = windowInput;

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


    function addAttributeForWindow()
    {
        DefWindowAttrDiv=document.createElement("div");
        DefWindowAttrDiv.className="DefWindowAttrDiv";
        DefWindowAttrDiv.id="DefWindowAttrDiv";

        var tableWindowStreamForm = document.createElement('table');
        tableWindowStreamForm.id = "tableWindowStreamForm";
        tableWindowStreamForm.className = "tableWindowStreamForm";

        DefWindowAttrTypeComboDiv=document.createElement("div");
        DefWindowAttrTypeComboDiv.className="DefWindowAttrTypeComboDiv";
        DefWindowAttrTypeComboDiv.id="DefWindowAttrTypeComboDiv";

        DefForWindowAttrLabel= document.createElement("label");
        DefForWindowAttrLabel.id ="DefForWindowAttrLabel";
        DefForWindowAttrLabel.className ="DefForWindowAttrLabel";
        DefForWindowAttrLabel.innerHTML = "Attribute Name: ";

        EmptyLabel= document.createElement("label");
        EmptyLabel.id ="EmptyLabel";
        EmptyLabel.className ="EmptyLabel";
        EmptyLabel.innerHTML = "";

        DefForWindowAttrInput= document.createElement("input");
        DefForWindowAttrInput.id ="DefForWindowAttrInput";
        DefForWindowAttrInput.className ="DefForWindowAttrInput";

        DefForWindowAttrTypeLabel= document.createElement("label");
        DefForWindowAttrTypeLabel.id ="DefForWindowAttrTypeLabel";
        DefForWindowAttrTypeLabel.className ="DefForWindowAttrTypeLabel";
        DefForWindowAttrTypeLabel.innerHTML = "Attribute Type: ";

        var html = '<select id="attrTypeComboForWindow">', attrtypes = typeGenerate(), i;
        for(i = 0; i < attrtypes.length; i++) {
            html += "<option value='"+attrtypes[i]+"'>"+attrtypes[i]+"</option>";
        }
        html += '</select>';

        DefWindowAttrTypeComboDiv.innerHTML = html;

        DefAddAttributesToTablebtn=document.createElement("button");
        DefAddAttributesToTablebtn.type="button";
        DefAddAttributesToTablebtn.className="DefAddAttributesToTablebtn";
        DefAddAttributesToTablebtn.id="DefAddAttributesToTablebtn";
        DefAddAttributesToTablebtn.innerHTML="Add";
        DefAddAttributesToTablebtn.onclick = function () {
            showAttributesForWindowInTable();
        };

        // Row 1

        var tr1 = document.createElement('tr');
        var td1=document.createElement('td');
        var td2=document.createElement('td');

        td1.appendChild(DefForWindowAttrLabel);
        tr1.appendChild(td1);
        td2.appendChild(DefForWindowAttrInput);
        tr1.appendChild(td2);
        tableWindowStreamForm.appendChild(tr1);

        // Row 2

        var tr2 = document.createElement('tr');
        var td3=document.createElement('td');
        var td4=document.createElement('td');

        td3.appendChild(DefForWindowAttrTypeLabel);
        tr2.appendChild(td3);
        td4.appendChild(DefWindowAttrTypeComboDiv);
        tr2.appendChild(td4);
        tableWindowStreamForm.appendChild(tr2);

        // Row 3

        var tr3 = document.createElement('tr');
        var td5=document.createElement('td');
        var td6=document.createElement('td');

        td5.appendChild(EmptyLabel);
        tr3.appendChild(td5);
        td6.appendChild(DefAddAttributesToTablebtn);
        tr3.appendChild(td6);
        tableWindowStreamForm.appendChild(tr3);

        DefWindowAttrDiv.appendChild(tableWindowStreamForm);
        DefwindowStreamDiv.appendChild(DefWindowAttrDiv);

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function getFromStreamName(fromId,intoId,elementID)
    {

        var fromNameSt, intoNameSt, streamType, selctedSt;
        var fromStreamIndex,intoStreamIndex;
        var attrList = [];
        var elClickedId= fromId.substr(0, fromId.indexOf('-'));
        var subPcId= fromId.substr(fromId.indexOf("c") + 1);
        var idTest=/^\d+-pc\d+$/.test(fromId);

            fromId = fromId.charAt(0);
            for (var x = 0; x < 100; x++)
            {
                //To retrieve the 'from Stream' Name
                if(idTest==false)
                {
                    if (createdImportStreamArray[x][0] == fromId) {
                        fromNameSt = createdImportStreamArray[x][2];
                        fromStreamIndex = x;
                    }
                    else if (createdExportStreamArray[x][0] == fromId) {
                        fromNameSt = createdExportStreamArray[x][2];
                        fromStreamIndex = x;
                    }
                    else if (createdDefinedStreamArray[x][0] == fromId) {
                        fromNameSt = createdDefinedStreamArray[x][1];
                        fromStreamIndex = x;
                    }
                    else if (createdWindowStreamArray[x][0] == fromId) {
                        fromNameSt = createdWindowStreamArray[x][1];
                        fromStreamIndex = x;
                    }
                }
                else
                {
                    if (createdPartitionConditionArray[x][0]==elClickedId && createdPartitionConditionArray[x][5]==subPcId)
                    {
                        fromNameSt = createdPartitionConditionArray[x][1];
                        fromStreamIndex = x;
                    }
                }

                //To retrieve the 'into Stream' Name
                if (createdImportStreamArray[x][0] == intoId)
                {
                    intoNameSt = createdImportStreamArray[x][2];
                    streamType = "import";
                    selctedSt = createdImportStreamArray[x][1];
                    intoStreamIndex = x;
                }
                else if (createdExportStreamArray[x][0] == intoId)
                {
                    intoNameSt = createdExportStreamArray[x][2];
                    streamType = "export";
                    selctedSt = createdExportStreamArray[x][1];
                    intoStreamIndex = x;
                }
                else if (createdDefinedStreamArray[x][0] == intoId)
                {
                    intoNameSt = createdDefinedStreamArray[x][1];
                    streamType = "defined";
                    intoStreamIndex = x;
                    var defAttrNum = createdDefinedStreamArray[x][2].length;
                }
                else if (createdWindowStreamArray[x][0] == intoId)
                {
                    intoNameSt = createdWindowStreamArray[x][1];
                    streamType = "window";
                    intoStreamIndex = x;
                    var defAttrNum = createdWindowStreamArray[x][4].length;
                }


            }

        //To retrieve the number of attributes
        getAttributes(selctedSt);
        //attrNumber gives the number of attributes
        //streamInd gives the index of the selected stream
        if(droptype=="squerydrop") 
        {
            createQueryForm(elementID, fromNameSt, intoNameSt, fromStreamIndex, intoStreamIndex, streamType, defAttrNum, "Filter Query");
        }
        else if (droptype=="filterdrop") 
        {
            createQueryForm(elementID, fromNameSt, intoNameSt, fromStreamIndex, intoStreamIndex, streamType, defAttrNum, "Pass-through Query");
        }
        else if(droptype=="wquerydrop")
        {
            createWindowQueryForm(elementID, fromNameSt, intoNameSt, fromStreamIndex, intoStreamIndex, streamType, defAttrNum);
        }

    }

    function getFromStreamNameForWindow(fromStreamId,elementID)
    {
        var fromNameSt, selctedSt,streamType;
        var fromStreamIndex;
        var predefarr = PredefinedStreams();
        var lengthPreDef = predefarr.length;

        //alert("array legth:"+lengthPreDef);
        for(var x = 0; x<100; x++)
        {
            //To retrieve the 'from Stream' Name
            if(createdImportStreamArray[x][0]==fromStreamId)
            {
                fromNameSt = createdImportStreamArray[x][2];
                selctedSt = createdImportStreamArray[x][1];
                streamType = "import";

                for(var f =0; f<lengthPreDef; f++)
                {
                    if(predefarr[f][0]==selctedSt)
                    {
                        fromStreamIndex =f;
                    }
                }
            }
            else if(createdExportStreamArray[x][0]==fromStreamId)
            {
                fromNameSt = createdExportStreamArray[x][2];
                selctedSt = createdExportStreamArray[x][1];
                streamType = "export";
                for(var f =0; f<lengthPreDef; f++)
                {
                    if(predefarr[f][0]==selctedSt)
                    {
                        fromStreamIndex =f;
                    }
                }
            }
            else if(createdDefinedStreamArray[x][0]==fromStreamId)
            {
                fromNameSt = createdDefinedStreamArray[x][1];

                var defAttrNum = createdDefinedStreamArray[x][2].length;
                streamType = "defined";
                fromStreamIndex =createdDefinedStreamArray[x][0];
            }

        }
        //To retrieve the number of attributes
        getAttributes(selctedSt);
        //attrNumber gives the number of attributes
        //streamInd gives the index of the selected stream
        createWindowStreamForm(elementID, fromNameSt,fromStreamIndex,streamType, defAttrNum);
    }

    function createWindowStreamForm(elementID, fromNameSt,fromStreamIndex,streamType, defAttrNum)
    {
        $("#container").addClass("disabledbutton");
        $("#toolbox").addClass("disabledbutton");

        var tableWindowStreamForm = document.createElement('table');
        tableWindowStreamForm.id = "tableWindowStreamForm";
        tableWindowStreamForm.className = "tableWindowStreamForm";

        windowStreamDiv=document.createElement("div");
        windowStreamDiv.className="windowStreamDiv";
        windowStreamDiv.id="windowStreamDiv";

        var predefarr = PredefinedStreams();

        windowStreamDiv=document.createElement("div");
        windowStreamDiv.className="windowStreamDiv";
        windowStreamDiv.id="windowStreamDiv";

        windowStreamLabel= document.createElement("label");
        windowStreamLabel.className="windowStreamLabel";
        windowStreamLabel.id="windowStreamLabel";
        windowStreamLabel.innerHTML='Window';

        selectedStreamForWindowLabel= document.createElement("label");
        selectedStreamForWindowLabel.id ="selectedStreamForWindowLabel";
        selectedStreamForWindowLabel.className ="selectedStreamForWindowLabel";
        selectedStreamForWindowLabel.innerHTML = "Selected Stream: ";

        selectedStreamForWindow= document.createElement("label");
        selectedStreamForWindow.id ="selectedStreamForWindow";
        selectedStreamForWindow.className ="selectedStreamForWindow";
        selectedStreamForWindow.innerHTML = fromNameSt;

        windowStreamName= document.createElement("label");
        windowStreamName.id ="windowStreamName";
        windowStreamName.className ="windowStreamName";
        windowStreamName.innerHTML = "Window name";

        windowStreamNameInput= document.createElement("input");
        windowStreamNameInput.id = "windowStreamNameInput";
        windowStreamNameInput.className = "windowStreamNameInput";

        windowStreamFormButton=document.createElement("button");
        windowStreamFormButton.type="button";
        windowStreamFormButton.className="windowStreamFormButton";
        windowStreamFormButton.id="windowStreamFormButton";
        windowStreamFormButton.innerHTML="Submit";
        windowStreamFormButton.onclick = function () {
            getwindowStreamData(elementID, fromStreamIndex,streamType, defAttrNum);
        };

        windowStreamFomCloseButton=document.createElement("button");
        windowStreamFomCloseButton.type="button";
        windowStreamFomCloseButton.className="windowStreamFomCloseButton";
        windowStreamFomCloseButton.id="windowStreamFomCloseButton";
        windowStreamFomCloseButton.innerHTML="Cancel";
        windowStreamFomCloseButton.onclick = function() {
            closeForm();
        };

        windowStreamDiv.appendChild(windowStreamLabel);

        //Row 1

        var tr1 = document.createElement('tr');
        var td1=document.createElement('td');
        var td2=document.createElement('td');

        td1.appendChild(selectedStreamForWindowLabel);
        tr1.appendChild(td1);
        td2.appendChild(selectedStreamForWindow);
        tr1.appendChild(td2);
        tableWindowStreamForm.appendChild(tr1);

        //Row 2

        var tr2 = document.createElement('tr');
        var td3=document.createElement('td');
        var td4=document.createElement('td');

        td3.appendChild(windowStreamName);
        tr2.appendChild(td3);
        td4.appendChild(windowStreamNameInput);
        tr2.appendChild(td4);
        tableWindowStreamForm.appendChild(tr2);

        //Row 3

        var tr3 = document.createElement('tr');
        var td5=document.createElement('td');
        var td6=document.createElement('td');

        td5.appendChild(windowStreamFormButton);
        tr3.appendChild(td5);
        td6.appendChild(windowStreamFomCloseButton);
        tr3.appendChild(td6);
        tableWindowStreamForm.appendChild(tr3);

        windowStreamDiv.appendChild(tableWindowStreamForm);
        lot.appendChild(windowStreamDiv);

        $(".toolbox-titlex").show();
        $(".panel").show();

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function getwindowStreamData(elementID, fromStreamIndex,streamType, defAttrNum)
    {
        var windowStreamName = document.getElementById("selectedStreamForWindow").innerHTML;
        var windowInput = document.getElementById("windowStreamNameInput").value;
        var predefarr = PredefinedStreams();
        createdWindowStreamArray[elementID][0] = elementID;
        createdWindowStreamArray[elementID][1] = windowInput;
        createdWindowStreamArray[elementID][2] = fromStreamIndex;
        createdWindowStreamArray[elementID][3] = windowStreamName;
        createdWindowStreamArray[elementID][4] = [];

        //alert("Element ID:"+createdWindowStreamArray[elementID][0]+"\nElement Name:"+createdWindowStreamArray[elementID][1]+"\nSelected Stream Index:"+createdWindowStreamArray[elementID][2]+"\nSelected Stream:"+createdWindowStreamArray[elementID][3]);
        if(streamType=="import" || streamType=="export")
        {
            for (var f = 0; f < attrNumber; f++)
            {
                createdWindowStreamArray[elementID][4][f]=[];
                createdWindowStreamArray[elementID][4][f][0] = predefarr[fromStreamIndex][1][f];
                createdWindowStreamArray[elementID][4][f][1] = predefarr[fromStreamIndex][2][f];
                //alert("Attribute: "+createdWindowStreamArray[elementID][4][f][0]+"\nAttribute Type:"+createdWindowStreamArray[elementID][4][f][1]);
            }
        }
        else
        {
            for (var f =0; f<defAttrNum-1;f++)
            {
                createdWindowStreamArray[elementID][4][f]=[];
                createdWindowStreamArray[elementID][4][f][0] = createdDefinedStreamArray[fromStreamIndex][2][f][0];
                createdWindowStreamArray[elementID][4][f][1] = createdDefinedStreamArray[fromStreamIndex][2][f][1];
                //alert("Attribute: "+createdWindowStreamArray[elementID][4][f][0]+"\nAttribute Type:"+createdWindowStreamArray[elementID][4][f][1]);
            }
        }

        var elIdforNode =  elementID+"-windowNode";
        document.getElementById(elIdforNode).innerHTML = windowInput;

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

    var queryDiv;
    var simpleQueryLabel, simpleQueryName,queryNameInput, fromStreamLabel, fromStream, filterLabel,filterInput, selectLabel, insertIntoLabel, insertIntoStream;
    var inputtxtName;
    var inputlblName
    var queryFomButton;



    function createQueryForm(elementID,fromNameSt,intoNameSt, fromStreamIndex,intoStreamIndex,streamType,defAttrNum,formHeading)
    {
        $("#container").addClass("disabledbutton");
        $("#toolbox").addClass("disabledbutton");
        var tableQueryForm = document.createElement('table');
        tableQueryForm.id = "tableQueryForm";
        tableQueryForm.className = "tableQueryForm";
        var predefarr = PredefinedStreams();

        queryDiv=document.createElement("div");
        queryDiv.className="queryDiv";
        queryDiv.id="queryDiv";

        simpleQueryLabel= document.createElement("label");
        simpleQueryLabel.className="simpleQueryLabel";
        simpleQueryLabel.id="simpleQueryLabel";
        simpleQueryLabel.innerHTML=formHeading;

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
        fromStream.innerHTML = fromNameSt;

        if(droptype=="squerydrop")
        {
            filterLabel = document.createElement("label");
            filterLabel.className = "filterLabel";
            filterLabel.id = "filterLabel";
            filterLabel.innerHTML = "Filter: ";

            filterInput = document.createElement("input");
            filterInput.id = "filterInput";
            filterInput.className = "filterInput";
            filterInput.innerHTML = "";
        }

        selectLabel= document.createElement("label");
        selectLabel.className="selectLabel";
        selectLabel.id="selectLabel";
        selectLabel.innerHTML= "Select : ";

        insertIntoLabel=document.createElement("label");
        insertIntoLabel.className="insertIntoLabel";
        insertIntoLabel.id="insertIntoLabel";
        insertIntoLabel.innerHTML="insert into: ";

        insertIntoStream=document.createElement("label");
        insertIntoStream.className="insertIntoStream";
        insertIntoStream.id="insertIntoStream";
        insertIntoStream.innerHTML=intoNameSt;

        queryFomButton=document.createElement("button");
        queryFomButton.type="button";
        queryFomButton.className="queryFormButton";
        queryFomButton.id="queryFormButton";
        queryFomButton.innerHTML="Submit Query";
        queryFomButton.onclick = function () {
            if(droptype=="squerydrop")
            {
                getFilterQueryData(elementID,fromNameSt,intoNameSt, fromStreamIndex,intoStreamIndex,streamType,defAttrNum);
            }
            else if(droptype=="filterdrop")
            {
                getPassThroughQueryData(elementID,fromNameSt,intoNameSt, fromStreamIndex,intoStreamIndex,streamType,defAttrNum);
            }
        };

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

        if(droptype=="squerydrop") 
        {
            var tr3 = document.createElement('tr');
            var td5 = document.createElement('td');
            var td6 = document.createElement('td');

            td5.appendChild(filterLabel);
            tr3.appendChild(td5);
            td6.appendChild(filterInput);
            tr3.appendChild(td6);
            tableQueryForm.appendChild(tr3);
        }
        //Row 4

        var tr4 = document.createElement('tr');
        var td7=document.createElement('td');

        td7.appendChild(selectLabel);
        tr4.appendChild(td7);
        tableQueryForm.appendChild(tr4);

        //Row 5
        if(streamType=="import" || streamType=="export")
        {
            for (var f = 0; f < attrNumber; f++)
            {
                inputtxtName = document.createElement("input");
                inputtxtName.className = "input" + f;
                inputtxtName.id = "input" + f;

                var aslblName = document.createElement("label");
                aslblName.innerHTML = " as ";

                inputlblName = document.createElement("label");
                inputlblName.innerHTML = predefarr[streamInd][1][f];
                inputlblName.className = "label" + f;
                inputlblName.id = "label" + f;

                var trName = document.createElement('tr');

                var tdName1 = document.createElement('td');
                tdName1.appendChild(inputtxtName);
                trName.appendChild(tdName1);

                var tdName2 = document.createElement('td');
                tdName2.appendChild(aslblName);
                trName.appendChild(tdName2);

                var tdName3 = document.createElement('td');
                tdName3.appendChild(inputlblName);
                trName.appendChild(tdName3);

                tableQueryForm.appendChild(trName);
            }
        }
        else if(streamType=="defined")
        {
            for (var f =0; f<defAttrNum-1;f++)
            {
                    inputtxtName = document.createElement("input");
                    inputtxtName.className = "input" + f;
                    inputtxtName.id = "input" + f;

                    var aslblName = document.createElement("label");
                    aslblName.innerHTML = " as ";

                    inputlblName = document.createElement("label");
                    inputlblName.className = "label" + f;
                    inputlblName.id = "label" + f;
                    inputlblName.innerHTML = createdDefinedStreamArray[intoStreamIndex][2][f][0];
                    var trName = document.createElement('tr');

                    var tdName1 = document.createElement('td');
                    tdName1.appendChild(inputtxtName);
                    trName.appendChild(tdName1);

                    var tdName2 = document.createElement('td');
                    tdName2.appendChild(aslblName);
                    trName.appendChild(tdName2);

                    var tdName3 = document.createElement('td');
                    tdName3.appendChild(inputlblName);
                    trName.appendChild(tdName3);

                    tableQueryForm.appendChild(trName);

            }
        }
        else
        {
            for (var f =0; f<defAttrNum;f++)
            {
                inputtxtName = document.createElement("input");
                inputtxtName.className = "input" + f;
                inputtxtName.id = "input" + f;

                var aslblName = document.createElement("label");
                aslblName.innerHTML = " as ";

                inputlblName = document.createElement("label");
                inputlblName.className = "label" + f;
                inputlblName.id = "label" + f;
                inputlblName.innerHTML = createdWindowStreamArray[intoStreamIndex][4][f][0];
                var trName = document.createElement('tr');

                var tdName1 = document.createElement('td');
                tdName1.appendChild(inputtxtName);
                trName.appendChild(tdName1);

                var tdName2 = document.createElement('td');
                tdName2.appendChild(aslblName);
                trName.appendChild(tdName2);

                var tdName3 = document.createElement('td');
                tdName3.appendChild(inputlblName);
                trName.appendChild(tdName3);

                tableQueryForm.appendChild(trName);

            }
        }

        //Row attrnum+5


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

    function getFilterQueryData(elementID,fromNameSt,intoNameSt, fromStreamIndex,intoStreamIndex,streamType,defAttrNum)
    {
        var queryName = document.getElementById("queryNameInput").value;
        var Simplefilter = document.getElementById("filterInput").value;
        createdSimpleQueryArray[elementID][0] = elementID;
        createdSimpleQueryArray[elementID][1] = queryName;
        createdSimpleQueryArray[elementID][2][0] = fromStreamIndex;
        createdSimpleQueryArray[elementID][2][1] = fromNameSt;
        createdSimpleQueryArray[elementID][3] = Simplefilter;
        createdSimpleQueryArray[elementID][4] = [];
        var loopCount=0;
        if(streamType=="import" || streamType=="export")
        {
            loopCount=attrNumber;
        }
        else
        {
            loopCount=defAttrNum;
        }
        for(var r=0; r<loopCount;r++)
        {
            createdSimpleQueryArray[elementID][4][r] =[];
            var inputTextBoxID = "input"+r;
            var attrLabelID = "label" + r;
            createdSimpleQueryArray[elementID][4][r][0] = document.getElementById(inputTextBoxID).value;
            createdSimpleQueryArray[elementID][4][r][1] = document.getElementById(attrLabelID).innerHTML;
        }

        createdSimpleQueryArray[elementID][5][0] = intoStreamIndex;
        createdSimpleQueryArray[elementID][5][1] = intoNameSt;

        var elIdforNode =  elementID+"-nodeInitial";
        document.getElementById(elIdforNode).innerHTML = queryName;
        // document.getElementById(elIdforNode).remove();
        //
        //
        // var node = document.createElement("div");
        // node.id = elementID+"-nodeInitial";
        // var textnode = document.createTextNode(queryName);
        // node.appendChild(textnode);
        // document.getElementById(elementID).appendChild(node);

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

    function getPassThroughQueryData(elementID,fromNameSt,intoNameSt, fromStreamIndex,intoStreamIndex,streamType,defAttrNum)
    {
        var queryName = document.getElementById("queryNameInput").value;
        //var Simplefilter = document.getElementById("filterInput").value;
        createdPassThroughQueryArray[elementID][0] = elementID;
        createdPassThroughQueryArray[elementID][1] = queryName;
        createdPassThroughQueryArray[elementID][2][0] = fromStreamIndex;
        createdPassThroughQueryArray[elementID][2][1] = fromNameSt;
        createdPassThroughQueryArray[elementID][3] = "No filter Defined";
        createdPassThroughQueryArray[elementID][4] = [];
        var loopCount=0;
        if(streamType=="import" || streamType=="export")
        {
            loopCount=attrNumber;
        }
        else
        {
            loopCount=defAttrNum;
        }
        for(var r=0; r<loopCount;r++)
        {
            createdPassThroughQueryArray[elementID][4][r] =[];
            var inputTextBoxID = "input"+r;
            var attrLabelID = "label" + r;
            createdPassThroughQueryArray[elementID][4][r][0] = document.getElementById(inputTextBoxID).value;
            createdPassThroughQueryArray[elementID][4][r][1] = document.getElementById(attrLabelID).innerHTML;
        }

        createdPassThroughQueryArray[elementID][5][0] = intoStreamIndex;
        createdPassThroughQueryArray[elementID][5][1] = intoNameSt;

        var elIdforNode =  elementID+"-nodeInitial";
        document.getElementById(elIdforNode).remove();


        var node = document.createElement("div");
        node.id = elementID+"-nodeInitial";
        var textnode = document.createTextNode(queryName);
        node.appendChild(textnode);
        document.getElementById(elementID).appendChild(node);

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
    var winputtxtName, winputlblName;
    var wqueryFomButton;

    function createWindowQueryForm(elementID, fromNameSt, intoNameSt, fromStreamIndex, intoStreamIndex, streamType, defAttrNum)
    {
        $("#container").addClass("disabledbutton");
        $("#toolbox").addClass("disabledbutton");

        var tableWindowQueryForm = document.createElement('table');
        tableWindowQueryForm.id = "tableWindowQueryForm";
        tableWindowQueryForm.className = "tableWindowQueryForm";

        var predefarr = PredefinedStreams();


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
        wfromStream.innerHTML = fromNameSt;

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

        winsertIntoLabel=document.createElement("label");
        winsertIntoLabel.className="winsertIntoLabel";
        winsertIntoLabel.id="winsertIntoLabel";
        winsertIntoLabel.innerHTML="insert into: ";

        winsertIntoStream=document.createElement("label");
        winsertIntoStream.className="winsertIntoStream";
        winsertIntoStream.id="winsertIntoStream";
        winsertIntoStream.innerHTML=intoNameSt;

        wqueryFomButton=document.createElement("button");
        wqueryFomButton.type="button";
        wqueryFomButton.className="wqueryFomButton";
        wqueryFomButton.id="wqueryFomButton";
        wqueryFomButton.innerHTML="Submit Query";
        wqueryFomButton.onclick = function () {
            getWindowQueryData(elementID,fromNameSt,intoNameSt, fromStreamIndex,intoStreamIndex,streamType,defAttrNum);
        };

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

        if(streamType=="import" || streamType=="export")
        {
            for (var f = 0; f < attrNumber; f++)
            {
                winputtxtName = document.createElement("input");
                winputtxtName.className = "winput" + f;
                winputtxtName.id = "winput" + f;

                var aslblName = document.createElement("label");
                aslblName.innerHTML = " as ";

                winputlblName = document.createElement("label");
                winputlblName.innerHTML = predefarr[streamInd][1][f];
                winputlblName.className = "wlabel" + f;
                winputlblName.id = "wlabel" + f;

                var trName = document.createElement('tr');

                var tdName1 = document.createElement('td');
                tdName1.appendChild(winputtxtName);
                trName.appendChild(tdName1);

                var tdName2 = document.createElement('td');
                tdName2.appendChild(aslblName);
                trName.appendChild(tdName2);

                var tdName3 = document.createElement('td');
                tdName3.appendChild(winputlblName);
                trName.appendChild(tdName3);

                tableWindowQueryForm.appendChild(trName);
            }
        }
        else if (streamType=="defined")
        {
            for (var f =0; f<defAttrNum-1;f++)
            {
                winputtxtName = document.createElement("input");
                winputtxtName.className = "winput" + f;
                winputtxtName.id = "winput" + f;

                var aslblName = document.createElement("label");
                aslblName.innerHTML = " as ";

                winputlblName = document.createElement("label");
                winputlblName.className = "wlabel" + f;
                winputlblName.id = "wlabel" + f;
                winputlblName.innerHTML = createdDefinedStreamArray[intoStreamIndex][2][f][0];
                var trName = document.createElement('tr');

                var tdName1 = document.createElement('td');
                tdName1.appendChild(winputtxtName);
                trName.appendChild(tdName1);

                var tdName2 = document.createElement('td');
                tdName2.appendChild(aslblName);
                trName.appendChild(tdName2);

                var tdName3 = document.createElement('td');
                tdName3.appendChild(winputlblName);
                trName.appendChild(tdName3);

                tableWindowQueryForm.appendChild(trName);

            }
        }

        else
        {
            for (var f =0; f<defAttrNum;f++)
            {
                winputtxtName = document.createElement("input");
                winputtxtName.className = "winput" + f;
                winputtxtName.id = "winput" + f;

                var aslblName = document.createElement("label");
                aslblName.innerHTML = " as ";

                winputlblName = document.createElement("label");
                winputlblName.className = "wlabel" + f;
                winputlblName.id = "wlabel" + f;
                winputlblName.innerHTML = createdWindowStreamArray[intoStreamIndex][4][f][0];
                var trName = document.createElement('tr');

                var tdName1 = document.createElement('td');
                tdName1.appendChild(winputtxtName);
                trName.appendChild(tdName1);

                var tdName2 = document.createElement('td');
                tdName2.appendChild(aslblName);
                trName.appendChild(tdName2);

                var tdName3 = document.createElement('td');
                tdName3.appendChild(winputlblName);
                trName.appendChild(tdName3);

                tableWindowQueryForm.appendChild(trName);

            }
        }


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

    function getWindowQueryData(elementID,fromNameSt,intoNameSt, fromStreamIndex,intoStreamIndex,streamType,defAttrNum)
    {
        var queryName = document.getElementById("wqueryNameInput").value;
        var Windowfilter1 = document.getElementById("wfilterInput1").value;
        var Windowfilter2 = document.getElementById("wfilterInput2").value;
        var windowInputfil = document.getElementById("windowInput").value;
        createdWindowQueryArray[elementID][0] = elementID;
        createdWindowQueryArray[elementID][1] = queryName;
        createdWindowQueryArray[elementID][2][0] = fromStreamIndex;
        createdWindowQueryArray[elementID][2][1] = fromNameSt;
        createdWindowQueryArray[elementID][3] = Windowfilter1;
        createdWindowQueryArray[elementID][4] = windowInputfil;
        createdWindowQueryArray[elementID][5] = Windowfilter2;
        createdWindowQueryArray[elementID][6] = [];
        var loopCount=0;
        if(streamType=="import" || streamType=="export")
        {
            loopCount=attrNumber;
        }
        else
        {
            loopCount=defAttrNum-1;
        }
        for(var r=0; r<loopCount;r++)
        {
            createdWindowQueryArray[elementID][6][r] =[];
            var inputTextBoxID = "winput"+r;
            var attrLabelID = "wlabel" + r;
            createdWindowQueryArray[elementID][6][r][0] = document.getElementById(inputTextBoxID).value;
            createdWindowQueryArray[elementID][6][r][1] = document.getElementById(attrLabelID).innerHTML;
        }

        createdWindowQueryArray[elementID][7][0] = intoStreamIndex;
        createdWindowQueryArray[elementID][7][1] = intoNameSt;

        //alert(createdWindowQueryArray[elementID][0]+"\n"+createdWindowQueryArray[elementID][1]+"\n"+createdWindowQueryArray[elementID][2][0]+"\t"+createdWindowQueryArray[elementID][2][1]+"\n"+createdWindowQueryArray[elementID][3]+createdWindowQueryArray[elementID][4]+createdWindowQueryArray[elementID][5]+"\n"+createdWindowQueryArray[elementID][7][0]+"\t"+createdWindowQueryArray[elementID][7][1]);

        var elIdforNode =  elementID+"-nodeInitial";
        document.getElementById(elIdforNode).remove();


        var node = document.createElement("div");
        node.id = elementID+"-nodeInitial";
        var textnode = document.createTextNode(queryName);
        node.appendChild(textnode);
        document.getElementById(elementID).appendChild(node);

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

    var jqueryDivLeft, jqueryDivRight, jqueryDivAttrMap;

        function createJoinQueryForm(elementID, fromNameSt1,fromNameSt2, intoNameSt, fromStreamIndex1,fromStreamIndex2, intoStreamIndex, streamType, defAttrNum)
        {
            $("#container").addClass("disabledbutton");
            $("#toolbox").addClass("disabledbutton");

            var predefarr = PredefinedStreams();

            var tableJoinMain = document.createElement('table');
            tableJoinMain.id = "tableJoinMain";
            tableJoinMain.className = "tableJoinMain";

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

            var leftStreamOpt = '<select id="leftStreamCombo">', leftStreamOptions = StreamListGenerate(fromNameSt1,fromNameSt2), i;
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

            var rightStreamOpt = '<select id="rightStreamCombo">', rightStreamOptions = StreamListGenerate(fromNameSt1,fromNameSt2), i;
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

            jQueryNameLabel=document.createElement("label");
            jQueryNameLabel.className="jQueryNameLabel";
            jQueryNameLabel.id="jQueryNameLabel";
            jQueryNameLabel.innerHTML="Query Name: ";

            jQueryNameInput=document.createElement("input");
            jQueryNameInput.className="jQueryNameInput";
            jQueryNameInput.id="jQueryNameInput";

            jinsertIntoLabel=document.createElement("label");
            jinsertIntoLabel.className="jinsertIntoLabel";
            jinsertIntoLabel.id="jinsertIntoLabel";
            jinsertIntoLabel.innerHTML="insert into: ";

            jinsertIntoStream=document.createElement("label");
            jinsertIntoStream.className="jinsertIntoStream";
            jinsertIntoStream.id="jinsertIntoStream";
            jinsertIntoStream.innerHTML=intoNameSt;

            ///////////////////////////////////////////////////////////////////////

            jqueryFomButton=document.createElement("button");
            jqueryFomButton.type="button";
            jqueryFomButton.className="jqueryFomButton";
            jqueryFomButton.id="jqueryFomButton";
            jqueryFomButton.innerHTML="Submit Query";
            jqueryFomButton.onclick = function () {
                getJoinQueryData(elementID, fromNameSt1,fromNameSt2, intoNameSt, fromStreamIndex1,fromStreamIndex2, intoStreamIndex, streamType, defAttrNum);
            };

            jqueryFomCloseButton=document.createElement("button");
            jqueryFomCloseButton.type="button";
            jqueryFomCloseButton.className="jqueryFomCloseButton";
            jqueryFomCloseButton.id="jqueryFomCloseButton";
            jqueryFomCloseButton.innerHTML="Cancel";
            jqueryFomCloseButton.onclick = function() {
                closeForm();
            };


            jqueryDiv.appendChild(joinQueryLabel);

            //Row 17

            var tr17= document.createElement('tr');
            var td90 = document.createElement('td');
            var td91 = document.createElement('td');

            td90.appendChild(jQueryNameLabel);
            tr17.appendChild(td90);
            td91.appendChild(jQueryNameInput);
            tr17.appendChild(td91);
            tableJoinMain.appendChild(tr17);

            jqueryDiv.appendChild(tableJoinMain);

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

            if(streamType=="import" || streamType=="export")
            {
                for (var f = 0; f < attrNumber; f++)
                {
                    jinputtxtName = document.createElement("input");
                    jinputtxtName.className = "jinput" + f;
                    jinputtxtName.id = "jinput" + f;

                    var aslblName = document.createElement("label");
                    aslblName.innerHTML = " as ";

                    jinputlblName = document.createElement("label");
                    jinputlblName.innerHTML = predefarr[streamInd][1][f];
                    jinputlblName.className = "jlabel" + f;
                    jinputlblName.id = "jlabel" + f;

                    var trName = document.createElement('tr');

                    var tdName1 = document.createElement('td');
                    tdName1.appendChild(jinputtxtName);
                    trName.appendChild(tdName1);

                    var tdName2 = document.createElement('td');
                    tdName2.appendChild(aslblName);
                    trName.appendChild(tdName2);

                    var tdName3 = document.createElement('td');
                    tdName3.appendChild(jinputlblName);
                    trName.appendChild(tdName3);

                    tableJoinAttrMapQueryForm.appendChild(trName);
                }
            }
            else if(streamType=="defined")
            {
                for (var f =0; f<defAttrNum-1;f++)
                {
                    jinputtxtName = document.createElement("input");
                    jinputtxtName.className = "jinput" + f;
                    jinputtxtName.id = "jinput" + f;

                    var aslblName = document.createElement("label");
                    aslblName.innerHTML = " as ";

                    jinputlblName = document.createElement("label");
                    jinputlblName.className = "jlabel" + f;
                    jinputlblName.id = "jlabel" + f;
                    jinputlblName.innerHTML = createdDefinedStreamArray[intoStreamIndex][2][f][0];
                    var trName = document.createElement('tr');

                    var tdName1 = document.createElement('td');
                    tdName1.appendChild(jinputtxtName);
                    trName.appendChild(tdName1);

                    var tdName2 = document.createElement('td');
                    tdName2.appendChild(aslblName);
                    trName.appendChild(tdName2);

                    var tdName3 = document.createElement('td');
                    tdName3.appendChild(jinputlblName);
                    trName.appendChild(tdName3);

                    tableJoinAttrMapQueryForm.appendChild(trName);

                }
            }
            else
            {
                for (var f =0; f<defAttrNum;f++)
                {
                    jinputtxtName = document.createElement("input");
                    jinputtxtName.className = "jinput" + f;
                    jinputtxtName.id = "jinput" + f;

                    var aslblName = document.createElement("label");
                    aslblName.innerHTML = " as ";

                    jinputlblName = document.createElement("label");
                    jinputlblName.className = "jlabel" + f;
                    jinputlblName.id = "jlabel" + f;
                    jinputlblName.innerHTML = createdWindowStreamArray[intoStreamIndex][4][f][0];
                    var trName = document.createElement('tr');

                    var tdName1 = document.createElement('td');
                    tdName1.appendChild(jinputtxtName);
                    trName.appendChild(tdName1);

                    var tdName2 = document.createElement('td');
                    tdName2.appendChild(aslblName);
                    trName.appendChild(tdName2);

                    var tdName3 = document.createElement('td');
                    tdName3.appendChild(jinputlblName);
                    trName.appendChild(tdName3);

                    tableJoinAttrMapQueryForm.appendChild(trName);

                }
            }




            //Row 18

            var tr18= document.createElement('tr');
            var td38 = document.createElement('td');
            var td39 = document.createElement('td');

            td38.appendChild(jinsertIntoLabel);
            tr18.appendChild(td38);
            td39.appendChild(jinsertIntoStream);
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

    function getJoinQueryData(elementID, fromStreamIndex1,fromStreamIndex2, intoStreamIndex, streamType, defAttrNum)
    {

        var queryName = document.getElementById("jQueryNameInput").value;
        var insertIntoStream = document.getElementById("jinsertIntoStream").innerHTML;

        //Left Stream Info
        var leftStreamchoice=document.getElementById("leftStreamCombo");
        var leftJoinStream = leftStreamchoice.options[leftStreamchoice.selectedIndex].text;
        var leftJoinfilter1 = document.getElementById("jfilterInput1").value;
        var leftJoinfilter2 = document.getElementById("jfilterInput2").value;
        var leftWindowInput = document.getElementById("jwindowInput").value;

        //Right Stream Info
        var rightStreamchoice=document.getElementById("rightStreamCombo");
        var rightJoinStream = rightStreamchoice.options[rightStreamchoice.selectedIndex].text;
        var rightJoinfilter1 = document.getElementById("jrfilterInput1").value;
        var rightJoinfilter2 = document.getElementById("jrfilterInput2").value;
        var rightWindowInput = document.getElementById("jrwindowInput").value;


        createdJoinQueryArray[elementID][0] = elementID;
        createdJoinQueryArray[elementID][1] = queryName;
        createdJoinQueryArray[elementID][2][0] = leftJoinStream;
        createdJoinQueryArray[elementID][2][1] = leftJoinfilter1;
        createdJoinQueryArray[elementID][2][2] = leftWindowInput;
        createdJoinQueryArray[elementID][2][3] = leftJoinfilter2;
        createdJoinQueryArray[elementID][3][0] = rightJoinStream;
        createdJoinQueryArray[elementID][3][1] = rightJoinfilter1;
        createdJoinQueryArray[elementID][3][2] = rightWindowInput;
        createdJoinQueryArray[elementID][3][3] = rightJoinfilter2;
        createdJoinQueryArray[elementID][4] = [];
        var loopCount=0;
        if(streamType=="import" || streamType=="export")
        {
            loopCount=attrNumber;
        }
        else
        {
            loopCount=defAttrNum-1;
        }
        for(var r=0; r<loopCount;r++)
        {
            createdJoinQueryArray[elementID][4][r] =[];
            var inputTextBoxID = "jinput"+r;
            var attrLabelID = "jlabel" + r;
            createdJoinQueryArray[elementID][4][r][0] = document.getElementById(inputTextBoxID).value;
            createdJoinQueryArray[elementID][4][r][1] = document.getElementById(attrLabelID).innerHTML;

            //alert(createdJoinQueryArray[elementID][4][r][0]+" as "+createdJoinQueryArray[elementID][4][r][1]);
        }

        createdJoinQueryArray[elementID][5]= insertIntoStream;

        //alert(createdJoinQueryArray[elementID][0]+"-"+createdJoinQueryArray[elementID][1]+"\nLeft\n"+createdJoinQueryArray[elementID][2][0]+"\n"+createdJoinQueryArray[elementID][2][1]+"\n"+createdJoinQueryArray[elementID][2][2]+"\n"+createdJoinQueryArray[elementID][2][3]+"\nRight\n"+createdJoinQueryArray[elementID][3][0]+"\n"+createdJoinQueryArray[elementID][3][1]+"\n"+createdJoinQueryArray[elementID][3][2]+"\n"+createdJoinQueryArray[elementID][3][3]+"\n"+createdJoinQueryArray[elementID][5]);

        var elIdforNode =  elementID+"-nodeInitial";
        document.getElementById(elIdforNode).remove();


        var node = document.createElement("div");
        node.id = elementID+"-nodeInitial";
        var textnode = document.createTextNode(queryName);
        node.appendChild(textnode);
        document.getElementById(elementID).appendChild(node);

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

    var jfromStreamId1,jfromStreamId2, jintoStreamId;

    function getJoinConnectionDetails(element)
    {
        var clickedId =  element.id;
        clickedId=clickedId.charAt(0);
        var from = clickedId+"-out";
        var from1 = clickedId;
        clickedId = clickedId+"-in";
        var con=jsPlumb.getAllConnections();
        var list=[];
        var checkPoint=-1;

        for(var i=0;i<con.length;i++)
        {
            if(con[i].targetId==clickedId)
            {
                if(checkPoint==-1)
                {
                    list[i] = new Array(2);
                    list[i][0] = [];
                    list[i][0]=con[i].sourceId;
                    jfromStreamId1 =list[i][0];
                    list[i][1] = con[i].targetId;
                    checkPoint=i;
                }
                else
                {
                    list[i] = new Array(2);
                    list[i][0] = [];
                    list[i][0]=con[i].sourceId;
                    jfromStreamId2 =list[i][0];
                    list[i][1] = con[i].targetId;
                    checkPoint=i;
                }
            }

            if(con[i].sourceId==from || con[i].sourceId==from1)
            {
                list[i] = new Array(2);
                list[i][0] = con[i].sourceId;
                list[i][1] = con[i].targetId;
                jintoStreamId =list[i][1];
            }
        }

        jfromStreamId1 = jfromStreamId1.charAt(0);
        jfromStreamId2 = jfromStreamId2.charAt(0);
        jintoStreamId = jintoStreamId.charAt(0);
        getJoinFromStreamName(jfromStreamId1,jfromStreamId2,jintoStreamId,element.id);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var stintoStreamId;
    var connectedStreamIdListArray = [];

    function getStateMachineConnectionDetails(element)
    {
        var clickedId =  element.id.charAt(0);
        var idTest=/^\d+-pc\d+$/.test(element.id);

        var from = clickedId+"-out";
        var from1 = clickedId;
        clickedId = clickedId+"-in";
        var con=jsPlumb.getAllConnections();
        var list=[];
        var checkPoint=-1;

        for(var i=0;i<con.length;i++)
        {
            if(idTest==false)
            {
                if (con[i].targetId == clickedId) {
                    connectedStreamIdListArray[i] = con[i].sourceId;
                }
            }
            else
            {
                if (con[i].targetId == element.id) {
                    connectedStreamIdListArray[i] = con[i].sourceId;
                }
            }

            if(con[i].sourceId==from || con[i].sourceId==from1)
            {
                list[i] = new Array(2);
                list[i][0] = con[i].sourceId;
                list[i][1] = con[i].targetId;
                stintoStreamId =list[i][1];
            }
        }

        stintoStreamId = stintoStreamId.charAt(0);
        getStateMachineFromStreamName(connectedStreamIdListArray, stintoStreamId,element.id);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var partitionintoId;
    var connectedStreamIdListArray = [];
    var connectedStream;

    function getPartitionConnectionDetails(element)
    {
        var clickedId =  element.id;
        var con=jsPlumb.getAllConnections();
        var list=[];
        var checkPoint=-1;

        for(var i=0;i<con.length;i++)
        {
            if(con[i].targetId==clickedId)
            {
                connectedStream = con[i].sourceId;
            }

            //To get the into query details
            // if(con[i].sourceId==clickedId)
            // {
            //     list[i] = new Array(2);
            //     list[i][0] = con[i].sourceId;
            //     list[i][1] = con[i].targetId;
            //     partitionintoId =list[i][1];
            // }
        }

        //partitionintoId = partitionintoId.charAt(0);
        getPartitionFromStreamName(clickedId,connectedStream/*, partitionintoId*/);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function getJoinFromStreamName(jfromStreamId1,jfromStreamId2,jintoStreamId,clickedId)
    {
        var fromNameSt1,fromNameSt2, intoNameSt, streamType, selctedSt;
        var elementID=clickedId.charAt(0);

        var elClickedId= clickedId.substr(0, clickedId.indexOf('-'));
        var subPcId= clickedId.substr(clickedId.indexOf("c") + 1);
        var idTest=/^\d+-pc\d+$/.test(clickedId);
        var fromStreamIndex1,fromStreamIndex2,intoStreamIndex;

        for(var x = 0; x<100; x++)
        {
            if(idTest==false)
            {
                //To retrieve the first 'from Stream' Name
                if (createdImportStreamArray[x][0] == jfromStreamId1) {
                    fromNameSt1 = createdImportStreamArray[x][2];
                    fromStreamIndex1 = x;
                }
                else if (createdExportStreamArray[x][0] == jfromStreamId1) {
                    fromNameSt1 = createdExportStreamArray[x][2];
                    fromStreamIndex1 = x;
                }
                else if (createdDefinedStreamArray[x][0] == jfromStreamId1) {
                    fromNameSt1 = createdDefinedStreamArray[x][1];
                    fromStreamIndex1 = x;
                }
                else if (createdWindowStreamArray[x][0] == jfromStreamId1) {
                    fromNameSt1 = createdWindowStreamArray[x][1];
                    fromStreamIndex1 = x;
                }
            }
            else
            {
                if (createdPartitionConditionArray[x][0]==elClickedId && createdPartitionConditionArray[x][5]==subPcId)
                {
                    fromNameSt1 = createdPartitionConditionArray[x][1];
                    fromStreamIndex1 = x;
                }
            }

            if(idTest==false)
            {
                //To retrieve the first 'from Stream' Name
                if (createdImportStreamArray[x][0] == jfromStreamId2) {
                    fromNameSt2 = createdImportStreamArray[x][2];
                    fromStreamIndex2 = x;
                }
                else if (createdExportStreamArray[x][0] == jfromStreamId2) {
                    fromNameSt2 = createdExportStreamArray[x][2];
                    fromStreamIndex2 = x;
                }
                else if (createdDefinedStreamArray[x][0] == jfromStreamId2) {
                    fromNameSt2 = createdDefinedStreamArray[x][1];
                    fromStreamIndex2 = x;
                }
                else if (createdWindowStreamArray[x][0] == jfromStreamId2) {
                    fromNameSt2 = createdWindowStreamArray[x][1];
                    fromStreamIndex2 = x;
                }
            }
            else
            {
                if (createdPartitionConditionArray[x][0]==elClickedId && createdPartitionConditionArray[x][5]==subPcId)
                {
                    fromNameSt2 = createdPartitionConditionArray[x][1];
                    fromStreamIndex2 = x;
                }
            }


            //To retrieve the 'into Stream' Name
            if(createdImportStreamArray[x][0]==jintoStreamId)
            {
                intoNameSt = createdImportStreamArray[x][2];
                streamType = "import";
                selctedSt = createdImportStreamArray[x][1];
                intoStreamIndex = x;
            }
            else if(createdExportStreamArray[x][0]==jintoStreamId)
            {
                intoNameSt = createdExportStreamArray[x][2];
                streamType = "export";
                selctedSt = createdExportStreamArray[x][1];
                intoStreamIndex = x;
            }
            else if(createdDefinedStreamArray[x][0]==jintoStreamId)
            {
                intoNameSt = createdDefinedStreamArray[x][1];
                streamType = "defined";
                intoStreamIndex = x;
                var defAttrNum = createdDefinedStreamArray[x][2].length;
            }
            else if(createdWindowStreamArray[x][0]==jintoStreamId)
            {
                intoNameSt = createdWindowStreamArray[x][1];
                streamType = "window";
                intoStreamIndex = x;
                var defAttrNum = createdDefinedStreamArray[x][4].length;

            }

        }
        //To retrieve the number of attributes
        getAttributes(selctedSt);
        //attrNumber gives the number of attributes
        //streamInd gives the index of the selected stream
        createJoinQueryForm(elementID, fromNameSt1,fromNameSt2, intoNameSt, fromStreamIndex1,fromStreamIndex2, intoStreamIndex, streamType, defAttrNum);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function getStateMachineFromStreamName(connectedStreamIdListArray, stintoStreamId,elementID)
    {
        var intoNameSt, streamType, selctedSt, intoStreamIndex;
        var elClickedId= elementID.substr(0, elementID.indexOf('-'));
        var subPcId= elementID.substr(elementID.indexOf("c") + 1);
        var idTest=/^\d+-pc\d+$/.test(elementID);
        var fromStreamIndex1,fromStreamIndex2,intoStreamIndex;
        var fromStreamNameListArray = [];
        var fromStreamIndexListArray = [];

        for(var f=0; f<connectedStreamIdListArray.length;f++)
        {
            for(var x = 0; x<100; x++)
            {
                //To retrieve the 'from Stream' Names
                if(idTest==false)
                {
                    if (createdImportStreamArray[x][0] == connectedStreamIdListArray[f]) {
                        fromStreamNameListArray.push(createdImportStreamArray[x][2]);
                        fromStreamIndexListArray.push(x);
                    }
                    else if (createdExportStreamArray[x][0] == connectedStreamIdListArray[f]) {
                        fromStreamNameListArray.push(createdExportStreamArray[x][2]);
                        fromStreamIndexListArray.push(x);
                    }
                    else if (createdDefinedStreamArray[x][0] == connectedStreamIdListArray[f]) {
                        fromStreamNameListArray.push(createdDefinedStreamArray[x][1]);
                        fromStreamIndexListArray.push(x);
                    }
                    else if (createdWindowStreamArray[x][0] == connectedStreamIdListArray[f]) {
                        fromStreamNameListArray.push(createdWindowStreamArray[x][1]);
                        fromStreamIndexListArray.push(x);
                    }
                }
                else
                {
                    if (createdPartitionConditionArray[x][0]==elClickedId && createdPartitionConditionArray[x][5]==subPcId)
                    {
                        fromStreamNameListArray.push(createdPartitionConditionArray[x][1]);
                        fromStreamIndexListArray.push(x);
                    }

                }


                //To retrieve the 'into Stream' Name
                if (createdImportStreamArray[x][0] == stintoStreamId) {
                    intoNameSt = createdImportStreamArray[x][2];
                    streamType = "import";
                    selctedSt = createdImportStreamArray[x][1];
                    intoStreamIndex = x;
                }
                else if (createdExportStreamArray[x][0] == stintoStreamId) {
                    intoNameSt = createdExportStreamArray[x][2];
                    streamType = "export";
                    selctedSt = createdExportStreamArray[x][1];
                    intoStreamIndex = x;
                }
                else if (createdDefinedStreamArray[x][0] == stintoStreamId) {
                    intoNameSt = createdDefinedStreamArray[x][1];
                    streamType = "defined";
                    intoStreamIndex = x;
                    var defAttrNum = createdDefinedStreamArray[x][2].length;
                }
                else if (createdWindowStreamArray[x][0] == stintoStreamId) {
                    intoNameSt = createdWindowStreamArray[x][1];
                    streamType = "window";
                    intoStreamIndex = x;
                    var defAttrNum = createdWindowStreamArray[x][4].length;

                }
            }

        }
        elementID=elementID.charAt(0);
        //To retrieve the number of attributes
        getAttributes(selctedSt);
        //attrNumber gives the number of attributes
        //streamInd gives the index of the selected stream
        createStateMachineQueryForm(elementID, fromStreamNameListArray, intoNameSt, fromStreamIndexListArray, intoStreamIndex, streamType, defAttrNum);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var attributelist = [];

    function getPartitionFromStreamName(clickedId, connectedStream/*,partitionintoId*/)
    {
        var intoNameSt, streamType, selctedSt, fromStreamIndex;
        var fromStreamName;
        alert("getPartitionFromStreamName-connectedStream: "+connectedStream);
        for(var x = 0; x<100; x++)
        {
            //To retrieve the 'from Stream' Names
            if (createdImportStreamArray[x][0] == connectedStream) {
                fromStreamName=createdImportStreamArray[x][2];
                streamType = "import";
                selctedSt = createdImportStreamArray[x][1];
                fromStreamIndex = x;
            }
            else if (createdExportStreamArray[x][0] == connectedStream) {
                fromStreamName=createdExportStreamArray[x][2];
                streamType = "export";
                selctedSt = createdExportStreamArray[x][1];
                fromStreamIndex = x;
            }
            else if (createdDefinedStreamArray[x][0] == connectedStream) {
                fromStreamName=createdDefinedStreamArray[x][1];
                var defAttrNum = createdDefinedStreamArray[x][2].length;
                streamType = "defined";
                fromStreamIndex = x;

            }
            else if (createdWindowStreamArray[x][0] == connectedStream.charAt(0)) {
                fromStreamName=createdWindowStreamArray[x][1];
                var type=createdWindowStreamArray[x][2];
                var defAttrNum = createdWindowStreamArray[x][4].length;
                streamType = "window";
                fromStreamIndex = x;
            }
        }

        //To retrieve the number of attributes
        getAttributes(selctedSt);
        //attrNumber gives the number of attributes
        //streamInd gives the index of the selected stream
        setPartitionConditionform(clickedId,selctedSt,fromStreamName,streamType,fromStreamIndex, defAttrNum, type);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @function Generate the Streams to be selected when a Join query's left and right join streams are selected
     * @returns {Array}
     */

    function StreamListGenerate(fromNameSt1,fromNameSt2) {
        var StreamArray = new Array();
        StreamArray[0] = fromNameSt1;
        StreamArray[1] = fromNameSt2;
        return StreamArray;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var stqueryDiv, stqueryDivState, stMultipleStateDiv, stqueryDivLogic, stqueryDivAttrMap;

    function createStateMachineQueryForm(elementID, fromStreamNameListArray, intoNameSt, fromStreamIndexListArray, intoStreamIndex, streamType, defAttrNum)
    {
        $("#container").addClass("disabledbutton");
        $("#toolbox").addClass("disabledbutton");

        var predefarr = PredefinedStreams();

        var tableStateQueryForm = document.createElement('table');
        tableStateQueryForm.id = "tableStateQueryForm";
        tableStateQueryForm.className = "tableStateQueryForm";

        var tableProcessLogicQueryForm = document.createElement('table');
        tableProcessLogicQueryForm.id = "tableProcessLogicQueryForm";
        tableProcessLogicQueryForm.className = "tableProcessLogicQueryForm";

        var tableStateAttrMapQueryForm = document.createElement('table');
        tableStateAttrMapQueryForm.id = "tableStateAttrMapQueryForm";
        tableStateAttrMapQueryForm.className = "tableStateAttrMapQueryForm";

        stqueryDiv=document.createElement("div");
        stqueryDiv.className="stqueryDiv";
        stqueryDiv.id="stqueryDiv";

        stqueryDivState=document.createElement("div");
        stqueryDivState.className="stqueryDivState";
        stqueryDivState.id="stqueryDivState";

        stMultipleStateDiv=document.createElement("div");
        stMultipleStateDiv.className="stMultipleStateDiv";
        stMultipleStateDiv.id="stMultipleStateDiv";

        stqueryDivLogic=document.createElement("div");
        stqueryDivLogic.className="stqueryDivLogic";
        stqueryDivLogic.id="stqueryDivLogic";

        stqueryDivAttrMap=document.createElement("div");
        stqueryDivAttrMap.className="stqueryDivAttrMap";
        stqueryDivAttrMap.id="stqueryDivAttrMap";

        stateQueryLabel= document.createElement("label");
        stateQueryLabel.className="stateQueryLabel";
        stateQueryLabel.id="stateQueryLabel";
        stateQueryLabel.innerHTML='State-machine Query';

        stQueryNameLabel=document.createElement("label");
        stQueryNameLabel.className="stQueryNameLabel";
        stQueryNameLabel.id="stQueryNameLabel";
        stQueryNameLabel.innerHTML="Query Name: ";

        stQueryNameInput=document.createElement("input");
        stQueryNameInput.className="stQueryNameInput";
        stQueryNameInput.id="stQueryNameInput";

        ///////////////////////////////////////////////////////////////////////
        //Div 1-->

        stateDivLabel= document.createElement("label");
        stateDivLabel.className="stateDivLabel";
        stateDivLabel.id="stateDivLabel";
        stateDivLabel.innerHTML='Create Multiple States';

        stateIdLabel= document.createElement("label");
        stateIdLabel.className="stateIdLabel";
        stateIdLabel.id="stateIdLabel";
        stateIdLabel.innerHTML='State ID: ';

        stateIDInput=document.createElement("input");
        stateIDInput.className="stateIDInput0";
        stateIDInput.id="stateIDInput0";

        stateStreamLabel= document.createElement("label");
        stateStreamLabel.className="stateStreamLabel";
        stateStreamLabel.id="stateStreamLabel";
        stateStreamLabel.innerHTML='Stream: ';

        StreamDropdown= document.createElement("div");
        StreamDropdown.id = "StreamDropdown0";
        StreamDropdown.className = "StreamDropdown0";

        var StreamOptions = '<select id="StreamCombo0">', StreamOpt = StreamGenerator(fromStreamNameListArray), i;
        for(i = 0; i < StreamOpt.length; i++) {
            StreamOptions += "<option value='"+StreamOpt[i]+"'>"+StreamOpt[i]+"</option>";
        }
        StreamOptions += '</select>';
        StreamDropdown.innerHTML = StreamOptions;

        stfilterLabel= document.createElement("label");
        stfilterLabel.className="stfilterLabel";
        stfilterLabel.id="stfilterLabel";
        stfilterLabel.innerHTML = "Filter : ";

        stfilterInput= document.createElement("input");
        stfilterInput.id = "stfilterInput0";
        stfilterInput.className = "stfilterInput0";
        
        hr = document.createElement('hr');

        stqueryAddState=document.createElement("button");
        stqueryAddState.type="button";
        stqueryAddState.className="stqueryAddState";
        stqueryAddState.id="stqueryAddState";
        stqueryAddState.innerHTML="Add State";
        stqueryAddState.onclick = function () {
            addStateDivisions(fromStreamNameListArray);
        };

        ///////////////////////////////////////////////////////////////////////
        //Div 2-->

        processLogicTitleLabel= document.createElement("label");
        processLogicTitleLabel.className="processLogicTitleLabel";
        processLogicTitleLabel.id="processLogicTitleLabel";
        processLogicTitleLabel.innerHTML='Enter the Process logic';

        processLogicLabel= document.createElement("label");
        processLogicLabel.className="processLogicLabel";
        processLogicLabel.id="processLogicLabel";
        processLogicLabel.innerHTML='Process logic: ';

        stProcessLogicInput= document.createElement("input");
        stProcessLogicInput.id = "stProcessLogicInput";
        stProcessLogicInput.className = "stProcessLogicInput";

        ///////////////////////////////////////////////////////////////////////
        //Div 3-->

        stselectLabel= document.createElement("label");
        stselectLabel.className="stselectLabel";
        stselectLabel.id="stselectLabel";
        stselectLabel.innerHTML= "Select : ";

        //Attributes

        stinsertIntoLabel=document.createElement("label");
        stinsertIntoLabel.className="stinsertIntoLabel";
        stinsertIntoLabel.id="stinsertIntoLabel";
        stinsertIntoLabel.innerHTML="insert into: ";

        stinsertIntoStream=document.createElement("label");
        stinsertIntoStream.className="stinsertIntoStream";
        stinsertIntoStream.id="stinsertIntoStream";
        stinsertIntoStream.innerHTML=intoNameSt;

        ///////////////////////////////////////////////////////////////////////

        stqueryFomButton=document.createElement("button");
        stqueryFomButton.type="button";
        stqueryFomButton.className="jqueryFomButton";
        stqueryFomButton.id="jqueryFomButton";
        stqueryFomButton.innerHTML="Submit Query";
        stqueryFomButton.onclick = function () {
            getStateMachineQueryData(elementID, streamType, defAttrNum);
        };

        stqueryFomCloseButton=document.createElement("button");
        stqueryFomCloseButton.type="button";
        stqueryFomCloseButton.className="stqueryFomCloseButton";
        stqueryFomCloseButton.id="stqueryFomCloseButton";
        stqueryFomCloseButton.innerHTML="Cancel";
        stqueryFomCloseButton.onclick = function() {
            closeForm();
        };


        stqueryDiv.appendChild(stateDivLabel);

        var tr21 = document.createElement('tr');
        var td21=document.createElement('td');
        var td31=document.createElement('td');

        td21.appendChild(stQueryNameLabel);
        tr21.appendChild(td21);
        td31.appendChild(stQueryNameInput);
        tr21.appendChild(td31);
        stqueryDiv.appendChild(tr21);

        ///////////////////////////////////////////////////////////////////////
        //Div 1 Table

        stqueryDivState.appendChild(stateDivLabel);

        //Row 2

        var tr2 = document.createElement('tr');
        var td2=document.createElement('td');
        var td3=document.createElement('td');

        td2.appendChild(stateIdLabel);
        tr2.appendChild(td2);
        td3.appendChild(stateIDInput);
        tr2.appendChild(td3);
        tableStateQueryForm.appendChild(tr2);

        //Row 3

        var tr3 = document.createElement('tr');
        var td4=document.createElement('td');
        var td5=document.createElement('td');

        td4.appendChild(stateStreamLabel);
        tr3.appendChild(td4);
        td5.appendChild(StreamDropdown);
        tr3.appendChild(td5);
        tableStateQueryForm.appendChild(tr3);

        //Row 4

        var tr4 = document.createElement('tr');
        var td6=document.createElement('td');
        var td7=document.createElement('td');

        td6.appendChild(stfilterLabel);
        tr4.appendChild(td6);
        td7.appendChild(stfilterInput);
        tr4.appendChild(td7);
        tableStateQueryForm.appendChild(tr4);

        //Row 5

        var tr5 = document.createElement('tr');
        var td8=document.createElement('td');

        td8.appendChild(stqueryAddState);
        tr5.appendChild(td8);

        stMultipleStateDiv.appendChild(tableStateQueryForm);
        stMultipleStateDiv.appendChild(hr);
        stqueryDivState.appendChild(stMultipleStateDiv);

        ///////////////////////////////////////////////////////////////////////
        //Div 2 Table

        //Row 6

        var tr11 = document.createElement('tr');
        var td19=document.createElement('td');

        td19.appendChild(processLogicTitleLabel);
        tr11.appendChild(td19);
        tableProcessLogicQueryForm.appendChild(tr11);

        //Row 7

        var tr6 = document.createElement('tr');
        var td10=document.createElement('td');
        var td11=document.createElement('td');

        td10.appendChild(processLogicLabel);
        tr6.appendChild(td10);
        td11.appendChild(stProcessLogicInput);
        tr6.appendChild(td11);
        tableProcessLogicQueryForm.appendChild(tr6);

        stqueryDivLogic.appendChild(tableProcessLogicQueryForm);

        ///////////////////////////////////////////////////////////////////////
        //Div 3 Table

        //Row 8

        if(streamType=="import" || streamType=="export")
        {
            for (var f = 0; f < attrNumber; f++)
            {
                stinputtxtName = document.createElement("input");
                stinputtxtName.className = "stinput" + f;
                stinputtxtName.id = "stinput" + f;

                var aslblName = document.createElement("label");
                aslblName.innerHTML = " as ";

                stinputlblName = document.createElement("label");
                stinputlblName.innerHTML = predefarr[streamInd][1][f];
                stinputlblName.className = "stlabel" + f;
                stinputlblName.id = "stlabel" + f;

                var trName = document.createElement('tr');

                var tdName1 = document.createElement('td');
                tdName1.appendChild(stinputtxtName);
                trName.appendChild(tdName1);

                var tdName2 = document.createElement('td');
                tdName2.appendChild(aslblName);
                trName.appendChild(tdName2);

                var tdName3 = document.createElement('td');
                tdName3.appendChild(stinputlblName);
                trName.appendChild(tdName3);

                tableStateAttrMapQueryForm.appendChild(trName);
            }
        }
        else if(streamType=="defined")
        {
            for (var f =0; f<defAttrNum-1;f++)
            {
                stinputtxtName = document.createElement("input");
                stinputtxtName.className = "stinput" + f;
                stinputtxtName.id = "stinput" + f;

                var aslblName = document.createElement("label");
                aslblName.innerHTML = " as ";

                stinputlblName = document.createElement("label");
                stinputlblName.className = "stlabel" + f;
                stinputlblName.id = "stlabel" + f;
                stinputlblName.innerHTML = createdDefinedStreamArray[intoStreamIndex][2][f][0];
                var trName = document.createElement('tr');

                var tdName1 = document.createElement('td');
                tdName1.appendChild(stinputtxtName);
                trName.appendChild(tdName1);

                var tdName2 = document.createElement('td');
                tdName2.appendChild(aslblName);
                trName.appendChild(tdName2);

                var tdName3 = document.createElement('td');
                tdName3.appendChild(stinputlblName);
                trName.appendChild(tdName3);

                tableStateAttrMapQueryForm.appendChild(trName);
            }
        }

        else
        {
            for (var f =0; f<defAttrNum;f++)
            {
                stinputtxtName = document.createElement("input");
                stinputtxtName.className = "stinput" + f;
                stinputtxtName.id = "stinput" + f;

                var aslblName = document.createElement("label");
                aslblName.innerHTML = " as ";

                stinputlblName = document.createElement("label");
                stinputlblName.className = "stlabel" + f;
                stinputlblName.id = "stlabel" + f;
                stinputlblName.innerHTML = createdWindowStreamArray[intoStreamIndex][4][f][0];
                var trName = document.createElement('tr');

                var tdName1 = document.createElement('td');
                tdName1.appendChild(stinputtxtName);
                trName.appendChild(tdName1);

                var tdName2 = document.createElement('td');
                tdName2.appendChild(aslblName);
                trName.appendChild(tdName2);

                var tdName3 = document.createElement('td');
                tdName3.appendChild(stinputlblName);
                trName.appendChild(tdName3);

                tableStateAttrMapQueryForm.appendChild(trName);

            }
        }

        //Row 18

        var tr18= document.createElement('tr');
        var td38 = document.createElement('td');
        var td39 = document.createElement('td');

        td38.appendChild(stinsertIntoLabel);
        tr18.appendChild(td38);
        td39.appendChild(stinsertIntoStream);
        tr18.appendChild(td39);
        tableStateAttrMapQueryForm.appendChild(tr18);

        stqueryDivAttrMap.appendChild(tableStateAttrMapQueryForm);

        var tr20= document.createElement('tr');
        var td41 = document.createElement('td');
        var td42 = document.createElement('td');

        td41.appendChild(stqueryFomButton);
        tr20.appendChild(td41);
        td42.appendChild(stqueryFomCloseButton);
        tr20.appendChild(td42);

        stqueryDiv.appendChild(stqueryDivState);
        stqueryDiv.appendChild(stqueryAddState);
        stqueryDiv.appendChild(stqueryDivLogic);
        stqueryDiv.appendChild(stqueryDivAttrMap);
        stqueryDiv.appendChild(tr20);

        lot.appendChild(stqueryDiv);

        $(".toolbox-titlex").show();
        $(".panel").show();

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var numberOfStateDivs=0;
    var stateIdLabelstr = "stateIdLabel";
    var stateIDInputstr = "stateIDInput";
    var stateStreamLabelstr = "stateStreamLabel";
    var StreamDropdownstr = "StreamDropdown";
    var StreamCombostr = "StreamCombo";
    var stfilterLabelstr ="stfilterLabel";
    var stfilterInputstr = "stfilterInput";

    function addStateDivisions(fromStreamNameListArray)
    {
        numberOfStateDivs++;

        var tableStateQueryForm = document.createElement('table');
        tableStateQueryForm.id = "tableStateQueryForm";
        tableStateQueryForm.className = "tableStateQueryForm";

        stateIdLabelx= document.createElement("label");
        stateIdLabelx.className=stateIdLabelstr+numberOfStateDivs;
        stateIdLabelx.id=stateIdLabelstr+numberOfStateDivs;
        stateIdLabelx.innerHTML='State ID: ';

        stateIDInputx=document.createElement("input");
        stateIDInputx.className=stateIDInputstr+numberOfStateDivs;
        stateIDInputx.id=stateIDInputstr+numberOfStateDivs;

        stateStreamLabelx= document.createElement("label");
        stateStreamLabelx.className=stateStreamLabelstr+numberOfStateDivs;
        stateStreamLabelx.id=stateStreamLabelstr+numberOfStateDivs;
        stateStreamLabelx.innerHTML='Stream: ';

        StreamDropdownx= document.createElement("div");
        StreamDropdownx.id = StreamDropdownstr+numberOfStateDivs;
        StreamDropdownx.className = StreamDropdownstr+numberOfStateDivs;

        var hr= document.createElement("hr");

        streamcomboId = StreamCombostr +numberOfStateDivs;

        var StreamOptions = '<select id='+streamcomboId+'>', StreamOpt = StreamGenerator(fromStreamNameListArray), i;
        for(i = 0; i < StreamOpt.length; i++) {
            StreamOptions += "<option value='"+StreamOpt[i]+"'>"+StreamOpt[i]+"</option>";
        }
        StreamOptions += '</select>';
        StreamDropdownx.innerHTML = StreamOptions;

        stfilterLabelx= document.createElement("label");
        stfilterLabelx.className=stfilterLabelstr+numberOfStateDivs;
        stfilterLabelx.id=stfilterLabelstr+numberOfStateDivs;
        stfilterLabelx.innerHTML = "Filter : ";

        stfilterInputx= document.createElement("input");
        stfilterInputx.id = stfilterInputstr+numberOfStateDivs ;
        stfilterInputx.className = stfilterInputstr+numberOfStateDivs ;


        //Row 1

        var tr2 = document.createElement('tr');
        var td2=document.createElement('td');
        var td3=document.createElement('td');

        td2.appendChild(stateIdLabelx);
        tr2.appendChild(td2);
        td3.appendChild(stateIDInputx);
        tr2.appendChild(td3);
        tableStateQueryForm.appendChild(tr2);

        //Row 2

        var tr3 = document.createElement('tr');
        var td4=document.createElement('td');
        var td5=document.createElement('td');

        td4.appendChild(stateStreamLabelx);
        tr3.appendChild(td4);
        td5.appendChild(StreamDropdownx);
        tr3.appendChild(td5);
        tableStateQueryForm.appendChild(tr3);

        //Row 3

        var tr4 = document.createElement('tr');
        var td6=document.createElement('td');
        var td7=document.createElement('td');

        td6.appendChild(stfilterLabelx);
        tr4.appendChild(td6);
        td7.appendChild(stfilterInputx);
        tr4.appendChild(td7);
        tableStateQueryForm.appendChild(tr4);

        stMultipleStateDiv.appendChild(tableStateQueryForm);
        stMultipleStateDiv.appendChild(hr);
        stqueryDivState.appendChild(stMultipleStateDiv);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @function Generate the Streams to be selected when a StateMachine query's left and right join streams are selected
     * @returns {Array}
     */

    function StreamGenerator(fromStreamNameListArray) {
        var list = [];
        for(var g = 0; g<fromStreamNameListArray.length;g++)
        {
            if(fromStreamNameListArray[g] != null)
            {
                list.push(fromStreamNameListArray[g]);
            }
        }
        return list;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    function getStateMachineQueryData(elementID, streamType, defAttrNum)
    {
        var queryName = document.getElementById("stQueryNameInput").value;
        var insertIntoStream = document.getElementById("stinsertIntoStream").innerHTML;
        var processLogic = document.getElementById("stProcessLogicInput").value;

        createdStateMachineQueryArray[elementID][0] = elementID;
        createdStateMachineQueryArray[elementID][1] = queryName;

        //Multiple State Info
        for(var m = 0; m<=numberOfStateDivs ; m++)
        {
            var streamComboBoxId =  StreamCombostr +m;
            var stateIdString = "stateIDInput"+m;
            var stfilterInputString = "stfilterInput"+m;
            //State ID
            var stateId = document.getElementById(stateIdString).value;
            //Selected Stream
            var Streamchoice=document.getElementById(streamComboBoxId);
            var SelectedStream = Streamchoice.options[Streamchoice.selectedIndex].text;
            //Filter
            var StateFilter = document.getElementById(stfilterInputString).value;

            createdStateMachineQueryArray[elementID][2][m] = [];
            createdStateMachineQueryArray[elementID][2][m][0] = stateId;
            createdStateMachineQueryArray[elementID][2][m][1] = SelectedStream;
            createdStateMachineQueryArray[elementID][2][m][2] = StateFilter;
        }

        createdStateMachineQueryArray[elementID][3] = processLogic;
        //createdJoinQueryArray[elementID][4] = [];
        var loopCount=0;
        if(streamType=="import" || streamType=="export")
        {
            loopCount=attrNumber;
        }
        else
        {
            loopCount=defAttrNum-1;
        }
        for(var r=0; r<loopCount;r++)
        {
            createdStateMachineQueryArray[elementID][4][r] =[];
            var inputTextBoxID = "stinput"+r;
            var attrLabelID = "stlabel" + r;
            createdStateMachineQueryArray[elementID][4][r][0] = document.getElementById(inputTextBoxID).value;
            createdStateMachineQueryArray[elementID][4][r][1] = document.getElementById(attrLabelID).innerHTML;

            //alert(createdJoinQueryArray[elementID][4][r][0]+" as "+createdJoinQueryArray[elementID][4][r][1]);
        }

        createdStateMachineQueryArray[elementID][5]= insertIntoStream;

        //alert(createdJoinQueryArray[elementID][0]+"-"+createdJoinQueryArray[elementID][1]+"\nLeft\n"+createdJoinQueryArray[elementID][2][0]+"\n"+createdJoinQueryArray[elementID][2][1]+"\n"+createdJoinQueryArray[elementID][2][2]+"\n"+createdJoinQueryArray[elementID][2][3]+"\nRight\n"+createdJoinQueryArray[elementID][3][0]+"\n"+createdJoinQueryArray[elementID][3][1]+"\n"+createdJoinQueryArray[elementID][3][2]+"\n"+createdJoinQueryArray[elementID][3][3]+"\n"+createdJoinQueryArray[elementID][5]);

        var elIdforNode =  elementID+"-nodeInitial";
        document.getElementById(elIdforNode).remove();


        var node = document.createElement("div");
        node.id = elementID+"-nodeInitial";
        var textnode = document.createTextNode(queryName);
        node.appendChild(textnode);
        document.getElementById(elementID).appendChild(node);

        $("#container").removeClass("disabledbutton");
        $("#toolbox").removeClass("disabledbutton");

        numberOfStateDivs=0;

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


