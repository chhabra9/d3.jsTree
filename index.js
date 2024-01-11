$(document).ready(()=>{
    console.log("working")
 $.ajax({
    url:'http://localhost:3000',
    dataType:'json',
    method:'get',
    success:(data)=>{
        $('input[name = "radio1"][value="' + data.radio + '"]').prop('checked',true)
        $('#myDropdown').val(data.defaultOption);
        $.ajax({
            url: 'data.json',
            datatype: 'json',
            success: (data) => {
                createTree(data.treeData[0]);
            }
        });
        console.log(data)
    }
})
})
    let margin = {
        top: 30,
        bottom: 30,
        left: 100,
        right: 100
    }
    let hoverCircleNodeClass = {
        "fill": "#fff",
        "stroke": "steelblue",
        "stroke-width": "1px",
    }
    let fontPos = {
        x: .35,
        y: 13
    }
    let duration = 800
    function Call(){
        $.ajax({
            url: 'data.json',
            datatype: 'json',
            success: (data) => {
                createTree(data.treeData[0]);
    
            }
        });
    }
    function changeSize(){
        console.log("---working---")
    }
    function getMaxDepthIterative(root) {
        const stack = [{ node: root, depth: 0 }];
        let maxDepth = 0;

        while (stack.length > 0) {
            const { node, depth } = stack.pop();

            if (depth > maxDepth) {
                maxDepth = depth;
            }

            if (node.children) {
                for (const child of node.children) {
                    stack.push({ node: child, depth: depth + 1 });
                }
            }
        }

        return maxDepth;
    }
    function countLeafNodes(tree) {
        if (!tree) {
          return 0;
        }
      
        let leafNodeCount = 0;
        const stack = [tree];
      
        while (stack.length > 0) {
          const node = stack.pop();
      
          if (!node.children || node.children.length === 0) {
            // Node is a leaf node
            leafNodeCount++;
          } else {
            // Node has children, add them to the stack for further processing
            stack.push(...node.children);
          }
        }
      
        return leafNodeCount;
      }
    let svg;
    let i = 0;
        createTree = (data)=>{
        let isDownstream =true;
        let dim = {
            height:800,
            width:window.screen.width ,
        }
        let depth=  getMaxDepthIterative(data)
        let leafNodeCount = countLeafNodes(data)
        dim.height =(leafNodeCount*25)
        data.startPoint = dim.height / 2;
       let tree = d3.layout.tree().nodeSize([20, 30]).size([
            dim.height - margin.top - margin.bottom, dim.width - margin.left - margin.right
        ]);
        if (isDownstream) {
            tree = tree.sort((a, b) => a.x - b.x);
        }
        let nodes = tree.nodes(data).reverse();
        let links = tree.links(nodes);
        let diagonal = d3.svg.diagonal().projection((d) => [d.y, d.x]);
        nodes.forEach((d) => (d.y = isDownstream ? (depth - d.depth) * 175 : d.depth * 50 * depth));
        let zoom = d3.behavior.zoom().scaleExtent([0.5,20]).on("zoom", zoomed)
        zoomRange.addEventListener("input", function() {
            const scale = +this.value;
            svg.attr("transform",
            "translate(" + 0 + ")"
            + " scale(" +scale + ")");
          });
          d3.select("#graph svg").remove();

         svg = d3.select("#graph").
            append("svg").
            attr("width", dim.width).
            attr("height", dim.height).
            call(zoom).
            append("g").
            attr("transform", `translate(${margin.left},${margin.right})`);

            d3.select("#zoomRange").on("change", function(value) {
                console.log("hello world",value)
                zoom.scaleBy(svg.transition().duration(750), 1.2);
              });
              d3.select("#zoom_out").on("click", function() {
                console.log("hey ther")
                zoom.scaleBy(svg.transition().duration(750), 0.8);
              });

        let nodeData = svg.selectAll("g.node").data(nodes, (d) => d.id || (d.id = ++i));
        nodeData.exit().remove();
        let tooltip = d3.select("body").append("div")
        .attr("class", "tooltip");
        var nodeEnter = nodeData.enter().append("g")
            .attr("class", "node")
            .attr("transform", (d) => `translate(0,${data.startPoint})`)
            .on("click", (d) => {
                click(d, data);
            })
            .on("mouseover", (d) => {
                let selectedNode = d3.selectAll("circle").filter(p => p.id === d.id);
                selectedNode.classed("hoverCircleNodeClass", false)
                selectedNode.style("fill", (d) => d.color).style("stroke-width", 0);
                console.log(this)
                tooltip.style("visibility", "visible")
            })
            .on("mousemove", (d) => {
                tooltip
                .html("The exact value of<br>this cell is:888")
                .style("left", (d3.event.pageX+10) + "px")
                .style("top", (d3.event.pageY-10) + "px")
                .style("visibility", "visible")
            })
            .on("mouseout", (d) => {
                let selectedNode = d3.selectAll("circle").filter(p => p.id === d.id);
                selectedNode.style("fill", null).style("stroke-width", "3px");
                selectedNode.classed("hoverCircleNodeClass", true);
                tooltip.transition()
                    .style("visibility", "hidden");
            });

        nodeEnter.
            append("circle").
            attr("r", (d) => { return d.depth == 0 ? 1e-1 : 1e-4 });

        nodeEnter.append("text").
            attr("x", fontPos.x).
            attr("y", fontPos.y).
            attr("text-anchor", "end")
            .text((d) => d.name)
            .style("color","#ccc")
            .style("fill-opacity", 1e-6);

        let nodeUpdate = nodeData.
            transition().
            duration(duration).
            attr("transform", (d) => `translate(${d.y},${d.x})`);

        nodeUpdate.select("circle")
            .attr("r", (d) => {
                return d.depth === 0 ? 50 : 8;
            });

        nodeUpdate.select("text")
            .style("fill-opacity", 1);

        // Remove any existing nodes
            nodeData.exit().remove();

        // // Update existing links
        let link = svg.selectAll("path.link")
            .data(links, (d) => d.target.id);

        // Remove any exiting links
        link.exit().remove();

        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", function (d) {
                let o = { x: data.startPoint, y: 0 };
                return diagonal({ source: o, target: o });
            });

        link.transition()
            .duration(duration)
            .attr("d", diagonal);
    }

    function click(d, data) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
            updateTree(data);
        } else if(d._children){
            d.children = d._children;
            d._children = null;
            updateTree(data);
        }else{
            $.ajax({
                url: 'http://localhost:3000/abc',
                datatype: 'json',
                success: (response) => {
                    console.log("calling",response)
                    d.children = response.children
                    updateTree(data);
                }
            });
        }
    }

    function updateTree(data) {
        let isDownstream = true;
        let dim = {
            height:800,
            width: window.screen.width ,
        }
        let depth=  getMaxDepthIterative(data)
        let leafNodeCount = countLeafNodes(data)
        dim.height =(leafNodeCount*25)
        let tree = d3.layout.tree().nodeSize([20, 30]).size([
            dim.height - margin.top - margin.bottom, dim.width - margin.left - margin.right
        ]);
        if (isDownstream) {
            tree = tree.sort((a, b) => a.x - b.x);
        }
        let nodes = tree.nodes(data).reverse();
        let links = tree.links(nodes);
        let diagonal = d3.svg.diagonal().projection((d) => [d.y, d.x]);

        nodes.forEach((d) => (d.y = isDownstream ? (depth - d.depth) * 175 : d.depth * 50 * depth));

        let svg = d3.select("body svg g");

        // Update existing nodes
        let nodeData = svg.selectAll("g.node").data(nodes, (d) => d.id || (d.id = ++i));

        // Remove any exiting nodes
        nodeData.exit().remove();
        d3.selectAll(".tooltip").remove();
          let tooltip = d3.select("body").append("div")
        .attr("class", "tooltip");
        let nodeEnter = nodeData.enter().append("g")
            .attr("class", "node")
            .attr("transform", (d) => `translate(${d.y},${d.x})`)
            .on("click", (d) => click(d, data))
            .on("mouseover", (d) => {
                // console.log("----",tooltip)
                let selectedNode = d3.selectAll("circle").filter(p => p.id === d.id);
                selectedNode.classed("hoverCircleNodeClass", false)
                selectedNode.style("fill", (d) => d.color).style("stroke-width", 0);
                console.log(this)
                tooltip.style("visibility", "visible")
            })
            .on("mousemove", (d) => {
                tooltip
                .html("The exact value of<br>this cell is:888")
                .style("left", (d3.event.pageX+10) + "px")
                .style("top", (d3.event.pageY-10) + "px")
                .style("visibility", "visible")
            })
            .on("mouseout", (d) => {
                let selectedNode = d3.selectAll("circle").filter(p => p.id === d.id);
                selectedNode.style("fill", null).style("stroke-width", "3px");
                selectedNode.classed("hoverCircleNodeClass", true);
                tooltip.transition()
                    .style("visibility", "hidden");
            });

        nodeEnter.append("circle")
            .attr("r", (d) => d.depth === 0 ? 50 : 8);

        nodeEnter.append("text")
            .attr("x", fontPos.x)
            .attr("y", fontPos.y)
            .attr("text-anchor", "end")
            .text((d) => {
                return(d.name)
            })
            .style("fill-opacity", 1e-6);
        let nodeUpdate = nodeData.
            transition().
            duration(duration).
            attr("transform", (d) => `translate(${d.y},${d.x})`);

        nodeUpdate.select("circle")
            .attr("r", (d) => {
                return d.depth === 0 ? 50 : 8;
            });

        nodeUpdate.select("circle")
            .attr("r", (d) => d.depth === 0 ? 50 : 8);

        nodeUpdate.select("text")
            .style("fill-opacity", 1);

        // // Update existing links
        let link = svg.selectAll("path.link").data(links, (d) => d.target.id);

        // // Remove any exiting links
        link.exit().remove();

        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", function (d) {
                console.log("---",d)
                let o = { x: d.x, y: d.y};
                return diagonal({ source: o, target: o });
            });

        link.transition()
            .duration(duration)
            .attr("d", diagonal);
    }

    function zoomed() {
        svg.attr("transform", "translate(" + d3.event.translate + ")");
      }


