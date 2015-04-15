var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var InputData = (function (_super) {
    __extends(InputData, _super);
    function InputData() {
        _super.call(this, {
            "name": "Input Data",
            "width": 0,
            "height": 0,
            "input": 0,
            "output": 1
        });
    }
    InputData.prototype.create_request = function (params) {
        this.file_name = params.file_name;
        this.text_data = params.text_data;
        var json_data = {
            input_file: params.file_name,
            input_file_type: "csv",
            data_values: params.text_data
        };
        var api_url = '/api/v1' + '/operations/input/';
        ComponentBase._send_request(api_url, "POST", json_data, this);
    };
    InputData.prototype.put_request = function (params) {
        this.file_name = params.file_name;
        this.text_data = params.text_data;
        var json_data = {
            input_file: params.file_name,
            input_file_type: "csv",
            data_values: params.text_data
        };
        var api_url = '/api/v1' + '/operations/input/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "PUT", json_data, this);
    };
    InputData.prototype.delete_request = function () {
        var api_url = '/api/v1' + '/operations/input/' + this.get_backend_id();
        ComponentBase._send_request(api_url, "DELETE", {}, null);
    };
    InputData.prototype.click_edit = function (e) {
    };
    return InputData;
})(ComponentBase);
//# sourceMappingURL=input_data.js.map