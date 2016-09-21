    //
    // // target elements with the "draggable" class
    // interact('.partitiondrop')
    //     .draggable({
    //         // enable inertial throwing
    //         inertia: true,
    //         // keep the element within the area of it's parent
    //         restrict: {
    //             restriction: "parent",
    //             endOnly: true,
    //             elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    //         },
    //         // enable autoScroll
    //         autoScroll: true,
    //
    //         // call this function on every dragmove event
    //         onmove: dragMoveListener,
    //         // call this function on every dragend event
    //         onend: function (event) {
    //             var textEl = event.target.querySelector('p');
    //
    //             textEl && (textEl.textContent =
    //                 'moved a distance of '
    //                 + (Math.sqrt(event.dx * event.dx +
    //                     event.dy * event.dy)|0) + 'px');
    //         }
    //     });
    //
    function loadFlowchart(e) {
        var flowChartJson = $('#jsonOutput').val();
        var flowChart = JSON.parse(flowChartJson);

        var node = flowChart.node;
        $.each(node, function (index, elem) {

            droppedElement = document.getElementById(id);

            var id = elem.id;
            var classes = elem.class;
            var top = elem.position.top;
            var bottom = elem.position.bottom;
            var left = elem.position.left;
            var right = elem.position.right;
            var asName = elem.name;
            var kind = elem.kind;

            if (classes == "streamdrop ui-draggable") {
                var selectedStream = elem.predefinedStream;
                alert("elem id: " + id + "\nclass:" + classes + "\nasName:" + asName + "\nkind:" + kind + "\nselected:" + selectedStream);
                if (kind == "import") {
                    createdImportStreamArray[id - 1][0] = id;
                    createdImportStreamArray[id - 1][1] = selectedStream;
                    createdImportStreamArray[id - 1][2] = asName;
                    createdImportStreamArray[id - 1][3] = "Import";
                }
                alert("Id of element parsed: " + id + "\nclass: " + classes /*+ "\npositionTop: " + positionTop*/);
                var newAgent = $('<div>').attr('id', id).addClass('streamdrop');
                var prop = $('<a onclick="doclick(this)"><b><img src="../Images/settings.png" class="settingsIconLoc"></b></a> ').attr('id', (id + '-prop'));
                var showIcon = $('<img src="../Images/Import.png" class="streamIconloc"></b></a> ').attr('id', (id));
                var conIcon = $('<img src="../Images/connection.png" onclick="connectionShowHideToggle(this)" class="showIconDefined"></b></a> ').attr('id', (id + 'vis'));
                newAgent.text(asName).append('<a class="boxclose" id="boxclose"><b><img src="../Images/Cancel.png"></b></a> ').append(showIcon).append(conIcon).append(prop);
                dropCompleteElement(newAgent, id, e, kind,top,left);
            }
        });
    }

    // function dragMoveListener (event) {
    //     var target = event.target,
    //     // keep the dragged position in the data-x/data-y attributes
    //         x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    //         y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    //
    //     // translate the element
    //     target.style.webkitTransform =
    //         target.style.transform =
    //             'translate(' + x + 'px, ' + y + 'px)';
    //
    //     // update the posiion attributes
    //     target.setAttribute('data-x', x);
    //     target.setAttribute('data-y', y);
    // }
    //
    // interact('.partitiondrop').on('dblclick',function () {
    //     var element = event.target;
    //     element.innerHTML +='<div class="connection" style="background-color: #00AA00 ; width: 30px; height: 30px;">';
    //     element.setAttribute('id', i + '-prop'); interact('.partitiondrop').resizable({
    //         preserveAspectRatio: true,
    //         edges: { left: true, right: true, bottom: true, top: true }
    //     })
    //         .on('resizemove', function (event) {
    //
    //             var target = event.target,
    //                 x = (parseFloat(target.getAttribute('data-x')) || 0),
    //                 y = (parseFloat(target.getAttribute('data-y')) || 0);
    //
    //             // update the element's style
    //             target.style.width  = event.rect.width + 'px';
    //             target.style.height = event.rect.height + 'px';
    //
    //             // translate when resizing from top or left edges
    //             x += event.deltaRect.left;
    //             y += event.deltaRect.top;
    //
    //             target.style.webkitTransform = target.style.transform =
    //                 'translate(' + x + 'px,' + y + 'px)';
    //
    //             target.setAttribute('data-x', x);
    //             target.setAttribute('data-y', y);
    //             target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
    //     }); });
    //
    // interact('.partitiondrop')
    //     .resizable({
    //         preserveAspectRatio: true,
    //         edges: { left: true, right: true, bottom: true, top: true }
    //     })
    //     .on('resizemove', function (event) {
    //
    //         var target = event.target,
    //             x = (parseFloat(target.getAttribute('data-x')) || 0),
    //             y = (parseFloat(target.getAttribute('data-y')) || 0);
    //
    //         // update the element's style
    //         target.style.width  = event.rect.width + 'px';
    //         target.style.height = event.rect.height + 'px';
    //
    //         // translate when resizing from top or left edges
    //         x += event.deltaRect.left;
    //         y += event.deltaRect.top;
    //
    //         target.style.webkitTransform = target.style.transform =
    //             'translate(' + x + 'px,' + y + 'px)';
    //
    //         target.setAttribute('data-x', x);
    //         target.setAttribute('data-y', y);
    //         target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
    //     });
    // //
    //
    // // // this is used later in the resizing and gesture demos
    // // window.dragMoveListener = dragMoveListener;
    // //
    // //
    // //
    // // // enable draggables to be dropped into this
    // // interact('.container').dropzone({
    // //     // only accept elements matching this CSS selector
    // //     accept: '.partitiondrop',
    // //     // Require a 75% element overlap for a drop to be possible
    // //     overlap: 0.75,
    // //
    // //     // listen for drop related events:
    // //
    // //     ondropactivate: function (event) {
    // //         // add active dropzone feedback
    // //         event.target.classList.add('drop-active');
    // //     },
    // //     ondragenter: function (event) {
    // //         var draggableElement = event.relatedTarget,
    // //             dropzoneElement = event.target;
    // //
    // //         // feedback the possibility of a drop
    // //         dropzoneElement.classList.add('drop-target');
    // //         draggableElement.classList.add('can-drop');
    // //         draggableElement.textContent = 'Dragged in';
    // //     },
    // //     ondragleave: function (event) {
    // //         // remove the drop feedback style
    // //         event.target.classList.remove('drop-target');
    // //         event.relatedTarget.classList.remove('can-drop');
    // //         event.relatedTarget.textContent = 'Dragged out';
    // //     },
    // //     ondrop: function (event) {
    // //         event.relatedTarget.textContent = 'Dropped';
    // //
    // //         //Get the position of the element( left, right, top & bottom as enclosed by the partition)
    // //         var $partitiondrop = $(".partitiondrop");
    // //         var position = $partitiondrop.position();
    // //         position.bottom = position.top + $partitiondrop.height();
    // //         position.right = position.left + $partitiondrop.width();
    // //         alert("Top position: " + position.top + "\nLeft position: " + position.left + "\nBottom position: " + position.bottom + "\nRight position: " + position.right);
    // //
    // //
    // //     },
    // //     ondropdeactivate: function (event) {
    // //         // remove active dropzone feedback
    // //         event.target.classList.remove('drop-active');
    // //         event.target.classList.remove('drop-target');
    // //     }
    // //
    // // });
    //
    //
