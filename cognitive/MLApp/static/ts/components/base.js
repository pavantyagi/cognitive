var ComponentBase = (function () {
    function ComponentBase(params) {
        this._id = ComponentBase.generate_component_id();
        this.name = params.name;
        this.width = 180;
        this.height = 40;
        this.backend_id = 0;
        this.x = 0;
        this.y = 0;
        this.avilable_input_links = 1;
        this.avilable_output_links = 1;
        this.enter_path = null; // should be number?
        this.leave_path = null;
        ComponentBase.function_layer = $('#layer-4');
        ComponentBase.component_layer = $('#layer-3');
        ComponentBase.connection_layer = $('#layer-2');
        ComponentBase.scope_layer = $('#layer-1');
        this.render_component();
        this.render_scope();
        this.render_functions();
        ComponentBase.component_list.push(this);
        console.log("Current Components:", ComponentBase.component_list);
    }
    ComponentBase.prototype.render_component = function () {
        // Just adding an element of randomity so things don't appear on top of each other.
        this.x = $('.detail').width() + (Math.random() * 400);
        this.y = 50 + (Math.random() * 400);
        // Lets compensate for smaller window widths, just in case.
        if (this.x > window.innerWidth - 350) {
            this.x = window.innerWidth - 500;
            console.log("Too big, making " + this.x);
        }
        if (this.y > window.innerHeight) {
            this.y = window.innerHeight - 300;
        }
        var svg = d3.selectAll(ComponentBase.component_layer);
        var _click = this._click;
        var g = svg.append('g')
            .attr('class', 'node-group')
            .attr('x', 0)
            .attr('y', 0)
            .attr('abs_x', this.x)
            .attr('abs_y', this.y)
            .attr('id', 'node-group-' + this._id)
            .call(d3.behavior.drag().on("drag", this._drag))
            .on("click", function () { _click(this); })
            .on("mouseenter", function () {
            var id = this.id.split("-")[2];
            $("#close-icon-id-" + id).css("display", "block");
        });
        g.append('rect')
            .attr('x', this.x)
            .attr('y', this.y)
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('class', "node base-node")
            .attr('stroke', "steelblue")
            .attr('stroke-width', "3");
        g.append('text')
            .attr('x', this.x + 90)
            .attr('y', this.y + 25)
            .attr('fill', 'black')
            .style('stroke-width', 1)
            .style({ "font-size": "14px", "z-index": "9999999" })
            .style('text-anchor', "middle")
            .text(this.name);
        if (this.avilable_input_links > 0) {
            g.append('circle')
                .attr('cx', this.x + 90)
                .attr('cy', this.y)
                .attr('r', 4)
                .attr('fill', '#fd8d3c')
                .style('stroke-width', 1);
        }
        if (this.avilable_output_links > 0) {
            g.append('circle')
                .attr('cx', this.x + 90)
                .attr('cy', this.y + 40)
                .attr('r', 4)
                .attr('fill', '#5264ae')
                .style('stroke-width', 1);
        }
    };
    ComponentBase.prototype.render_scope = function () {
        var scope = d3.selectAll(ComponentBase.scope_layer)
            .append('g').attr('id', "scope-group-" + this._id)
            .on("mouseleave", function () {
            var id = this.id.split("-")[2];
            $("#close-icon-id-" + id).css("display", "none");
        });
        console.log(this.x);
        console.log(this.width);
        scope.append('rect')
            .attr('x', this.x - 35)
            .attr('y', this.y - 35)
            .attr('width', this.width + 70)
            .attr('height', this.height + 70)
            .attr('class', "scope")
            .attr('id', "scope-" + this._id)
            .attr('fill', 'white');
    };
    ComponentBase.prototype.render_functions = function () {
        var svg = d3.selectAll(ComponentBase.function_layer);
        var g = svg.append('g').attr('id', 'functionality-group-' + this._id);
        console.log("debug");
        console.log(this.x);
        var _eliminate = this.eliminate;
        g.append('text')
            .attr('x', this.x - 20)
            .attr('y', this.y - 5)
            .attr('class', 'close-icon')
            .attr('id', 'close-icon-id-' + this._id)
            .text('\uf00d') // icon: fa-close
            .on("click", this.eliminate.bind(this))
            .on("mouseenter", function () { $(this).css("display", "block"); });
    };
    ComponentBase.prototype._drag = function () {
        var group = d3.select(this);
        var sx = parseInt(group.attr('x')) + parseInt(d3.event.dx);
        var sy = parseInt(group.attr('y')) + parseInt(d3.event.dy);
        group.attr('x', sx).attr('y', sy)
            .attr('transform', 'translate(' + sx + ',' + sy + ')');
        d3.selectAll('g[from_id="' + group.attr('id') + '"]').selectAll('line')
            .attr('x1', sx + parseInt(group.attr('abs_x')) + 90)
            .attr('y1', sy + parseInt(group.attr('abs_y')) + 40);
        d3.selectAll('g[to_id="' + group.attr('id') + '"]').selectAll('line')
            .attr('x2', sx + parseInt(group.attr('abs_x')) + 90)
            .attr('y2', sy + parseInt(group.attr('abs_y')));
        var node_id = group.attr('id').split("-")[2];
        var scope = d3.selectAll($('#scope-' + node_id));
        scope
            .attr('x', sx - 30 + parseInt(group.attr('abs_x')))
            .attr('y', sy - 30 + parseInt(group.attr('abs_y')));
        var functionality_group = d3.selectAll($('#close-icon-id-' + node_id));
        functionality_group
            .attr('x', sx - 20 + parseInt(group.attr('abs_x')))
            .attr('y', sy - 5 + parseInt(group.attr('abs_y')));
    };
    ComponentBase.prototype._click = function (e) {
        if (d3.event.defaultPrevented)
            return;
        var component = d3.select(e);
        console.log("here");
        if (ComponentBase.current_focus == null) {
            component.classed('clicked', true);
            ComponentBase.current_focus = component;
            return;
        }
        console.log("here");
        if (ComponentBase.current_focus.attr('id') == component.attr('id')) {
            component.classed('clicked', false);
            ComponentBase.current_focus = null;
            return;
        }
        console.log("make line");
        var svg = d3.selectAll(ComponentBase.connection_layer);
        var g = svg.append('g')
            .attr('from_id', ComponentBase.current_focus.attr('id'))
            .attr('to_id', component.attr('id'));
        var line = g.append("line")
            .attr('x1', parseInt(ComponentBase.current_focus.attr('x')) + parseInt(ComponentBase.current_focus.attr('abs_x')) + 90)
            .attr('y1', parseInt(ComponentBase.current_focus.attr('y')) + parseInt(ComponentBase.current_focus.attr('abs_y')) + 40)
            .attr('x2', parseInt(component.attr('x')) + parseInt(component.attr('abs_x')) + 90)
            .attr('y2', parseInt(component.attr('y')) + parseInt(component.attr('abs_y')))
            .attr("stroke", "gray")
            .attr('stroke-width', 2);
        var current_focus_node_id = ComponentBase.current_focus.attr('id').split("-")[2];
        var next_node_id = component.attr('id').split("-")[2];
        console.log(current_focus_node_id);
        console.log(ComponentBase.find_by_id(current_focus_node_id));
        ComponentBase.find_by_id(current_focus_node_id).setOutputPath(g);
        console.log(current_focus_node_id);
        ComponentBase.find_by_id(next_node_id).setInputPath(g);
        console.log(current_focus_node_id);
        ComponentBase.current_focus.classed('clicked', false);
        console.log(current_focus_node_id);
        component.classed('clicked', false);
        ComponentBase.current_focus = null;
    };
    ComponentBase.prototype.eliminate = function () {
        var id = this._id;
        ComponentBase.current_focus = null;
        $('#scope-group-' + id).remove();
        $('#node-group-' + id).remove();
        $('g[from_id="' + "node-group-" + id + '"]').remove();
        $('g[to_id="' + "node-group-" + id + '"]').remove();
        $('#functionality-group-' + id).remove();
        ComponentBase.remove_by_id(id);
        console.log("Current Components:", ComponentBase.component_list);
        return false;
    };
    ComponentBase.find_by_id = function (id) {
        for (var i = 0; i < ComponentBase.component_list.length; i++) {
            if (ComponentBase.component_list[i].get_id() == id) {
                return ComponentBase.component_list[i];
            }
        }
        return null;
    };
    ComponentBase.find_by_key_value = function (obj) {
        var key = Object.keys(obj);
        for (var i = 0; i < ComponentBase.component_list.length; i++) {
            if (ComponentBase.component_list[i][key] == obj[key]) {
                return ComponentBase.component_list[i];
            }
        }
        return null;
    };
    ComponentBase.remove_by_id = function (id) {
        var list_idx = ComponentBase._get_idx_from_id(id);
        if (list_idx > -1) {
            ComponentBase.component_list.splice(list_idx, 1);
        }
    };
    ComponentBase._get_idx_from_id = function (id) {
        var comp = ComponentBase.find_by_id(id);
        return ComponentBase.component_list.indexOf(comp);
    };
    ComponentBase.prototype.get_id = function () {
        return this._id;
    };
    ComponentBase.get_current_focus_component = function () {
        var id = ComponentBase.current_focus[0][0].id.split("-")[2];
        return ComponentBase.find_by_id(id);
    };
    ComponentBase.get_workflow_from = function (id) {
        var component_list = [];
        var start_component = ComponentBase.find_by_id(id);
        //for ( var i = start_component;;
        //      i = ComponentBase.find_by_id(parseInt(i.getOutputPath().attr('to_id').split("-")[2]))) {
        //    console.log(i);
        //    component_list.push(i);
        //    console.log(component_list)
        //    if (i.getOutputPath() == null) {
        //        break;
        //    }
        //    console.log(i.getOutputPath())
        //}
        var i = start_component;
        while (true) {
            console.log(i);
            component_list.push(i);
            console.log("component_list: ", component_list);
            if (i.getOutputPath() == null || i.getOutputPath() == undefined)
                break;
            console.log("--------------------");
            var _output_obj = i.getOutputPath();
            console.log(_output_obj);
            xx = _output_obj;
            var next_id = _output_obj.attr("to_id").split("-")[2];
            console.log(next_id);
            i = ComponentBase.find_by_id(next_id);
        }
        return component_list;
    };
    ComponentBase.prototype.set_backend_id = function (id) {
        this.backend_id = id;
    };
    ComponentBase.prototype.get_backend_id = function () {
        return this.backend_id;
    };
    ComponentBase.prototype.get_outpath = function () {
        return this.leave_path;
    };
    ComponentBase.prototype.get_enter_path = function () {
        return this.enter_path;
    };
    ComponentBase.prototype.getInputPath = function () {
        return this.enter_path;
    };
    ComponentBase.prototype.setInputPath = function (g) {
        this.enter_path = g;
    };
    ComponentBase.prototype.setOutputPath = function (g) {
        this.leave_path = g;
    };
    ComponentBase.prototype.getOutputPath = function () {
        return this.leave_path;
    };
    ComponentBase.component_list = [];
    ComponentBase.current_focus = null;
    ComponentBase.generate_component_id = (function () {
        var gen = 1;
        return function () { return gen++; };
    })();
    return ComponentBase;
})();
//# sourceMappingURL=base.js.map